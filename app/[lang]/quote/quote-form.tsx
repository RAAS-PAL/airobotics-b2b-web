"use client";

import { useActionState, useEffect } from "react";
import { submitQuote, type QuoteFormState } from "./actions";
import { track } from "@/components/analytics";

export type QuoteFormStrings = {
  name: string; namePlaceholder: string;
  company: string; companyPlaceholder: string;
  email: string; emailPlaceholder: string;
  phone: string; phonePlaceholder: string;
  address: string; addressPlaceholder: string;
  robot: string; robotDefault: string;
  facility: string; facilityPlaceholder: string;
  message: string; messagePlaceholder: string;
  submit: string; submitPending: string;
  successHeading: string; successBody: string;
  errorName: string; errorEmail: string; errorPhone: string;
  errorDelivery: string; errorUnexpected: string;
};

type RobotOption = { slug: string; model: string; kind: string };

const initialState: QuoteFormState = { status: "idle" };

const inputCls =
  "w-full rounded-sm border border-line bg-surface px-4 py-3 text-sm text-snow placeholder:text-fog/60 focus:border-amber";

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="stencil mb-2 block text-fog">
        {label}
        {required && (
          <span className="ml-1 text-amber" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({
  preselect,
  robots,
  strings,
}: {
  preselect?: string;
  robots: RobotOption[];
  strings: QuoteFormStrings;
}) {
  const [state, action, pending] = useActionState(submitQuote, initialState);

  /* The conversion that matters most. generate_lead is GA4's own recommended
   * name, so it can be marked as a key event and imported into Google Ads as
   * a conversion without renaming. Above the early return: a hook must run
   * on every render, including the one that shows the success panel. */
  useEffect(() => {
    if (state.status === "success") track("generate_lead");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="border border-amber/50 bg-surface p-10 text-center">
        <p className="font-mono text-4xl text-amber" aria-hidden="true">
          ✓
        </p>
        <h2 className="display mt-4 text-2xl text-snow">{strings.successHeading}</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-fog">
          {strings.successBody}
        </p>
      </div>
    );
  }

  const invalid = new Set(state.invalid);
  const errors = {
    name: invalid.has("name") ? strings.errorName : undefined,
    email: invalid.has("email") ? strings.errorEmail : undefined,
    phone: invalid.has("phone") ? strings.errorPhone : undefined,
  };
  const failure =
    state.failure === "delivery"
      ? strings.errorDelivery
      : state.failure === "unexpected"
        ? strings.errorUnexpected
        : undefined;

  return (
    <form action={action} noValidate className="space-y-6">
      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>{/* honeypot: never shown, never translated */}
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={strings.name} name="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={strings.namePlaceholder}
            className={inputCls}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field label={strings.company} name="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={strings.companyPlaceholder}
            className={inputCls}
          />
        </Field>
        <Field label={strings.email} name="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={strings.emailPlaceholder}
            className={inputCls}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
        <Field label={strings.phone} name="phone" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder={strings.phonePlaceholder}
            className={inputCls}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>
      </div>

      <Field label={strings.address} name="address">
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder={strings.addressPlaceholder}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={strings.robot} name="robot">
          <select
            id="robot"
            name="robot"
            defaultValue={preselect ?? ""}
            className={inputCls}
          >
            <option value="">{strings.robotDefault}</option>
            {robots.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.model} — {r.kind}
              </option>
            ))}
          </select>
        </Field>
        <Field label={strings.facility} name="facility">
          <input
            id="facility"
            name="facility"
            type="text"
            placeholder={strings.facilityPlaceholder}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label={strings.message} name="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={strings.messagePlaceholder}
          className={inputCls}
        />
      </Field>

      {failure && (
        <p className="border border-danger/50 bg-surface p-4 text-sm text-danger" role="alert">
          {failure}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="stencil w-full rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {pending ? strings.submitPending : strings.submit}
      </button>
    </form>
  );
}
