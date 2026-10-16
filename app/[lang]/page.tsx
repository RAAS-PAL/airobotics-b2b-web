import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { homeHero } from "@/lib/robot-images";
import { pageMetadata } from "@/lib/page-metadata";
import { RobotCard } from "@/components/robot-card";
import { RobotSpotlight } from "@/components/robot-spotlight";
import { HeroFleet } from "@/components/hero-fleet";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { QuoteBand } from "@/components/quote-band";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { localizeRobots } from "@/lib/i18n/localize-robots";
import { localizeReferences } from "@/lib/i18n/localize-references";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { Faq, FaqJsonLd } from "@/components/faq";
import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { faqIds } from "@/lib/faq";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = translator(await getDictionary(lang));
  return pageMetadata({
    t,
    locale: lang,
    path: "/",
    description: t("META.site_description"),
  });
}

/* The four headline proof figures. Values are locale-independent; only the
   labels are translated, so they live here rather than in the dictionary. */
const proof = [
  { value: "$0.086", unit: "/m²", key: "HOME.proof.stat1_label" },
  { value: "50", unit: "%", key: "HOME.proof.stat2_label" },
  { value: "9–12", unit: "mo", key: "HOME.proof.stat3_label" },
  { value: "62", unit: "dB", key: "HOME.proof.stat4_label" },
] as const;

const verticalKeys = [
  "HOME.verticals.item1",
  "HOME.verticals.item2",
  "HOME.verticals.item3",
  "HOME.verticals.item4",
  "HOME.verticals.item5",
  "HOME.verticals.item6",
] as const;

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  const dict = await getDictionary(locale);
  const t = translator(dict);
  const robots = localizeRobots(dict, locale);
  const faqItems = faqIds.map((id) => ({
    q: t(`HOME.faq.${id}_q`),
    a: t(`HOME.faq.${id}_a`),
  }));
  const references = localizeReferences(dict);

  const cardStrings = {
    view: t("ROBOTDETAIL.card_view"),
    photoPlaceholder: t("ROBOTDETAIL.card_photo_placeholder"),
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src={homeHero}
          alt={t("ALT.home_hero")}
          preload
          quality={92}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_38%] sm:object-center"
          sizes="100vw"
        />
        {/* Minimal scrim — only enough to keep the headline and CTAs legible.
            The plate itself is left unfiltered. */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,11,14,0.55) 0%, rgba(10,11,14,0.12) 24%, rgba(10,11,14,0) 46%, rgba(18,20,26,0.62) 78%, var(--color-base) 100%)",
          }}
          aria-hidden="true"
        />
        <HeroFleet
          locale={locale}
          robots={robots}
          viewTemplate={t("HEROFLEET.card_view")}
        />
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl flex-col items-center justify-between px-5 pb-10 pt-16 text-center sm:pt-20">
          {/* headline in the sky, above the machine */}
          <div>
            <p className="stencil text-amber">{t("HOME.hero.eyebrow")}</p>
            <h1 className="display mx-auto mt-5 max-w-4xl text-4xl text-snow sm:text-5xl lg:text-6xl">
              {t("HOME.hero.h1")}
            </h1>
          </div>

          {/* lets the aisle and its vanishing point breathe */}
          <div className="min-h-[14svh] flex-1" aria-hidden="true" />

          {/* subcopy and actions on the ground, below the machine */}
          <div className="max-w-2xl">
            <p className="mx-auto max-w-xl text-base leading-relaxed text-cloud sm:text-lg">
              {t("HOME.hero.body")}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={localePath(locale, "/robots")}
                className="stencil rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
              >
                {t("HOME.hero.cta_primary")}
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="stencil rounded-sm border border-snow/40 px-7 py-4 text-snow transition-colors hover:border-snow hover:bg-snow/10"
              >
                {t("HOME.hero.cta_secondary")}
              </Link>
            </div>
            <a
              href="#finder"
              className="stencil mt-9 inline-block animate-pulse text-fog transition-colors hover:text-amber"
            >
              <span aria-hidden="true">▼ </span>
              {t("HOME.hero.scroll_cue")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Machine finder ───────────────────────────────────── */}
      <RobotSpotlight
        locale={locale}
        robots={robots}
        strings={{
          eyebrow: t("SPOTLIGHT.eyebrow"),
          heading: t("SPOTLIGHT.heading"),
          intro: t("SPOTLIGHT.intro"),
          tablistLabel: t("SPOTLIGHT.tablist_label"),
          worksIn: t("SPOTLIGHT.works_in"),
          compare: t("SPOTLIGHT.cta_compare"),
          viewTemplate: t("SPOTLIGHT.cta_view"),
        }}
      />

      {/* ── Proof band ───────────────────────────────────────── */}
      <section id="why" className="scroll-mt-16 border-y border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <Eyebrow>{t("HOME.proof.eyebrow")}</Eyebrow>
            <h2 className="display mt-4 max-w-2xl text-3xl text-snow sm:text-4xl">
              {t("HOME.proof.heading")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((p, i) => (
              <Reveal key={p.key} delay={i * 80} className="bg-surface p-6">
                <p className="font-mono text-3xl font-semibold tabular-nums text-amber">
                  {p.value}
                  <span className="ml-1 text-base text-fog">{p.unit}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  {t(p.key)}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fog">
            {t("HOME.proof.footnote")}
          </p>
        </div>
      </section>

      {/* ── Fleet lineup ─────────────────────────────────────── */}
      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>{t("HOME.fleet.eyebrow")}</Eyebrow>
              <h2 className="display mt-4 text-3xl text-snow sm:text-4xl">
                {t("HOME.fleet.heading")}
              </h2>
            </div>
            <Link
              href={localePath(locale, "/robots")}
              className="stencil text-amber hover:text-amber-hot"
            >
              {t("HOME.fleet.compare_link")}
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {robots.map((robot, i) => (
              <Reveal key={robot.slug} delay={(i % 3) * 80} className="h-full">
                <RobotCard robot={robot} locale={locale} strings={cardStrings} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verticals ────────────────────────────────────────── */}
      <section className="border-y border-line bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <Eyebrow tone="light">{t("HOME.verticals.eyebrow")}</Eyebrow>
            <h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl">
              {t("HOME.verticals.heading")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-cloud bg-cloud sm:grid-cols-3">
            {verticalKeys.map((key, i) => (
              <Reveal key={key} delay={i * 60} className="bg-paper">
                <div className="flex items-center justify-between p-6">
                  <span className="display text-lg">{t(key)}</span>
                  <span className="font-mono text-xs text-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <Eyebrow>{t("HOME.testimonials.eyebrow")}</Eyebrow>
            <h2 className="display mt-4 text-3xl text-snow sm:text-4xl">
              {t("HOME.testimonials.heading")}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-fog">
              {t("HOME.testimonials.subtext")}
            </p>
            <Link
              href={localePath(locale, "/reference")}
              className="stencil mt-4 inline-block text-amber hover:text-amber-hot"
            >
              {t("HOME.testimonials.link")}
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {references.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <figure className="flex h-full flex-col border border-line bg-surface p-7">
                  <span className="font-mono text-3xl text-amber" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-cloud">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="text-sm font-semibold text-snow">{r.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-fog">
                      {r.role}
                      <br />
                      {r.organisation} — {r.location}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq
        eyebrow={t("HOME.faq.eyebrow")}
        heading={t("HOME.faq.heading")}
        items={faqItems}
      />
      <FaqJsonLd items={faqItems} />
      <OrganizationJsonLd description={t("META.site_description")} />

      <QuoteBand locale={locale} />
    </>
  );
}
