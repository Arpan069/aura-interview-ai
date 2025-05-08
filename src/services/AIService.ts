
// Replace this with your actual OpenAI API key
// For production, this should be stored in environment variables or server-side
const API_KEY = "your-openai-api-key-here";

export class AIService {
  private apiKey: string;

  constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }

  /**
   * Transcribe speech to text using OpenAI's Whisper model
   */
  async transcribeSpeech(audioBlob: Blob): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'whisper-1');
      formData.append('language', 'en');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Transcription failed:", error);
        throw new Error(`Transcription failed: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Error transcribing speech:", error);
      throw error;
    }
  }

  /**
   * Generate AI response based on conversation history
   */
  async generateResponse(messages: { role: string; content: string }[]): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an AI interviewer conducting a job interview. Keep your responses concise, professional, and engaging. Ask follow-up questions when appropriate. Your goal is to assess the candidate\'s skills, experience, and suitability for the position.'
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("AI response generation failed:", error);
        throw new Error(`AI response generation failed: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw error;
    }
  }

  /**
   * Convert text to speech using OpenAI's TTS API
   */
  async textToSpeech(text: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: 'nova',
          input: text,
          speed: 1.0
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Text-to-speech failed:", error);
        throw new Error(`Text-to-speech failed: ${error.error?.message || response.statusText}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error("Error converting text to speech:", error);
      throw error;
    }
  }

  /**
   * Play audio from ArrayBuffer
   */
  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    try {
      const context = new AudioContext();
      const audioSource = await context.decodeAudioData(audioBuffer);
      const sourceNode = context.createBufferSource();
      sourceNode.buffer = audioSource;
      sourceNode.connect(context.destination);
      sourceNode.start();
      
      return new Promise((resolve) => {
        sourceNode.onended = () => resolve();
      });
    } catch (error) {
      console.error("Error playing audio:", error);
      throw error;
    }
  }
}

export const aiService = new AIService();
