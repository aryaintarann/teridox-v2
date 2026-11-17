import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

const SOCIALS = [
  ["LinkedIn", "linkedin"],
  ["Instagram", "instagram"],
  ["GitHub", "github"],
] as const;

// Only http(s) links are used, so a bad value saved in the admin can never become a javascript: href.
const web = (v: unknown) => (typeof v === "string" && /^https?:\/\//i.test(v.trim()) ? v.trim() : null);

/** The single site_settings row, read once per request. Every public contact detail comes from here. */
export const getSiteSettings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  return {
    email: (data?.email as string | null)?.trim() || null,
    whatsapp: (data?.whatsapp as string | null)?.trim() || null,
    social: SOCIALS.flatMap(([name, key]) => {
      const url = web(data?.[key]);
      return url ? [{ name, url }] : [];
    }),
  };
});

/** Organization fields for JSON-LD, built only from what is saved. Nothing is invented. */
export async function getOrgLd() {
  const s = await getSiteSettings();
  return {
    ...(s.email && { email: s.email }),
    ...(s.whatsapp && {
      contactPoint: { "@type": "ContactPoint", telephone: s.whatsapp, contactType: "customer support" },
    }),
    ...(s.social.length > 0 && { sameAs: s.social.map((l) => l.url) }),
  };
}
