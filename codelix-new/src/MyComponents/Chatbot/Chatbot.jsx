import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! Welcome to Codelix. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  /* On a phone the round button sat over the first screen's text — the
     hero's facts, the contact details, a post's cover. There it waits until
     the visitor has scrolled past the first screen; wider screens have room
     beside the content and show it straight away. */
  const [tucked, setTucked] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches && window.scrollY < window.innerHeight * 0.8
  );
  useEffect(() => {
    if (!tucked) return;
    const onScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.8) setTucked(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tucked]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when chatbot is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when chatbot is closed
      document.body.style.overflow = '';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) {
      return;
    }

    const messageText = inputMessage.trim();

    const userMessage = {
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const messagePayload = {
        message: messageText
      };

      const webhookUrl = 'https://n8n.codelixitsolutions.com/webhook/Chatbot';


      // Ensure the request is sent with proper configuration
      const fetchOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(messagePayload),
        credentials: 'omit' // Don't send credentials to avoid CORS preflight issues
      };


      const response = await fetch(webhookUrl, fetchOptions).catch((fetchError) => {
        console.error('Fetch error caught:', fetchError);
        console.error('Error details:', {
          name: fetchError?.name,
          message: fetchError?.message,
          stack: fetchError?.stack
        });

        // Check if it's a network error
        if (fetchError instanceof TypeError && fetchError.message.includes('fetch')) {
          console.error('Network error: Could not reach the webhook URL');
          throw new Error('Network error: Unable to connect to the webhook. Please check your internet connection.');
        }

        throw fetchError;
      });


      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('Response not ok. Status:', response.status, 'Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Get response text first to handle both JSON and plain text
      const responseText = await response.text();

      // Try to parse as JSON, if fails, treat as plain text
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch {
        data = responseText;
      }

      // Extract the response text - handle different response formats
      let botResponse = '';
      if (!data || data === null || data === '') {
        // No response, don't show anything
        setIsLoading(false);
        return;
      } else if (typeof data === 'string') {
        botResponse = data.trim();
      } else if (typeof data === 'object') {
        // Check for common response fields (priority order)
        if (data.output) {
          botResponse = String(data.output).trim();
        } else if (data.response) {
          botResponse = String(data.response).trim();
        } else if (data.message) {
          botResponse = String(data.message).trim();
        } else if (data.answer) {
          botResponse = String(data.answer).trim();
        } else if (data.text) {
          botResponse = String(data.text).trim();
        }
        // If no common field found, don't show anything (don't stringify JSON)
      }

      // Only add message if there's actual content
      if (botResponse && botResponse.length > 0) {
        setMessages(prev => [...prev, {
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        }]);
      } else {
      }
    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);

      // Show error message for any error
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCloseClick = () => {
    setShowCloseDialog(true);
  };

  const handleClearAndClose = () => {
    setMessages([
      {
        text: "Hello! Welcome to Codelix. How can I help you today?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
    setShowCloseDialog(false);
    setIsOpen(false);
  };

  const handleJustClose = () => {
    setShowCloseDialog(false);
    setIsOpen(false);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor" />
                </svg>
              </div>
              <div className="chatbot-header-text">
                <h3>Chat Support</h3>
                <p>We're here to help</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={handleCloseClick} aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div
            className="chatbot-messages"
            onWheel={(e) => {
              // Prevent scroll from propagating to body
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              // Prevent touch scroll from propagating to body
              e.stopPropagation();
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.isBot ? 'bot' : 'user'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message bot">
                <div className="message-content">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              className="chatbot-send"
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send message"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </div>

          {showCloseDialog && (
            <div className="chatbot-close-dialog-overlay" onClick={() => setShowCloseDialog(false)}>
              <div className="chatbot-close-dialog" onClick={(e) => e.stopPropagation()}>
                <h4>Close Chat</h4>
                <p>What would you like to do?</p>
                <div className="chatbot-close-dialog-buttons">
                  <button
                    className="chatbot-dialog-btn chatbot-dialog-btn-primary"
                    onClick={handleClearAndClose}
                  >
                    Clear Conversation
                  </button>
                  <button
                    className="chatbot-dialog-btn chatbot-dialog-btn-secondary"
                    onClick={handleJustClose}
                  >
                    Close Chat
                  </button>
                  <button
                    className="chatbot-dialog-btn chatbot-dialog-btn-cancel"
                    onClick={() => setShowCloseDialog(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!isOpen && (
        <button
          className={`chatbot-toggle${tucked ? " is-tucked" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open chatbot"
          aria-hidden={tucked || undefined}
          tabIndex={tucked ? -1 : undefined}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="10" r="1" fill="rgba(255, 255, 255, 0.6)" />
            <circle cx="12" cy="10" r="1" fill="rgba(255, 255, 255, 0.6)" />
            <circle cx="16" cy="10" r="1" fill="rgba(255, 255, 255, 0.6)" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot;

