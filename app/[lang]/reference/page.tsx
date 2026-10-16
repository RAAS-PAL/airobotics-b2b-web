import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReferenceGallery } from "@/components/reference-gallery";
import { MediaFrame } from "@/components/media-frame";
import { mediaForReference } from "@/lib/reference-media";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";
import { QuoteBand } from "@/components/quote-band";
import { pageMetadata } from "@/lib/page-metadata";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { localizeReferences } from "@/lib/i18n/localize-references";
import { isLocale, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/reference">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = translator(await getDictionary(lang));
  return pageMetadata({
    t,
    locale: lang,
    path: "/reference",
    title: t("REFERENCE.meta_title"),
    description: t("REFERENCE.meta_description"),
  });
}

export default async function ReferencePage({
  params,
}: PageProps<"/[lang]/reference">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = translator(dict);
  const references = localizeReferences(dict);

  return (
    <>
      <section className="border-b border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:pt-20">
          <Reveal>
            <Eyebrow>{t("REFERENCE.eyebrow")}</Eyebrow>
            <h1 className="display mt-4 max-w-3xl text-4xl text-snow sm:text-5xl">
              {t("REFERENCE.heading")}
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-fog">
              {t("REFERENCE.body")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-base">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-6 lg:grid-cols-3">
            {references.map((ref, i) => {
              const footage = mediaForReference(ref.slug);
              return (
                <Reveal key={ref.slug} delay={(i % 3) * 80} className="h-full">
                  <figure className="flex h-full flex-col overflow-hidden border border-line bg-surface">
                    {/* Footage from the customer's own site, above what they
                        said about it. No caption — the attribution below
                        already names the place. */}
                    {footage && (
                      <MediaFrame
                        item={footage}
                        sizes="(min-width: 1024px) 360px, 92vw"
                      />
                    )}

                    <div className="flex flex-1 flex-col p-7">
                      <p className="stencil text-amber">{ref.sector}</p>

                      <span
                        className="mt-4 font-mono text-3xl leading-none text-amber"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      <blockquote className="mt-2 flex-1 leading-relaxed text-cloud">
                        {ref.quote}
                      </blockquote>

                      {ref.outcome && (
                        <p className="mt-5 border-l-2 border-amber py-1 pl-3 font-mono text-xs text-snow">
                          {ref.outcome}
                        </p>
                      )}

                      <figcaption className="mt-6 border-t border-line pt-4">
                        <p className="text-sm font-semibold text-snow">
                          {ref.name}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-fog">
                          {ref.role}
                          <br />
                          {ref.organisation} — {ref.location}
                        </p>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ReferenceGallery
        strings={{
          eyebrow: t("REFERENCE.gallery.eyebrow"),
          heading: t("REFERENCE.gallery.heading"),
          emptyLabel: t("REFERENCE.gallery.empty_label"),
          emptyBody: t("REFERENCE.gallery.empty_body"),
        }}
      />

      <QuoteBand locale={locale} />
    </>
  );
}
