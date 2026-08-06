"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { submitContactForm } from "@/app/contact/actions";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error || "An error occurred");
    }
  };

  return (
    <FadeIn delay={0.1}>
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
      <h1 className="text-display-xl font-bold mb-4">Contact Us</h1>
      <p className="text-body-md text-muted-foreground mb-12 max-w-2xl">
        Ready to start your next project or looking for a technical partner? Reach out to us. We typically respond within 24 hours.
      </p>
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Contact Form */}
        <div className="md:w-1/2">
          {status === "success" && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-sm mb-6 font-medium">
              Thank you! Your message has been sent successfully. We will get back to you soon.
            </div>
          )}
          
          {status === "error" && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-sm mb-6 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold block">
                Full name <span className="text-destructive">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                id="name" 
                className="w-full bg-surface-soft border border-border rounded-sm px-3 py-2 text-body-md focus:bg-background focus:border-foreground outline-none transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold block">
                Work email <span className="text-destructive">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                id="email" 
                className="w-full bg-surface-soft border border-border rounded-sm px-3 py-2 text-body-md focus:bg-background focus:border-foreground outline-none transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="interest" className="text-sm font-bold block">
                Service of interest
              </label>
              <select 
                name="interest"
                id="interest" 
                className="w-full bg-surface-soft border border-border rounded-sm px-3 py-2 text-body-md focus:bg-background focus:border-foreground outline-none transition-colors"
              >
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App Development</option>
                <option value="saas">SaaS Solutions</option>
                <option value="other">Other / General Inquiry</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold block">
                How can we help? <span className="text-destructive">*</span>
              </label>
              <textarea 
                name="message"
                id="message" 
                rows={5}
                className="w-full bg-surface-soft border border-border rounded-sm px-3 py-3 text-body-md focus:bg-background focus:border-foreground outline-none transition-colors resize-y"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === "loading"}
              className="bg-primary text-primary-foreground font-medium rounded-sm px-6 py-2 hover:bg-ink-deep transition-colors w-full sm:w-auto disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
        
        {/* Contact Info */}
        <div className="md:w-1/2 space-y-12">
          <div>
            <h3 className="text-heading-md font-bold mb-4">Direct Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-6 text-center">@</span>
                <a href="mailto:hello@teridox.com" className="text-body-md hover:underline font-medium">hello@teridox.com</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-6 text-center">WA</span>
                <a href="https://wa.me/628000000000" className="text-body-md hover:underline font-medium">+62 800 0000 000</a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-heading-md font-bold mb-4">Social</h3>
            <div className="space-y-2">
              <div className="flex gap-4">
                <span className="text-foreground shrink-0">[-]</span>
                <a href="#" className="hover:underline">LinkedIn</a>
              </div>
              <div className="flex gap-4">
                <span className="text-foreground shrink-0">[-]</span>
                <a href="#" className="hover:underline">Instagram</a>
              </div>
              <div className="flex gap-4">
                <span className="text-foreground shrink-0">[-]</span>
                <a href="#" className="hover:underline">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </FadeIn>
  );
}
