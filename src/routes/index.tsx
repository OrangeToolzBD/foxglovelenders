import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
const siteLogoUrl = "/anchorgrouplogo.png";
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

type MegaItemProps = Readonly<{
  icon: LucideIcon;
  label: string;
  desc: string;
  href?: string;
  slug?: string;
  homeHash?: string;
}>;

const CITY = "San Antonio";
const CITY_STATE = `${CITY}, TX`;

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
    q: "Can South Texas startups qualify?",
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
        <div aria-hidden className="h-20" />
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
      { icon: MapPin, label: "Small Business Loans Near Me", desc: "San Antonio-based loan advisors", slug: "small-business-loans-near-me" },
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
      { icon: Briefcase, label: "Business Acquisition Loans", desc: "Buy an existing SA business", slug: "business-acquisition-loans" },
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
    heading: "Texas Specialty",
    items: [
      { icon: Flame, label: "Oilfield Services Loans", desc: "Eagle Ford & Permian operators", slug: "oilfield-services-loans" },
      { icon: Plane, label: "Defense & Aerospace", desc: "JBSA-adjacent operators", href: "/industry/defense-aerospace" },
      { icon: Shield, label: "Veteran Business Loans", desc: "SBA Express for veterans", slug: "veteran-business-loans" },
    ],
  },
];

