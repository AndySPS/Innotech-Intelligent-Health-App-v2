
import React, { useState, useRef, useEffect } from 'react';
import { useM3Theme } from '../theme/ThemeConfig';
import { M3Icon, IconName } from '../components/Icons';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantViewProps {
  userContext?: string;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ userContext }) => {
  const { typography, shape } = useM3Theme();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello Alex! I'm your Innotech Health Assistant. Based on your recent profile, your metabolic score is improving. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "Explain my metabolic score",
    "How to improve insulin sensitivity?",
    "Review my last lab report",
    "Diet tips for heart health"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `You are the Innotech Intelligent Health Assistant. 
          The user's name is Alex. 
          Current Context: ${userContext || 'Metabolic Score: 78, Insulin Sensitivity: 65%, Heart Rate: 72bpm'}.
          Provide evidence-based, concise, and encouraging advice. 
          Always maintain a professional yet friendly tone. 
          If asked for medical diagnosis, politely state that you provide health insights and the user should consult their Innotech specialist for clinical diagnosis.`,
        },
      });

      const aiContent = response.text || "I'm sorry, I couldn't process that. Could you try rephrasing?";
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the health cloud right now. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full -mx-dp-16 -mt-dp-16 animate-in slide-in-from-right-8 duration-300 bg-m3-surfaceContainerLowest">
      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-dp-16 flex flex-col gap-dp-16 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div 
              className={`max-w-[85%] p-dp-16 ${
                msg.role === 'user' 
                  ? `bg-m3-primary text-m3-onPrimary ${shape.large} rounded-tr-m3-xs shadow-sm` 
                  : `bg-m3-surfaceContainerHigh text-m3-onSurface ${shape.large} rounded-tl-m3-xs border border-m3-outline/5`
              }`}
            >
              <p className={typography.body.medium}>{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className={`p-dp-16 bg-m3-surfaceContainerHigh ${shape.large} rounded-tl-m3-xs flex gap-1 items-center`}>
              <div className="w-1.5 h-1.5 bg-m3-outline rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-m3-outline rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-m3-outline rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <footer className="p-dp-16 bg-m3-surface border-t border-m3-outline/10 shrink-0">
        <div className="flex gap-dp-8 overflow-x-auto no-scrollbar mb-dp-16 -mx-dp-16 px-dp-16">
          {quickActions.map(action => (
            <button 
              key={action}
              onClick={() => handleSend(action)}
              className={`px-dp-12 py-dp-8 bg-m3-surfaceContainerLow border border-m3-outline/20 ${shape.medium} ${typography.label.medium} text-m3-onSurfaceVariant shrink-0 hover:bg-m3-secondaryContainer transition-colors`}
            >
              {action}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-dp-8">
          <div className={`flex-1 flex items-center h-dp-56 px-dp-16 bg-m3-surfaceContainerHigh ${shape.full} border border-m3-outline/10 shadow-inner`}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your health..."
              className="bg-transparent flex-1 outline-none text-m3-onSurface h-full"
            />
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={`w-dp-56 h-dp-56 flex items-center justify-center ${shape.full} ${
              input.trim() ? 'bg-m3-primary text-m3-onPrimary shadow-md' : 'bg-m3-surfaceContainerHighest text-m3-outline'
            } transition-all active:scale-90`}
          >
            <M3Icon name={IconName.Send} size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
};
