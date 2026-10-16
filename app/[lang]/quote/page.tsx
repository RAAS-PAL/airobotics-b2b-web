import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui";
import { QuoteForm } from "./quote-form";
import { pageMetadata } from "@/lib/page-metadata";
import { getDictionary, translator } from "@/lib/i18n/dictionary";
import { localizeRobots } from "@/lib/i18n/localize-robots";
import { isLocale, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/quote">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = translator(await getDictionary(lang));
  return pageMetadata({
    t,
    locale: lang,
    path: "/quote",
    title: t("CONTACT.meta_title"),
    description: t("CONTACT.meta_description"),
  });
}

const stepKeys = [1, 2, 3] as const;

export default async function ContactPage({
  params,
  searchParams,
}: PageProps<"/[lang]/quote">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = translator(dict);

  const sp = await searchParams;
  const robotParam = typeof sp.robot === "string" ? sp.robot : undefined;
  const robots = localizeRobots(dict, locale);
  const robot = robotParam ? robots.find((r) => r.slug === robotParam) : undefined;

  return (
    <section className="bg-base">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>{t("CONTACT.eyebrow")}</Eyebrow>
          <h1 className="display mt-4 text-4xl text-snow sm:text-5xl">
            {robot
              ? t("CONTACT.heading_with_robot", { model: robot.model })
              : t("CONTACT.heading_no_robot")}
          </h1>
          <p className="mt-6 leading-relaxed text-fog">
            {robot
              ? t("CONTACT.body_with_robot", { model: robot.model })
              : t("CONTACT.body_no_robot")}
          </p>

          <ol className="mt-10 space-y-6">
            {stepKeys.map((n, i) => (
              <li key={n} className="flex gap-4">
                <span
                  className="stencil flex h-9 w-9 shrink-0 items-center justify-center border border-amber text-amber"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-snow">
                    {t(`CONTACT.step${n}_title`)}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-fog">
                    {t(`CONTACT.step${n}_body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative">
          <QuoteForm
            preselect={robot?.slug}
            robots={robots.map((r) => ({ slug: r.slug, model: r.model, kind: r.kind }))}
            strings={{
              name: t("CONTACT.form.label_name"),
              namePlaceholder: t("CONTACT.form.placeholder_name"),
              company: t("CONTACT.form.label_company"),
              companyPlaceholder: t("CONTACT.form.placeholder_company"),
              email: t("CONTACT.form.label_email"),
              emailPlaceholder: t("CONTACT.form.placeholder_email"),
              phone: t("CONTACT.form.label_phone"),
              phonePlaceholder: t("CONTACT.form.placeholder_phone"),
              address: t("CONTACT.form.label_address"),
              addressPlaceholder: t("CONTACT.form.placeholder_address"),
              robot: t("CONTACT.form.label_robot"),
              robotDefault: t("CONTACT.form.robot_default_option"),
              facility: t("CONTACT.form.label_facility"),
              facilityPlaceholder: t("CONTACT.form.placeholder_facility"),
              message: t("CONTACT.form.label_message"),
              messagePlaceholder: t("CONTACT.form.placeholder_message"),
              submit: t("CONTACT.form.submit_button"),
              submitPending: t("CONTACT.form.submit_button_pending"),
              successHeading: t("CONTACT.form.success_heading"),
              successBody: t("CONTACT.form.success_body"),
              errorName: t("CONTACT.form.error_name"),
              errorEmail: t("CONTACT.form.error_email"),
              errorPhone: t("CONTACT.form.error_phone"),
              errorDelivery: t("CONTACT.form.error_generic"),
              errorUnexpected: t("CONTACT.form.error_unexpected"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
