"use client";

import Script from "next/script";
import { useEffect } from "react";

/* Google Analytics 4. Off unless NEXT_PUBLIC_GA_ID is set, so local dev and
 * preview builds without the variable send nothing and never pollute the
 * numbers. The ID is public — it ships in every page's source — so it lives
 * in an env var for that on/off switch, not for secrecy.
 *
 * Loaded through next/script rather than @next/third-parties: that package is
 * still marked experimental, and its documented install bumps next@latest. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Sends a GA4 event. A no-op when analytics is off or the tag has not loaded
 *  yet, so callers never need to check. */
export function track(event: string, params?: Record<string, string>) {
  window.gtag?.("event", event, params);
}

/** Which way the visitor chose to get in touch, read from the link itself. */
function contactMethod(href: string): string | null {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (/^https?:\/\/line\.me\//.test(href)) return "line";
  return null;
}

export function Analytics() {
  /* One listener for the whole page rather than a handler on each link: it
   * catches every phone, email and LINE link wherever it sits — header,
   * footer, contact page — including ones added later. Capture phase, so it
   * fires before a tel: or mailto: link hands off to another app. */
  useEffect(() => {
    if (!GA_ID) return;
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const method = contactMethod(link.getAttribute("href") ?? "");
      if (method) track("click_contact", { method });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
