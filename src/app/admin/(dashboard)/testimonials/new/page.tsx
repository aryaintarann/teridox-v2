"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useFormStatus } from "react-dom";
import { createTestimonial } from "@/app/admin/actions";

const field =
  "w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-foreground text-background px-6 py-2 rounded-sm font-medium hover:bg-foreground/90 disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save Testimonial"}
    </button>
  );
}

export default function NewTestimonial() {
  return (
    <div className="max-w-2xl pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/testimonials"
          aria-label="Back to testimonials"
          className="p-2 hover:bg-surface-soft rounded-sm text-muted-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">New Testimonial</h1>
      </div>

      <div className="bg-surface-card border border-border p-6 rounded-sm shadow-sm">
        <form action={createTestimonial} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium block">Client Name</label>
              <input id="name" name="name" required maxLength={100} className={field} />
            </div>
            <div className="space-y-2">
              <label htmlFor="position" className="text-sm font-medium block">Position / Company (Optional)</label>
              <input id="position" name="position" maxLength={100} className={field} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="quote" className="text-sm font-medium block">Quote</label>
            <textarea id="quote" name="quote" required maxLength={2000} rows={5} className={`${field} resize-y`} />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium block">Status</label>
            <select id="status" name="status" className={field}>
              <option value="active">Active (shown on the home page)</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
