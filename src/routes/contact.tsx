import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  HeadphonesIcon,
  Compass,
} from "lucide-react";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => {
    const title = "Contact Us";
    const description =
      "Have questions about funding? Reach out to Anchor Capital Group. Fast responses, no obligation, 100% confidential.";
    return buildHead({
      title,
      description,
      path: "/contact",
      schema: buildGraph({ title, description, path: "/contact", pageType: "ContactPage" }),
    });
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />

      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-white/10 py-16 text-white sm:py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-20" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-8%] h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--brand-vermillion) 0%, transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
            <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
            <Compass className="h-3.5 w-3.5" />
            Talk to Anchor
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Straight answers.
            <span className="block text-[color:var(--brand-vermillion)]">No scripts, no pressure.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Questions, custom scenarios or ready to apply? Our funding desk is standing by - typically
            back within the hour during business days.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> 100% Confidential
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> Soft Pull Only
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> 24-Hour Decisions
            </span>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
          {[
            {
              icon: Phone,
              title: "Call the desk",
              value: SITE_CONFIG.phone,
              sub: "Mon-Fri · 8am-7pm CT · Sat 9am-2pm",
              href: SITE_CONFIG.phoneHref,
            },
            {
              icon: HeadphonesIcon,
              title: "Live chat",
              value: "Chat with a specialist",
              sub: "Available 24/7 on this site",
              href: "#",
            },
          ].map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden bg-card p-7 transition-all hover:bg-[color:var(--brand-charcoal)] hover:text-white"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[color:var(--brand-vermillion)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <c.icon className="mt-4 h-7 w-7 text-[color:var(--brand-crimson)] transition-colors group-hover:text-[color:var(--brand-vermillion)]" />
              <div className="mt-5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-current/70">
                {c.title}
              </div>
              <div className="mt-1 font-display text-2xl font-semibold tracking-tight">
                {c.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground group-hover:text-white/65">
                {c.sub}
              </div>
              <ArrowRight className="absolute right-6 top-6 h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-[color:var(--brand-vermillion)] group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {/* HQ / Service area */}
          <div className="rounded-none border border-border bg-card p-6">
            <div className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              <Building2 className="h-4 w-4" />
              {SITE_CONFIG.hasPublicOffice ? "Headquarters" : "Service area"}
            </div>
            {SITE_CONFIG.hasPublicOffice ? (
              <p className="mt-4 text-sm text-foreground">
                <strong className="block font-semibold">{SITE_CONFIG.name}</strong>
                {SITE_CONFIG.address.streetAddress}
                <br />
                {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion}{" "}
                {SITE_CONFIG.address.postalCode}
              </p>
            ) : (
              <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                {SITE_CONFIG.areasServed.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" />
                    {area}
                  </li>
                ))}
              </ul>
            )}
            {SITE_CONFIG.license.state && SITE_CONFIG.license.licenseNumber && (
              <div className="mt-4 border-t border-border pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {SITE_CONFIG.license.state} License #{SITE_CONFIG.license.licenseNumber}
              </div>
            )}
          </div>

          {/* Business hours */}
          <div className="rounded-none border border-border bg-card p-6">
            <div className="flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              <Clock className="h-4 w-4" />
              Desk Hours
            </div>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground">Mon-Fri</span>
                <span className="font-semibold">8am-7pm CT</span>
              </li>
              <li className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground">Saturday</span>
                <span className="font-semibold">9am-2pm CT</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="font-semibold">Closed</span>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <MessageSquare className="h-3 w-3 text-[color:var(--brand-vermillion)]" />
              Avg. reply &lt; 1 hour
            </div>
          </div>

          {/* CTA - dark anchor card */}
          <div className="relative overflow-hidden rounded-none border border-white/10 bg-[color:var(--brand-charcoal)] p-6 text-white">
            <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand-vermillion) 0%, transparent 70%)" }} />
            <div className="relative">
              <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                Ready to apply?
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                Pre-qualify in 60 seconds.
              </h3>
              <p className="mt-2 text-sm text-white/65">
                Skip the back-and-forth. Soft credit pull, real offers in 24 hours.
              </p>
              <Button
                asChild
                className="anchor-bevel mt-5 inline-flex h-11 rounded-none bg-[image:var(--gradient-cta)] px-5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]"
              >
                <Link to="/apply-now">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
