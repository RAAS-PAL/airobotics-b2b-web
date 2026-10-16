import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { visibleRobots as sourceRobots } from "@/lib/robots";
import { robotImages } from "@/lib/robot-images";
import { pageMetadata } from "@/lib/page-metadata";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { localizeRobots } from "@/lib/i18n/localize-robots";
import { isLocale, localePath, locales, localeUnits, type Locale } from "@/lib/i18n/config";
import { SpecTable } from "@/components/spec-table";
import { RobotCard } from "@/components/robot-card";
import { Reveal } from "@/components/reveal";
import { Eyebrow, StatTile } from "@/components/ui";
import { QuoteBand } from "@/components/quote-band";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    sourceRobots.map((r) => ({ lang, slug: r.slug }))
  );
}

/** Taller than it is wide — needs height-capped, centred treatment. */
function isPortrait(img: { width: number; height: number }) {
  return img.height > img.width;
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/robots/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const robot = localizeRobots(dict, lang).find((r) => r.slug === slug);
  if (!robot) return {};
  return pageMetadata({
    t: translator(dict),
    locale: lang,
    path: `/robots/${slug}`,
    title: `${robot.model} — ${robot.kind}`,
    description: robot.pitch,
  });
}

export default async function RobotPage({
  params,
}: PageProps<"/[lang]/robots/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = translator(dict);
  const localized = localizeRobots(dict, locale);
  const robot = localized.find((r) => r.slug === slug);
  if (!robot) notFound();

  const images = robotImages[robot.slug];
  const statementFeatures = robot.features.filter((f) => !f.imageKey);
  const imageFeatures = robot.features.filter(
    (f) => f.imageKey && images?.features[f.imageKey]
  );
  const siblings = robot.compare
    .map((sib) => localized.find((r) => r.slug === sib))
    .filter((r) => r !== undefined);
  const cardStrings = {
    view: t("ROBOTDETAIL.card_view"),
    photoPlaceholder: t("ROBOTDETAIL.card_photo_placeholder"),
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line bg-ink">
        {images?.hero && (
          <>
            <Image
              src={images.hero}
              alt={`${robot.model} ${robot.kind}`}
              preload
              placeholder="blur"
              className={`absolute inset-0 -z-10 h-full w-full object-cover ${images.heroClass ?? "object-right"}`}
              sizes="100vw"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent"
              aria-hidden="true"
            />
          </>
        )}
        {images?.heroForeground && (
          <div
            className={
              images.heroForegroundClass ??
              "pointer-events-none absolute bottom-0 right-2 z-0 hidden w-2/5 max-w-sm sm:block lg:right-16 lg:max-w-md"
            }
            aria-hidden="true"
          >
            <Image
              src={images.heroForeground.src}
              alt=""
              preload
              className="h-auto w-full drop-shadow-2xl"
              sizes="(min-width: 1024px) 448px, 40vw"
            />
          </div>
        )}
        <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-5 py-20">
          <div className="max-w-xl">
            <nav aria-label="Breadcrumb" className="stencil text-fog">
              <Link href={localePath(locale, "/robots")} className="hover:text-snow">
                {t("ROBOTDETAIL.breadcrumb")}
              </Link>
              <span aria-hidden="true"> / </span>
              <span className="text-amber">{robot.model}</span>
            </nav>
            <h1 className="display mt-6 text-5xl text-snow sm:text-6xl">
              {robot.model}
            </h1>
            <p className="display mt-3 text-2xl text-amber sm:text-3xl">
              {robot.tagline}
            </p>
            <p className="mt-6 leading-relaxed text-cloud">{robot.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={localePath(locale, `/quote?robot=${robot.slug}`)}
                className="stencil rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
              >
                {t("ROBOTDETAIL.cta_quote")}
              </Link>
              <a
                href="#specs"
                className="stencil rounded-sm border border-snow/40 px-7 py-4 text-snow transition-colors hover:border-snow hover:bg-snow/10"
              >
                {t("ROBOTDETAIL.cta_specs")}
              </a>
            </div>
          </div>
        </div>
        <div className="hazard-thin" aria-hidden="true" />
      </section>

      {/* ── Instrument panel: headline stats ─────────────────── */}
      <section className="border-b border-line bg-base">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {robot.heroStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70}>
              <StatTile stat={stat} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Statement features (dark) ────────────────────────── */}
      {statementFeatures.length > 0 && (
        <section className="bg-base">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
            <div
              className={`grid gap-10 ${
                statementFeatures.length > 1 ? "md:grid-cols-3" : "md:grid-cols-[1fr_1.2fr]"
              }`}
            >
              {statementFeatures.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 80}>
                  <Eyebrow>{feature.eyebrow}</Eyebrow>
                  <h2 className="display mt-4 text-2xl text-snow sm:text-3xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-fog">{feature.body}</p>
                  {feature.bullets && (
                    <ul className="mt-6 space-y-2.5">
                      {feature.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-cloud">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Image features (paper, alternating) ──────────────── */}
      {imageFeatures.length > 0 && (
        <section className="border-y border-line bg-paper text-ink">
          <div className="mx-auto max-w-6xl space-y-20 px-5 py-16 sm:py-24">
            {imageFeatures.map((feature, i) => {
              const img = images!.features[feature.imageKey!];
              return (
                <Reveal key={feature.title}>
                  <div
                    className={`grid items-center gap-10 lg:grid-cols-2 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Portrait shots would tower over the column at full width,
                        so they sit centred at a capped height instead. */}
                    <div
                      className={`overflow-hidden border border-cloud ${
                        isPortrait(img.src)
                          ? "flex justify-center bg-paper-dim py-8"
                          : ""
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        placeholder="blur"
                        className={
                          isPortrait(img.src)
                            ? "h-auto max-h-[24rem] w-auto max-w-full object-contain"
                            : "h-auto w-full object-cover"
                        }
                        sizes="(min-width: 1024px) 560px, 92vw"
                      />
                    </div>
                    <div>
                      <Eyebrow tone="light">{feature.eyebrow}</Eyebrow>
                      <h2 className="display mt-4 text-2xl sm:text-3xl">
                        {feature.title}
                      </h2>
                      <p className="mt-4 leading-relaxed text-ink-soft">
                        {feature.body}
                      </p>
                      {feature.bullets && (
                        <ul className="mt-6 space-y-2.5">
                          {feature.bullets.map((b) => (
                            <li key={b} className="flex gap-3 text-sm text-ink">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber-deep" aria-hidden="true" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Full specifications ──────────────────────────────── */}
      <section id="specs" className="scroll-mt-16 bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SpecTable
            groups={robot.specGroups}
            showUnitToggle={localeUnits[locale] === "imperial"}
            strings={{
              heading: t("ROBOTDETAIL.specs_heading"),
              metric: t("ROBOTDETAIL.units_metric"),
              imperial: t("ROBOTDETAIL.units_imperial"),
              unitsLabel: t("SPECTABLE.units_label"),
            }}
          />
        </div>
      </section>

      {/* ── Environments ─────────────────────────────────────── */}
      <section className="border-t border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <Eyebrow>{t("ROBOTDETAIL.works_in", { model: robot.model })}</Eyebrow>
          {images?.scenes ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {images.scenes.map((scene) => (
                <figure
                  key={scene.label}
                  className="group relative aspect-[4/3] overflow-hidden border border-line"
                >
                  <Image
                    src={scene.src}
                    alt={scene.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(min-width: 1024px) 272px, (min-width: 640px) 45vw, 90vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <figcaption className="stencil absolute bottom-3 left-4 text-snow">
                    {t(`ROBOT.${robot.slug}.scene_${scene.label.toLowerCase()}`)}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <ul className="mt-6 flex flex-wrap gap-3">
              {robot.environments.map((env) => (
                <li
                  key={env}
                  className="stencil border border-line px-4 py-2.5 text-cloud"
                >
                  {env}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── Cross-sell ───────────────────────────────────────── */}
      {siblings.length > 0 && (
        <section className="border-t border-line bg-base">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-2xl text-snow sm:text-3xl">
                {t("ROBOTDETAIL.crosssell_heading")}
              </h2>
              <Link
                href={localePath(locale, "/robots")}
                className="stencil text-amber hover:text-amber-hot"
              >
                {t("ROBOTDETAIL.crosssell_link")}
              </Link>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {siblings.map((s) => (
                <RobotCard key={s.slug} robot={s} locale={locale} strings={cardStrings} />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteBand locale={locale} robotSlug={robot.slug} robotModel={robot.model} />
    </>
  );
}
