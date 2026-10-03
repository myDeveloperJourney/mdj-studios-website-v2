"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";

type Role = "user" | "assistant";

type Turn = {
  role: Role;
  content: string;
};

type Handoff = {
  name: string;
  email: string;
  message: string;
};

const UNAVAILABLE = "Chat is unavailable right now.";
const RATE_LIMIT = "Too many messages. Try again in a few minutes.";

class ChatErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function transcript(messages: Turn[]) {
  return messages
    .map((turn) => `${turn.role === "user" ? "Visitor" : "Assistant"}: ${turn.content}`)
    .join("\n\n");
}

function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [input, setInput] = useState("");
  const [company, setCompany] = useState("");
  const [messages, setMessages] = useState<Turn[]>([]);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<Handoff>({ name: "", email: "", message: "" });
  const [handoffPending, setHandoffPending] = useState(false);
  const [handoffNotice, setHandoffNotice] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [open, messages, pending, notice]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const nextMessages: Turn[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setNotice(null);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          company,
        }),
      });

      let data: { reply?: unknown; error?: unknown } = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 429) {
        setNotice(RATE_LIMIT);
        return;
      }

      if (!response.ok || typeof data.reply !== "string" || !data.reply.trim()) {
        setNotice(typeof data.error === "string" && data.error ? data.error : UNAVAILABLE);
        return;
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply as string }]);
    } catch {
      setNotice(UNAVAILABLE);
    } finally {
      setPending(false);
    }
  }

  function openHandoff() {
    setHandoff((current) => ({
      ...current,
      message: current.message.trim() ? current.message : transcript(messages),
    }));
    setHandoffNotice(null);
    setHandoffOpen(true);
  }

  async function sendHandoff(event: React.FormEvent) {
    event.preventDefault();
    if (handoffPending) return;
    setHandoffPending(true);
    setHandoffNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: handoff.name,
          email: handoff.email,
          message: handoff.message,
        }),
      });

      let data: { message?: unknown; error?: unknown } = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setHandoffNotice(
          typeof data.error === "string" && data.error
            ? data.error
            : "Could not send that message."
        );
        return;
      }

      setHandoffNotice(
        typeof data.message === "string" && data.message
          ? data.message
          : "Your message has been sent successfully!"
      );
      setHandoff({ name: "", email: "", message: "" });
    } catch {
      setHandoffNotice("Could not send that message.");
    } finally {
      setHandoffPending(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]";

  return (
    <div className="fixed bottom-4 right-4 z-[60] font-sans">
      {open && (
        <section
          role="dialog"
          aria-label="Chat"
          className="mb-3 flex h-[min(32rem,calc(100vh-6rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-xl"
        >
          <header className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2">
            <h2 className="text-sm font-medium">Chat</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            >
              Close
            </button>
          </header>

          {handoffOpen ? (
            <form onSubmit={sendHandoff} className="flex min-h-0 flex-1 flex-col gap-3 p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">
                This sends your name, email, and message through the site contact form.
              </p>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                autoComplete="name"
                value={handoff.name}
                onChange={(event) => setHandoff({ ...handoff, name: event.target.value })}
                className={fieldClass}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                autoComplete="email"
                value={handoff.email}
                onChange={(event) => setHandoff({ ...handoff, email: event.target.value })}
                className={fieldClass}
              />
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Message"
                value={handoff.message}
                onChange={(event) => setHandoff({ ...handoff, message: event.target.value })}
                className={`${fieldClass} min-h-0 flex-1 resize-none`}
              />
              {handoffNotice && (
                <p className="text-xs text-[var(--color-text-secondary)]" role="status">
                  {handoffNotice}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHandoffOpen(false)}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={handoffPending}
                  className="flex-1 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-[#0a0a0a] disabled:opacity-60"
                >
                  {handoffPending ? "Sending..." : "Email Daniel"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
                {messages.map((turn, index) => (
                  <div
                    key={`${turn.role}-${index}`}
                    className={`max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      turn.role === "user"
                        ? "ml-auto bg-[var(--color-primary)] text-[#0a0a0a]"
                        : "mr-auto bg-[var(--color-bg)] text-[var(--color-text)]"
                    }`}
                  >
                    {turn.content}
                  </div>
                ))}
                {pending && (
                  <p className="text-xs text-[var(--color-text-secondary)]">Sending...</p>
                )}
                {notice && (
                  <p className="text-sm text-[var(--color-text-secondary)]" role="status">
                    {notice}
                  </p>
                )}
              </div>

              <form onSubmit={sendMessage} className="border-t border-[var(--color-border)] p-3">
                <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                  <label htmlFor="chat-company">Company</label>
                  <input
                    id="chat-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                </div>
                <label htmlFor="chat-input" className="sr-only">
                  Message
                </label>
                <textarea
                  id="chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  rows={2}
                  placeholder="What would you like to know about Dan or MDJ Studios?"
                  className={`${fieldClass} resize-none`}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={openHandoff}
                    className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  >
                    Email Daniel
                  </button>
                  <button
                    type="submit"
                    disabled={pending || !input.trim()}
                    className="flex-1 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-[#0a0a0a] disabled:opacity-60"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      )}

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="ml-auto block rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[#0a0a0a] shadow-lg hover:bg-[var(--color-primary-hover)]"
      >
        Chat
      </button>
    </div>
  );
}

export default function ChatWidget() {
  return (
    <ChatErrorBoundary>
      <ChatPanel />
    </ChatErrorBoundary>
  );
}
