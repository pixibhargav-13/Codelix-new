import React, { useEffect, useState } from 'react';
import './ContactHeroVisual.css';
import { Send, CheckCheck, Clock } from 'lucide-react';

export default function ContactHeroVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Animation sequence for the chat
    const sequence = async () => {
      setStep(0); // Only first message visible
      await new Promise(r => setTimeout(r, 1500));
      setStep(1); // Show typing indicator
      await new Promise(r => setTimeout(r, 2500));
      setStep(2); // Show reply
      await new Promise(r => setTimeout(r, 4000));
      sequence(); // Loop
    };
    sequence();
  }, []);

  return (
    <div className="cohv-container">
      {/* Soft background glow */}
      <div className="cohv-glow-bg"></div>
      <div className="cohv-blur-circle c-1"></div>
      <div className="cohv-blur-circle c-2"></div>

      {/* Main Chat Interface */}
      <div className="cohv-chat-window">
        <div className="chat-header">
           <div className="chat-header-left">
             <div className="chat-avatars">
                <div className="avatar a-1">M</div>
                <div className="avatar a-2">K</div>
             </div>
             <div className="chat-header-info">
               <strong>Direct Line: Founders</strong>
               <span className="status">
                 <span className="status-dot"></span> Online
               </span>
             </div>
           </div>
        </div>

        <div className="chat-body">
           <div className="message sent">
             <p>Hey team! We're looking to architect a custom platform from scratch. Are you available for a scoping call?</p>
             <span className="msg-time">Just now <CheckCheck size={12} className="read-receipt" /></span>
           </div>

           {step === 1 && (
             <div className="message received typing-indicator">
               <div className="msg-avatar">M</div>
               <div className="typing-dots">
                 <div className="dot"></div>
                 <div className="dot"></div>
                 <div className="dot"></div>
               </div>
             </div>
           )}
           
           {step === 2 && (
             <div className="message received">
               <div className="msg-avatar">M</div>
               <div className="msg-content">
                 <p>Absolutely. You're in the right place! We'd love to hear what you're building. Let's get a discovery call scheduled.</p>
                 <span className="msg-time">Just now</span>
               </div>
             </div>
           )}
        </div>
        
        <div className="chat-footer">
           <div className="chat-input-fake">
             Type your message...
           </div>
           <div className="chat-send-btn">
             <Send size={14} />
           </div>
        </div>
      </div>

      {/* Floating Meta Tag */}
      <div className="cohv-float-tag">
        <Clock size={12} className="text-blue" />
        <span>Avg Response: <strong>&lt; 2 hrs</strong></span>
      </div>

    </div>
  );
}
