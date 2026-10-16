import type { MetadataRoute } from "next";
import { visibleRobots as fleet } from "@/lib/robots";
import { SITE_URL } from "@/lib/site";
import { locales, localePath } from "@/lib/i18n/config";

/* Every page exists in both languages, so each URL is emitted per locale with
 * `alternates.languages` pointing at its counterparts. Without that, search
 * engines treat the Thai and English pages as unrelated duplicates.
 *
 * No lastModified. Nothing here knows when a page's content last changed;
 * stamping the build time told search engines every page changed on every
 * deploy. Google only trusts lastmod that is consistently accurate and
 * ignores it otherwise, so an honest gap beats a false date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number; freq: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "monthly" },
    { path: "/robots", priority: 0.9, freq: "monthly" },
    { path: "/reference", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/quote", priority: 0.8, freq: "yearly" },
    ...fleet.map((r) => ({
      path: `/robots/${r.slug}`,
      priority: 0.8,
      freq: "monthly" as const,
    })),
  ];

  return paths.flatMap(({ path, priority, freq }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      changeFrequency: freq,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])
        ),
      },
    }))
  );
}
