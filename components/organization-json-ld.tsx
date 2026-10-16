import { contact } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

/** Organization structured data: who the company is, for search engines.
 *  Google uses it to match the site to the business — name, logo, phone —
 *  and it is what lets the business be recognised as one entity across the
 *  site, Search Console and a Business Profile.
 *
 *  Contact details come from lib/contact.ts, so a change there updates this
 *  in the same commit and the two can never disagree.
 *
 *  No address yet. lib/contact.ts has none confirmed, and a schema address
 *  that differs from the Business Profile's is worse than none: Google treats
 *  mismatched name, address and phone as a reason to distrust both. */
export function OrganizationJsonLd({ description }: { description: string }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Robotics",
    legalName: "AI ROBOTICS CO., LTD.",
    alternateName: "บริษัท เอไอ โรโบติกส์ จำกัด",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description,
    email: contact.email,
    telephone: contact.phone.dial,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contact.phone.dial,
        email: contact.email,
        areaServed: "TH",
        availableLanguage: ["Thai", "English"],
      },
    ],
    sameAs: [contact.line.url],
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
