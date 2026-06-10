import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronRight, RotateCcw } from 'lucide-react';
import './ChatWidget.css';

const FAQS = [
  { id:1, q:'How quickly can I get an EPC?',                   a:'We can usually arrange a visit within 24-48 hours and issue the certificate the same day. Call us on +44 7540 387542 to book immediately.' },
  { id:2, q:'Do I need a Legionella risk assessment?',          a:'Yes — landlords have a legal duty under the Health & Safety at Work Act 1974 to assess Legionella risk in their rental properties every 2 years.' },
  { id:3, q:'What does an Inventory report include?',           a:'Our inventory reports cover the full condition and contents of the property at check-in and check-out, with timestamped photographs of every room.' },
  { id:4, q:'How much do your services cost?',                  a:'Our pricing is tailored to each property. Fill in our quick quote form and we\'ll get back to you within 2 hours with a competitive price!' },
  { id:5, q:'What areas do you cover?',                         a:'We cover all of London and surrounding counties, and have a national network for properties across the UK.' },
  { id:6, q:'What is a SAP EPC for new builds?',               a:'A SAP EPC uses the Standard Assessment Procedure and is required for all newly built and converted residential properties under Part L of the Building Regulations.' },
  { id:7, q:'Can MBPSS help with HMO licensing?',              a:'Absolutely. We help landlords with mandatory, additional and selective HMO licence applications and ensure full compliance with local authority requirements.' },
  { id:8, q:'What is eviction support?',                        a:'We prepare Section 8 and Section 21 notices, advise on the correct grounds for eviction, and provide documentation to support possession proceedings.' },
  { id:9, q:'How do I book a service?',                         a:'Simply click "Request a Quote" on our website, fill in your details and we\'ll be in touch within 2 hours. You can also call us on +44 7540 387542.' },
  { id:10,q:'How long does PAT Testing take?',                  a:'PAT testing typically takes 1-3 hours depending on the number of appliances. We test, label and certificate all items on the day.' },
];

const WELCOME = { id:'w', type:'bot', text:'👋 Hi! I\'m the MBPSS virtual assistant. How can I help you today? Select a question below or type your own.' };

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const bottomRef               = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages, open, typing]);

  const addMsg = (type, text, delay=0) => {
    if (delay) {
      setTyping(true);
      setTimeout(() => {
        setMessages(m => [...m, { id:Date.now(), type, text }]);
        setTyping(false);
      }, delay);
    } else {
      setMessages(m => [...m, { id:Date.now(), type, text }]);
    }
  };

  const handleFaq = faq => {
    setShowFaqs(false);
    addMsg('user', faq.q);
    addMsg('bot', faq.a, 800);
    setTimeout(() => {
      addMsg('bot', 'Is there anything else I can help you with? You can ask another question or contact us directly.', 1400);
      setTimeout(() => setShowFaqs(true), 1600);
    }, 900);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setShowFaqs(false);
    addMsg('user', text);

    // Match against FAQs
    const match = FAQS.find(f =>
      f.q.toLowerCase().split(' ').filter(w=>w.length>3).some(w => text.toLowerCase().includes(w))
    );

    if (match) {
      addMsg('bot', match.a, 900);
      setTimeout(() => { addMsg('bot','Can I help you with anything else?', 1500); setShowFaqs(true); }, 1000);
    } else {
      addMsg('bot', "I'm not sure about that specific question, but our team is ready to help! You can call us on +44 7540 387542 or send us a message through our Contact page.", 900);
      setTimeout(() => setShowFaqs(true), 1000);
    }
  };

  const reset = () => { setMessages([WELCOME]); setShowFaqs(true); setInput(''); };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chat-fab ${open?'chat-fab--open':''}`}
        onClick={() => setOpen(o=>!o)}
        aria-label="Open chat"
      >
        {open ? <X size={22}/> : <MessageCircle size={22}/>}
        {!open && <span className="chat-fab-label">Have a question?</span>}
      </button>

      {/* Chat Panel */}
      <div className={`chat-panel ${open?'chat-panel--open':''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-avatar">M</div>
          <div className="chat-header-info">
            <strong>MBPSS Assistant</strong>
            <span>
              <span className="online-dot"/>Online — typically replies instantly
            </span>
          </div>
          <div className="chat-header-actions">
            <button onClick={reset} title="Reset chat"><RotateCcw size={15}/></button>
            <button onClick={()=>setOpen(false)}><X size={16}/></button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg chat-msg--${msg.type}`}>
              {msg.type==='bot' && <div className="msg-avatar">M</div>}
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg chat-msg--bot">
              <div className="msg-avatar">M</div>
              <div className="msg-bubble typing-indicator">
                <span/><span/><span/>
              </div>
            </div>
          )}

          {/* FAQ Quick Replies */}
          {showFaqs && !typing && (
            <div className="chat-faqs">
              <p className="faq-hint">Common questions:</p>
              <div className="faq-list">
                {FAQS.map(f => (
                  <button key={f.id} className="faq-chip" onClick={()=>handleFaq(f)}>
                    <ChevronRight size={12}/> {f.q}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div className="chat-input-row">
          <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&handleSend()}
            placeholder="Type your question..."
            className="chat-input"
          />
          <button className="chat-send" onClick={handleSend} disabled={!input.trim()}>
            <Send size={16}/>
          </button>
        </div>
        <div className="chat-footer">Powered by <strong>MBPSS</strong> · <a href="/contact">Contact Us</a></div>
      </div>
    </>
  );
}
