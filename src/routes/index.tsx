import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { buildHead } from "@/lib/seo";
import { buildGraph, faqNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Banknote,
  Building2,
  Truck,
  Stethoscope,
  UtensilsCrossed,
  ShoppingBag,
  Factory,
  Briefcase,
  Star,
  PhoneCall,
  CheckCircle2,
  Lock,
  Users,
  FileText,
  HandCoins,
  CreditCard,
  Wrench,
  Receipt,
  LineChart,
  Sparkles,
  Menu,
  MapPin,
  HelpCircle,
  BookOpen,
  Hammer,
  Plane,
  Flame,
  Package,
  Shield,
  Anchor,
  ArrowUpRight,
  Compass,
  Target,
} from "lucide-react";

const siteLogoUrl = "/foxlovkenders-removebg-preview.png";

type MegaItemProps = Readonly<{
  icon: LucideIcon;
  label: string;
  desc: string;
  href?: string;
  slug?: string;
  homeHash?: string;
}>;

const CITY = "Nashville";
const CITY_STATE = `${CITY}, TN`;

const HOME_FAQS = [
  {
    q: `How quickly can I get funded in ${CITY}?`,
    a: `Many of our lending partners can fund qualified ${CITY} businesses within 24-72 hours of approval. Same-day funding is available for select products like merchant cash advances and short-term loans.`,
  },
  {
    q: "Will checking my options affect my credit score?",
    a: "No. We use a soft credit pull to pre-qualify you. It does not affect your personal or business credit score.",
  },
  {
    q: "What credit score is required?",
    a: "Most of our lenders work with scores starting at 550 FICO. SBA loans and the best lines of credit typically require 650+.",
  },
  {
    q: "Can Middle Tennessee startups qualify?",
    a: "Yes. We work with lenders that fund businesses as young as 3 months, including SBA microloan programs designed for newer ventures.",
  },
  {
    q: "What documents are needed?",
    a: "Typically 3-6 months of business bank statements, basic business details and a valid ID. SBA loans may require tax returns and full financials.",
  },
  {
    q: "How much can I borrow?",
    a: "Funding ranges from $5,000 working capital advances up to $5,000,000 SBA and commercial real estate loans, depending on revenue and use of funds.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => {
    const title = `Business Loans in ${CITY_STATE}`;
    const description = `Working capital, invoice factoring, accounts receivable financing, SBA loans and small business loans for ${CITY_STATE}. Pre-qualify in minutes with a soft credit pull and review real offers in 24 hours.`;
    return buildHead({
      title,
      description,
      path: "/",
      schema: buildGraph({
        title,
        description,
        path: "/",
        extraNodes: [faqNode({ path: "/", faqs: HOME_FAQS })],
      }),
    });
  },
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div aria-hidden className="h-14" />
        <Hero />
        <CityHubCTA />
        <CapitalDesk />
        <HowItWorks />
        <Industries />
        <SuccessStories />
        <AnchorLedger />
        <CityIntro />
        <Security />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Scroll Reveal ---------------- */
function useScrollReveal() {
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const sections = Array.from(document.querySelectorAll("main > section"));
    const targets: Element[] = [];
    sections.forEach((section) => {
      Array.from(section.children).forEach((child) => {
        const el = child as HTMLElement;
        if (el.classList.contains("pointer-events-none")) return;
        if (el.tagName === "SVG") return;
        const inner = Array.from(el.children).filter(
          (c) => !(c as HTMLElement).classList.contains("pointer-events-none"),
        ) as HTMLElement[];
        if (inner.length > 1 && inner.length <= 8) {
          inner.forEach((c, i) => {
            c.classList.add("reveal");
            if (i > 0 && i <= 5) c.classList.add(`reveal-delay-${i}`);
            targets.push(c);
          });
        } else {
          el.classList.add("reveal");
          targets.push(el);
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Header ---------------- */

const LOAN_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "GBP Active Plays",
    items: [
      { icon: Receipt, label: "Accounts Receivable Financing", desc: "Borrow against open A/R", slug: "accounts-receivable-financing" },
      { icon: Receipt, label: "Invoice Factoring", desc: "Same-day cash on invoices", slug: "invoice-factoring" },
      { icon: LineChart, label: "Revenue Based Financing", desc: "Repay as a % of monthly revenue", slug: "revenue-based-financing" },
      { icon: HandCoins, label: "Small Business Loans", desc: "Compare every funding product", slug: "small-business-loans" },
      { icon: MapPin, label: "Small Business Loans Near Me", desc: "Nashville-based loan advisors", slug: "small-business-loans-near-me" },
      { icon: FileText, label: "SBA Loans", desc: "Government-backed funding programs", slug: "sba-loans" },
    ],
  },
  {
    heading: "Working Capital & Credit",
    items: [
      { icon: CreditCard, label: "Business Line of Credit", desc: "Revolving credit when you need it", slug: "business-line-of-credit" },
      { icon: LineChart, label: "Working Capital Loans", desc: "Cover payroll & seasonal gaps", slug: "working-capital-loans" },
      { icon: Banknote, label: "Merchant Cash Advance", desc: "Capital based on future card sales", slug: "merchant-cash-advance" },
      { icon: ShieldCheck, label: "Unsecured Business Loans", desc: "No collateral required", slug: "unsecured-business-loans" },
      { icon: Sparkles, label: "Startup Business Loans", desc: "Funding for newer ventures", slug: "startup-business-loans" },
    ],
  },
  {
    heading: "SBA, Acquisition & Equipment",
    items: [
      { icon: FileText, label: "SBA 7(a) Loan", desc: "The SBA's flagship program", slug: "sba-7a-loan" },
      { icon: Briefcase, label: "Business Acquisition Loans", desc: "Buy an existing Nashville business", slug: "business-acquisition-loans" },
      { icon: Wrench, label: "Equipment Financing", desc: "Machinery, vehicles & tools", slug: "equipment-financing" },
      { icon: Factory, label: "Manufacturing Equipment", desc: "CNC, robotics & production", slug: "manufacturing-equipment-financing" },
    ],
  },
];

const INDUSTRY_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "Healthcare & Professional",
    items: [
      { icon: Stethoscope, label: "Medical Practice Loans", desc: "Clinics & physician groups", slug: "medical-practice-loans" },
      { icon: Stethoscope, label: "Dental Practice Loans", desc: "Equipment, expansion, acquisition", slug: "dental-practice-loans" },
      { icon: Briefcase, label: "Professional Services", desc: "Law, accounting, consulting", href: "/industry/professional-services" },
    ],
  },
  {
    heading: "Hospitality & Retail",
    items: [
      { icon: UtensilsCrossed, label: "Restaurant Loans", desc: "Fit-out, expansion, equipment", slug: "restaurant-loans" },
      { icon: ShoppingBag, label: "Retail Business Loans", desc: "Inventory & storefront", slug: "retail-business-loans" },
      { icon: Building2, label: "Hotel Loans", desc: "Acquisition & PIP renovation", slug: "hotel-loans" },
    ],
  },
  {
    heading: "Trades, Logistics & Industrial",
    items: [
      { icon: Hammer, label: "Construction Business Loans", desc: "Ground-up & renovation", slug: "construction-business-loans" },
      { icon: Truck, label: "Trucking Business Loans", desc: "Owner-operators to fleets", slug: "trucking-business-loans" },
      { icon: Factory, label: "Manufacturing Equipment", desc: "CNC, robotics & production", slug: "manufacturing-equipment-financing" },
      { icon: Package, label: "Distribution & Logistics", desc: "AR financing & equipment", href: "/industry/distribution" },
    ],
  },
  {
    heading: "Music City & Hospitality",
    items: [
      { icon: Flame, label: "Hospitality & Events", desc: "Nashville event ecosystem", slug: "oilfield-services-loans" },
      { icon: Plane, label: "Healthcare & Insurance", desc: "Vanderbilt & HCA operators", href: "/industry/defense-aerospace" },
      { icon: Shield, label: "Veteran Business Loans", desc: "SBA Express for veterans", slug: "veteran-business-loans" },
    ],
  },
];

const SERVICE_AREAS: { region: string; suburbs: { name: string; slug: string }[] }[] = [
  {
    region: "City of Nashville",
    suburbs: [
      { name: "Downtown Nashville", slug: "downtown-nashville" },
      { name: "Germantown", slug: "germantown" },
      { name: "12 South", slug: "twelve-south" },
      { name: "East Nashville", slug: "east-nashville" },
      { name: "The Gulch", slug: "the-gulch" },
      { name: "Wedgewood-Houston", slug: "wedgewood-houston" },
    ],
  },
  {
    region: "Davidson County",
    suburbs: [
      { name: "Belle Meade", slug: "belle-meade" },
      { name: "Hendersonville", slug: "hendersonville" },
    ],
  },
  {
    region: "Williamson County",
    suburbs: [
      { name: "Brentwood", slug: "brentwood" },
      { name: "Franklin", slug: "franklin" },
    ],
  },
];

function MegaItem({
  icon: Icon,
  label,
  desc,
  href,
  slug,
  homeHash,
}: MegaItemProps) {
  const itemClass = "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-[color:var(--brand-charcoal)]/5";
  const inner = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[color:var(--brand-vermillion)]/10 text-[color:var(--brand-vermillion)] transition-colors group-hover:bg-[color:var(--brand-vermillion)]/18">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold leading-tight text-foreground">{label}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{desc}</span>
      </span>
    </>
  );
  if (homeHash) {
    return (
      <NavigationMenuLink asChild>
        <Link to="/" hash={homeHash} className={itemClass}>
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  if (slug) {
    return (
      <NavigationMenuLink asChild>
        <Link
          to="/pillar/$slug"
          params={{ slug }}
          className={itemClass}
        >
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  return (
    <NavigationMenuLink asChild>
      <a
        href={href ?? "#"}
        className={itemClass}
      >
        {inner}
      </a>
    </NavigationMenuLink>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--brand-charcoal)]/10 bg-white/97 text-[color:var(--brand-charcoal)] shadow-[0_2px_16px_-4px_oklch(0.1_0.02_148/0.10)] backdrop-blur supports-[backdrop-filter]:bg-white/92">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-cta)]" />
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <a href="/" className="flex items-center font-semibold">
          <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-9 w-auto" />
          <span className="sr-only">{SITE_CONFIG.name}</span>
        </a>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-0">

            {/* ── Capital ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-[color:var(--brand-charcoal)] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Capital</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light flex w-[860px] overflow-hidden rounded-xl shadow-[0_20px_60px_-12px_oklch(0.1_0.02_148/0.18)] ring-1 ring-border">
                  {/* Left sidebar */}
                  <div className="flex w-52 shrink-0 flex-col justify-between bg-[color:var(--brand-charcoal)] p-5 text-white">
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand-vermillion)]/20">
                        <Banknote className="h-4 w-4 text-[color:var(--brand-vermillion)]" />
                      </div>
                      <p className="mt-3 text-sm font-bold leading-snug">Capital Programs</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/55">
                        15 active loan products. One soft-pull application.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-white/40">Quick apply</p>
                      <Button asChild size="sm" className="btn-foxglove mt-2 w-full text-xs font-bold text-white">
                        <Link to="/apply-now" className="gap-1.5">
                          Start Application <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                      <p className="mt-2 text-[10px] text-white/35">Soft pull . No commitment</p>
                    </div>
                  </div>
                  {/* Right link grid */}
                  <div className="flex-1 overflow-auto p-5">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                      {LOAN_GROUPS.map((g) => (
                        <div key={g.heading}>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--brand-vermillion)]">
                            {g.heading}
                          </p>
                          <div className="space-y-px">
                            {g.items.map((it) => (
                              <MegaItem key={it.label} {...it} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Sectors ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-[color:var(--brand-charcoal)] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Sectors</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light flex w-[920px] overflow-hidden rounded-xl shadow-[0_20px_60px_-12px_oklch(0.1_0.02_148/0.18)] ring-1 ring-border">
                  {/* Left sidebar */}
                  <div className="flex w-52 shrink-0 flex-col justify-between bg-[color:var(--brand-charcoal)] p-5 text-white">
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand-vermillion)]/20">
                        <Building2 className="h-4 w-4 text-[color:var(--brand-vermillion)]" />
                      </div>
                      <p className="mt-3 text-sm font-bold leading-snug">Industry Sectors</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/55">
                        10 sectors. Specialist lender benches for each.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <Link
                        to="/nashville"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[color:var(--brand-vermillion)] hover:underline"
                      >
                        Browse all sectors <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                  {/* Right link grid */}
                  <div className="flex-1 overflow-auto p-5">
                    <div className="grid grid-cols-4 gap-x-5 gap-y-1">
                      {INDUSTRY_GROUPS.map((g) => (
                        <div key={g.heading}>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--brand-vermillion)]">
                            {g.heading}
                          </p>
                          <div className="space-y-px">
                            {g.items.map((it) => (
                              <MegaItem key={it.label} {...it} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Coverage ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-[color:var(--brand-charcoal)] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Coverage</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light flex w-[680px] overflow-hidden rounded-xl shadow-[0_20px_60px_-12px_oklch(0.1_0.02_148/0.18)] ring-1 ring-border">
                  {/* Left sidebar */}
                  <div className="flex w-52 shrink-0 flex-col justify-between bg-[color:var(--brand-charcoal)] p-5 text-white">
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand-vermillion)]/20">
                        <MapPin className="h-4 w-4 text-[color:var(--brand-vermillion)]" />
                      </div>
                      <p className="mt-3 text-sm font-bold leading-snug">Nashville Coverage</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/55">
                        Every neighborhood in the greater {CITY_STATE} metro.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <Link
                        to="/nashville"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[color:var(--brand-vermillion)] hover:underline"
                      >
                        Full Nashville hub <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                  {/* Right area */}
                  <div className="flex-1 overflow-auto p-5">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      {SERVICE_AREAS.map((sa) => (
                        <div key={sa.region}>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--brand-vermillion)]">
                            {sa.region}
                          </p>
                          <ul className="space-y-px">
                            {sa.suburbs.map((s) => (
                              <li key={s.slug}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to="/nashville/$suburb"
                                    params={{ suburb: s.slug }}
                                    className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-[color:var(--brand-charcoal)]/5 hover:text-[color:var(--brand-charcoal)]"
                                  >
                                    <span className="h-1 w-1 shrink-0 rounded-full bg-[color:var(--brand-vermillion)]/40 transition-colors group-hover:bg-[color:var(--brand-vermillion)]" />
                                    {s.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ── Insights ── */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-[color:var(--brand-charcoal)] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Insights</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light flex w-[460px] overflow-hidden rounded-xl shadow-[0_20px_60px_-12px_oklch(0.1_0.02_148/0.18)] ring-1 ring-border">
                  {/* Left sidebar */}
                  <div className="flex w-44 shrink-0 flex-col justify-between bg-[color:var(--brand-charcoal)] p-5 text-white">
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand-vermillion)]/20">
                        <BookOpen className="h-4 w-4 text-[color:var(--brand-vermillion)]" />
                      </div>
                      <p className="mt-3 text-sm font-bold leading-snug">Resources</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/55">
                        Guides, success stories and answers.
                      </p>
                    </div>
                  </div>
                  {/* Right links */}
                  <div className="flex-1 p-4">
                    <div className="space-y-px">
                      <MegaItem icon={BookOpen} label="How It Works" desc="Our 4-step funding process" homeHash="how" />
                      <MegaItem icon={Star} label="Success Stories" desc={`Real ${CITY} businesses we funded`} homeHash="stories" />
                      <MegaItem icon={HelpCircle} label="FAQs" desc="Answers to common funding questions" homeHash="faq" />
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="nav-item rounded-none bg-transparent text-[color:var(--brand-charcoal)] hover:bg-transparent focus:bg-transparent">
                <Link to="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <a
            href={SITE_CONFIG.phoneHref}
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-charcoal)]/60 transition-colors hover:text-[color:var(--brand-vermillion)] xl:inline-flex"
          >
            <PhoneCall className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" />
            {SITE_CONFIG.phone}
          </a>
          <Button
            size="sm"
            asChild
            className="btn-foxglove hidden h-9 px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:inline-flex"
          >
            <Link to="/apply-now" className="gap-2">
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full border border-[color:var(--brand-charcoal)]/20 bg-transparent text-[color:var(--brand-charcoal)] hover:bg-[color:var(--brand-charcoal)]/8 hover:text-[color:var(--brand-charcoal)] lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground">
                    <Anchor className="h-3.5 w-3.5" />
                  </span>
                  {SITE_CONFIG.name}
                </SheetTitle>
              </SheetHeader>
              <div className="px-3 py-3">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="loans">
                    <AccordionTrigger className="px-2 text-base font-semibold">Capital</AccordionTrigger>
                    <AccordionContent>
                      {LOAN_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-emerald-mid)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ind">
                    <AccordionTrigger className="px-2 text-base font-semibold">Sectors</AccordionTrigger>
                    <AccordionContent>
                      {INDUSTRY_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-emerald-mid)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="areas">
                    <AccordionTrigger className="px-2 text-base font-semibold">Coverage</AccordionTrigger>
                    <AccordionContent>
                      {SERVICE_AREAS.map((sa) => (
                        <div key={sa.region} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-emerald-mid)]">
                            {sa.region}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                            {sa.suburbs.map((s) => (
                              <SheetClose asChild key={s.slug}>
                                <Link
                                  to="/nashville/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  {s.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="res">
                    <AccordionTrigger className="px-2 text-base font-semibold">Insights</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {[
                          { label: "How It Works", hash: "how" },
                          { label: "Success Stories", hash: "stories" },
                          { label: "FAQs", hash: "faq" },
                        ].map((l) => (
                          <li key={l.label}>
                            <SheetClose asChild>
                              <Link to="/" hash={l.hash} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                {l.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4 space-y-2 border-t border-border px-2 pt-4">
                  <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 text-sm font-medium">
                    <PhoneCall className="h-4 w-4 text-[color:var(--brand-bronze)]" /> {SITE_CONFIG.phone}
                  </a>
                  <SheetClose asChild>
                    <Button asChild className="btn-foxglove w-full text-sm font-bold text-white">
                      <a href={SITE_CONFIG.phoneHref} className="gap-2">
                        <PhoneCall className="h-4 w-4" /> Call {SITE_CONFIG.phone}
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero - Anchor identity: split-pane with stat callouts ---------------- */
function Hero() {
  const neighborhoods = [
    { slug: "downtown-nashville", name: "Downtown Nashville", blurb: "Honky-tonks & music row" },
    { slug: "germantown", name: "Germantown", blurb: "Restaurants & artisan trades" },
    { slug: "twelve-south", name: "12 South", blurb: "Boutiques & food & beverage" },
    { slug: "the-gulch", name: "The Gulch", blurb: "Tech, fitness & upscale dining" },
    { slug: "east-nashville", name: "East Nashville", blurb: "Creative trades & hospitality" },
    { slug: "brentwood", name: "Brentwood", blurb: "Professional services & retail" },
  ];
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-cream)]">
      <div aria-hidden className="h-1 w-full bg-[image:var(--gradient-cta)]" />
      <div className="mx-auto grid max-w-none lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px]">
        {/* Left col  -  cream editorial */}
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-28 xl:pl-24">
          <div className="fg-eyebrow">
            <span aria-hidden className="fg-eyebrow-dot" />
            Nashville, Tennessee . Business Capital
          </div>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-[color:var(--brand-charcoal)] sm:text-5xl lg:text-[3.5rem]">
            Middle Tennessee's{" "}
            <em className="not-italic text-[color:var(--primary)]">lending</em>{" "}
            partner.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Foxglove Lenders brokers invoice factoring, AR lines, SBA loans and working capital for Nashville and Middle Tennessee businesses. One soft-pull application, 75+ Tennessee-active lenders.
          </p>
          <div className="mt-8 grid grid-cols-3 divide-x divide-border border-y border-border py-5">
            {[
              { v: SITE_CONFIG.stats.businessesFunded, l: "Businesses funded" },
              { v: SITE_CONFIG.stats.loansFacilitated, l: "Loans facilitated" },
              { v: SITE_CONFIG.stats.fastestFundingHours, l: "Fastest funding" },
            ].map(({ v, l }) => (
              <div key={l} className="px-4 first:pl-0">
                <div className="text-2xl font-bold text-[color:var(--primary)] md:text-3xl">{v}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="btn-foxglove px-8 text-sm font-bold tracking-wide text-white"
            >
              <Link to="/apply-now" className="gap-2">Get Funded <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="btn-foxglove-outline px-7 text-sm font-semibold"
            >
              <a href={SITE_CONFIG.phoneHref} className="gap-2"><PhoneCall className="h-4 w-4" /> {SITE_CONFIG.phone}</a>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> Soft pull only</span>
            <span aria-hidden>.</span>
            <span>No commitment required</span>
          </div>
        </div>

        {/* Right col  -  botanical green panel with Nashville neighborhood grid */}
        <div className="flex flex-col justify-center bg-[color:var(--primary)] px-6 py-14 sm:px-8 lg:px-10 lg:py-28">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-bronze)]">
            Nashville neighborhoods
          </div>
          <h2 className="mt-2 text-xl font-bold text-white">Capital for every corner of Music City</h2>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                to="/nashville/$suburb"
                params={{ suburb: n.slug }}
                className="group flex flex-col gap-1 border border-white/10 bg-white/5 px-3 py-3 transition-colors hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white group-hover:text-[color:var(--brand-bronze)]">
                  {n.name}
                </span>
                <span className="text-[11px] text-white/55">{n.blurb}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-bronze)]">
              Foxglove Lenders advisor on call
            </div>
            <a
              href={SITE_CONFIG.phoneHref}
              className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline"
            >
              {SITE_CONFIG.phone} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {SITE_CONFIG.trustBadges.slice(0, 3).map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-[11px] text-white/55">
                <CheckCircle2 className="h-3 w-3 text-[color:var(--brand-bronze)]" /> {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Anchor Ledger - relocated metrics + GBP plays on a dark band ---------------- */
function AnchorLedger() {
  const metrics = [
    { value: SITE_CONFIG.stats.businessesFunded, label: "Businesses funded" },
    { value: SITE_CONFIG.stats.loansFacilitated, label: "Loans facilitated" },
    { value: `${SITE_CONFIG.stats.reviewsRating}/5`, label: `${SITE_CONFIG.stats.reviewsCount} reviews` },
    { value: SITE_CONFIG.stats.fastestFundingHours, label: "Fastest funding" },
  ];
  const plays: { slug: string; label: string; icon: LucideIcon }[] = [
    { slug: "accounts-receivable-financing", label: "Accounts Receivable Financing", icon: Receipt },
    { slug: "invoice-factoring", label: "Invoice Factoring", icon: Receipt },
    { slug: "revenue-based-financing", label: "Revenue Based Financing", icon: LineChart },
    { slug: "small-business-loans", label: "Small Business Loans", icon: HandCoins },
    { slug: "small-business-loans-near-me", label: "Loans Near Me", icon: MapPin },
    { slug: "sba-loans", label: "SBA Loans", icon: FileText },
  ];
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-16 text-white sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-10" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand-vermillion) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand-crimson) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-3">
          <div className="fg-eyebrow">
            <span aria-hidden className="fg-eyebrow-dot" />
            The Ledger
          </div>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            What Foxglove Lenders brokers - and the numbers that back it.
          </h2>
          <span aria-hidden className="fg-rule" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Metrics column - large ticker numbers */}
          <div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10">
              {metrics.map((m) => (
                <div key={m.label} className="bg-[color:var(--brand-charcoal)] p-6">
                  <div className="font-display text-3xl font-bold tracking-tight text-[color:var(--brand-vermillion)] sm:text-4xl">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              {SITE_CONFIG.trustBadges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-[color:var(--brand-vermillion)]" />
                  {b}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-[color:var(--brand-vermillion)]" />
                Bank-Level Encryption
              </span>
            </div>
            <p className="mt-5 text-xs text-white/55">
              There are <strong className="font-semibold text-white">{SITE_CONFIG.featuredStat.value}</strong>{" "}
              {SITE_CONFIG.featuredStat.claim}.{" "}
              <a
                href={SITE_CONFIG.featuredStat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[color:var(--brand-vermillion)]"
              >
                {SITE_CONFIG.featuredStat.sourceName}
              </a>
              .
            </p>
          </div>

          {/* Plays column - vertical list with monospaced index */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-semibold text-white">
                The six plays we route most
              </h3>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                006 / 006
              </span>
            </div>
            <ol className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {plays.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to="/pillar/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-center gap-4 py-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-white/5 text-[color:var(--brand-vermillion)] transition-colors group-hover:border-[color:var(--brand-vermillion)] group-hover:bg-[color:var(--brand-vermillion)]/10">
                      <p.icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 truncate font-display text-base font-medium text-white">
                      {p.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 -translate-x-2 text-white/40 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-[color:var(--brand-vermillion)] group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Hub CTA ---------------- */
function CityHubCTA() {
  const highlights = [
    "10 neighborhoods & adjacent communities",
    "24 loan programs mapped locally",
    "60 dedicated neighborhood × program pages",
  ];
  return (
    <section className="relative overflow-hidden py-12 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-6 text-white sm:p-8 md:p-14"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-20" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="fg-eyebrow backdrop-blur">
                <span aria-hidden className="fg-eyebrow-dot" />
                <MapPin className="h-3 w-3" /> Explore the Nashville Hub
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Every neighborhood. Every loan program. One directory.
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                Jump into the Nashville city hub to browse every neighborhood we serve and the
                programs available in each. Every combination opens its own locally written page.
              </p>
              <ul className="mt-6 space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--brand-bronze)]" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="btn-foxglove w-full px-7 text-sm font-bold text-white sm:w-auto"
                >
                  <Link to="/nashville" className="gap-2">
                    Visit the Nashville Hub <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="btn-ghost-white w-full px-7 text-sm font-semibold sm:w-auto"
                >
                  <Link to="/apply-now">Apply Now</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div className="text-xs uppercase tracking-wider text-white/70">Inside the hub</div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center rounded-xl bg-white/10 px-1 py-3">
                  <div className="text-xl font-bold">10</div>
                  <div className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-white/70">Areas</div>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-white/10 px-1 py-3">
                  <div className="text-xl font-bold">24</div>
                  <div className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-white/70">Programs</div>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-white/10 px-1 py-3">
                  <div className="text-xl font-bold">60+</div>
                  <div className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-white/70">Local Pages</div>
                </div>
              </div>
              <Link
                to="/nashville"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white hover:underline"
              >
                Browse the full directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Capital Desk - the 6 GBP plays as full cards ----------------
   Icons come from /capitaldeskicons.png - a 1536x1024 sprite sheet laid out
   as 3 cols × 2 rows of 512×512 cells, in the same order as the desk array. */
function CapitalDesk() {
  const desk = [
    {
      slug: "accounts-receivable-financing",
      title: "Accounts Receivable Financing",
      lede: "Revolving line secured by your open invoices - without selling them.",
      stat: "Up to 90% AR advance",
      tag: "Lines $250K-$20M",
    },
    {
      slug: "invoice-factoring",
      title: "Invoice Factoring",
      lede: "Same-day cash on freight, staffing or oilfield invoices.",
      stat: "Funded in 24 hrs",
      tag: "Advance up to 95%",
    },
    {
      slug: "revenue-based-financing",
      title: "Revenue Based Financing",
      lede: "Repay as a fixed percentage of monthly revenue. No equity.",
      stat: "$50K - $5M",
      tag: "Flexible repayment",
    },
    {
      slug: "small-business-loans",
      title: "Small Business Loans",
      lede: "One soft-pull application - every major loan product compared.",
      stat: "75+ lenders",
      tag: "$5K - $5M",
    },
    {
      slug: "small-business-loans-near-me",
      title: "Small Business Loans Near Me",
      lede: "Local advisors who know the Davidson County lender bench.",
      stat: "60-second match",
      tag: "Nashville advisors",
    },
    {
      slug: "sba-loans",
      title: "SBA Loans",
      lede: "SBA 7(a), 504 and Express through Tennessee-active Preferred Lenders.",
      stat: "From 8.25% APR",
      tag: "Up to $5M",
    },
  ];
  const accentColors = [
    { bg: "oklch(0.96 0.04 148)", text: "oklch(0.32 0.10 148)", border: "oklch(0.85 0.08 148)" },
    { bg: "oklch(0.96 0.04 50)",  text: "oklch(0.55 0.11 50)",  border: "oklch(0.88 0.08 50)"  },
    { bg: "oklch(0.94 0.05 148)", text: "oklch(0.28 0.10 148)", border: "oklch(0.82 0.09 148)" },
    { bg: "oklch(0.95 0.05 50)",  text: "oklch(0.50 0.11 50)",  border: "oklch(0.85 0.09 50)"  },
    { bg: "oklch(0.96 0.04 148)", text: "oklch(0.36 0.10 148)", border: "oklch(0.86 0.07 148)" },
    { bg: "oklch(0.95 0.04 50)",  text: "oklch(0.52 0.10 50)",  border: "oklch(0.86 0.08 50)"  },
  ];
  return (
    <section id="capital" className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-14 sm:py-24 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-10" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand-vermillion) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="fg-eyebrow">
              <span aria-hidden className="fg-eyebrow-dot" />
              The Capital Desk
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Six programs Nashville<br className="hidden sm:block" /> asks for most
            </h2>
            <span aria-hidden className="fg-rule" />
          </div>
          <p className="max-w-sm text-sm text-white/60 md:text-right">
            The active plays  -  loan products we route most often for Middle Tennessee operators.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {desk.map((d, i) => {
            const accent = accentColors[i];
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                to="/pillar/$slug"
                params={{ slug: d.slug }}
                key={d.slug}
                className="group relative flex flex-col gap-0 bg-[color:var(--brand-charcoal)] transition-colors hover:bg-[color:var(--brand-charcoal-soft)]"
              >
                {/* top accent bar grows on hover */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[image:var(--gradient-cta)] transition-transform duration-500 group-hover:scale-x-100" />

                {/* number + tag row */}
                <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
                  <span className="font-mono text-[11px] font-bold tracking-[0.22em] text-[color:var(--brand-vermillion)]">
                    {num}
                  </span>
                  <span
                    className="rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: accent.bg, color: accent.text, border: `1px solid ${accent.border}` }}
                  >
                    {d.tag}
                  </span>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col px-6 py-5">
                  <h3 className="text-base font-bold leading-snug tracking-tight text-white">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55 group-hover:text-white/75 transition-colors">
                    {d.lede}
                  </p>

                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold"
                      style={{ background: accent.bg, color: accent.text }}
                    >
                      {d.stat}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50 transition-all group-hover:border-[color:var(--brand-vermillion)] group-hover:bg-[color:var(--brand-vermillion)]/15 group-hover:text-[color:var(--brand-vermillion)]">
                      <ArrowUpRight className="h-4 w-4 -translate-x-px translate-y-px transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="btn-foxglove px-9 text-sm font-bold tracking-wide text-white">
            <Link to="/apply-now" className="gap-2">
              See all capital programs <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works - Texas-flavored 4-step ---------------- */
function HowItWorks() {
  const steps = [
    { n: 1, title: "Tell us the brief", desc: "60 seconds: how much, what for, how soon. No documents up front." },
    { n: 2, title: "We shop the bench", desc: "Foxglove Lenders pre-screens 75+ Tennessee-active lenders against your profile." },
    { n: 3, title: "Compare real offers", desc: "Side-by-side: rates, terms, fees and remit schedules - no spin." },
    { n: 4, title: "Funded", desc: "Sign the docs and receive funds in as little as 24 hours." },
  ];
  return (
    <section id="how" className="relative overflow-hidden bg-[color:var(--primary)] py-12 sm:py-20 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-15" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-bronze) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="fg-eyebrow border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/10 text-[color:var(--brand-bronze)]" style={{ borderColor: "color-mix(in oklab, var(--brand-vermillion) 40%, transparent)" }}>
            <span aria-hidden className="fg-eyebrow-dot" />
            The Foxglove Lenders process
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Four steps. Zero surprises.
          </h2>
          <span aria-hidden className="fg-rule mx-auto" style={{ background: "linear-gradient(135deg, var(--brand-vermillion), oklch(0.85 0.10 50))" }} />
          <p className="mt-4 text-white/75">
            How {CITY} operators move from "we need capital" to "the wire cleared."
          </p>
        </div>
        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-[color:var(--brand-vermillion)]/30 hover:bg-white/[0.08]"
            >
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[image:var(--gradient-cta)] transition-transform duration-500 group-hover:scale-x-100 rounded-none" />
              <div className="fg-step-badge">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries - numbered ledger with Texas-specialty markers ---------------- */
function Industries() {
  type Ind = { icon: LucideIcon; label: string; slug: string; blurb: string; tx?: boolean };
  const inds: Ind[] = [
    { icon: Building2, label: "Construction", slug: "construction", blurb: "GCs, trades & ground-up." },
    { icon: Stethoscope, label: "Healthcare", slug: "healthcare", blurb: "Vanderbilt to TriStar campuses." },
    { icon: UtensilsCrossed, label: "Hospitality", slug: "hospitality", blurb: "Broadway to 12 South kitchens." },
    { icon: Truck, label: "Transportation", slug: "transportation", blurb: "I-24/I-65 freight & logistics." },
    { icon: ShoppingBag, label: "Retail", slug: "retail", blurb: "Storefronts & inventory." },
    { icon: Factory, label: "Manufacturing", slug: "manufacturing", blurb: "Nissan corridor suppliers.", tx: true },
    { icon: Briefcase, label: "Professional", slug: "professional-services", blurb: "Law, accounting, consulting." },
    { icon: Flame, label: "Oilfield Services", slug: "oilfield-services", blurb: "Music City event ecosystem.", tx: true },
    { icon: Plane, label: "Defense & Aerospace", slug: "defense-aerospace", blurb: "HCA & insurance operators.", tx: true },
    // { icon: Package, label: "Distribution", slug: "distribution", blurb: "I-35 NE 3PLs & warehouses." },
  ];
  const n = (i: number) => String(i + 1).padStart(2, "0");
  return (
    <section id="industries" className="relative overflow-hidden bg-[color:var(--brand-cream)] py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[color:var(--brand-vermillion)]/30" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand-vermillion) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="fg-eyebrow">
              <span aria-hidden className="fg-eyebrow-dot" />
              Sector Ledger . 010
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
              The ten sectors Foxglove Lenders underwrites first
            </h2>
            <span aria-hidden className="fg-rule" />
            <p className="mt-4 text-muted-foreground">
              Each row is a specialty bench. Tennessee-specific verticals carry a <span className="font-semibold text-[color:var(--brand-vermillion)]">TN</span> marker - these are deals we won't hand off to a generalist.
            </p>
          </div>
          <Button asChild size="lg" className="btn-foxglove-outline px-7 text-sm font-semibold">
            <Link to="/nashville" className="gap-2">
              View all 24 programs <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[color:var(--brand-charcoal)]/10 bg-[color:var(--brand-charcoal)]/10 sm:grid-cols-2 lg:grid-cols-4">
          {inds.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <li key={ind.slug} className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
                <Link
                  to="/industry/$slug"
                  params={{ slug: ind.slug }}
                  className={`group relative flex h-full flex-col justify-between gap-6 bg-card p-6 transition-all hover:bg-[color:var(--brand-charcoal)] hover:text-white ${i === 0 ? "lg:p-10" : ""}`}
                >
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[color:var(--brand-vermillion)] transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[color:var(--brand-vermillion)]">
                      {n(i)}
                    </span>
                    {ind.tx && (
                      <span className="inline-flex items-center gap-1 rounded-sm border border-[color:var(--brand-vermillion)]/50 bg-[color:var(--brand-vermillion)]/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                        TN Specialty
                      </span>
                    )}
                  </div>
                  <div>
                    <Icon className={`text-[color:var(--brand-crimson)] transition-colors group-hover:text-[color:var(--brand-vermillion)] ${i === 0 ? "h-12 w-12" : "h-8 w-8"}`} />
                    <h3 className={`mt-4 font-display font-semibold tracking-tight ${i === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}>
                      {ind.label}
                    </h3>
                    <p className={`mt-2 text-muted-foreground group-hover:text-white/75 ${i === 0 ? "text-base" : "text-xs"}`}>
                      {ind.blurb}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[color:var(--brand-charcoal)]/10 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-charcoal)]/60 transition-colors group-hover:border-white/20 group-hover:text-[color:var(--brand-vermillion)]">
                    <span>Open sector</span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Success Stories ---------------- */
function SuccessStories() {
  // Embla can mis-measure on the first hydrated paint (slidesInView returns 0,
  // transform stays at 0). reInit after two animation frames (so layout has
  // fully settled) plus on any container resize.
  const [api, setApi] = useState<CarouselApi | null>(null);
  useEffect(() => {
    if (!api) return;
    let raf = 0;
    raf = window.requestAnimationFrame(() => {
      raf = window.requestAnimationFrame(() => api.reInit());
    });
    const container = api.containerNode();
    const ro = new ResizeObserver(() => api.reInit());
    if (container) ro.observe(container);
    const autoplay = setInterval(() => {
      if (!api.canScrollNext()) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 3500);
    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      clearInterval(autoplay);
    };
  }, [api]);
  const stories = [
    {
      name: "Germantown Event Co.",
      amount: "$420,000",
      result: "Same-day cash on open event invoices through factoring.",
      type: "Invoice Factoring",
      person: "Marco Delgado",
      role: "Owner & Operator",
      tint: "from-[oklch(0.55_0.18_30)] to-[oklch(0.36_0.18_22)]",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Brentwood Distribution Co.",
      amount: "$1,800,000",
      result: "Revolving AR line scaled with their big-box customer base.",
      type: "Accounts Receivable Financing",
      person: "Renee Calderon",
      role: "CFO",
      tint: "from-[oklch(0.62_0.2_35)] to-[oklch(0.42_0.19_25)]",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Belle Meade Dental Partners",
      amount: "$2,400,000",
      result: "SBA 7(a) for partner buy-in plus new CBCT scanner.",
      type: "SBA 7(a) Loan",
      person: "Dr. Priya Anand",
      role: "Managing Partner",
      tint: "from-[oklch(0.65_0.18_40)] to-[oklch(0.45_0.19_25)]",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "12 South Kitchen Co.",
      amount: "$180,000",
      result: "Working capital line that flexes with event-driven sales.",
      type: "Working Capital Loan",
      person: "Tomás Reyes",
      role: "Executive Chef & Co-Founder",
      tint: "from-[oklch(0.58_0.19_35)] to-[oklch(0.36_0.18_22)]",
      photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "East Nashville HVAC",
      amount: "$650,000",
      result: "Equipment line to refresh the service fleet ahead of peak season.",
      type: "Equipment Financing",
      person: "Jordan Whitfield",
      role: "President",
      tint: "from-[oklch(0.7_0.16_45)] to-[oklch(0.48_0.18_28)]",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "The Gulch Hospitality Group",
      amount: "$1,100,000",
      result: "Bridge financing to acquire a second concept on Broadway.",
      type: "Business Term Loan",
      person: "Camila Vargas",
      role: "Founder",
      tint: "from-[oklch(0.6_0.2_30)] to-[oklch(0.4_0.19_22)]",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face&q=80",
    },
  ];
  const initials = (n: string) =>
    n
      .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("");
  return (
    <section id="stories" className="relative overflow-hidden px-6 py-12 sm:py-20">
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {CITY} businesses Foxglove Lenders has funded
        </h2>
        <p className="mt-4 text-muted-foreground">
          Composite outcomes from real deals across Middle Tennessee. Names changed; structures unchanged.
        </p>
      </div>
      {/* Wrapper isolates Carousel from useScrollReveal - without it, the
          hook adds .reveal (opacity:0, translateY) onto the Embla viewport
          itself and Embla mis-measures slide layout at mount. */}
      <div className="relative mx-auto mt-12 max-w-7xl px-2 sm:px-10">
        <Carousel opts={{ align: "start" }} setApi={setApi} className="relative">
          <CarouselContent className="-ml-4">
            {stories.map((s) => (
              <CarouselItem key={s.name} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={s.photo}
                      alt={s.person}
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[color:var(--brand-bronze)]/40"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{s.person}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {s.role} . {s.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[color:var(--brand-bronze)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={`star-${s.name}-${i}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">{s.type}</div>
                  <div className="mt-3 text-3xl font-bold text-[color:var(--brand-emerald)]">{s.amount}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.result}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 sm:-left-2" />
          <CarouselNext className="right-0 sm:-right-2" />
        </Carousel>
      </div>
    </section>
  );
}

/* ---------------- City Intro (SEO copy) ---------------- */
function CityIntro() {
  const neighborhoods = [
    "Downtown Nashville", "Germantown", "12 South", "East Nashville",
    "The Gulch", "Brentwood", "Belle Meade", "Franklin", "Hendersonville", "Wedgewood-Houston",
  ];
  const uses = ["Expansion", "Payroll", "Inventory", "Equipment", "Marketing", "Cash Flow"];
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-12 sm:py-20">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Business Loans for {CITY} Companies
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you operate in {neighborhoods.slice(0, 5).join(", ")} or anywhere across
            Davidson County and Middle Tennessee, our lending bench helps local businesses secure the
            capital they need to grow. From <strong>SBA 7(a) loans</strong> and{" "}
            <strong>business lines of credit</strong> to <strong>equipment financing</strong>,{" "}
            <strong>working capital loans</strong> and <strong>invoice factoring</strong>, we
            connect {CITY} owners with the right funding product, fast.
          </p>
          <p className="mt-4 text-muted-foreground">
            Foxglove Lenders works with short-term lenders, SBA Preferred Banks active in Tennessee, equipment
            financiers and merchant cash advance providers - so you can compare{" "}
            <strong>fast business loans</strong>, <strong>startup business loans</strong> and{" "}
            <strong>same-day business funding</strong> in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {neighborhoods.map((n) => (
              <span
                key={n}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Common uses of funding</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            What {CITY} business owners typically finance with us.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {uses.map((u) => (
              <li
                key={u}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-[color:var(--accent-success)]" /> {u}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security ---------------- */
function Security() {
  const items = [
    { icon: Lock, title: "SSL Secured" },
    { icon: ShieldCheck, title: "Bank-Level Encryption" },
    { icon: Users, title: "Privacy Protected" },
    { icon: CheckCircle2, title: "Tennessee-Licensed Lending Partners" },
  ];
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="relative mx-auto grid max-w-7xl gap-5 rounded-2xl border border-border bg-card p-8 md:grid-cols-4">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="fg-trust-badge">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-vermillion)]/10">
              <Icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-[color:var(--brand-vermillion)]" />
            </span>
            <span className="text-sm font-semibold">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden px-6 py-12 sm:py-20">
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="flex justify-center">
          <div className="fg-eyebrow">
            <span aria-hidden className="fg-eyebrow-dot" />
            Common Questions
          </div>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
        <span aria-hidden className="fg-rule mx-auto" />
        <p className="mt-4 text-muted-foreground">
          Everything {CITY} business owners want to know before applying.
        </p>
      </div>
      <Accordion type="single" collapsible className="relative mx-auto mt-10 max-w-4xl">
        {HOME_FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {f.q}
            </AccordionTrigger>
            <AccordionContent forceMount className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-20 text-white"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-20" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Ready to talk capital in {CITY}?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Get matched with Tennessee-licensed lenders serving {CITY_STATE}. Soft credit pull, no obligation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            asChild
            className="btn-foxglove px-9 text-sm font-bold tracking-wide text-white"
          >
            <Link to="/apply-now" className="gap-2">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="btn-ghost-white px-7 text-sm font-semibold"
          >
            <a href={SITE_CONFIG.phoneHref} className="gap-2">
              <PhoneCall className="h-4 w-4" /> {SITE_CONFIG.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="relative bg-[color:var(--brand-charcoal)] text-white/85">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-anchor)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center font-semibold">
            <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-14 w-auto brightness-0 invert" />
          </div>
          <address className="mt-6 not-italic space-y-1 text-sm text-white/65">
            <div className="font-semibold text-white">{SITE_CONFIG.name}</div>
            {SITE_CONFIG.hasPublicOffice ? (
              <div>
                {SITE_CONFIG.address.streetAddress}
                <br />
                {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion}{" "}
                {SITE_CONFIG.address.postalCode}
              </div>
            ) : (
              <div>Serving {SITE_CONFIG.areasServed.join(" . ")}</div>
            )}
            <div>
              <a href={SITE_CONFIG.phoneHref} className="hover:text-[color:var(--brand-vermillion)]">
                {SITE_CONFIG.phone}
              </a>
            </div>
            {SITE_CONFIG.license.state && SITE_CONFIG.license.licenseNumber && (
              <div className="pt-1 text-xs text-white/45">
                {SITE_CONFIG.license.state} license #{SITE_CONFIG.license.licenseNumber}
              </div>
            )}
          </address>
        </div>
        <FooterCol title="Capital Programs">
          <FooterPillarLink slug="accounts-receivable-financing" label="AR Financing" />
          <FooterPillarLink slug="invoice-factoring" label="Invoice Factoring" />
          <FooterPillarLink slug="revenue-based-financing" label="Revenue Based Financing" />
          <FooterPillarLink slug="small-business-loans" label="Small Business Loans" />
          <FooterPillarLink slug="sba-loans" label="SBA Loans" />
          <FooterPillarLink slug="equipment-financing" label="Equipment Financing" />
        </FooterCol>
        <FooterCol title="Industries">
          <FooterIndustryLink slug="construction" label="Construction" />
          <FooterIndustryLink slug="healthcare" label="Healthcare" />
          <FooterIndustryLink slug="hospitality" label="Hospitality" />
          <FooterIndustryLink slug="transportation" label="Transportation" />
          <FooterIndustryLink slug="oilfield-services" label="Oilfield Services" />
          <FooterIndustryLink slug="defense-aerospace" label="Defense & Aerospace" />
        </FooterCol>
        <FooterCol title="Company">
          <li>
            <Link to="/contact" className="hover:text-[color:var(--brand-vermillion)]">Contact</Link>
          </li>
          <li>
            <Link to="/nashville" className="hover:text-[color:var(--brand-vermillion)]">Nashville Hub</Link>
          </li>
          <li>
            <Link to="/" hash="how" className="hover:text-[color:var(--brand-vermillion)]">How It Works</Link>
          </li>
          <li>
            <Link to="/" hash="faq" className="hover:text-[color:var(--brand-vermillion)]">FAQs</Link>
          </li>
          <li>
            <Link to="/" hash="stories" className="hover:text-[color:var(--brand-vermillion)]">Success Stories</Link>
          </li>
          <li>
            <Link to="/apply-now" className="hover:text-[color:var(--brand-vermillion)]">Apply Now</Link>
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-white/10 bg-[color:oklch(0.13_0.012_30)]">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/55">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}, {CITY_STATE}. All rights reserved.</p>
            <p>
              Reviewed by{" "}
              <a
                href={SITE_CONFIG.author.profileUrl}
                rel="author"
                className="font-medium text-white hover:underline"
              >
                {SITE_CONFIG.author.name}
              </a>
              , {SITE_CONFIG.author.title} ({SITE_CONFIG.author.credentials}).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-white/65">
        {children}
      </ul>
    </div>
  );
}

function FooterPillarLink({ slug, label }: Readonly<{ slug: string; label: string }>) {
  return (
    <li>
      <Link to="/pillar/$slug" params={{ slug }} className="hover:text-[color:var(--brand-vermillion)]">
        {label}
      </Link>
    </li>
  );
}

function FooterIndustryLink({ slug, label }: Readonly<{ slug: string; label: string }>) {
  return (
    <li>
      <Link to="/industry/$slug" params={{ slug }} className="hover:text-[color:var(--brand-vermillion)]">
        {label}
      </Link>
    </li>
  );
}
