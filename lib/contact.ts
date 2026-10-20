import type { Locale } from "@/lib/i18n/config";

/** Company contact details, in one place so the contact page and anything
 *  added later (footer, structured data) read the same values. */
export const contact = {
  phone: {
    /** as printed */
    display: "02-576-5566",
    /** E.164 for the tel: link — a Bangkok landline, national 0 dropped */
    dial: "+6625765566",
  },
  email: "sales@raaspal.com",
  line: {
    id: "@raaspal",
    qr: "/contact_lineQR.png",
    /** Opens the LINE add-friend page; the id without its leading @ */
    url: "https://line.me/R/ti/p/@raaspal",
  },
};

/** Street address, per locale — a Thai company's address reads differently in
 *  each script, so it isn't one shared string.
 *
 *  An empty list renders no address block rather than a placeholder: a wrong
 *  address on a contact page is worse than none. */
export const contactAddress: Record<Locale, string[]> = {
  en: [
    "99/40 Software Park Building, Moo 4",
    "Chaengwattana Rd., Khlong Kluea, Pak Kret",
    "Nonthaburi 11120, Thailand",
  ],
  th: [
    "เลขที่ 99/40 อาคารซอฟต์แวร์ปาร์ค หมู่ 4",
    "ถนนแจ้งวัฒนะ ตำบลคลองเกลือ อำเภอปากเกร็ด",
    "จังหวัดนนทบุรี 11120",
  ],
};

/** The same address split into schema.org PostalAddress fields, for the
 *  Organization structured data. Change it together with the lines above, and
 *  keep both identical to the Google Business Profile: Google cross-checks
 *  name, address and phone between the two and trusts neither if they differ. */
export const postalAddress = {
  streetAddress:
    "99/40 Software Park Building, Moo 4, Chaengwattana Rd., Khlong Kluea",
  addressLocality: "Pak Kret",
  addressRegion: "Nonthaburi",
  postalCode: "11120",
  addressCountry: "TH",
};
