import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  AtSign,
  BrainCog,
  CalendarDays,
  CheckCircle2,
  Maximize2,
  MessageCircle,
  Minimize2,
  Phone,
  User,
  UserRound,
  X,
} from "lucide-react";

const FacebookGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
  </svg>
);

const LinkedinGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const InstagramGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

import { askfirmService, type ChatHistoryItem } from "@/lib/askfirm.service";

const DEFAULT_FIRM_NAME = "Nurture Next";
const DEFAULT_CHATBOT_NAME = "Nurture Next";
const DEFAULT_CUSTOMER_WEBSITE = "";
const DEFAULT_QUESTION_LIMIT = 5;
const DEFAULT_CLIENT_PORTAL = "https://accumax-client-portal.azurewebsites.net/";

interface FirmSettings {
  chatbotName: string;
  chatbotLogo: string;
  customerName: string;
  customerWebsite: string;
  questionLimit: number;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  calendlyUrl: string;
  clientPortalUrl: string;
}

const normalizeText = (value: unknown, fallback: string): string => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
};

const normalizeLogoUrl = (logo: unknown): string => {
  if (typeof logo !== "string") return "";
  const value = logo.trim();
  if (!value) return "";
  if (value.startsWith("assets/")) return `/${value}`;
  return value;
};

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ALL_QUESTIONS = [
  "What services does your firm offer?",
  "How can I schedule a consultation?",
  "What industries do you specialize in?",
  "How does your pricing work?",
  "What is your experience with tax planning?",
  "How do you handle business accounting?",
  "Can you help with business formation?",
  "What makes your firm different from others?",
  "How do I get started as a new client?",
  "Do you offer virtual or remote services?",
  "What are your office hours?",
  "How do you ensure data security?",
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function linkify(text: string): string {
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/gi;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ContactField({
  label,
  required,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <span className="nn-input-wrap">
        {icon && <span className="nn-input-icon">{icon}</span>}
        {children}
      </span>
    </label>
  );
}

export default function AskfirmChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [contactError, setContactError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [settings, setSettings] = useState<FirmSettings>({
    chatbotName: DEFAULT_CHATBOT_NAME,
    chatbotLogo: "",
    customerName: DEFAULT_FIRM_NAME,
    customerWebsite: DEFAULT_CUSTOMER_WEBSITE,
    questionLimit: DEFAULT_QUESTION_LIMIT,
    facebookUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    calendlyUrl: "",
    clientPortalUrl: DEFAULT_CLIENT_PORTAL,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    askfirmService
      .getWidgetConfig()
      .then((res) => {
        if (cancelled) return;
        const c = res?.configs ?? {};
        const rawLimit = Number(c.askFirmQuestionLimit);
        setSettings((prev) => ({
          chatbotName: normalizeText(c.chatbotName, prev.chatbotName),
          chatbotLogo: normalizeLogoUrl(c.chatbotLogo),
          customerName: normalizeText(c.customerName, prev.customerName),
          customerWebsite: normalizeText(c.customerWebsite, prev.customerWebsite),
          questionLimit: rawLimit > 0 ? rawLimit : prev.questionLimit,
          facebookUrl: normalizeText(c.facebookUrl, ""),
          linkedinUrl: normalizeText(c.linkedinUrl, ""),
          instagramUrl: normalizeText(c.instagramUrl, ""),
          calendlyUrl: normalizeText(c.calendlyUrl, ""),
          clientPortalUrl: normalizeText(c.clientPortalUrl, prev.clientPortalUrl),
        }));
      })
      .catch(() => {
        // keep defaults on failure
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const quickActions = useMemo(() => shuffle(ALL_QUESTIONS).slice(0, 4), []);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, followUps]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const getHistory = useCallback(
    (): ChatHistoryItem[] => messages.map((m) => ({ role: m.role, content: m.content })),
    [messages],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;
      if (questionCount >= settings.questionLimit) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      if (inputRef.current) inputRef.current.style.height = "auto";
      setFollowUps([]);
      setIsTyping(true);
      setQuestionCount((p) => p + 1);

      try {
        const data = await askfirmService.chat({
          message: trimmed,
          conversationHistory: getHistory(),
          customerName: settings.customerName,
          chatbotName: settings.chatbotName,
          customerWebsite: settings.customerWebsite,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: data.response,
            timestamp: new Date(),
          },
        ]);
        if (Array.isArray(data.followUpQuestions) && data.followUpQuestions.length) {
          setFollowUps(data.followUpQuestions.slice(0, 3));
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: "Something went wrong. Please try again.",
            timestamp: new Date(),
            isError: true,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, questionCount, getHistory, settings],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const submitContact = async () => {
    const { firstName, lastName, email, phone } = contactForm;
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setContactError("First name, last name and email are required.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      setContactError("Please enter a valid email address.");
      return;
    }
    setContactError("");
    setContactLoading(true);
    try {
      await askfirmService.saveContact({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        conversationHistory: getHistory(),
      });
      setContactFormSubmitted(true);
    } catch (err) {
      setContactError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  const limitReached = questionCount >= settings.questionLimit;
  const isEmpty = messages.length === 0;

  const Avatar = ({ size }: { size: "sm" | "md" | "lg" }) => {
    const wrapSize = size === "lg" ? "h-14 w-14" : size === "md" ? "h-10 w-10" : "h-8 w-8";
    const iconSize = size === "lg" ? "h-7 w-7" : size === "md" ? "h-5 w-5" : "h-4 w-4";
    const radius = size === "lg" ? "rounded-2xl" : "rounded-xl";
    if (settings.chatbotLogo) {
      return (
        <img
          src={settings.chatbotLogo}
          alt={settings.chatbotName}
          className={`${wrapSize} ${radius} object-cover`}
        />
      );
    }
    return (
      <div className={`flex ${wrapSize} items-center justify-center ${radius} bg-blue-700 text-white`}>
        <BrainCog className={iconSize} />
      </div>
    );
  };

  const hasSocials = !!(settings.facebookUrl || settings.linkedinUrl || settings.instagramUrl);

  const panelClasses = isFullscreen
    ? "fixed inset-0 m-0 h-screen w-screen max-h-none max-w-none rounded-none border-0"
    : "h-[680px] max-h-[calc(100vh-120px)] w-[480px] max-w-[calc(100vw-32px)] rounded-3xl border border-slate-200";

  return (
    <>
      <div
        className="nn-chatbot fixed bottom-6 right-6 z-[2147483000] flex flex-col items-end gap-3"
        data-nn-chatbot
      >
        <div
          role="dialog"
          aria-hidden={!open}
          aria-label={`Chat with ${settings.chatbotName}`}
          className={`flex origin-bottom-right flex-col overflow-hidden bg-white shadow-2xl transition-all duration-300 ease-out ${panelClasses} ${
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-95 opacity-0"
          }`}
        >
          <header className="flex items-center justify-between gap-2 border-b border-slate-100 bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar size="md" />
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="text-[14px] font-semibold leading-snug text-slate-900">
                  {settings.chatbotName}
                </span>
                <span className="text-[11px] font-medium text-emerald-600">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {settings.calendlyUrl && (
                <button
                  type="button"
                  onClick={() => window.open(settings.calendlyUrl, "_blank", "noopener,noreferrer")}
                  className="hidden items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[12px] font-semibold text-blue-700 transition-colors hover:bg-blue-100 sm:inline-flex"
                  aria-label="Book appointment"
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>Book</span>
                </button>
              )}
              {hasSocials && (
                <div className="mr-1 flex items-center gap-0.5">
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[#1877F2] transition-colors hover:bg-[#1877F2]/10"
                    >
                      <FacebookGlyph className="h-4 w-4" />
                    </a>
                  )}
                  {settings.linkedinUrl && (
                    <a
                      href={settings.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/10"
                    >
                      <LinkedinGlyph className="h-4 w-4" />
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[#E1306C] transition-colors hover:bg-[#E1306C]/10"
                    >
                      <InstagramGlyph className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsFullscreen((p) => !p)}
                aria-label={isFullscreen ? "Exit fullscreen" : "Open fullscreen"}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-slate-50">
            {isEmpty ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 shadow-lg shadow-blue-700/20">
                  <Avatar size="lg" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Welcome to {settings.chatbotName}!
                </h2>
                <p className="mt-2 max-w-[280px] text-sm text-slate-600">
                  I'm your digital companion. What can I help you with today?
                </p>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4">
                {messages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  const isLastAssistant =
                    !isUser && index === messages.length - 1 && followUps.length > 0 && !isTyping;
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
                    >
                      {isUser ? (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700">
                          <User className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="shrink-0">
                          <Avatar size="sm" />
                        </div>
                      )}
                      <div
                        className={`flex max-w-[78%] flex-col gap-1 ${
                          isUser ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`nn-msg-bubble max-w-none rounded-2xl px-3.5 py-2 [&_a]:break-words [&_a]:underline [&_a]:underline-offset-2 ${
                            isUser
                              ? "rounded-br-md bg-blue-700 text-white [&_a]:text-white"
                              : msg.isError
                                ? "rounded-bl-md border border-red-200 bg-red-50 text-red-800"
                                : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                          }`}
                          dangerouslySetInnerHTML={{ __html: linkify(msg.content) }}
                        />
                        <span className="px-1 text-[10px] font-medium text-slate-400">
                          {formatTime(msg.timestamp)}
                        </span>

                        {isLastAssistant && (
                          <div className="mt-2 flex flex-col items-start gap-1.5 self-stretch">
                            {followUps.map((q, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => sendMessage(q)}
                                className="max-w-full rounded-2xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-left text-[12px] font-medium text-blue-700 transition-colors hover:bg-blue-100"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex items-end gap-2">
                    <div className="shrink-0">
                      <Avatar size="sm" />
                    </div>
                    <div className="nn-typing-bubble">
                      <span className="nn-typing-dot" />
                      <span className="nn-typing-dot" />
                      <span className="nn-typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} style={{ height: 1 }} />
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white px-4 py-3">
            <div className="mx-auto w-full max-w-3xl">
            {limitReached && !isTyping ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 px-3 py-2.5 text-[13px] text-amber-800">
                  <span className="font-medium">You've reached the free question limit.</span>
                </div>
                <div className="flex flex-col gap-2">
                  {!contactFormSubmitted && (
                    <button
                      type="button"
                      onClick={() => setShowContactForm(true)}
                      className="rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                    >
                      Talk to a Professional
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        settings.clientPortalUrl || DEFAULT_CLIENT_PORTAL,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            ) : (
              <>
                {isEmpty && (
                  <div className="mb-3 flex flex-wrap justify-center gap-1.5">
                    {quickActions.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-center text-[12px] font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                  <textarea
                    ref={inputRef}
                    value={input}
                    rows={1}
                    placeholder="Type message here..."
                    disabled={isTyping}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="max-h-[96px] flex-1 resize-none bg-transparent px-3 py-2 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
            <p className="mt-2 text-center text-[10px] text-slate-400">
              AI responses may be inaccurate. Powered by <strong>AccuMax</strong>.
            </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          aria-label={open ? "Close chat" : "Open chat"}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-xl shadow-blue-700/30 transition-all duration-300 hover:scale-105 hover:bg-blue-800 ${
            open && isFullscreen ? "hidden" : ""
          }`}
        >
          <span
            className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </span>
        </button>
      </div>

      {showContactForm && (
        <div
          className="fixed inset-0 z-[2147483001] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowContactForm(false);
          }}
        >
          <div className="nn-contact-modal w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)] ring-1 ring-slate-200">
            {contactFormSubmitted ? (
              <div className="px-8 py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/40">
                  <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">You're all set!</h3>
                <p className="mx-auto mt-2 max-w-[280px] text-sm leading-relaxed text-slate-600">
                  Thanks for reaching out. A {settings.customerName} advisor will be in touch
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="relative bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900 px-6 pb-5 pt-6 text-white">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/15 ring-1 ring-white/20">
                      {settings.chatbotLogo ? (
                        <img
                          src={settings.chatbotLogo}
                          alt={settings.chatbotName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <BrainCog className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-tight">Talk to a Professional</h3>
                      <p className="mt-0.5 text-[12px] text-blue-100/90">
                        A {settings.customerName} advisor will reach out shortly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-6 py-5">
                  <div className="grid grid-cols-2 gap-3">
                    <ContactField
                      label="First name"
                      required
                      icon={<UserRound className="h-4 w-4" />}
                    >
                      <input
                        type="text"
                        placeholder="Jane"
                        autoComplete="given-name"
                        value={contactForm.firstName}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, firstName: e.target.value }))
                        }
                        className="nn-input"
                      />
                    </ContactField>
                    <ContactField
                      label="Last name"
                      required
                      icon={<UserRound className="h-4 w-4" />}
                    >
                      <input
                        type="text"
                        placeholder="Doe"
                        autoComplete="family-name"
                        value={contactForm.lastName}
                        onChange={(e) =>
                          setContactForm((p) => ({ ...p, lastName: e.target.value }))
                        }
                        className="nn-input"
                      />
                    </ContactField>
                  </div>
                  <ContactField
                    label="Email address"
                    required
                    icon={<AtSign className="h-4 w-4" />}
                  >
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      autoComplete="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="nn-input"
                    />
                  </ContactField>
                  <ContactField label="Phone" icon={<Phone className="h-4 w-4" />}>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="nn-input"
                    />
                  </ContactField>

                  {contactError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                      {contactError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={submitContact}
                    disabled={contactLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {contactLoading ? "Submitting..." : "Submit details"}
                  </button>
                  <p className="text-center text-[11px] text-slate-500">
                    By submitting, you agree to be contacted by {settings.customerName}.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
