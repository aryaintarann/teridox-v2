"use client";

import React, { useState } from "react";
import { submitContactForm } from "@/app/contact/actions";

const interests = [
  ["web", "Web Development"],
  ["mobile", "Mobile App Development"],
  ["saas", "SaaS Solutions"],
  ["ai", "AI Integration"],
  ["other", "Other / General Inquiry"],
];

export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const result = await submitContactForm(new FormData(e.currentTarget));

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "An error occurred");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.1] tracking-[-0.03em]">
          Thank you! Your message has been sent.
        </h2>
        <p className="text-lg text-muted-foreground">We will get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-quiet">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-mcp-form="true" data-mcp-name="contactUs">
      {status === "error" && (
        <p role="alert" className="rounded-[14px] border border-destructive p-4 font-semibold text-destructive">
          {errorMsg}
        </p>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[15px] font-bold">
            Full name *
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className="field" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[15px] font-bold">
            Work email *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="interest" className="text-[15px] font-bold">
          Service of interest
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue={interests.some(([v]) => v === defaultInterest) ? defaultInterest : "web"}
          className="field"
        >
          {interests.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[15px] font-bold">
          How can we help? *
        </label>
        <textarea id="message" name="message" rows={6} required className="field" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary min-h-14 self-start px-8 text-[17px]"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
