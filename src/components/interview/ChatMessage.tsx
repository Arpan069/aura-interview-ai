
import React from 'react';
import { Message } from '@/types/interview';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.role === 'assistant';
  
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div 
      className={cn(
        "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-5 duration-300",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      <div 
        className={cn(
          "flex gap-2 max-w-[80%]",
          isAI ? "flex-row" : "flex-row-reverse"
        )}
      >
        {/* Avatar */}
        <div 
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
            isAI ? "bg-primary/10" : "bg-secondary/50"
          )}
        >
          {isAI ? <Bot size={16} /> : <User size={16} />}
        </div>
        
        {/* Message content */}
        <div 
          className={cn(
            "rounded-lg p-3 text-sm",
            isAI 
              ? "bg-muted text-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          <p>{message.content}</p>
          <div 
            className={cn(
              "text-xs mt-1 opacity-70 text-right",
              isAI ? "text-muted-foreground" : "text-primary-foreground"
            )}
          >
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
