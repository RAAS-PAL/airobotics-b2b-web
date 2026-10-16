import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CopyId } from "@/components/copy-id";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { contact, contactAddress } from "@/lib/contact";
import lineQr from "@/public/contact_lineQR.png";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = translator(await getDictionary(lang));
  return {
    title: t("CONTACTPAGE.meta_title"),
    description: t("CONTACTPAGE.meta_description"),
  };
}

/** How to reach a person — distinct from /quote, which is the form. A buyer
 *  who wants to phone or add us on LINE shouldn't have to fill anything in. */
export default async function ContactDetailsPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = translator(await getDictionary(locale));
  const address = contactAddress[locale];

  return (
    <section className="bg-base">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal>
          <Eyebrow>{t("CONTACTPAGE.eyebrow")}</Eyebrow>
          <h1 className="display mt-4 max-w-2xl text-4xl sm:text-5xl">
            {t("CONTACTPAGE.heading")}
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-fog">
            {t("CONTACTPAGE.body")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* ── Phone, email, address ────────────────────────── */}
          <Reveal className="h-full">
            {/* justify-between, not mt-auto on the last child: the card
                stretches to match the LINE panel, and sharing that spare
                height between the rows reads as breathing room, where
                pushing it all below the last row reads as a hole. */}
            <div className="flex h-full flex-col justify-between gap-8 border border-line bg-surface p-7 sm:p-9">
              <div>
                <p className="stencil text-amber">
                  {t("CONTACTPAGE.label_phone")}
                </p>
                <a
                  href={`tel:${contact.phone.dial}`}
                  className="mt-3 inline-block font-mono text-2xl text-snow transition-colors hover:text-amber sm:text-3xl"
                >
                  {contact.phone.display}
                </a>
              </div>

              <div>
                <p className="stencil text-amber">
                  {t("CONTACTPAGE.label_email")}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 inline-block break-all font-mono text-lg text-snow transition-colors hover:text-amber sm:text-xl"
                >
                  {contact.email}
                </a>
              </div>

              {/* Rendered only once a confirmed address exists — see lib/contact.ts */}
              {address.length > 0 && (
                <div>
                  <p className="stencil text-amber">
                    {t("CONTACTPAGE.label_address")}
                  </p>
                  <address className="mt-3 not-italic leading-relaxed text-cloud">
                    {address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              )}

              <p className="border-t border-line pt-6 text-sm leading-relaxed text-fog">
                {t("CONTACTPAGE.response")}
              </p>
            </div>
          </Reveal>

          {/* ── LINE ─────────────────────────────────────────── */}
          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col border border-line bg-surface p-7 sm:p-9">
              <p className="stencil text-amber">
                {t("CONTACTPAGE.label_line")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                {t("CONTACTPAGE.line_body")}
              </p>

              {/* Code beside its controls rather than stacked above them —
                  stacking made this panel half again as tall as the one
                  next to it. */}
              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-stretch">
                {/* White plate behind the code: QR readers need the quiet
                    zone and the light ground to get a reliable scan. */}
                <div className="shrink-0 self-start bg-white p-3">
                  <Image
                    src={lineQr}
                    alt={t("CONTACTPAGE.line_qr_alt")}
                    width={150}
                    height={150}
                    className="h-[150px] w-[150px]"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
                  <CopyId
                    value={contact.line.id}
                    hint={t("CONTACTPAGE.copy")}
                    copied={t("CONTACTPAGE.copied")}
                    ariaLabel={t("CONTACTPAGE.copy_aria", {
                      id: contact.line.id,
                    })}
                    trackAs="line_copy"
                  />
                  <a
                    href={contact.line.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stencil text-amber transition-colors hover:text-amber-hot"
                  >
                    {t("CONTACTPAGE.line_open")} →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Across to the quote form ─────────────────────────── */}
        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border border-line bg-surface p-7 sm:p-9">
            <div className="max-w-xl">
              <h2 className="display text-2xl text-snow">
                {t("CONTACTPAGE.quote_heading")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                {t("CONTACTPAGE.quote_body")}
              </p>
            </div>
            <Link
              href={localePath(locale, "/quote")}
              className="stencil shrink-0 rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
            >
              {t("CONTACTPAGE.quote_cta")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
