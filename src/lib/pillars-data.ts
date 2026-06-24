// Anchor Capital Group — SEO pillar pages for San Antonio, TX.
// 14 Money Pillars + 10 Vertical Pillars = 24 total.
// The first 6 Money pillars mirror the active Google Business Profile plays:
// accounts-receivable-financing, invoice-factoring, revenue-based-financing,
// small-business-loans, small-business-loans-near-me, sba-loans.

export type PillarKind = "money" | "vertical";

export type Pillar = {
  slug: string;
  title: string;
  kind: PillarKind;
  tagline: string;
  description: string;
  bullets: string[];
  highlight: string;
  /** Approximate national monthly search volume — used for SEO ordering. */
  volume?: number;
};

export const MONEY_PILLARS: Pillar[] = [
  {
    slug: "accounts-receivable-financing",
    title: "Accounts Receivable Financing",
    kind: "money",
    tagline: "Revolving line secured by your open invoices",
    description:
      "Asset-based lines built around the receivables of San Antonio staffing firms, logistics operators, oilfield services and B2B vendors that wait 30-90 days to get paid. Borrow against the AR ledger without selling the invoices.",
    bullets: ["Up to 90% advance on eligible AR", "Lines $250K-$20M", "Keep customer relationships in-house"],
    highlight: "Revolving",
    volume: 90000,
  },
  {
    slug: "invoice-factoring",
    title: "Invoice Factoring",
    kind: "money",
    tagline: "Sell your invoices, get cash within 24 hours",
    description:
      "Same-day liquidity for South Texas trucking, staffing and government-contracting firms. Recourse and non-recourse programs with transparent advance rates and no long-term lock-ins.",
    bullets: ["Advance rates up to 95%", "Non-recourse available", "Funded in 24 hours"],
    highlight: "Same-day cash",
    volume: 60000,
  },
  {
    slug: "revenue-based-financing",
    title: "Revenue Based Financing",
    kind: "money",
    tagline: "Repay as a fixed percentage of monthly revenue",
    description:
      "Non-dilutive growth capital priced as a flat multiple and remitted as a small share of monthly revenue. Built for San Antonio SaaS, ecommerce, hospitality and multi-unit operators that need flexibility through seasonal swings.",
    bullets: ["$50K-$5M", "No equity, no warrants", "Payments flex with revenue"],
    highlight: "Pay as you earn",
    volume: 33000,
  },
  {
    slug: "small-business-loans",
    title: "Small Business Loans",
    kind: "money",
    tagline: "One soft-pull application, every major loan product",
    description:
      "Compare term loans, SBA, lines of credit, equipment financing and revenue-based capital through a single soft-pull application. Anchor matches San Antonio operators with the lender most likely to fund their deal.",
    bullets: ["$5K-$5M", "75+ lender network", "Soft credit pull only"],
    highlight: "Funded in 24-72 hrs",
    volume: 246000,
  },
  {
    slug: "small-business-loans-near-me",
    title: "Small Business Loans Near Me",
    kind: "money",
    tagline: "Local San Antonio loan advisors, statewide lender bench",
    description:
      "Skip the call-the-bank routine. Talk to a San Antonio-based loan advisor who knows the Bexar County lender bench, then get matched with 75+ regional, SBA preferred and national programs in one application.",
    bullets: ["San Antonio-based advisors", "75+ regional & national lenders", "One soft application"],
    highlight: "60-second match",
    volume: 49000,
  },
  {
    slug: "sba-loans",
    title: "SBA Loans",
    kind: "money",
    tagline: "Government-backed funding for San Antonio businesses",
    description:
      "SBA 7(a), 504 and Express loans for South Texas owners — the longest terms and lowest rates in commercial lending, accessed through a network of SBA Preferred banks active in the San Antonio market.",
    bullets: ["Up to $5,000,000", "25-year amortization on real estate", "10% down on acquisitions"],
    highlight: "From 8.25% APR",
    volume: 165000,
  },
  {
    slug: "working-capital-loans",
    title: "Working Capital Loans",
    kind: "money",
    tagline: "Cover payroll, inventory and seasonal cash gaps",
    description:
      "Operating capital sized to your monthly deposits and structured around your real cash cycle. A frequent fit for San Antonio restaurants, retailers, contractors and professional services firms.",
    bullets: ["$10K-$2M", "Daily, weekly or monthly remits", "No collateral options"],
    highlight: "Funded in 24 hrs",
  },
  {
    slug: "business-line-of-credit",
    title: "Business Line of Credit",
    kind: "money",
    tagline: "Revolving credit, draw only what you need",
    description:
      "Keep capital ready for inventory swings, payroll or opportunity buys. Pay interest only on the balance you draw — and reuse the limit as you repay.",
    bullets: ["Lines from $25K-$500K", "Same-day draws", "Soft pre-qualification"],
    highlight: "From 9.75% APR",
  },
  {
    slug: "sba-7a-loan",
    title: "SBA 7(a) Loan",
    kind: "money",
    tagline: "The SBA's flagship working-capital program",
    description:
      "The most flexible SBA program for working capital, equipment, acquisition or partner buy-out. Popular among Stone Oak medical practices and Downtown San Antonio hospitality operators.",
    bullets: ["Up to $5M", "10-year working capital terms", "Real estate up to 25 years"],
    highlight: "From 8.25% APR",
  },
  {
    slug: "equipment-financing",
    title: "Equipment Financing",
    kind: "money",
    tagline: "Finance machinery, vehicles and tools",
    description:
      "Use the equipment itself as collateral — preserving working capital for the things financing can't buy. Section 179 deductions still apply.",
    bullets: ["100% financing available", "Section 179 eligible", "Approvals in 24-48 hrs"],
    highlight: "From 6.75%",
  },
  {
    slug: "merchant-cash-advance",
    title: "Merchant Cash Advance",
    kind: "money",
    tagline: "Capital advanced against future card sales",
    description:
      "An advance against future card and platform revenue, funded quickly and repaid as a small percentage of daily settlements. A fast option when bank turnaround isn't realistic.",
    bullets: ["24-hour funding", "Bad credit considered", "No fixed monthly payment"],
    highlight: "$10K-$1M",
  },
  {
    slug: "business-acquisition-loans",
    title: "Business Acquisition Loans",
    kind: "money",
    tagline: "Buy an existing San Antonio business",
    description:
      "SBA-backed acquisition financing for partner buyouts, succession purchases and add-on deals across the I-10 corridor — including goodwill, working capital and earn-out structures.",
    bullets: ["10% down with SBA 7(a)", "Goodwill financing", "Earn-out friendly"],
    highlight: "Up to $5M",
  },
  {
    slug: "startup-business-loans",
    title: "Startup Business Loans",
    kind: "money",
    tagline: "Funding for new South Texas ventures",
    description:
      "Capital for businesses as young as 3 months, including SBA microloans and revenue-friendly products built for early-stage San Antonio operators.",
    bullets: ["From 3 months in business", "SBA microloan options", "Personal-credit-based options"],
    highlight: "$5K-$250K",
  },
  {
    slug: "unsecured-business-loans",
    title: "Unsecured Business Loans",
    kind: "money",
    tagline: "No blanket UCC, no hard collateral",
    description:
      "Cash-flow underwritten loans for established San Antonio businesses with consistent monthly revenue — no UCC blanket lien required.",
    bullets: ["Up to $500K", "Terms 1-5 years", "Funded in 1-3 days"],
    highlight: "Soft pull pre-qual",
  },
];

