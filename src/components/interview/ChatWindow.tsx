
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/interview';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: Message[];
  isProcessing: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isProcessing }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted-foreground">
              Welcome to your AI interview. Press start when you're ready to begin.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            
            {/* Loading indicator */}
            {isProcessing && (
              <div className="flex items-center space-x-2 ml-10 animate-pulse">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatWindow;
