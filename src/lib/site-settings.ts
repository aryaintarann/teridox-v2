import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

// Every public profile the admin can fill in, in the order the site lists them.
export const SOCIALS = [
  ["LinkedIn", "linkedin"],
  ["Instagram", "instagram"],
  ["GitHub", "github"],
  ["X", "x_url"],
  ["Facebook", "facebook"],
  ["YouTube", "youtube"],
  ["TikTok", "tiktok"],
  ["Dribbble", "dribbble"],
  ["Behance", "behance"],
] as const;

export const ADDRESS_FIELDS = ["street_address", "city", "region", "postal_code", "country"] as const;

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
// Only http(s) links are used, so a bad value saved in the admin can never become a javascript: href.
const web = (v: unknown) => {
  const s = str(v);
  return s && /^https?:\/\//i.test(s) ? s : null;
};

/** The single site_settings row, read once per request. Every public contact detail comes from here. */
export const getSiteSettings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  const row = (data ?? {}) as Record<string, unknown>;
  const [street, city, region, postal, country] = ADDRESS_FIELDS.map((k) => str(row[k]));
  return {
    email: str(row.email),
    whatsapp: str(row.whatsapp),
    address: { street, city, region, postal, country },
    mapsUrl: web(row.maps_url),
    social: SOCIALS.flatMap(([name, key]) => {
      const url = web(row[key]);
      return url ? [{ name, url }] : [];
    }),
  };
});

/** Organization fields for JSON-LD, built only from what is saved. Nothing is invented. */
export async function getOrgLd() {
  const s = await getSiteSettings();
  const a = s.address;
  const hasAddress = Object.values(a).some(Boolean);
  return {
    ...(s.email && { email: s.email }),
    ...(s.whatsapp && {
      telephone: s.whatsapp,
      contactPoint: { "@type": "ContactPoint", telephone: s.whatsapp, contactType: "customer support" },
    }),
    ...(hasAddress && {
      address: {
        "@type": "PostalAddress",
        ...(a.street && { streetAddress: a.street }),
        ...(a.city && { addressLocality: a.city }),
        ...(a.region && { addressRegion: a.region }),
        ...(a.postal && { postalCode: a.postal }),
        ...(a.country && { addressCountry: a.country }),
      },
    }),
    ...(s.mapsUrl && { hasMap: s.mapsUrl }),
    ...(s.social.length > 0 && { sameAs: s.social.map((l) => l.url) }),
  };
}
