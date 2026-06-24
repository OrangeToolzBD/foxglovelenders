import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getPillar, PILLARS, type Pillar } from "@/lib/pillars-data";
import { PILLAR_BODIES } from "@/lib/pillars-content";
import { SUBURBS } from "@/lib/suburbs-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/pillar/$slug")({
  head: ({ params }) => {
    const p = getPillar(params.slug);
    const title = p ? `${p.title} in San Antonio, TX` : "Loan Program";
    const description =
      p?.description ?? "San Antonio business financing programs from Anchor Capital Group.";
    const path = `/pillar/${params.slug}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: p
          ? [serviceNode({ path, name: p.title, description: p.description, serviceType: p.title })]
          : [],
      }),
    });
  },
  loader: ({ params }) => {
    const pillar = getPillar(params.slug);
    if (!pillar) throw notFound();
    return { pillar } as { pillar: Pillar };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Loan program not found</h1>
      <Button asChild className="mt-6"><Link to="/san-antonio">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: PillarPage,
});

function PillarPage() {
  const { pillar } = Route.useLoaderData();
  const related = PILLARS.filter((p) => p.kind === pillar.kind && p.slug !== pillar.slug).slice(0, 6);

  const kindLabel = pillar.kind === "money" ? "Money Pillar" : "Vertical Pillar";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-[color:var(--brand-cream)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Link to="/san-antonio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[color:var(--brand-vermillion)]">
              <ArrowLeft className="h-3.5 w-3.5" /> San Antonio Hub
            </Link>
            <span className="text-muted-foreground">
              {kindLabel} · <span className="text-[color:var(--brand-charcoal)]">{pillar.title}</span>
            </span>
          </div>
        </div>

        {/* Hero — dark anchor band */}
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
          <div className="relative mx-auto max-w-4xl px-6">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              <Sparkles className="h-3.5 w-3.5" />
              Program · {kindLabel}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {pillar.title}
              <span className="block text-[color:var(--brand-vermillion)]">in San Antonio</span>
            </h1>
            <p className="mt-4 max-w-2xl font-display text-lg font-medium text-white/85">{pillar.tagline}</p>
            <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">{pillar.description}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {pillar.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[color:var(--brand-vermillion)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 rounded-none border border-[color:var(--brand-vermillion)]/40 bg-[color:var(--brand-vermillion)]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              {pillar.highlight}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="anchor-bevel rounded-none bg-[image:var(--gradient-cta)] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]">
                <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-white/30 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white">
                <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> {SITE_CONFIG.phone}</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> Soft credit pull only</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> 24-hour decisions</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> TX-licensed partners</span>
            </div>
          </div>
        </section>

        {/* San Antonio context */}
        <section className="bg-[color:var(--brand-cream)]">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Program Memo
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {pillar.title} for San Antonio businesses
            </h2>
            {(PILLAR_BODIES[pillar.slug] ?? []).map((p, i) => (
              <p key={i} className="mt-4 text-muted-foreground">{p}</p>
            ))}
            <p className="mt-4 text-muted-foreground">
              Every Anchor Capital Group application runs through Texas-licensed lending partners —
              one soft credit pull, side-by-side offers, no fee until close.
            </p>
          </div>
        </section>

        {/* Neighborhoods */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Coverage · {pillar.title}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {pillar.title} by San Antonio neighborhood
            </h2>
            <p className="mt-2 text-muted-foreground">
              Open a page tailored to your specific neighborhood or adjacent community.
            </p>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {SUBURBS.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    to="/san-antonio/$suburb/$pillar"
                    params={{ suburb: s.slug, pillar: pillar.slug }}
                    className="group relative flex min-w-0 items-center justify-between gap-3 bg-card p-5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                  >
                    <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-1 font-display text-sm font-semibold">{pillar.title}, {s.name}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground group-hover:text-white/65">{s.county}</div>
                    </div>
                    <MapPin className="h-4 w-4 shrink-0 text-[color:var(--brand-crimson)] group-hover:text-[color:var(--brand-vermillion)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related pillars */}
        <section className="bg-[color:var(--brand-cream)]">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Related {pillar.kind === "money" ? "Money Pillars" : "Vertical Pillars"}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Other {pillar.kind === "money" ? "money" : "industry"} programs
            </h2>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/pillar/$slug"
                    params={{ slug: p.slug }}
                    className="group relative flex min-w-0 items-start justify-between gap-3 bg-card p-5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                  >
                    <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-1 font-display text-sm font-semibold">{p.title}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground group-hover:text-white/65">{p.tagline}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-[color:var(--brand-vermillion)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-20 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-15" />
          <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand-vermillion) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Pre-qualify · 60 seconds
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {pillar.title}.
              <span className="block text-[color:var(--brand-vermillion)]">Apply in 60 seconds.</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="anchor-bevel rounded-none bg-[image:var(--gradient-cta)] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]">
                <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-white/30 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white">
                <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> Call the desk</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}