import React, { useState, useRef, useEffect } from 'react';
import { useKanso } from '../context/KansoContext';

export default function InquiryModal() {
  const { inquiryTarget, setInquiryTarget, inquiries, sendInquiry } = useKanso();
  const [inputText, setInputText] = useState('');
  const threadEndRef = useRef(null);

  const sanctuary = inquiryTarget?.sanctuary;
  const propertyId = inquiryTarget?.propertyId;

  const messages = (propertyId && inquiries[propertyId]) || [
    {
      sender: 'host',
      text: `Namaste! I am ${sanctuary?.host?.name || 'the host custodian'} of ${sanctuary?.title || 'this sanctuary'}. How may I help you plan your quiet stay?`,
      time: 'Just now'
    }
  ];

  useEffect(() => {
    if (threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!inquiryTarget) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !propertyId) return;

    sendInquiry(propertyId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="modal-backdrop" onClick={() => setInquiryTarget(null)}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-tag">DIRECT INQUIRY</span>
            <h3 className="modal-title">
              Message Host: {sanctuary?.host?.name || 'Custodian'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setInquiryTarget(null)}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body chat-thread-body">
          <div className="chat-thread">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${msg.sender === 'guest' ? 'guest-msg' : 'host-msg'}`}
              >
                <div className="chat-sender-tag">
                  {msg.sender === 'guest' ? 'You' : sanctuary?.host?.name || 'Custodian'}
                </div>
                <p>{msg.text}</p>
                <span className="chat-time">{msg.time}</span>
              </div>
            ))}
            <div ref={threadEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-row">
            <input
              type="text"
              placeholder="Ask about early check-in, local cuisine, workspace..."
              required
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn-architectural btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
