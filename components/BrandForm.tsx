"use client";

import { useRef, useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function BrandForm() {
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef<number>(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      company: String(data.get("company") || ""),
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      product: String(data.get("product") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
      elapsed: Date.now() - startedAt.current,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card-raised p-8">
        <p className="font-display text-xl font-semibold text-[var(--ink-strong)]">
          Received. LadyF reads every serious enquiry herself.
        </p>
        <p className="mt-2 text-soft">
          You will hear back within a few working days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" required maxLength={120} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" required maxLength={120} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email">Work email</label>
        <input id="email" name="email" type="email" required maxLength={160} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="product">Product or tool</label>
        <input id="product" name="product" required maxLength={160} />
      </div>

      {/* Trap field: humans never see it, bots fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label htmlFor="message">What do you have in mind?</label>
        <textarea id="message" name="message" rows={5} required maxLength={2000} />
      </div>

      <div className="md:col-span-2">
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send the enquiry"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm font-semibold text-red-600">
            Something went wrong on our side. Please try again in a minute.
          </p>
        )}
      </div>
    </form>
  );
}
