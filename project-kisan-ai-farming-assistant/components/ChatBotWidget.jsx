"use client";
import React, { useState, useRef } from 'react';
import { Mic, Send, X, MessageCircle } from 'lucide-react';

const languageLabels = {
  en: 'English',
  hi: 'हिन्दी',
  kn: 'ಕನ್ನಡ',
};

const mockBotReply = (msg, lang) => {
  // Simple mock logic for demo
  if (!msg) return '';
  if (msg.toLowerCase().includes('soil')) return lang === 'hi' ? 'यह आपकी मिट्टी की रिपोर्ट है।' : lang === 'kn' ? 'ಇದು ನಿಮ್ಮ ಮಣ್ಣಿನ ವರದಿ.' : 'Here is your soil report.';
  if (msg.toLowerCase().includes('pump')) return lang === 'hi' ? 'सिस्टम चालू कर दिया गया है।' : lang === 'kn' ? 'ಸಿಸ್ಟಮ್ ಆನ್ ಮಾಡಲಾಗಿದೆ.' : 'System has been turned on.';
  if (msg.toLowerCase().includes('organic')) return lang === 'hi' ? 'यह जैविक उपचार है।' : lang === 'kn' ? 'ಇದು ಜೈವಿಕ ಚಿಕಿತ್ಸೆ.' : 'Here is an organic treatment.';
  return lang === 'hi' ? 'आपका सवाल प्राप्त हुआ।' : lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.' : 'Your question has been received.';
};

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 Ask me anything about farming, soil, crops, or government schemes.', lang: 'en' },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState('en');
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Voice input logic
  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'kn' ? 'kn-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleSend = (e) => {
    e && e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input, lang };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    // Simulate bot reply
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: mockBotReply(userMsg.text, lang), lang },
      ]);
    }, 700);
  };

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label={open ? 'Close chat bot' : 'Open chat bot'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
      {/* Chat Window */}
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl flex flex-col border border-green-200 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-2xl">💬</span>
              <span className="font-bold text-gray-800">Kisan Bot</span>
            </div>
            <select
              className="text-xs bg-gray-100 border rounded px-2 py-1 focus:outline-none"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label="Select language"
            >
              {Object.entries(languageLabels).map(([code, label]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${
                    msg.from === 'user'
                      ? 'bg-green-100 text-green-900'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  aria-label={msg.from === 'user' ? 'You' : 'Bot'}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 border-t px-3 py-2 bg-white"
            onSubmit={handleSend}
            autoComplete="off"
          >
            <button
              type="button"
              className={`p-2 rounded-full ${listening ? 'bg-green-200' : 'bg-gray-100'} text-green-700 hover:bg-green-300 focus:outline-none`}
              aria-label={listening ? 'Listening...' : 'Start voice input'}
              onClick={handleVoice}
              disabled={listening}
            >
              <Mic size={20} />
            </button>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder={listening ? 'Listening...' : 'Type your message...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={listening}
              aria-label="Chat input"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Send message"
              disabled={!input.trim() || listening}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
} 