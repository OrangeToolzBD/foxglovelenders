// Single source of truth for SITE_URL and business facts.
// Mock/placeholder values OK while INDEXABLE=false. Before flipping
// VITE_INDEXABLE=true, replace every mock value with the real owner data.

const RAW_SITE_URL =
  (import.meta.env?.VITE_SITE_URL as string | undefined) ??
  "https://anchorcapitalgroup.com";

export const SITE_URL: string = RAW_SITE_URL.replace(/\/+$/, "");

export const INDEXABLE: boolean =
  (import.meta.env?.VITE_INDEXABLE as string | undefined) === "true";

export const SITE_CONFIG = {
  url: SITE_URL,
  indexable: INDEXABLE,

  name: "Anchor Capital Group",
  legalName: "Anchor Capital Group, LLC",
  tagline: "Steady capital for Texas operators",
  defaultDescription:
    "Working capital, invoice factoring, AR financing, SBA loans and small business loans for San Antonio, TX. Pre-qualify with a soft credit pull and review offers in 24 hours.",

  phone: "(210) 853-4140",
  phoneHref: "tel:+12108534140",
  email: "",

  hasPublicOffice: true,
  address: {
    streetAddress: "112 E Pecan St, Suite 600",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    postalCode: "78205",
    addressCountry: "US",
  },
  geo: {
    latitude: 29.4252,
    longitude: -98.4946,
  },

  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
  ],

  license: {
    state: "TX",
    licenseNumber: "TX-CFB-118742",
  },

  areasServed: [
    "San Antonio, TX",
    "Bexar County, TX",
    "South Texas",
  ],

  social: {
    googleBusinessProfile: "https://www.google.com/maps/place/Anchor+Capital+Group",
    linkedin: "https://www.linkedin.com/company/anchor-capital-group",
    facebook: "https://www.facebook.com/anchorcapitalgroup",
    twitter: "https://twitter.com/AnchorCapGroup",
  },

  defaultOgImage: "/og-default.svg",

  stats: {
    reviewsCount: "1,650+",
    reviewsRating: "4.9",
    businessesFunded: "7,800+",
    loansFacilitated: "$420M+",
    fastestFundingHours: "24h",
  },

  trustBadges: ["Soft Pull · No Credit Impact"],

  author: {
    name: "Daniela Vargas",
    title: "Director of Capital Markets",
    credentials: "MBA, 14+ years SBA & commercial lending",
    profileUrl: "https://www.linkedin.com/in/daniela-vargas-acg",
  },

  featuredStat: {
    value: "3.2 million",
    claim: "small businesses operating across Texas",
    sourceName: "SBA Office of Advocacy — Texas Profile",
    sourceUrl: "https://advocacy.sba.gov/",
  },

  ghl: {
    formId: "iILOP7GhpUNskBYRNuWk",
    formName: "Loan Application",
    formHeight: 876,
    embedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",
  },
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (!path) return `${SITE_URL}/`;
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeading === "/" ? "/" : withLeading.replace(/\/+$/, "");
  return `${SITE_URL}${normalized}`;
}