const SERVICE_AREAS: { region: string; suburbs: { name: string; slug: string }[] }[] = [
  {
    region: "City of San Antonio",
    suburbs: [
      { name: "Downtown San Antonio", slug: "downtown-san-antonio" },
      { name: "Stone Oak", slug: "stone-oak" },
      { name: "Pearl District", slug: "pearl-district" },
      { name: "Southtown", slug: "southtown" },
      { name: "Westside", slug: "westside" },
      { name: "South San Antonio", slug: "south-san-antonio" },
    ],
  },
  {
    region: "Greater Bexar County",
    suburbs: [
      { name: "Alamo Heights", slug: "alamo-heights" },
      { name: "Northside / I-10", slug: "northside" },
    ],
  },
  {
    region: "I-35 Corridor & Hill Country",
    suburbs: [
      { name: "Schertz & Cibolo", slug: "schertz-cibolo" },
      { name: "New Braunfels", slug: "new-braunfels" },
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
  const itemClass = "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary";
  const inner = (
    <>
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--brand-emerald-mid)]/10 text-[color:var(--brand-emerald-mid)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{desc}</span>
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color:var(--brand-charcoal)]/95 text-white shadow-[0_8px_24px_-12px_oklch(0.1_0.01_30/0.6)] backdrop-blur supports-[backdrop-filter]:bg-[color:var(--brand-charcoal)]/85">
      {/* thin vermillion top edge — visual anchor for the dark navbar */}
      {/* <div aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[image:var(--gradient-anchor)]" /> */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <a href="/" className="flex items-center font-semibold">
          <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-16 w-auto" />
          <span className="sr-only">{SITE_CONFIG.name}</span>
        </a>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Capital</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                <div className="w-[900px] p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {LOAN_GROUPS.map((g) => (
                      <div key={g.heading}>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-emerald-mid)]">
                          {g.heading}
                        </div>
                        <div className="space-y-1">
                          {g.items.map((it) => (
                            <MegaItem key={it.label} {...it} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-secondary/60 p-4">
                    <div className="text-sm">
                      <div className="font-semibold">Not sure which capital fits?</div>
                      <div className="text-muted-foreground">
                        Get matched in 60 seconds — soft credit pull only.
                      </div>
                    </div>
                    <Button asChild size="sm" className="bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)]">
                      <Link to="/apply-now">
                        Start Application <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Sectors</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                <div className="w-[1100px] p-6">
                  <div className="grid grid-cols-4 gap-6">
                    {INDUSTRY_GROUPS.map((g) => (
                      <div key={g.heading}>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-emerald-mid)]">
                          {g.heading}
                        </div>
                        <div className="space-y-1">
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

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Coverage</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                <div className="w-[760px] p-6">
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[color:var(--brand-bronze)]" />
                    Funding businesses across the greater {CITY_STATE} metro
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3">
                    {SERVICE_AREAS.map((sa) => (
                      <div key={sa.region}>
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-emerald-mid)]">
                          {sa.region}
                        </div>
                        <ul className="space-y-1.5">
                          {sa.suburbs.map((s) => (
                            <li key={s.slug}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to="/san-antonio/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
                                >
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

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Insights</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                <div className="w-[520px] p-4">
                  <div className="grid gap-1">
                    <MegaItem icon={BookOpen} label="How It Works" desc="Our 4-step funding process" homeHash="how" />
                    <MegaItem icon={Star} label="Success Stories" desc={`Real ${CITY} businesses we funded`} homeHash="stories" />
                    <MegaItem icon={HelpCircle} label="FAQs" desc="Answers to common funding questions" homeHash="faq" />
                  </div>
                </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent">
                <Link to="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <a
            href={SITE_CONFIG.phoneHref}
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-[color:var(--brand-vermillion)] xl:inline-flex"
          >
            <PhoneCall className="h-3.5 w-3.5 text-[color:var(--brand-vermillion)]" />
            {SITE_CONFIG.phone}
          </a>
          <Button
            size="sm"
            asChild
            className="anchor-bevel hidden h-10 rounded-none bg-[image:var(--gradient-cta)] px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_22px_-10px_oklch(0.45_0.19_25/0.7)] transition-transform hover:translate-y-[-1px] hover:opacity-95 sm:inline-flex"
          >
            <Link to="/apply-now" className="gap-2">
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-none border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white lg:hidden" aria-label="Open menu">
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
                                  to="/san-antonio/$suburb"
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
                    <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)]">
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

/* ---------------- Hero — Anchor identity: split-pane with stat callouts ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-charcoal)] text-white">
      {/* Background image — port/freight scene with baked-in brand glow on the left */}
      <img
        src="/anchorhero-bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Brand-tinted overlay so the headline column stays legible while the imagery shows on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.14 0.018 30 / 0.88) 0%, oklch(0.16 0.018 30 / 0.72) 38%, oklch(0.18 0.02 30 / 0.4) 70%, oklch(0.2 0.02 30 / 0.25) 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-15" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-28">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
            <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
            Capital · Anchored
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Steady capital{" "}
            <span className="bg-gradient-to-r from-[oklch(0.86_0.12_85)] to-[oklch(0.74_0.16_75)] bg-clip-text text-transparent">
              for the long haul.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Anchor Capital Group brokers invoice factoring, accounts receivable financing,
            SBA loans and working capital for {CITY_STATE} operators. Soft credit pull,
            real offers in 24 hours.
          </p>
          <ul className="mt-6 grid max-w-lg grid-cols-1 gap-2 text-sm text-white/85 sm:grid-cols-2">
            {[
              "No impact on credit score",
              "75+ lender bench",
              "Texas-licensed partners",
              "$5K - $5M available",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[color:var(--brand-bronze)]" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              asChild
              className="anchor-bevel w-full rounded-none bg-[image:var(--gradient-cta)] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)] hover:opacity-95 sm:w-auto"
            >
              <Link to="/apply-now">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full rounded-none border-white/25 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <a href={SITE_CONFIG.phoneHref}>
                <PhoneCall className="h-4 w-4" /> {SITE_CONFIG.phone}
              </a>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-white/70">
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3 w-3" /> 256-bit SSL secured
            </span>
            <span>•</span>
            <span>Soft credit pull only</span>
          </div>
        </div>

        {/* Right pane — funding desk preview card */}
        <div className="relative hidden min-w-0 lg:block">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-[color:var(--brand-bronze)]/15 blur-3xl" />
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-white/60">
              <span className="inline-flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-[color:var(--brand-bronze)]" />
                Today on the desk
              </span>
              <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                Live
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { product: "Invoice Factoring", size: "$420K", industry: "Eagle Ford services", status: "Funded today" },
                { product: "AR Line", size: "$1.8M", industry: "I-35 NE 3PL", status: "Term sheet" },
                { product: "SBA 7(a)", size: "$2.4M", industry: "Stone Oak dental", status: "In underwriting" },
                { product: "Working Capital", size: "$180K", industry: "Pearl restaurant", status: "Funded today" },
              ].map((row) => (
                <div
                  key={row.product + row.size}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">{row.product}</div>
                    <div className="truncate text-[11px] text-white/60">{row.industry}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[color:var(--brand-bronze)]">{row.size}</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50">{row.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[color:var(--brand-bronze)]/15 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-bronze)]">
                Anchor advisor available
              </span>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline"
              >
                Call now <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Anchor Ledger — relocated metrics + GBP plays on a dark band ---------------- */
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
          <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
            <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
            The Ledger
          </div>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            What Anchor brokers — and the numbers that back it.
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Metrics column — large ticker numbers */}
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

          {/* Plays column — vertical list with monospaced index */}
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
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-bronze)] backdrop-blur">
                <MapPin className="h-3.5 w-3.5" /> Explore the San Antonio Hub
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Every neighborhood. Every loan program. One directory.
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                Jump into the San Antonio city hub to browse every neighborhood we serve and the
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
                  className="w-full bg-white text-[color:var(--brand-emerald)] hover:bg-white/90 sm:w-auto"
                >
                  <Link to="/san-antonio">
                    Visit the San Antonio Hub <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to="/apply-now">Apply Now</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div className="text-xs uppercase tracking-wider text-white/70">Inside the hub</div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">10</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Neighborhoods</div>
                </div>
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">24</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Programs</div>
                </div>
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">60+</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Local Pages</div>
                </div>
              </div>
              <Link
                to="/san-antonio"
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

/* ---------------- Capital Desk — the 6 GBP plays as full cards ----------------
   Icons come from /capitaldeskicons.png — a 1536x1024 sprite sheet laid out
   as 3 cols × 2 rows of 512×512 cells, in the same order as the desk array. */
function CapitalDesk() {
  const desk = [
    {
      slug: "accounts-receivable-financing",
      title: "Accounts Receivable Financing",
      lede: "Revolving line secured by your open invoices — without selling them.",
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
      stat: "$50K – $5M",
      tag: "Flexible repayment",
    },
    {
      slug: "small-business-loans",
      title: "Small Business Loans",
      lede: "One soft-pull application — every major loan product compared.",
      stat: "75+ lenders",
      tag: "$5K – $5M",
    },
    {
      slug: "small-business-loans-near-me",
      title: "Small Business Loans Near Me",
      lede: "Local advisors who know the Bexar County lender bench.",
      stat: "60-second match",
      tag: "San Antonio advisors",
    },
    {
      slug: "sba-loans",
      title: "SBA Loans",
      lede: "SBA 7(a), 504 and Express through Texas-active Preferred Lenders.",
      stat: "From 8.25% APR",
      tag: "Up to $5M",
    },
  ];
  return (
    <section id="capital" className="relative overflow-hidden py-12 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-emerald)]">
            <Anchor className="h-3.5 w-3.5" /> The Capital Desk
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            The six programs San Antonio asks for most
          </h2>
          <p className="mt-4 text-muted-foreground">
            These are the active plays — the loan products we route most often for South Texas operators.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {desk.map((d, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            return (
              <Link
                to="/pillar/$slug"
                params={{ slug: d.slug }}
                key={d.slug}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--brand-bronze)]/50 hover:shadow-[var(--shadow-elegant)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color:var(--brand-bronze)]/10 transition-transform duration-500 group-hover:scale-150"
                />
                <span
                  aria-hidden
                  className="relative -ml-10 block h-32 w-32 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: "url(/capitaldeskicons.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "300% 200%",
                    backgroundPosition: `${col * 50}% ${row * 100}%`,
                  }}
                />
                <h3 className="relative -mt-3 text-lg font-semibold">{d.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{d.lede}</p>
                <div className="relative mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[color:var(--brand-emerald)]/10 px-2.5 py-1 text-[11px] font-semibold text-[color:var(--brand-emerald)]">
                    {d.stat}
                  </span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                    {d.tag}
                  </span>
                </div>
                <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand-bronze)] group-hover:underline">
                  Open program details <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works — Texas-flavored 4-step ---------------- */
function HowItWorks() {
  const steps = [
    { n: 1, title: "Tell us the brief", desc: "60 seconds: how much, what for, how soon. No documents up front." },
    { n: 2, title: "We shop the bench", desc: "Anchor pre-screens 75+ Texas-active lenders against your profile." },
    { n: 3, title: "Compare real offers", desc: "Side-by-side: rates, terms, fees and remit schedules — no spin." },
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
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-bronze)]">
            <Compass className="h-3.5 w-3.5" /> The Anchor process
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Four steps. Zero surprises.
          </h2>
          <p className="mt-4 text-white/75">
            How {CITY} operators move from "we need capital" to "the wire cleared."
          </p>
        </div>
        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-cta)] font-bold text-[color:var(--accent-success-foreground)]">
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

/* ---------------- Industries — numbered ledger with Texas-specialty markers ---------------- */
function Industries() {
  type Ind = { icon: LucideIcon; label: string; slug: string; blurb: string; tx?: boolean };
  const inds: Ind[] = [
    { icon: Building2, label: "Construction", slug: "construction", blurb: "GCs, trades & ground-up." },
    { icon: Stethoscope, label: "Healthcare", slug: "healthcare", blurb: "Medical Center to Stone Oak." },
    { icon: UtensilsCrossed, label: "Hospitality", slug: "hospitality", blurb: "Pearl, Riverwalk, Hill Country." },
    { icon: Truck, label: "Transportation", slug: "transportation", blurb: "I-35 freight & cross-border." },
    { icon: ShoppingBag, label: "Retail", slug: "retail", blurb: "Storefronts & inventory." },
    { icon: Factory, label: "Manufacturing", slug: "manufacturing", blurb: "Toyota-corridor suppliers.", tx: true },
    { icon: Briefcase, label: "Professional", slug: "professional-services", blurb: "Law, accounting, consulting." },
    { icon: Flame, label: "Oilfield Services", slug: "oilfield-services", blurb: "Eagle Ford & Permian crews.", tx: true },
    { icon: Plane, label: "Defense & Aerospace", slug: "defense-aerospace", blurb: "JBSA & Port SA tenants.", tx: true },
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
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-vermillion)]">
              <span aria-hidden className="h-px w-10 bg-[color:var(--brand-vermillion)]" />
              Sector Ledger · 010
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
              The ten sectors Anchor underwrites first
            </h2>
            <p className="mt-4 text-muted-foreground">
              Each row is a specialty bench. Texas-specific verticals carry a <span className="font-semibold text-[color:var(--brand-vermillion)]">TX</span> marker — these are deals we won't hand off to a generalist.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="rounded-none border-[color:var(--brand-charcoal)]/20 bg-transparent text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-charcoal)] hover:border-[color:var(--brand-vermillion)] hover:bg-[color:var(--brand-vermillion)]/10 hover:text-[color:var(--brand-vermillion)]">
            <Link to="/san-antonio">
              View all 24 programs <ArrowRight className="ml-2 h-4 w-4" />
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
                        TX Specialty
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
  const stories = [
    { name: "Eagle Ford Wireline Co.", amount: "$420,000", result: "Same-day cash on E&P invoices through factoring.", type: "Invoice Factoring" },
    { name: "I-35 NE Distribution", amount: "$1,800,000", result: "Revolving AR line scaled with their big-box customer base.", type: "Accounts Receivable Financing" },
    { name: "Stone Oak Dental Partners", amount: "$2,400,000", result: "SBA 7(a) for partner buy-in plus new CBCT scanner.", type: "SBA 7(a) Loan" },
    { name: "Pearl District Kitchen Co.", amount: "$180,000", result: "Working capital line that flexes with event-driven sales.", type: "Working Capital Loan" },
  ];
  return (
    <section id="stories" className="relative overflow-hidden px-6 py-12 sm:py-20">
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {CITY} businesses Anchor has funded
        </h2>
        <p className="mt-4 text-muted-foreground">
          Composite outcomes from real deals across South Texas. Names changed; structures unchanged.
        </p>
      </div>
      <div className="relative mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stories.map((s) => (
          <div key={s.name} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-1 text-[color:var(--brand-bronze)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`star-${s.name}-${i}`} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.type}</div>
            <div className="mt-4 text-3xl font-bold text-[color:var(--brand-emerald)]">{s.amount}</div>
            <p className="mt-2 text-sm text-muted-foreground">{s.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- City Intro (SEO copy) ---------------- */
function CityIntro() {
  const neighborhoods = [
    "Downtown San Antonio", "Stone Oak", "Pearl District", "Alamo Heights",
    "Southtown", "Westside", "South San Antonio", "Northside / I-10", "Schertz", "New Braunfels",
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
            Bexar County and South Texas, our lending bench helps local businesses secure the
            capital they need to grow. From <strong>SBA 7(a) loans</strong> and{" "}
            <strong>business lines of credit</strong> to <strong>equipment financing</strong>,{" "}
            <strong>working capital loans</strong> and <strong>invoice factoring</strong>, we
            connect {CITY} owners with the right funding product, fast.
          </p>
          <p className="mt-4 text-muted-foreground">
            Anchor works with short-term lenders, SBA Preferred Banks active in Texas, equipment
            financiers and merchant cash advance providers — so you can compare{" "}
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
    { icon: CheckCircle2, title: "Texas-Licensed Lending Partners" },
  ];
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="relative mx-auto grid max-w-7xl gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-4">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-[color:var(--brand-emerald)]" />
            <span className="text-sm font-medium">{title}</span>
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
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
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
          Get matched with Texas-licensed lenders serving {CITY_STATE}. Soft credit pull, no obligation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            asChild
            className="anchor-bevel rounded-none bg-[image:var(--gradient-cta)] px-7 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]"
          >
            <Link to="/apply-now">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-none border-white/30 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:text-white"
          >
            <a href={SITE_CONFIG.phoneHref}>
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
            <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-28 w-auto" />
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
              <div>Serving {SITE_CONFIG.areasServed.join(" · ")}</div>
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
            <Link to="/san-antonio" className="hover:text-[color:var(--brand-vermillion)]">San Antonio Hub</Link>
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
