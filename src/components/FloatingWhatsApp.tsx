'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Headphones,
  FileText,
  MessageSquare,
  ChevronRight,
  Paperclip,
  Send,
  Minus,
  X,
  CheckCheck,
  Zap,
} from 'lucide-react';
import { createWhatsAppLink } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/SocialIcons';

interface FloatingWhatsAppProps {
  whatsapp?: string;
  djName?: string;
}

type ViewState = 'BUTTON' | 'MINIMIZED' | 'EXPANDED';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionMenu?: boolean;
  eventPills?: boolean;
  datePicker?: boolean;
  packageLinks?: boolean;
  whatsappLink?: string;
}

const EVENT_PILLS = [
  'Wedding',
  'Reception',
  'Party',
  'Corporate',
  'Sangeet',
  'Birthday',
  'Festival',
];

export default function FloatingWhatsApp({
  whatsapp = '+91 6372174006',
  djName = 'DJ Mantu',
}: FloatingWhatsAppProps) {
  const [viewState, setViewState] = useState<ViewState>('BUTTON');
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activePill, setActivePill] = useState('Wedding');
  const [selectedDate, setSelectedDate] = useState('');
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const initialTime = '10:24 AM';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "Hi there! 👋\nI'm your DJ assistant.\n\nHow can I help you today?",
      time: initialTime,
      actionMenu: true,
    },
  ]);

  const msgCounterRef = useRef(10);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (viewState === 'EXPANDED') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = setTimeout(() => chatInputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, viewState]);

  const openExpandedChat = () => {
    setViewState('EXPANDED');
    setHasUnread(false);
  };

  // Append user message and simulate natural bot response
  const handleUserSend = (text: string) => {
    if (!text.trim()) return;

    msgCounterRef.current += 1;
    const userMsg: ChatMessage = {
      id: `user-${msgCounterRef.current}`,
      sender: 'user',
      text: text.trim(),
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Rule-based assistant response logic
    setTimeout(() => {
      msgCounterRef.current += 1;
      const lower = text.toLowerCase();
      let botResponse: ChatMessage;

      if (lower.includes('wedding') || lower.includes('reception') || lower.includes('party') || lower.includes('corporate') || lower.includes('event')) {
        const detectedType =
          EVENT_PILLS.find((p) => lower.includes(p.toLowerCase())) || 'wedding';
        setActivePill(detectedType);

        botResponse = {
          id: `bot-${msgCounterRef.current}`,
          sender: 'bot',
          text: `Amazing! 🎉\nI'd be happy to help with your ${detectedType}.\n\nPlease share a few details so I can check availability and send you the best package:`,
          time: formatTime(),
          eventPills: true,
          datePicker: true,
        };
      } else if (lower.includes('availability') || lower.includes('date') || lower.includes('free')) {
        botResponse = {
          id: `bot-${msgCounterRef.current}`,
          sender: 'bot',
          text: 'Great! Let me check live date availability on our VIP booking calendar. Please select your target event date:',
          time: formatTime(),
          datePicker: true,
        };
      } else if (lower.includes('quote') || lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
        botResponse = {
          id: `bot-${msgCounterRef.current}`,
          sender: 'bot',
          text: `We customize every concert sound and intelligent lighting setup to match your exact venue and celebration scale.\n\nPlease contact us directly on WhatsApp or call us for complete package details and custom quotes!`,
          time: formatTime(),
          whatsappLink: createWhatsAppLink(
            whatsapp,
            `Hello ${djName}, I would like full package details and pricing for an event. Here are my preliminary details: ${text}`
          ),
        };
      } else if (lower.includes('package') || lower.includes('sound') || lower.includes('light')) {
        botResponse = {
          id: `bot-${msgCounterRef.current}`,
          sender: 'bot',
          text: `We offer curated concert setups including touring-grade line arrays, Sharpy moving beam lights, dry-ice fog entries, and wireless microphones. Here are our main event tiers:`,
          time: formatTime(),
          packageLinks: true,
        };
      } else {
        botResponse = {
          id: `bot-${msgCounterRef.current}`,
          sender: 'bot',
          text: `Got it! I've noted that down. Would you like to connect directly with ${djName} on WhatsApp for an immediate answer?`,
          time: formatTime(),
          whatsappLink: createWhatsAppLink(
            whatsapp,
            `Hello ${djName}, I was chatting with your assistant on your website regarding: "${text}"`
          ),
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 850);
  };

  // Action Menu Handlers
  const handleActionClick = (action: string) => {
    if (action === 'AVAILABILITY') {
      handleUserSend('Check DJ Availability');
    } else if (action === 'QUOTE') {
      handleUserSend('I would like to get a quote for my event');
    } else if (action === 'PACKAGES') {
      handleUserSend('Can you show me your DJ packages?');
    } else if (action === 'TALK') {
      const link = createWhatsAppLink(
        whatsapp,
        `Hello ${djName}, I am on your website and would like to talk directly regarding an upcoming event.`
      );
      window.open(link, '_blank');
    }
  };

  // Quick event pill click
  const handlePillClick = (pill: string) => {
    setActivePill(pill);
    handleUserSend(`I want a DJ for my ${pill.toLowerCase()}`);
  };

  // Inline date availability check using cached backend API
  const handleCheckDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    setCheckLoading(true);
    setCheckResult(null);

    try {
      const res = await fetch(`/api/availability/check?date=${encodeURIComponent(selectedDate)}`);
      const data = await res.json();

      setCheckLoading(false);
      if (data.available) {
        setCheckResult(`🎉 Great news! ${djName} is open on ${selectedDate}.`);
        // Append bot confirmation message
        setTimeout(() => {
          msgCounterRef.current += 1;
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-avail-${msgCounterRef.current}`,
              sender: 'bot',
              text: `✅ ${selectedDate} is 100% AVAILABLE!\n\nDue to our strict single-event per day policy, premium dates fill quickly. Would you like to lock it in directly?`,
              time: formatTime(),
              whatsappLink: createWhatsAppLink(
                whatsapp,
                `Hello ${djName}, I checked your website and saw that ${selectedDate} is available! I'd like to reserve this date for my event.`
              ),
            },
          ]);
        }, 300);
      } else {
        setCheckResult(`⚠️ ${djName} is booked/blocked on ${selectedDate}.`);
      }
    } catch {
      setCheckLoading(false);
      setCheckResult('Unable to verify date right now. Please message on WhatsApp directly.');
    }
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
      {/* =========================================================================
          VIEW 1: EXPANDED FULL CHATBOT WINDOW (Matching Reference Image)
          ========================================================================= */}
      {viewState === 'EXPANDED' && (
        <>
          {/* Mobile backdrop to dismiss when tapping outside on small screens */}
          <div
            onClick={() => setViewState('BUTTON')}
            className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto -z-10 animate-in fade-in duration-150"
            aria-hidden="true"
          />

          <div className="pointer-events-auto mb-2 sm:mb-3 w-[calc(100vw-2rem)] sm:w-[390px] h-130 sm:h-[620px] max-h-[calc(100dvh-5.5rem)] rounded-3xl sm:rounded-[28px] bg-[#0b0e14] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(139,92,246,0.18)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-250">
            {/* Header Bar */}
            <div className="relative bg-gradient-to-r from-[#121622] via-[#161a29] to-[#121622] px-4 py-3.5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {/* DJ Avatar with glowing electric purple halo */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-400 shadow-[0_0_18px_rgba(168,85,247,0.5)]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 relative">
                      <Image
                        src="/images/dj-avatar.jpg"
                        alt={djName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                  {/* Online Indicator Badge */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#121622] rounded-full shadow-[0_0_8px_#34d399]" />
                </div>

                {/* DJ Info */}
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-sm text-white tracking-wide font-heading">
                      {djName}
                    </h3>
                    {/* Verified Green Badge */}
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-black">
                      ✓
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 mt-0.5">
                    <span>Online</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 line-clamp-1 leading-tight mt-0.5">
                    Professional DJ for Weddings, Parties & Special Events
                  </p>
                </div>
              </div>

              {/* Header Control Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewState('MINIMIZED')}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors touch-manipulation cursor-pointer"
                  title="Minimize chat"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewState('BUTTON')}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors touch-manipulation cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

          {/* Chat Messages Canvas */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 text-left custom-scrollbar bg-gradient-to-b from-[#0b0e14] via-[#0e111a] to-[#0b0e14] relative">
            {/* Subtle background stage glow */}
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-600/10 blur-3xl -z-10 rounded-full" />

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-end gap-2 max-w-[88%]">
                  {/* Mini DJ Avatar for Bot */}
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-purple-500/40 mb-1">
                      <Image
                        src="/images/dj-avatar.jpg"
                        alt="Bot"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`p-3 text-xs sm:text-[13px] leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#005c4b] text-white rounded-2xl rounded-tr-sm'
                        : 'bg-[#181c26] text-zinc-200 border border-white/[0.07] rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Timestamp & double checks */}
                    <div
                      className={`flex items-center gap-1 justify-end text-[9px] mt-1.5 ${
                        msg.sender === 'user' ? 'text-emerald-200/80' : 'text-zinc-400'
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.sender === 'user' && (
                        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* 1. Interactive Action Cards (Check Availability, Get Quote, View Packages, Talk to DJ) */}
                {msg.actionMenu && (
                  <div className="w-full mt-3 pl-8 pr-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleActionClick('AVAILABILITY')}
                      className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#131722] hover:bg-purple-950/40 border border-white/[0.08] hover:border-purple-500/40 transition-all text-left group cursor-pointer shadow-sm touch-manipulation active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                            Check Availability
                          </p>
                          <p className="text-[10px] text-zinc-400">See if your date is free</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleActionClick('QUOTE')}
                      className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#131722] hover:bg-purple-950/40 border border-white/[0.08] hover:border-purple-500/40 transition-all text-left group cursor-pointer shadow-sm touch-manipulation active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                            Get a Quote
                          </p>
                          <p className="text-[10px] text-zinc-400">Tell us about your event</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleActionClick('PACKAGES')}
                      className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#131722] hover:bg-purple-950/40 border border-white/[0.08] hover:border-purple-500/40 transition-all text-left group cursor-pointer shadow-sm touch-manipulation active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                            View Packages
                          </p>
                          <p className="text-[10px] text-zinc-400">Explore our DJ packages</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleActionClick('TALK')}
                      className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#131722] hover:bg-emerald-950/40 border border-white/[0.08] hover:border-emerald-500/40 transition-all text-left group cursor-pointer shadow-sm touch-manipulation active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                            Talk to DJ
                          </p>
                          <p className="text-[10px] text-zinc-400">Chat directly on WhatsApp</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                )}

                {/* 2. Interactive Date Picker inside chat */}
                {msg.datePicker && (
                  <div className="w-full mt-2.5 pl-8 pr-1">
                    <form
                      onSubmit={handleCheckDate}
                      className="p-3 rounded-2xl bg-[#141824] border border-purple-500/30 space-y-2 text-xs"
                    >
                      <label className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                        Select Target Event Date:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="flex-1 bg-black/40 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400"
                        />
                        <button
                          type="submit"
                          disabled={checkLoading || !selectedDate}
                          className="px-3 py-1.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs shrink-0 cursor-pointer"
                        >
                          {checkLoading ? 'Checking...' : 'Check'}
                        </button>
                      </div>
                      {checkResult && (
                        <p className="text-[11px] font-semibold text-purple-200 mt-1">
                          {checkResult}
                        </p>
                      )}
                    </form>
                  </div>
                )}

                {/* 3. WhatsApp Direct CTA button inside message */}
                {msg.whatsappLink && (
                  <div className="w-full mt-2 pl-8 pr-1">
                    <a
                      href={msg.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 pl-1">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-purple-500/40 mb-1">
                  <Image
                    src="/images/dj-avatar.jpg"
                    alt="Bot typing"
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#181c26] border border-white/[0.07] px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Choice Category Pills Carousel */}
          <div className="px-3 pt-2 pb-1 bg-[#0e111a] border-t border-white/[0.05] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {EVENT_PILLS.map((pill) => {
              const isActive = activePill.toLowerCase() === pill.toLowerCase();
              return (
                <button
                  type="button"
                  key={pill}
                  onClick={() => handlePillClick(pill)}
                  className={`text-[11px] px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer font-medium shrink-0 touch-manipulation active:scale-95 ${
                    isActive
                      ? 'bg-[#7c3aed] text-white shadow-[0_0_12px_rgba(124,58,237,0.5)] font-bold'
                      : 'bg-[#1c2130] text-zinc-300 hover:text-white hover:bg-[#252b3e] border border-white/5'
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Chat Message Input Bar */}
          <div className="p-3 bg-[#0c0f17] border-t border-white/[0.08]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserSend(inputMessage);
              }}
              className="relative flex items-center gap-2"
            >
              {/* Attachment / Paperclip button */}
              <button
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="text-zinc-400 hover:text-purple-300 p-1.5 transition-colors cursor-pointer"
                title="Quick options"
                aria-label="Quick options"
              >
                <Paperclip className="w-4 h-4 rotate-45" />
              </button>

              {/* Attachment Quick Menu */}
              {showAttachmentMenu && (
                <div className="absolute bottom-12 left-0 w-52 rounded-2xl bg-[#161a26] border border-white/15 p-2 shadow-2xl space-y-1 text-xs z-20 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAttachmentMenu(false);
                      handleUserSend('Send DJ Brochure & Equipment Spec sheet');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-950/50 text-zinc-200 hover:text-purple-300 transition-colors"
                  >
                    📄 Request Event Brochure
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAttachmentMenu(false);
                      handleUserSend('I want to check sound & lighting specs');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-950/50 text-zinc-200 hover:text-purple-300 transition-colors"
                  >
                    🔊 Equipment Specifications
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAttachmentMenu(false);
                      handleUserSend('Can you send performance videos & photos?');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-950/50 text-zinc-200 hover:text-purple-300 transition-colors"
                  >
                    🎥 Performance Videos & Photos
                  </button>
                </div>
              )}

              {/* Text Input */}
              <input
                ref={chatInputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#161a25] border border-white/10 rounded-full px-4 py-2 text-base sm:text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
              />

              {/* Purple Gradient Send Button */}
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 fill-white" />
              </button>
            </form>

            {/* Chat Footer Note */}
            <div className="pt-2 flex items-center justify-center gap-1 text-[10px] text-zinc-400">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Powered by WhatsApp</span>
              <span className="text-zinc-600">•</span>
              <span>Fast & Secure</span>
            </div>
          </div>
        </div>
      </>
      )}

      {/* =========================================================================
          VIEW 2: MINIMIZED VIEW (When Collapsed - Teaser Card in Reference Image)
          ========================================================================= */}
      {viewState === 'MINIMIZED' && (
        <div className="pointer-events-auto mb-3 w-76 sm:w-80 rounded-2xl bg-[#0d1017]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(139,92,246,0.15)] backdrop-blur-2xl p-4 text-left animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-purple-500 to-indigo-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                  <Image
                    src="/images/dj-avatar.jpg"
                    alt={djName}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-xs text-white">{djName}</h4>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-bold text-black">
                    ✓
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">
                  <span className="text-emerald-400 font-semibold">Online</span> • Usually replies fast
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setViewState('BUTTON')}
              className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors touch-manipulation cursor-pointer"
              aria-label="Close teaser"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Headline Body */}
          <div className="py-3">
            <p className="text-xs font-semibold text-zinc-100 leading-relaxed">
              Need a DJ for your event?
              <br />
              <span className="text-purple-300">Let&apos;s make it unforgettable! 🎧</span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={openExpandedChat}
            className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(139,92,246,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
            <span>Chat on WhatsApp</span>
          </button>

          <p className="text-[10px] text-zinc-400 text-center mt-2 font-medium">
            We typically reply within minutes.
          </p>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: FLOATING BUTTON (On all pages - Matching Reference Image)
          ========================================================================= */}
      <div className="pointer-events-auto flex flex-col items-center gap-1.5">
        {/* Main Floating Trigger Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (viewState === 'EXPANDED') {
              setViewState('BUTTON');
            } else {
              openExpandedChat();
            }
          }}
          aria-label="Open Chat with DJ"
          className="group relative w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.45),0_0_25px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.65),0_0_35px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer touch-manipulation"
        >
          {viewState === 'EXPANDED' ? (
            <div className="pointer-events-none w-full h-full rounded-full bg-zinc-900 border border-purple-500/40 flex items-center justify-center text-white shadow-inner">
              <X className="w-6 h-6 text-purple-400 group-hover:rotate-90 transition-transform duration-200" />
            </div>
          ) : (
            <div className="pointer-events-none relative w-full h-full">
              {/* WhatsApp Green Gradient Circle */}
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] flex items-center justify-center shadow-inner">
                <WhatsAppIcon className="w-8 h-8 text-white drop-shadow-md" />
              </div>

              {/* Notification Badge '1' */}
              {hasUnread && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 border-2 border-[#08080c] flex items-center justify-center text-[11px] font-black text-white shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse">
                  1
                </div>
              )}
            </div>
          )}
        </button>

        {/* Pill Label: 'Chat with DJ' */}
        {viewState === 'BUTTON' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openExpandedChat();
            }}
            className="px-3.5 py-1 rounded-full bg-[#121620]/95 hover:bg-[#181e2c] border border-white/10 text-[11px] font-bold text-white tracking-wide shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
          >
            Chat with DJ
          </button>
        )}
      </div>
    </div>
  );
}
