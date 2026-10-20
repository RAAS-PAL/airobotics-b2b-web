import { contact, postalAddress } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

/** Organization structured data: who the company is, for search engines.
 *  Google uses it to match the site to the business — name, logo, phone,
 *  address — and it is what lets the business be recognised as one entity
 *  across the site, Search Console and a Business Profile.
 *
 *  Contact details come from lib/contact.ts, so a change there updates this
 *  in the same commit and the two can never disagree. The address is given
 *  once, in English, whichever language the page is in: it describes one
 *  company, and the Business Profile holds a single address too. */
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
    address: { "@type": "PostalAddress", ...postalAddress },
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
