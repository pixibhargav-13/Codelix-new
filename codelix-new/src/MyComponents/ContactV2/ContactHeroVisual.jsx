import React, { useEffect, useState } from 'react';
import './ContactHeroVisual.css';
import { Send, Clock } from 'lucide-react';

/* An illustration of what happens when someone writes in, not a live chat:
   it used to show an "Online" status, "Just now" read receipts and a
   "< 2 hrs" response badge, which read as a real chat window and promised a
   faster reply than the page's own "within one business day". The wording
   now matches what we actually commit to, and the input is a real link to
   the form. */
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
               <strong>Talk to the founders</strong>
               <span className="status">
                 <span className="status-dot"></span> Mon–Sat, 10:00–19:00 IST
               </span>
             </div>
           </div>
        </div>

        <div className="chat-body">
           <div className="message sent">
             <p>We're planning a custom platform. Could we book a scoping call?</p>
             <span className="msg-time">Your enquiry</span>
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
                 <p>Thanks for writing in. We reply within one business day to set up a free call, and send a written proposal within 48 hours of it.</p>
                 <span className="msg-time">Our reply</span>
               </div>
             </div>
           )}
        </div>
        
        <div className="chat-footer">
           <a className="chat-input-fake" href="#contact-form">
             Start your enquiry
           </a>
           <a className="chat-send-btn" href="#contact-form" aria-label="Go to the enquiry form">
             <Send size={14} />
           </a>
        </div>
      </div>

      {/* Floating Meta Tag */}
      <div className="cohv-float-tag">
        <Clock size={12} className="text-blue" />
        <span>Reply within: <strong>1 business day</strong></span>
      </div>

    </div>
  );
}
