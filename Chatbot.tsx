import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, CloseIcon } from '../icons/DashboardIcons';

// Canned AI responses for the demo
const getAIResponse = (query: string) => {
    query = query.toLowerCase();
    if (query.includes("pothole")) return "To report a pothole, go to the 'Report an Issue' page, select the 'Roads' category, upload a picture, and pinpoint the location on the map.";
    if (query.includes("credits") || query.includes("reward")) return "You earn credits by reporting new issues (+50), receiving community upvotes (+10), and for successful resolutions (+100). You can redeem credits in the 'Rewards' section.";
    if (query.includes("status")) return "You can check the status of any issue you've reported on the 'Track My Complaints' page. For other issues, you can search by ID in the top search bar.";
    return "I'm sorry, I'm not sure how to help with that. Try asking about reporting issues, earning credits, or checking an issue status.";
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hello! I am the Samyak AI Assistant. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(isOpen) {
        scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
        const aiResponse = getAIResponse(currentInput);
        setMessages(currentMessages => [...currentMessages, { from: 'ai', text: aiResponse }]);
        setIsTyping(false);
    }, 1000);
  };

  return (
    <div className={`fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[500px] z-40 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 flex-shrink-0">
          <h3 className="font-bold text-lg">Samyak AI Assistant 🤖</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10" aria-label="Close chat">
            <CloseIcon />
          </button>
        </div>
        {/* Messages */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'ai' && <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold flex-shrink-0">AI</div>}
              <div className={`max-w-xs p-3 rounded-2xl animate-fadeInUp ${msg.from === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                  <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start animate-fadeInUp">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold flex-shrink-0">AI</div>
              <div className="max-w-xs p-3 rounded-2xl bg-gray-700 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input */}
        <div className="p-4 border-t border-white/10 flex gap-2 flex-shrink-0">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-grow p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isTyping}
            aria-label="Chat input"
          />
          <button onClick={handleSend} aria-label="Send message" className="p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50" disabled={isTyping || !input.trim()}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;