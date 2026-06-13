"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function KitForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (site.kitFormId) {
    return (
      <form
        action={`https://app.kit.com/forms/${site.kitFormId}/subscriptions`}
        method="post"
        className={compact ? "flex w-full max-w-md gap-2" : "flex w-full max-w-md flex-col gap-3 sm:flex-row"}
      >
        <input
          type="email"
          name="email_address"
          required
          placeholder="Your email"
          aria-label="Email address"
          className="flex-1"
        />
        <button type="submit" className="btn-primary whitespace-nowrap">
          Get the weekly steps
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className={compact ? "flex w-full max-w-md gap-2" : "flex w-full max-w-md flex-col gap-3 sm:flex-row"}
    >
      {done ? (
        <p className="font-semibold text-accent">
          You are on the list. Watch your inbox.
        </p>
      ) : (
        <>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            aria-label="Email address"
            className="flex-1"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            Get the weekly steps
          </button>
        </>
      )}
    </form>
  );
}
