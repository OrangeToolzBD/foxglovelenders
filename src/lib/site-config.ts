// Single source of truth for SITE_URL and business facts.
// Mock/placeholder values OK while INDEXABLE=false. Before flipping
// VITE_INDEXABLE=true, replace every mock value with the real owner data.

const RAW_SITE_URL =
  (import.meta.env?.VITE_SITE_URL as string | undefined) ??
  "https://foxglovelenders.com";

export const SITE_URL: string = RAW_SITE_URL.replace(/\/+$/, "");

export const INDEXABLE: boolean =
  (import.meta.env?.VITE_INDEXABLE as string | undefined) === "true";

export const SITE_CONFIG = {
  url: SITE_URL,
  indexable: INDEXABLE,

  name: "Foxglove Lenders",
  legalName: "Foxglove Lenders, LLC",
  tagline: "Boutique business capital for Music City operators",
  defaultDescription:
    "Working capital, invoice factoring, AR financing, SBA loans and small business loans for Nashville, TN. Pre-qualify with a soft credit pull and review offers in 24 hours.",

  phone: "(615) 637-2366",
  phoneHref: "tel:+16156372366",
  email: "",

  hasPublicOffice: true,
  address: {
    streetAddress: "150 4th Ave N",
    addressLocality: "Nashville",
    addressRegion: "TN",
    postalCode: "37219",
    addressCountry: "US",
  },
  geo: {
    latitude: 36.1627,
    longitude: -86.7816,
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
    state: "TN",
    licenseNumber: "TN-FSL-118742",
  },

  areasServed: [
    "Nashville, TN",
    "Davidson County, TN",
    "Middle Tennessee",
  ],

  social: {
    googleBusinessProfile: "https://www.google.com/maps/place/Foxglove+Lenders",
    linkedin: "https://www.linkedin.com/company/foxglove-lenders",
    facebook: "https://www.facebook.com/foxglovelenders",
    twitter: "https://twitter.com/FoxgloveLenders",
  },

  defaultOgImage: "/og-default.svg",

  stats: {
    reviewsCount: "1,280+",
    reviewsRating: "4.9",
    businessesFunded: "5,400+",
    loansFacilitated: "$310M+",
    fastestFundingHours: "24h",
  },

  trustBadges: ["Soft Pull . No Credit Impact"],

  author: {
    name: "Harper Caldwell",
    title: "Head of Capital Markets",
    credentials: "MBA, 12+ years SBA & boutique commercial lending",
    profileUrl: "https://www.linkedin.com/in/harper-caldwell-foxglove",
  },

  featuredStat: {
    value: "697,000",
    claim: "small businesses operating across Tennessee",
    sourceName: "SBA Office of Advocacy  -  Tennessee Profile",
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
