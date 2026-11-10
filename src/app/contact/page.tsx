import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/shared/page-intro";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Contact" };

export default async function Contact(props: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await props.searchParams;
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();

  const email = settings?.email || 'hello@teridox.com';
  const social = [
    ["LinkedIn", settings?.linkedin],
    ["Instagram", settings?.instagram],
    ["GitHub", settings?.github],
  ].filter(([, url]) => url);

  return (
    <>
      <PageIntro title="Let's talk about your project.">
        Ready to start your next project or looking for a technical partner? Reach out to us. We
        typically respond within 24 hours.
      </PageIntro>

      <section aria-label="Contact options" className="wrap flex flex-wrap items-start gap-6 pb-[104px]">
        <Reveal className="card min-w-0 flex-[1.6_1_460px] p-[clamp(24px,3.6vw,48px)]">
          <ContactForm defaultInterest={service} />
        </Reveal>

        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-6">
          <Reveal delay={0.15} className="card-accent flex flex-col gap-5 p-8">
            <h2 className="text-[15px] font-bold">Direct contact</h2>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Email</span>
              <a href={`mailto:${email}`} className="break-words text-[22px] font-extrabold tracking-[-0.02em] hover:underline">
                {email}
              </a>
            </div>
            {/* Shown only when a real number is saved in site settings. */}
            {settings?.whatsapp && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">WhatsApp</span>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[22px] font-extrabold tracking-[-0.02em] hover:underline"
                >
                  {settings.whatsapp}
                </a>
              </div>
            )}
          </Reveal>

          {social.length > 0 && (
            <Reveal delay={0.25} className="card flex flex-col gap-4 p-8">
              <h2 className="label text-[15px]">Social</h2>
              <ul className="flex flex-col text-lg font-bold">
                {social.map(([name, url], i) => (
                  <li key={name} className={i ? "border-t border-border" : ""}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="block py-3 hover:text-accent">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
