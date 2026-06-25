import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIndustry, INDUSTRIES, type Service } from "@/lib/industries-data";
import { Header, Footer } from "./index";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { INDUSTRY_BODIES } from "@/lib/industries-content";

export const Route = createFileRoute("/industry/$slug")({
  head: ({ params }) => {
    const ind = getIndustry(params.slug);
    const title = ind ? `${ind.label} Business Financing` : "Industry Financing";
    const description = ind?.intro ?? "Specialized business financing for your industry.";
    const path = `/industry/${params.slug}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: ind
          ? [serviceNode({ path, name: `${ind.label} Business Financing`, description, serviceType: ind.label })]
          : [],
      }),
    });
  },
  loader: ({ params }) => {
    if (!getIndustry(params.slug)) throw notFound();
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Industry not found</h1>
      <p className="mt-3 text-muted-foreground">We don't have a page for that industry yet.</p>
      <Button asChild className="mt-6">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useParams();
  const industry = getIndustry(slug)!;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [industry.slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-20" />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-[color:var(--brand-cream)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[color:var(--brand-vermillion)]">
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
            <span className="text-muted-foreground">
              Sectors · <span className="text-[color:var(--brand-charcoal)]">{industry.label}</span>
            </span>
          </div>
        </div>

        {/* Hero - dark anchor band */}
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
              Sector Brief · {industry.label}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {industry.label}
              <span className="block text-[color:var(--brand-vermillion)]">Financing</span>
            </h1>
            <p className="mt-4 max-w-2xl font-display text-lg font-medium text-white/85">{industry.hero}</p>
            <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">{industry.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="anchor-bevel rounded-none bg-[image:var(--gradient-cta)] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]">
                <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none border-white/30 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white">
                <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> Talk to a specialist</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> Soft credit pull</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> 24-hour decisions</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" /> 75+ lender network</span>
            </div>
          </div>
        </section>

        {/* San Antonio industry context */}
        {INDUSTRY_BODIES[industry.slug] && (
          <section className="bg-[color:var(--brand-cream)]">
            <div className="mx-auto max-w-4xl px-6 py-16">
              <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
                <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
                Sector Memo
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                {industry.label} financing for San Antonio businesses
              </h2>
              {INDUSTRY_BODIES[industry.slug].map((p, i) => (
                <p key={i} className="mt-4 text-muted-foreground">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Services list - uniform card grid */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
            <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
            Programs · {industry.label}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            The plays we route most for {industry.label.toLowerCase()}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every option starts with a soft credit pull. Pre-screen takes 60 seconds.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {industry.services.map((svc: Service, i: number) => {
              const SIcon = svc.icon;
              return (
                <li key={svc.slug} className="flex">
                  <article className="group relative flex w-full min-w-0 flex-col bg-card p-6 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white">
                    <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <SIcon className="h-6 w-6 text-[color:var(--brand-crimson)] group-hover:text-[color:var(--brand-vermillion)]" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{svc.title}</h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground group-hover:text-white/55">{svc.tagline}</p>
                    <p className="mt-3 text-sm text-foreground/80 group-hover:text-white/75">{svc.description}</p>
                    <ul className="mt-4 space-y-2">
                      {svc.bullets.map((b: string) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[color:var(--brand-vermillion)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-none border border-[color:var(--brand-vermillion)]/40 bg-[color:var(--brand-vermillion)]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                      {svc.highlight}
                    </div>
                    <div className="mt-auto pt-5">
                      <Link
                        to="/apply-now"
                        className="anchor-bevel inline-flex w-full items-center justify-center gap-2 rounded-none bg-[image:var(--gradient-cta)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                      >
                        Apply Now <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Other industries */}
        <section className="bg-[color:var(--brand-cream)]">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
                  <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
                  Other Sectors
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">Explore other sectors</h2>
              </div>
              <Button asChild variant="outline" className="rounded-none border-[color:var(--brand-charcoal)]/20 bg-transparent text-xs font-semibold uppercase tracking-[0.14em] hover:border-[color:var(--brand-vermillion)] hover:bg-[color:var(--brand-vermillion)]/10 hover:text-[color:var(--brand-vermillion)]">
                <Link to="/">View all</Link>
              </Button>
            </div>
            <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 10).map((i, idx) => {
                const I = i.icon;
                return (
                  <li key={i.slug}>
                    <Link
                      to="/industry/$slug"
                      params={{ slug: i.slug }}
                      className="group relative flex h-full flex-col items-start gap-2 bg-card p-5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                    >
                      <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <I className="h-6 w-6 text-[color:var(--brand-crimson)] transition-colors group-hover:text-[color:var(--brand-vermillion)]" />
                      <span className="font-display text-sm font-medium">{i.label}</span>
                    </Link>
                  </li>
                );
              })}
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
              Ready to fund · {industry.label}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Move first.
              <span className="block text-[color:var(--brand-vermillion)]">Pre-qualify in 60 seconds.</span>
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