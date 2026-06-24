import { createFileRoute, Link, notFound, Outlet, useMatches } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getSuburb, type Suburb } from "@/lib/suburbs-data";
import { TOP_MONEY_PILLARS, VERTICAL_PILLARS } from "@/lib/pillars-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, placeNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { SUBURB_BODIES } from "@/lib/suburbs-content";

export const Route = createFileRoute("/san-antonio/$suburb")({
  head: ({ params, matches, match }) => {
    if (matches[matches.length - 1]?.routeId !== match.routeId) return {};
    const s = getSuburb(params.suburb);
    const title = s ? `Business Loans in ${s.name}, TX` : "San Antonio Neighborhood";
    const description = s?.intro?.slice(0, 158) ?? "San Antonio neighborhood business funding.";
    const path = `/san-antonio/${params.suburb}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: s ? [placeNode({ path, name: `${s.name}, TX` })] : [],
      }),
    });
  },
  loader: ({ params }) => {
    const suburb = getSuburb(params.suburb);
    if (!suburb) throw notFound();
    return { suburb } as { suburb: Suburb };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Neighborhood not found</h1>
      <Button asChild className="mt-6"><Link to="/san-antonio">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: SuburbPage,
});

function SuburbPage() {
  const { suburb } = Route.useLoaderData();
  // If a deeper child route matched (e.g. /san-antonio/$suburb/$pillar),
  // let that render instead of this neighborhood page.
  const matches = useMatches();
  const isLeaf = matches[matches.length - 1]?.routeId === "/san-antonio/$suburb";
  if (!isLeaf) return <Outlet />;

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
              {suburb.county} · <span className="text-[color:var(--brand-charcoal)]">{suburb.name}</span>
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
              {suburb.county} · ZIP {suburb.zips.join(", ")}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {suburb.name}
              <span className="block text-[color:var(--brand-vermillion)]">Business Loans</span>
            </h1>
            <p className="mt-4 max-w-2xl font-display text-lg font-medium text-white/85">{suburb.tagline}</p>
            <p className="mt-5 text-base text-white/70 md:text-lg">{suburb.intro}</p>
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

        {/* Local context — landmarks + industries */}
        <section className="mx-auto grid max-w-7xl gap-px overflow-hidden border-x border-b border-border bg-border px-0 md:grid-cols-2">
          <div className="bg-card p-7">
            <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              <MapPin className="mr-2 inline h-3.5 w-3.5" /> Local Landmarks
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Our {suburb.name} advisors work directly with operators across these areas.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {suburb.landmarks.map((l: string) => (
                <li key={l} className="rounded-none border border-border bg-background px-3 py-1 text-xs text-foreground/80">{l}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-7">
            <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              <Building2 className="mr-2 inline h-3.5 w-3.5" /> Industries We Fund Here
            </div>
            <ul className="mt-5 space-y-2.5">
              {suburb.industries.map((i: string, idx: number) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[color:var(--brand-vermillion)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Long-form context */}
        {SUBURB_BODIES[suburb.slug] && (
          <section className="bg-[color:var(--brand-cream)]">
            <div className="mx-auto max-w-4xl px-6 py-16">
              <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
                <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
                Local Memo
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Business funding in {suburb.name}
              </h2>
              {SUBURB_BODIES[suburb.slug].map((p, i) => (
                <p key={i} className="mt-4 text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Sample businesses */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Case Files
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {suburb.name} businesses Anchor works with
            </h2>
            <p className="mt-2 text-muted-foreground">Representative case studies — composite profiles drawn from real funding outcomes.</p>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {suburb.sampleBusinesses.map((b: { name: string; type: string; useCase: string }, i: number) => (
                <li key={b.name} className="bg-card p-6">
                  <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{b.type}</div>
                  <h3 className="mt-2 font-display text-lg font-semibold">{b.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{b.useCase}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Top money pillars for this suburb */}
        <section className="bg-[color:var(--brand-cream)]">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Top Programs · {suburb.name}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              The six plays {suburb.name} owners ask for most
            </h2>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {TOP_MONEY_PILLARS.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/san-antonio/$suburb/$pillar"
                    params={{ suburb: suburb.slug, pillar: p.slug }}
                    className="group relative block bg-card p-5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                  >
                    <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-2 font-display text-sm font-semibold">{p.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground group-hover:text-white/65">{p.tagline}</div>
                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-vermillion)]">
                      Open in {suburb.name} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Industry pillars */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Industry Programs
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">Vertical pillars · {suburb.name}</h2>
            <p className="mt-2 text-muted-foreground">
              All ten industry-specific programs are available to {suburb.name} operators.
            </p>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {VERTICAL_PILLARS.slice(0, 9).map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/pillar/$slug"
                    params={{ slug: p.slug }}
                    className="group relative flex items-start justify-between gap-3 bg-card p-5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
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
              Funding · {suburb.name}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Anchor {suburb.name} businesses, fast.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Get matched with the right program in minutes — soft credit pull, no obligation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="anchor-bevel rounded-none bg-[image:var(--gradient-cta)] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]">
                <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-white/30 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white">
                <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> Call now</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}