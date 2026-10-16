import type { Metadata } from "next";
import { landingLocale, localePath, locales, type Locale } from "@/lib/i18n/config";
import type { T } from "@/lib/i18n/dictionary";

/* The share card every page uses — what LINE, Facebook and Slack render when
 * someone pastes a link. One fixed image rather than the
 * app/opengraph-image file convention: the root layout lives under
 * app/[lang], so that convention emitted /-/opengraph-image.png with the
 * dynamic segment unresolved, and a URL the crawler cannot fetch means no
 * picture at all. Rebuild public/og-card.png with scripts/build-og-image.mjs. */
export function shareCard(t: T, locale: Locale) {
  return {
    type: "website" as const,
    siteName: "AI Robotics",
    locale: locale === "th" ? "th_TH" : "en_US",
    images: [
      {
        url: "/og-card.png",
        width: 1200,
        height: 630,
        alt: t("META.og_image_alt"),
      },
    ],
  };
}

/** Full metadata for one page, built from its own path.
 *
 *  Next merges metadata shallowly: a page that sets `alternates` or
 *  `openGraph` replaces the layout's whole object, and a page that sets
 *  neither inherits the layout's. When only the layout set them, every page
 *  declared the homepage as its canonical, and Google left the product pages
 *  out of its index as duplicates of it. So each page sets all of them here.
 *
 *  `title` is the page's own name; the layout's template adds the brand.
 *  Leave it out on the homepage, which uses the site title as is. */
export function pageMetadata({
  t,
  locale,
  path,
  title,
  description,
}: {
  t: T;
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const url = localePath(locale, path);
  const shareTitle = title
    ? t("META.site_title_template", { page: title })
    : t("META.site_title_default");

  return {
    title: title ?? { absolute: t("META.site_title_default") },
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l, path)])),
        "x-default": localePath(landingLocale, path),
      },
    },
    openGraph: {
      ...shareCard(t, locale),
      url,
      title: shareTitle,
      description,
    },
    twitter: {
      // Without this the card renders as a small thumbnail beside the text
      // rather than a full-width banner.
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: ["/og-card.png"],
    },
  };
}
