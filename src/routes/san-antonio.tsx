import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { ArrowRight, MapPin, Banknote, Briefcase, Building2 } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { MONEY_PILLARS, VERTICAL_PILLARS, TOP_MONEY_PILLARS } from "@/lib/pillars-data";
import { SUBURBS } from "@/lib/suburbs-data";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";

export const Route = createFileRoute("/san-antonio")({
  head: ({ matches, match }) => {
    if (matches[matches.length - 1]?.routeId !== match.routeId) return {};
    const title = "San Antonio Business Loans Hub";
    const description =
      "The complete San Antonio, TX business funding directory: 24 loan programs across 10 neighborhoods and adjacent communities, from Downtown and the Pearl to Stone Oak, Schertz and New Braunfels.";
    return buildHead({
      title,
      description,
      path: "/san-antonio",
      schema: buildGraph({ title, description, path: "/san-antonio", pageType: "CollectionPage" }),
    });
  },
  component: SanAntonioHub,
});

function SanAntonioHub() {
  const matches = useMatches();
  const isLeaf = matches[matches.length - 1]?.routeId === "/san-antonio";
  if (!isLeaf) return <Outlet />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-border py-20 text-white"
          style={{ backgroundImage: "var(--gradient-hero)" }}
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
              <MapPin className="h-3.5 w-3.5" />
              The San Antonio Directory
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Every program.{" "}
              <span className="text-[color:var(--brand-vermillion)]">Every neighborhood.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              The complete Anchor Capital Group directory for San Antonio, TX — every loan program we
              broker, mapped to every neighborhood and adjacent community we serve.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="anchor-bevel rounded-none bg-[image:var(--gradient-cta)] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]">
                <Link to="/apply-now">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-white/30 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white">
                <Link to="/">Back to home</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              <span>10 Neighborhoods</span>
              <span aria-hidden>·</span>
              <span>24 Loan Programs</span>
              <span aria-hidden>·</span>
              <span>60+ Local Pages</span>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
                <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
                Coverage Map
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Neighborhoods & adjacent communities
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Each location has a dedicated page with local landmarks, sample businesses we fund,
                and the six GBP-active loan programs for that neighborhood.
              </p>
            </div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {String(SUBURBS.length).padStart(3, "0")} locations
            </span>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SUBURBS.map((s, i) => (
              <li key={s.slug}>
                <Link
                  to="/san-antonio/$suburb"
                  params={{ suburb: s.slug }}
                  className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                >
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <MapPin className="h-4 w-4 shrink-0 text-[color:var(--brand-crimson)] group-hover:text-[color:var(--brand-vermillion)]" />
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground group-hover:text-white/55">
                      {s.county}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold">{s.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground group-hover:text-white/65">{s.tagline}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-charcoal)]/60 group-hover:text-[color:var(--brand-vermillion)]">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Money pillars */}
        <PillarGrid
          title="Money pillars — general business financing"
          subtitle="The 14 core funding programs Anchor brokers for San Antonio businesses, with the six active GBP plays first."
          icon={Banknote}
          pillars={MONEY_PILLARS}
        />

        {/* Suburb × Services matrix */}
        <SuburbServicesMatrix />

        {/* Vertical pillars */}
        <PillarGrid
          title="Vertical pillars — industry-specific funding"
          subtitle="10 industry-specialized lending programs for South Texas operators."
          icon={Briefcase}
          pillars={VERTICAL_PILLARS}
          alt
        />
      </main>
      <Footer />
    </div>
  );
}

function PillarGrid({
  title,
  subtitle,
  icon: Icon,
  pillars,
  alt,
}: {
  title: string;
  subtitle: string;
  icon: typeof Banknote;
  pillars: typeof MONEY_PILLARS;
  alt?: boolean;
}) {
  return (
    <section className={`${alt ? "bg-[color:var(--brand-cream)]" : ""} border-t border-border/60 py-20`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-none text-white" style={{ background: "var(--gradient-primary)" }}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              {alt ? "Vertical Pillars · Sector Specific" : "Money Pillars · General"}
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
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
                <ArrowRight className="h-4 w-4 shrink-0 -translate-x-2 text-[color:var(--brand-vermillion)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SuburbServicesMatrix() {
  return (
    <section className="border-t border-border/60 bg-[color:var(--brand-cream)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-4">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-none text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              Matrix · Neighborhood × Program
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Services by neighborhood
            </h2>
            <p className="mt-1 max-w-2xl text-muted-foreground">
              Every neighborhood we serve, mapped to the six GBP-active money pillars San Antonio
              owners ask for most. Click any combination to open a dedicated, locally written page.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {SUBURBS.map((s, i) => (
            <div
              key={s.slug}
              className="rounded-none border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {s.county}
                    </span>
                  </div>
                  <Link
                    to="/san-antonio/$suburb"
                    params={{ suburb: s.slug }}
                    className="mt-1 inline-flex items-center gap-1 font-display text-lg font-semibold hover:text-[color:var(--brand-vermillion)]"
                  >
                    {s.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                </div>
                <MapPin className="h-5 w-5 shrink-0 text-[color:var(--brand-crimson)]" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {TOP_MONEY_PILLARS.map((p) => (
                  <Link
                    key={p.slug}
                    to="/san-antonio/$suburb/$pillar"
                    params={{ suburb: s.slug, pillar: p.slug }}
                    className="group inline-flex items-center justify-between gap-2 rounded-none border border-border/60 bg-background px-3 py-2 text-sm transition-colors hover:border-[color:var(--brand-vermillion)] hover:bg-[color:var(--brand-vermillion)]/8"
                  >
                    <span className="truncate">{p.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-[color:var(--brand-vermillion)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span>ZIPs · {s.zips.join(", ")}</span>
                <Link
                  to="/san-antonio/$suburb"
                  params={{ suburb: s.slug }}
                  className="text-[color:var(--brand-vermillion)] hover:underline"
                >
                  View hub →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
