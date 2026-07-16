"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactDirect({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    // компенсируем ширину скроллбара, чтобы страница не «прыгала»
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${sw}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // статическая сборка без сервера: открываем почтовый клиент
    if (process.env.NEXT_PUBLIC_NO_API === "1") {
      const body = `Обратный e-mail: ${form.get("email")}\n\n${form.get("message")}`;
      window.location.href = `mailto:priem@mahnach.ru?subject=${encodeURIComponent(
        "Обращение с сайта",
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          message: form.get("message"),
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  function close() {
    setOpen(false);
    setStatus("idle");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          compact
            ? "rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue"
            : "mt-5 block w-full max-w-lg rounded-2xl bg-navy px-6 py-5 text-center text-lg font-semibold text-white transition hover:bg-blue"
        }
      >
        {compact ? "Обратиться" : "Обратиться напрямую"}
      </button>

      {open && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex justify-center overflow-y-auto bg-ink/35 p-4 pt-[12vh]"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Письмо депутату"
            className="modal-panel h-fit w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_24px_80px_-24px_rgba(12,21,38,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "sent" ? (
              <div className="text-center">
                <p className="text-2xl font-semibold">Письмо отправлено</p>
                <p className="mt-3 text-ink/60">
                  Спасибо за обращение — ответ придёт на указанный e-mail.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-8 rounded-full bg-navy px-7 py-3 font-semibold text-white transition hover:bg-blue"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold">Письмо депутату</h3>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Закрыть"
                    className="rounded-full p-1 text-ink/40 transition hover:text-ink"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path
                        d="M5 5l12 12M17 5L5 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-ink/70">
                      Ваш e-mail для ответа
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoFocus
                      placeholder="ivanov@mail.ru"
                      className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 outline-none transition focus:border-navy"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-ink/70">
                      Сообщение
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Опишите вопрос или предложение"
                      className="mt-1.5 w-full resize-none rounded-xl border border-line px-4 py-3 outline-none transition focus:border-navy"
                    />
                  </label>
                  {status === "error" && (
                    <p className="text-sm text-flagred">
                      Не получилось отправить. Попробуйте ещё раз.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-xl bg-navy px-6 py-3.5 font-semibold text-white transition hover:bg-blue disabled:opacity-60"
                  >
                    {status === "sending" ? "Отправка…" : "Отправить"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
