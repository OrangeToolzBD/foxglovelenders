import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "./index";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { GHLForm } from "@/components/GHLForm";
import {
  CheckCircle2,
  Clock,
  Lock,
  Phone,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";

const CITY = "San Antonio";
const CITY_STATE = "San Antonio, TX";

export const Route = createFileRoute("/apply-now")({
  head: () => {
    const title = "Apply Now";
    const description = `Apply for a business loan in ${CITY_STATE}. Soft credit pull only, no impact to your credit score. Get matched with funding programs in 60 seconds.`;
    return buildHead({
      title,
      description,
      path: "/apply-now",
      noindex: true,
      schema: buildGraph({ title, description, path: "/apply-now" }),
    });
  },
  component: ApplyNowPage,
});

const STEPS = [
  { n: "01", label: "Brief", desc: "60-second business overview" },
  { n: "02", label: "Shop", desc: "Anchor pre-screens 75+ lenders" },
  { n: "03", label: "Compare", desc: "Real offers side-by-side" },
  { n: "04", label: "Funded", desc: "Wire in as little as 24 hours" },
];

function ApplyNowPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />

      {/* Hero — dark anchor band */}
      <section
        className="relative overflow-hidden border-b border-white/10 py-14 text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-20" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-8%] h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-vermillion) 0%, transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
            <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
            Application · Step 1 of 4
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Tell us the brief.
            <span className="block text-[color:var(--brand-vermillion)]">We'll do the shopping.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Share a few details about your business and Anchor will pre-screen the right lenders for
            your file — across {CITY_STATE} and the broader Texas market.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-vermillion)]/40 bg-[color:var(--brand-vermillion)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-vermillion)] backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> Soft pull · No credit impact
          </div>
        </div>
      </section>

      {/* Step indicator strip */}
      <section className="border-b border-border bg-[color:var(--brand-cream)]">
        <ol className="mx-auto grid max-w-6xl grid-cols-2 px-6 py-4 sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={`flex items-start gap-3 border-l-2 px-4 py-2 ${
                i === 0
                  ? "border-[color:var(--brand-vermillion)]"
                  : "border-[color:var(--brand-charcoal)]/10"
              }`}
            >
              <span
                className={`font-mono text-xs font-bold tracking-[0.18em] ${
                  i === 0 ? "text-[color:var(--brand-vermillion)]" : "text-[color:var(--brand-charcoal)]/40"
                }`}
              >
                {s.n}
              </span>
              <div className="min-w-0">
                <div
                  className={`font-display text-sm font-semibold ${
                    i === 0 ? "text-[color:var(--brand-charcoal)]" : "text-[color:var(--brand-charcoal)]/55"
                  }`}
                >
                  {s.label}
                </div>
                <div className="mt-0.5 text-[11px] text-[color:var(--brand-charcoal)]/55">{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <main className="mx-auto grid min-w-0 max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 rounded-none border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-[color:var(--brand-cream)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-charcoal)]/70">
            <span className="flex items-center gap-2">
              <Compass className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" />
              Funding Brief
            </span>
            <span className="font-mono">~ 60 sec</span>
          </div>
          <div className="p-6 sm:p-8">
            <GHLForm />
          </div>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-24 lg:self-start">
          {/* Why this is safe */}
          <div className="rounded-none border border-border bg-card p-5">
            <div className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-charcoal)]">
              <ShieldCheck className="h-4 w-4 text-[color:var(--brand-vermillion)]" /> Why this is safe
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                "Soft credit pull, never affects your score",
                "Bank-level 256-bit encryption",
                "No obligation — compare offers freely",
                "Texas-licensed lending partners only",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-vermillion)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Anchor ledger — dark metric tiles */}
          <div className="rounded-none border border-white/10 bg-[color:var(--brand-charcoal)] p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                The Ledger
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Live
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
              {[
                { v: SITE_CONFIG.stats.businessesFunded, l: "Businesses funded" },
                { v: SITE_CONFIG.stats.loansFacilitated, l: "Loans facilitated" },
                { v: `${SITE_CONFIG.stats.reviewsRating}/5`, l: `${SITE_CONFIG.stats.reviewsCount} reviews` },
                { v: SITE_CONFIG.stats.fastestFundingHours, l: "Fastest funding" },
              ].map((m) => (
                <div key={m.l} className="bg-[color:var(--brand-charcoal)] p-3">
                  <div className="font-display text-xl font-bold text-[color:var(--brand-vermillion)]">
                    {m.v}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need help — call CTA */}
          <div className="rounded-none border border-[color:var(--brand-vermillion)]/30 bg-[color:var(--brand-vermillion)]/8 p-5">
            <div className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-charcoal)]">
              Need a quick gut-check?
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Talk to an Anchor advisor in {CITY} before you finish the form.
            </p>
            <a
              href={SITE_CONFIG.phoneHref}
              className="anchor-bevel mt-4 inline-flex w-full items-center justify-center gap-2 rounded-none bg-[image:var(--gradient-cta)] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" /> {SITE_CONFIG.phone}
            </a>
            <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <Clock className="h-3 w-3 text-[color:var(--brand-vermillion)]" />
              Mon–Fri · 8am–7pm CT
            </div>
          </div>

          {/* Tiny security badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-[color:var(--brand-vermillion)]" /> SSL
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-[color:var(--brand-vermillion)]" /> Encrypted
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-[color:var(--brand-vermillion)]" /> TX-Licensed
            </span>
          </div>

          {/* Back to home link */}
          <a
            href="/"
            className="inline-flex items-center gap-1 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-[color:var(--brand-vermillion)]"
          >
            <ArrowRight className="h-3 w-3 rotate-180" /> Back to home
          </a>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
