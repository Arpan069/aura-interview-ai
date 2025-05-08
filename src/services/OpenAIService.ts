
// Define configuration for OpenAI API
const OPENAI_API_CONFIG = {
  apiUrl: 'https://api.openai.com/v1',
  apiVersion: '2023-05-15', // Update this if needed
  models: {
    transcription: 'whisper-1',
    chat: 'gpt-4o-mini',
    tts: 'tts-1'
  }
};

interface TranscriptionOptions {
  prompt?: string;
  language?: string;
  temperature?: number;
}

interface TranscriptionResponse {
  text: string;
  segments?: Array<{
    id: number;
    text: string;
    start: number;
    end: number;
  }>;
}

export class OpenAIService {
  private apiKey: string;

  constructor(apiKey?: string) {
    // Use provided API key or try to get from environment
    this.apiKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('OpenAI API key not provided. API calls will fail.');
    }
  }

  /**
   * Transcribe audio in real-time using OpenAI Whisper API
   */
  async transcribeRealTime(audioBlob: Blob, options: TranscriptionOptions = {}): Promise<TranscriptionResponse> {
    try {
      if (!this.apiKey) {
        throw new Error('OpenAI API key is required for transcription');
      }

      // Create form data with audio blob
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', OPENAI_API_CONFIG.models.transcription);
      
      // Add optional parameters if provided
      if (options.language) {
        formData.append('language', options.language);
      }
      
      if (options.prompt) {
        formData.append('prompt', options.prompt);
      }
      
      if (options.temperature) {
        formData.append('temperature', options.temperature.toString());
      }

      // Send transcription request
      const response = await fetch(`${OPENAI_API_CONFIG.apiUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Transcription failed: ${errorData.error?.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in transcribeRealTime:', error);
      return { text: '' }; // Return empty text on error
    }
  }

  /**
   * Generate chat completion using OpenAI API
   */
  async generateChatResponse(messages: Array<{role: string; content: string}>): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error('OpenAI API key is required for chat completion');
      }

      const response = await fetch(`${OPENAI_API_CONFIG.apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: OPENAI_API_CONFIG.models.chat,
          messages,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Chat completion failed: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error in generateChatResponse:', error);
      return 'Sorry, I encountered an error while generating a response.';
    }
  }

  /**
   * Convert text to speech using OpenAI TTS API
   */
  async textToSpeech(text: string, voice: string = 'alloy'): Promise<ArrayBuffer | null> {
    try {
      if (!this.apiKey) {
        throw new Error('OpenAI API key is required for text-to-speech');
      }

      const response = await fetch(`${OPENAI_API_CONFIG.apiUrl}/audio/speech`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: OPENAI_API_CONFIG.models.tts,
          input: text,
          voice,
          speed: 1.0
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Text-to-speech failed: ${errorData.error?.message || response.statusText}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error in textToSpeech:', error);
      return null;
    }
  }

  /**
   * Set a new API key
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * Check if API key is set
   */
  hasApiKey(): boolean {
    return !!this.apiKey;
  }
}

// Export a singleton instance
export default new OpenAIService();
