import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Globe, ExternalLink, Send, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/resumeData';
import { soundEngine } from '../../utils/synthesizer';

interface ContactDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDispatchModal: React.FC<ContactDispatchModalProps> = ({ isOpen, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    soundEngine.playExitRoom();
    onClose();
  };

  const handleCopyEmail = () => {
    soundEngine.playClick(1000);
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;
    soundEngine.playSpellCast();
    setSent(true);

    const emailSubject = subject.trim()
      ? subject
      : `Portfolio Inquiry from ${senderName || 'Visitor'}`;
    const emailBody = `${message}\n\n---\nSender: ${senderName || 'Anonymous'}\nEmail: ${senderEmail}`;

    setTimeout(() => {
      window.location.href = `mailto:${PERSONAL_INFO.contact.email}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl border border-[#D4AF37]/50 bg-[#120E09]/95 text-[#E6D5AC] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
        style={{
          boxShadow: '0 0 50px rgba(212,175,55,0.2), inset 0 0 35px rgba(0,0,0,0.85)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#1E1710] via-[#2A2016] to-[#1E1710]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#FDE047]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold block">
                CONTACT HORIZON PLATFORM // CNT.06
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#FFFDF0]">
                Direct Communication Dispatch
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg border border-[#D4AF37]/30 bg-[#1A140E]/80 text-[#C4B087] hover:text-[#FFFDF0] hover:border-[#D4AF37] transition-all cursor-pointer"
            title="Close Dispatch Console (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-[#E6D5AC]">
          {/* Coordinates Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-lg border border-[#D4AF37]/25 bg-[#1A140E]/80 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-[#D4AF37]/15">
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="flex items-center gap-2 text-[#CBD5E1] hover:text-[#FDE047] truncate transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#F5D77F] shrink-0" />
                <span className="truncate">{PERSONAL_INFO.contact.email}</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="ml-2 px-2 py-0.5 rounded bg-[#2A2016] hover:bg-[#3A2D1F] border border-[#D4AF37]/30 text-[10px] text-[#FDE047] shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`tel:${PERSONAL_INFO.contact.phone}`}
              className="flex items-center gap-2 p-2 rounded bg-black/40 border border-[#D4AF37]/15 text-[#CBD5E1] hover:text-[#FDE047] transition-colors truncate"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5D77F] shrink-0" />
              <span>{PERSONAL_INFO.contact.phone}</span>
            </a>

            <div className="flex items-center gap-2 p-2 rounded bg-black/40 border border-[#D4AF37]/15 text-[#CBD5E1] truncate">
              <MapPin className="w-3.5 h-3.5 text-[#F5D77F] shrink-0" />
              <span className="truncate">{PERSONAL_INFO.contact.location}</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded bg-black/40 border border-[#D4AF37]/15">
              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#FDE047] transition-colors truncate"
              >
                <Globe className="w-3.5 h-3.5 text-[#F5D77F] shrink-0" />
                <span>GitHub</span>
              </a>
              <span className="text-[#574932]">|</span>
              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#FDE047] transition-colors truncate"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#F5D77F] shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Form / Sent State */}
          {sent ? (
            <div className="p-8 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-xl text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#FFFDF0]">
                Dispatch Transmitted Successfully
              </h3>
              <p className="text-xs text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
                Your dispatch has been prepared for Ayan Pal at{' '}
                <strong className="text-[#FDE047]">{PERSONAL_INFO.contact.email}</strong>. Your default
                mail client has also been opened to complete delivery.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSent(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#2A2016] hover:bg-[#3A2D1F] border border-[#D4AF37]/40 text-xs text-[#FDE047] font-serif cursor-pointer transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif text-xs text-[#F5D77F] font-semibold mb-1">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Elena Rostova / Engineering VP"
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#D4AF37]/30 text-xs text-[#FFFDF0] placeholder-[#73634B] focus:border-[#FDE047] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-serif text-xs text-[#F5D77F] font-semibold mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#D4AF37]/30 text-xs text-[#FFFDF0] placeholder-[#73634B] focus:border-[#FDE047] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-serif text-xs text-[#F5D77F] font-semibold mb-1">
                  Inquiry Scope / Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Systems Architecture Role / AI Pipeline Consultation"
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#D4AF37]/30 text-xs text-[#FFFDF0] placeholder-[#73634B] focus:border-[#FDE047] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-serif text-xs text-[#F5D77F] font-semibold mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire regarding technical opportunities, architecture consulting, agent orchestration, or enterprise engineering..."
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-[#D4AF37]/30 text-xs text-[#FFFDF0] placeholder-[#73634B] focus:border-[#FDE047] focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#2A1D12] via-[#4A3420] to-[#2A1D12] hover:from-[#3D2B1A] hover:to-[#573F28] border border-[#D4AF37] font-serif text-xs font-bold text-[#FDE047] flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer active:scale-[0.99]"
              >
                <Send className="w-4 h-4 text-[#FDE047]" />
                <span>Transmit Direct Dispatch to Ayan Pal</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Backward-compatible alias for existing imports
export const OwlContactModal = ContactDispatchModal;
export default ContactDispatchModal;