export const VERTICAL_PILLARS: Pillar[] = [
  {
    slug: "trucking-business-loans",
    title: "Trucking Business Loans",
    kind: "vertical",
    tagline: "Owner-operators to mid-size fleets",
    description:
      "Capital to add tractors, cover insurance down payments and bridge slow-pay receivables, built for I-35 and I-10 freight economics and Eagle Ford oilfield runs.",
    bullets: ["DOT-friendly underwriting", "Factoring + term combos", "Fuel & maintenance reserves"],
    highlight: "Funded in 24 hrs",
  },
  {
    slug: "restaurant-loans",
    title: "Restaurant Loans",
    kind: "vertical",
    tagline: "Fit-out, expansion and equipment",
    description:
      "Open a second location, refresh the dining room or weather a slow season with capital sized to San Antonio hospitality cash flow — Pearl District, Stone Oak and beyond.",
    bullets: ["Daily, weekly or monthly payments", "Same-day approvals", "No equity required"],
    highlight: "$25K-$2M",
  },
  {
    slug: "medical-practice-loans",
    title: "Medical Practice Loans",
    kind: "vertical",
    tagline: "Clinics, physician groups & specialty",
    description:
      "Acquisition, partner buy-in, expansion and working capital tailored to insurance reimbursement cycles. A regular fit for Stone Oak and South Texas Medical Center practices.",
    bullets: ["Up to 100% project financing", "Terms up to 10 years", "Deferred payment options"],
    highlight: "$50K-$7M",
  },
  {
    slug: "dental-practice-loans",
    title: "Dental Practice Loans",
    kind: "vertical",
    tagline: "Equipment, expansion & acquisition",
    description:
      "Finance chairs, CBCT imaging, build-outs or a full practice purchase with structures designed for DSOs and solo San Antonio dentists.",
    bullets: ["Chairs, imaging & software", "Practice acquisition", "Refinance existing debt"],
    highlight: "Rates from 7.25%",
  },
  {
    slug: "construction-business-loans",
    title: "Construction Business Loans",
    kind: "vertical",
    tagline: "Ground-up, renovation and equipment",
    description:
      "Multi-draw construction financing aligned to your build schedule, plus working capital and equipment loans for general contractors and trades across Bexar County.",
    bullets: ["Up to 80% LTC", "12-36 month terms", "Convert to permanent financing"],
    highlight: "$250K-$25M",
  },
  {
    slug: "oilfield-services-loans",
    title: "Oilfield Services Loans",
    kind: "vertical",
    tagline: "Eagle Ford & Permian service operators",
    description:
      "Equipment, working capital and AR factoring for the service crews supplying the Eagle Ford basin and Permian out of South Texas — sized to the rig-count cycle.",
    bullets: ["AR factoring for slow-pay E&Ps", "Equipment & rolling stock", "Bridge through slow quarters"],
    highlight: "Up to $5M",
  },
  {
    slug: "hotel-loans",
    title: "Hotel Loans",
    kind: "vertical",
    tagline: "Acquisition, PIP renovation & refinance",
    description:
      "Capital for flagged and independent properties along the I-35 corridor and Riverwalk: acquisitions, brand-mandated PIPs, FF&E and refinances.",
    bullets: ["SBA 7(a) & 504", "Bridge to perm", "Up to 90% LTV"],
    highlight: "$500K-$25M",
  },
  {
    slug: "retail-business-loans",
    title: "Retail Business Loans",
    kind: "vertical",
    tagline: "Inventory and storefront capital",
    description:
      "Stock up for the season, open a second location or refresh your San Antonio storefront with capital sized to retail cash flow cycles.",
    bullets: ["Seasonal payment structures", "Inventory financing", "POS-integrated underwriting"],
    highlight: "$15K-$1M",
  },
  {
    slug: "veteran-business-loans",
    title: "Veteran Business Loans",
    kind: "vertical",
    tagline: "SBA Express for veteran owners",
    description:
      "Expedited SBA Express financing with reduced fees for veteran-owned businesses — a meaningful program in a city anchored by JBSA and a strong veteran owner-operator community.",
    bullets: ["Up to $500K", "Reduced SBA fees for veterans", "36-hour SBA turnaround"],
    highlight: "Veteran-friendly",
  },
  {
    slug: "manufacturing-equipment-financing",
    title: "Manufacturing Equipment Financing",
    kind: "vertical",
    tagline: "CNC, robotics and production lines",
    description:
      "Finance individual machines or full production cells with structures aligned to ROI timelines — including soft costs and step-payment options.",
    bullets: ["New & used equipment", "Soft costs included", "Step payment options"],
    highlight: "Up to $10M",
  },
];

export const PILLARS: Pillar[] = [...MONEY_PILLARS, ...VERTICAL_PILLARS];

/** Top 6 money pillars (the active GBP plays) used to build the suburb × pillar SEO pages.
 *  10 suburbs × 6 = 60 locally written pages. */
export const TOP_MONEY_PILLARS: Pillar[] = MONEY_PILLARS.slice(0, 6);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
