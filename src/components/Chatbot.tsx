import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Bot, User, X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI learning assistant. I can help you with questions about your courses, explain concepts, or assist with study materials. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.text);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("newton") && input.includes("law")) {
      return "Newton's First Law (Law of Inertia) states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This fundamental principle explains why you feel pushed back into your seat when a car accelerates!";
    }
    
    if (input.includes("algebra") || input.includes("equation")) {
      return "Algebra is all about finding unknown values! The key is to keep equations balanced - whatever you do to one side, do to the other. Start with simple operations like addition and subtraction, then move to multiplication and division. Would you like me to walk through a specific problem?";
    }
    
    if (input.includes("periodic table") || input.includes("chemistry")) {
      return "The periodic table organizes elements by their atomic number (number of protons). Elements in the same column (groups) have similar properties because they have the same number of valence electrons. For example, all Group 1 elements are highly reactive metals. What specific element or group interests you?";
    }
    
    if (input.includes("study") || input.includes("tips")) {
      return "Here are some effective study strategies: 1) Use active recall - test yourself instead of just re-reading, 2) Space out your study sessions over time, 3) Create visual aids like diagrams or flashcards, 4) Teach the concept to someone else, 5) Take regular breaks to help retention. Which subject are you studying?";
    }
    
    if (input.includes("quiz") || input.includes("test")) {
      return "For quiz preparation: Review your notes actively, practice with sample questions, identify key concepts your teacher emphasized in class, and get enough sleep before the test. Remember, understanding concepts is more important than memorizing facts. Do you have a specific quiz coming up?";
    }
    
    return "I understand you're asking about that topic. While I'd love to give you a detailed explanation, I might need a bit more context. Could you be more specific about what aspect you'd like me to explain? I'm here to help with any subject - math, science, history, or study strategies!";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 h-[500px] flex flex-col shadow-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-primary text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5" />
            AI Learning Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? "bg-muted text-foreground"
                      : "bg-primary text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                className="flex-1 min-h-[40px] max-h-[100px] resize-none"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                disabled={!inputText.trim() || isTyping}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;