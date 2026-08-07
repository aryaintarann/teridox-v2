import React from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { ContactForm } from "@/components/contact/contact-form";
import { createClient } from "@/lib/supabase/server";

export default async function Contact() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();

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
          <ContactForm />
        </div>
        
        {/* Contact Info */}
        <div className="md:w-1/2 space-y-12">
          <div>
            <h3 className="text-heading-md font-bold mb-4">Direct Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-6 text-center">@</span>
                <a href={`mailto:${settings?.email || 'hello@teridox.com'}`} className="text-body-md hover:underline font-medium">
                  {settings?.email || 'hello@teridox.com'}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground w-6 text-center">WA</span>
                <a href={`https://wa.me/${(settings?.whatsapp || '').replace(/[^0-9]/g, '')}`} className="text-body-md hover:underline font-medium">
                  {settings?.whatsapp || '+62 800 0000 000'}
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-heading-md font-bold mb-4">Social</h3>
            <div className="space-y-2">
              {settings?.linkedin && (
                <div className="flex gap-4">
                  <span className="text-foreground shrink-0">[-]</span>
                  <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                </div>
              )}
              {settings?.instagram && (
                <div className="flex gap-4">
                  <span className="text-foreground shrink-0">[-]</span>
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                </div>
              )}
              {settings?.github && (
                <div className="flex gap-4">
                  <span className="text-foreground shrink-0">[-]</span>
                  <a href={settings.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </FadeIn>
  );
}
