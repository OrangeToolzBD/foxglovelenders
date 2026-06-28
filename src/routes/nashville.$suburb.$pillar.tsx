import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getSuburb, type Suburb } from "@/lib/suburbs-data";
import { getPillar, TOP_MONEY_PILLARS, type Pillar } from "@/lib/pillars-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode, placeNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/nashville/$suburb/$pillar")({
  head: ({ params }) => {
    const s = getSuburb(params.suburb);
    const p = getPillar(params.pillar);
    const title = s && p ? `${p.title} in ${s.name}, TN` : "Nashville Loan Program";
    const description =
      s && p
        ? `${p.title} for ${s.name} businesses: ${p.tagline.toLowerCase()}. ${p.highlight}. Soft credit pull only.`
        : "Nashville business funding programs.";
    const path = `/nashville/${params.suburb}/${params.pillar}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes:
          s && p
            ? [
                serviceNode({ path, name: `${p.title} in ${s.name}`, description: p.description, serviceType: p.title }),
                placeNode({ path, name: `${s.name}, TN` }),
              ]
            : [],
      }),
    });
  },
  loader: ({ params }) => {
    const suburb = getSuburb(params.suburb);
    const pillar = getPillar(params.pillar);
    if (!suburb || !pillar) throw notFound();
    return { suburb, pillar } as { suburb: Suburb; pillar: Pillar };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Button asChild className="mt-6"><Link to="/nashville">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: SuburbPillarPage,
});

function SuburbPillarPage() {
  const { suburb, pillar } = Route.useLoaderData();
  const otherPillars = TOP_MONEY_PILLARS.filter((p) => p.slug !== pillar.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-[color:var(--brand-cream)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Link
              to="/nashville/$suburb"
              params={{ suburb: suburb.slug }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-[color:var(--brand-vermillion)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {suburb.name}
            </Link>
            <span className="text-muted-foreground">
              {pillar.title} · <span className="text-[color:var(--brand-charcoal)]">{suburb.name}</span>
            </span>
          </div>
        </div>

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
          <div className="relative mx-auto max-w-4xl px-6">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              <MapPin className="h-3.5 w-3.5" />
              {suburb.name} · {suburb.county}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {pillar.title}
              <span className="block text-[color:var(--brand-vermillion)]">in {suburb.name}</span>
            </h1>
            <p className="mt-4 max-w-2xl font-display text-lg font-medium text-white/85">
              {pillar.tagline}
            </p>
            <p className="mt-5 text-base text-white/70 md:text-lg">
              {pillar.description} For {suburb.name} business owners, this typically means working
              with operators near {suburb.landmarks.slice(0, 2).join(" and ")}:{" "}
              {suburb.industries.slice(0, 2).join(" and ").toLowerCase()} and service businesses
              tied to Nashville's I-24 / I-65 economy and the broader Middle Tennessee market.
            </p>
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
          </div>
        </section>

        {/* Local example */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
            <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
            Case File · 01
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
            A {suburb.name} example
          </h2>
          <div className="mt-6 rounded-none border-l-[3px] border-[color:var(--brand-vermillion)] border-y border-r border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 h-5 w-5 text-[color:var(--brand-vermillion)]" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-vermillion)]">
                  {suburb.sampleBusinesses[0]!.type}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold">{suburb.sampleBusinesses[0]!.name}</h3>
                <p className="mt-3 text-muted-foreground">
                  A {suburb.sampleBusinesses[0]!.type.toLowerCase()} near {suburb.landmarks[0]} used{" "}
                  {pillar.title.toLowerCase()} for: {suburb.sampleBusinesses[0]!.useCase}. The deal
                  closed with a soft credit pull only - no impact to the owner's personal score.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other pillars for this suburb */}
        <section className="bg-[color:var(--brand-cream)]">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Other Programs · {suburb.name}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Compare the other plays in {suburb.name}
            </h2>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {otherPillars.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/nashville/$suburb/$pillar"
                    params={{ suburb: suburb.slug, pillar: p.slug }}
                    className="group relative flex items-start justify-between gap-3 bg-card p-5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                  >
                    <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-1 font-display text-sm font-semibold">{p.title}, {suburb.name}</div>
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
              Funding Brief · 60 seconds
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {pillar.title}.
              <span className="block text-[color:var(--brand-vermillion)]">In {suburb.name}. Fast.</span>
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