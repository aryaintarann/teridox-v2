import React from "react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
      <h1 className="text-display-xl font-bold mb-4">Contact Us</h1>
      <p className="text-body-md text-muted-foreground mb-12 max-w-2xl">
        Ready to start your next project or looking for a technical partner? Reach out to us. We typically respond within 24 hours.
      </p>
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Contact Form */}
        <div className="md:w-1/2">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold block">
                Full name <span className="text-destructive">*</span>
              </label>
              <input 
                type="text" 
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
                id="message" 
                rows={5}
                className="w-full bg-surface-soft border border-border rounded-sm px-3 py-3 text-body-md focus:bg-background focus:border-foreground outline-none transition-colors resize-y"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="bg-primary text-primary-foreground font-medium rounded-sm px-6 py-2 hover:bg-ink-deep transition-colors w-full sm:w-auto"
            >
              Send message
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
  );
}
