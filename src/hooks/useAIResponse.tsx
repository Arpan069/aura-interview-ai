
import { useCallback, useState } from "react";
import { OpenAIService } from "@/services/OpenAIService";
import { toast } from "@/hooks/use-toast";
import { speakText } from "@/utils/speechUtils";

const openAIService = new OpenAIService();

/**
 * Hook for managing AI responses in the interview
 */
export const useAIResponse = (
  isSystemAudioOn: boolean,
  addToTranscript: (speaker: string, text: string) => void,
  advanceToNextQuestion: () => void
) => {
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  /**
   * Process transcript with OpenAI to generate interviewer response
   * @param transcriptText The transcribed text to process
   * @param currentQuestion The current interview question
   */
  const processWithOpenAI = useCallback(async (transcriptText: string, currentQuestion: string) => {
    // Skip if text is very short (likely noise)
    if (transcriptText.trim().split(/\s+/).length < 2) {
      console.log("Text too short, skipping AI processing");
      return;
    }
    
    try {
      setIsProcessingAI(true);
      
      console.log(`Processing transcript: "${transcriptText}" for question: "${currentQuestion}"`);
      
      // Process with OpenAI
      const aiResponse = await openAIService.generateResponse(
        transcriptText,
        currentQuestion,
        { 
          temperature: 0.7,
          systemPrompt: `You are an AI interviewer conducting a job interview. 
          Your name is AI Interviewer. You are currently asking: "${currentQuestion}"
          Respond to the candidate's answer. Keep your response brief (2-3 sentences maximum).
          Be conversational but professional. Ask thoughtful follow-up questions when appropriate.
          You must respond in complete sentences, even if the candidate's answer is unclear.
          If the candidate's answer isn't clear, ask them to clarify.`
        }
      );
      
      console.log("AI Response received:", aiResponse);
      
      // Add AI response to transcript
      addToTranscript("AI Interviewer", aiResponse);
      
      // Convert AI response to speech if system audio is enabled
      await speakText(aiResponse, isSystemAudioOn);
      
      // Check if we should move to the next question
      const shouldAdvance = aiResponse.includes("next question") || 
                          aiResponse.includes("Let's move on");
      
      if (shouldAdvance) {
        // Advance to next question after speech completes
        advanceToNextQuestion();
      }
    } catch (error) {
      console.error("AI processing error:", error);
      toast({
        title: "AI Processing Error",
        description: "Failed to generate AI response",
        variant: "destructive",
      });
    } finally {
      setIsProcessingAI(false);
    }
  }, [isSystemAudioOn, addToTranscript, advanceToNextQuestion]);

  return {
    isProcessingAI,
    processWithOpenAI
  };
};
