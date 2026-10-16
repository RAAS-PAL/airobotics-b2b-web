import { SITE_URL } from "@/lib/site";

/** BreadcrumbList structured data: the same trail the page shows, so search
 *  results can print "airoboticsth.com › Fleet › L3" instead of a bare URL.
 *
 *  Pass exactly the crumbs the visitor sees, in order. Google expects the
 *  markup to describe what is on the page, so a trail that differs from the
 *  visible one can be ignored. Paths are site-relative; the origin is added
 *  here. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
