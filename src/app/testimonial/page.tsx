"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { submitTestimonial } from "@/app/testimonial/actions";

export default function TestimonialPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const result = await submitTestimonial(formData);
    
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
      <div className="container mx-auto px-4 md:px-6 py-24 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Share Your Experience</h1>
          <p className="text-muted-foreground">
            Thank you for working with Teridox! We'd love to hear about your experience. Your feedback helps us improve and helps others understand what it's like to partner with us.
          </p>
        </div>
        
        <div className="bg-surface-card border border-border p-6 md:p-10 rounded-sm shadow-sm">
          {status === "success" && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-sm mb-8 font-medium text-center">
              Thank you for your testimonial! Your submission has been received and will be reviewed shortly.
            </div>
          )}
          
          {status === "error" && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-sm mb-8 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold block">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                id="name" 
                className="w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:border-foreground outline-none transition-colors"
                placeholder="e.g. Jane Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="position" className="text-sm font-bold block">
                Position & Company (Optional)
              </label>
              <input 
                type="text" 
                name="position"
                id="position" 
                className="w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:border-foreground outline-none transition-colors"
                placeholder="e.g. CEO at TechFlow"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="quote" className="text-sm font-bold block">
                Your Testimonial <span className="text-destructive">*</span>
              </label>
              <textarea 
                name="quote"
                id="quote" 
                rows={5}
                className="w-full bg-background border border-border rounded-sm px-3 py-3 text-sm focus:border-foreground outline-none transition-colors resize-y"
                placeholder="How did we help your business? What was your favorite part of working with us?"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-full bg-foreground text-background font-medium rounded-sm px-6 py-3 hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : status === "success" ? "Submitted" : "Submit Testimonial"}
            </button>
          </form>
        </div>
      </div>
    </FadeIn>
  );
}
