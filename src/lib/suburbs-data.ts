// Foxglove Lenders - Nashville neighborhood pages.
// Unique local content per neighborhood - never a city-page find/replace.

export type Suburb = {
  slug: string;
  name: string;
  /** "City of Nashville" | "Davidson County" | "Williamson County" */
  county: string;
  /** Short tagline / sub-heading. */
  tagline: string;
  /** First paragraph - unique local intro (700+ word pages should expand on this). */
  intro: string;
  /** Local landmarks and notable spots - used in body copy. */
  landmarks: string[];
  /** Notable local industries / business types. */
  industries: string[];
  /** Sample local businesses (fictional but plausible) used in case study callouts. */
  sampleBusinesses: { name: string; type: string; useCase: string }[];
  /** ZIP codes served. */
  zips: string[];
};

export const SUBURBS: Suburb[] = [
  {
    slug: "downtown-nashville",
    name: "Downtown Nashville",
    county: "City of Nashville",
    tagline: "Honky-tonk hospitality, music industry and professional services",
    intro:
      "Downtown Nashville is the city's hospitality, tourism and music-industry engine - Broadway honky-tonks, the Ryman Auditorium, the Country Music Hall of Fame, the Nashville Yards build-out and a thick base of law, accounting and music-publishing firms. Foxglove Lenders works with Downtown owners on hospitality acquisition financing, restaurant working capital, professional-services partner buy-ins and bridge structures sized to bachelorette-driven and event-driven cash flow.",
    landmarks: ["Ryman Auditorium", "Country Music Hall of Fame", "Bridgestone Arena", "Lower Broadway", "Nashville Yards"],
    industries: ["Hospitality", "Live entertainment", "Music publishing", "Professional services"],
    sampleBusinesses: [
      { name: "Lower Broadway Honky-Tonk Co.", type: "Hospitality group", useCase: "SBA 7(a) for second-venue acquisition" },
      { name: "Ryman Row Restaurant Holdings", type: "Restaurant group", useCase: "Working capital for shoulder-season cash flow" },
      { name: "Music Row Legal Partners", type: "Music industry law", useCase: "Unsecured partner buy-in financing" },
    ],
    zips: ["37201", "37203", "37219"],
  },
  {
    slug: "germantown",
    name: "Germantown",
    county: "City of Nashville",
    tagline: "Historic district chef-driven restaurants and boutique retail",
    intro:
      "Germantown is Nashville's historic Victorian district north of Downtown - chef-driven restaurants, boutique retail, design studios and bed-and-breakfasts along Monroe and 6th Avenue North, plus First Horizon Park. Rent per square foot here is among the highest in the metro, which compresses margin and elevates the importance of working-capital structure for everyone in the district. Foxglove Lenders routes Germantown deals around build-outs, equipment + working capital combos and SBA 7(a) acquisitions when concept-driven operators transition owners.",
    landmarks: ["First Horizon Park", "Bicentennial Capitol Mall", "Monroe Street", "Werthan Mills Lofts"],
    industries: ["Chef-driven restaurants", "Boutique retail", "Design studios", "Hospitality"],
    sampleBusinesses: [
      { name: "Monroe Street Bistro", type: "Restaurant", useCase: "SBA 7(a) for build-out + equipment" },
      { name: "Germantown Boutique Co.", type: "Specialty retail", useCase: "Revenue-based financing for inventory" },
      { name: "First Horizon Roastery", type: "Coffee + roastery", useCase: "Equipment loan for production expansion" },
    ],
    zips: ["37208"],
  },
  {
    slug: "twelve-south",
    name: "12 South",
    county: "City of Nashville",
    tagline: "Walkable retail strip, chef-driven small-plates and boutique services",
    intro:
      "12 South runs along 12th Avenue South - Reese Witherspoon's Draper James, the murals, the Burger Up corridor and a tight cluster of boutique retail, chef-driven small-plates restaurants and boutique service businesses. Foot traffic here is heavy and weekend-skewed, which produces a revenue pattern more like a destination district than a neighborhood retail strip. Foxglove finances 12 South operators with SBA 7(a) acquisitions, equipment financing for restaurants and revenue-based financing for fast-growing boutique brands.",
    landmarks: ["12South murals", "Sevier Park", "Draper James flagship", "Edgehill Village"],
    industries: ["Boutique retail", "Chef-driven restaurants", "Boutique fitness", "Creative studios"],
    sampleBusinesses: [
      { name: "12th Avenue Boutique Group", type: "Specialty retail", useCase: "Revenue-based financing for second-location" },
      { name: "Sevier Park Pilates", type: "Boutique fitness", useCase: "Equipment + build-out combo" },
      { name: "Edgehill Plate & Bottle", type: "Small-plates restaurant", useCase: "SBA 7(a) for acquisition" },
    ],
    zips: ["37204"],
  },
  {
    slug: "east-nashville",
    name: "East Nashville",
    county: "City of Nashville",
    tagline: "Creative class chef-driven restaurants, breweries and design studios",
    intro:
      "East Nashville sits across the Cumberland River from Downtown - Five Points, the Lockeland Springs district, breweries along the river and a deep base of chef-driven restaurants, design studios and creative-class boutiques. Operators here trend smaller, more concept-driven and more event-tied than Downtown or Germantown, which produces choppier monthly revenue and a higher reliance on flexible working capital. Foxglove Lenders routes East Nashville financing across working capital lines, revenue-based financing for breweries and creative shops, and SBA 7(a) when an established concept acquires or expands.",
    landmarks: ["Five Points", "Lockeland Springs", "Shelby Park", "East Side Cumberland Riverfront"],
    industries: ["Chef-driven restaurants", "Breweries", "Design studios", "Boutique retail"],
    sampleBusinesses: [
      { name: "Five Points Brewing Co.", type: "Craft brewery", useCase: "Equipment financing for canning line" },
      { name: "Lockeland Kitchen Group", type: "Restaurant group", useCase: "Working capital for shoulder seasons" },
      { name: "Shelby Park Creative", type: "Design studio", useCase: "Revenue-based financing for hiring" },
    ],
    zips: ["37206", "37216"],
  },
  {
    slug: "the-gulch",
    name: "The Gulch",
    county: "City of Nashville",
    tagline: "Mixed-use towers, boutique hospitality and tech-enabled services",
    intro:
      "The Gulch is Nashville's mixed-use mid-rise district south of Downtown - boutique hotels, chef-driven restaurants, design-forward retail and a growing base of tech-enabled professional services in the new office towers. Operators here trend scale-oriented and design-forward, with clean underwriting profiles and a high fit for unsecured working capital and revenue-based products. Foxglove finances Gulch operators with hospitality SBA 7(a), revenue-based financing for tech-enabled services and unsecured lines for professional firms.",
    landmarks: ["Station Inn", "Gulch pedestrian bridge", "Nashville Yards spillover", "Frist Art Museum (adjacent)"],
    industries: ["Boutique hospitality", "Tech services", "Chef-driven restaurants", "Boutique retail"],
    sampleBusinesses: [
      { name: "Gulch Tower Hospitality", type: "Boutique hotel group", useCase: "SBA 7(a) for second-property acquisition" },
      { name: "Station Inn SaaS Co.", type: "B2B software", useCase: "Revenue-based financing for hiring" },
      { name: "Gulch Bistro Holdings", type: "Restaurant group", useCase: "Working capital line" },
    ],
    zips: ["37203"],
  },
  {
    slug: "brentwood",
    name: "Brentwood",
    county: "Williamson County",
    tagline: "South-suburb medical, dental and high-income professional services",
    intro:
      "Brentwood sits just south of Nashville along I-65 - a north-Williamson hub for medical practices, dental groups, specialty clinics and the high-income professional services and retail surrounding them. The patient base is dense, affluent and stable, producing predictable insurance reimbursement cycles and underwriting profiles strong enough to clear SBA 7(a) at its lowest pricing tier. Foxglove routes Brentwood deals through practice acquisitions, partner buy-ins, satellite expansion and equipment refresh.",
    landmarks: ["CoolSprings Galleria (adjacent)", "Brentwood Place", "Granny White Pike corridor", "Brentwood Library"],
    industries: ["Medical / dental", "Specialty clinics", "Professional services", "Boutique retail"],
    sampleBusinesses: [
      { name: "Brentwood Specialty Dental", type: "Dental practice", useCase: "Practice acquisition + CBCT imaging" },
      { name: "CoolSprings-Area Medical Group", type: "Medical group", useCase: "SBA 7(a) for partner buy-in" },
      { name: "Granny White Wealth Advisors", type: "Financial services", useCase: "Unsecured working capital" },
    ],
    zips: ["37027"],
  },
  {
    slug: "belle-meade",
    name: "Belle Meade",
    county: "Davidson County",
    tagline: "Independent municipality with deep professional services and independent retail",
    intro:
      "Belle Meade - an independent municipality inside Nashville's footprint along Harding Pike - concentrates a deep base of independent retail, dental practices and professional services, plus Cheekwood and the Warner Parks. Operators here trend long-tenured, with strong underwriting profiles and a high share of second- and third-generation succession deals. Foxglove Lenders routes Belle Meade financing through SBA 7(a) acquisitions, SBA 504 real estate purchases and unsecured working capital lines.",
    landmarks: ["Cheekwood Estate & Gardens", "Belle Meade Plantation", "Warner Parks", "Harding Pike corridor"],
    industries: ["Dental", "Boutique retail", "Professional services", "Wealth management"],
    sampleBusinesses: [
      { name: "Harding Pike Family Dental", type: "Dental practice", useCase: "Practice acquisition" },
      { name: "Belle Meade Boutique Holdings", type: "Specialty retail", useCase: "SBA 504 for the storefront" },
      { name: "Cheekwood Wealth Partners", type: "Wealth management", useCase: "Unsecured partner buy-in" },
    ],
    zips: ["37205"],
  },
  {
    slug: "franklin",
    name: "Franklin",
    county: "Williamson County",
    tagline: "Historic Main Street boutique retail and rapidly growing corporate corridor",
    intro:
      "Franklin sits twenty miles south of Downtown Nashville - the historic Main Street district, Carnton, CoolSprings corporate campuses and a steady inflow of relocating households and businesses. Operators here trend boutique on Main and corporate-adjacent in CoolSprings, which means two different financing playbooks side-by-side. Foxglove Lenders routes Franklin deals across SBA 7(a) acquisitions for boutique retail, unsecured working capital for corporate-adjacent service firms and SBA 504 for owner-occupied real estate.",
    landmarks: ["Historic Main Street Franklin", "Carnton Plantation", "CoolSprings Galleria", "Pinkerton Park"],
    industries: ["Boutique retail", "Corporate services", "Hospitality", "Healthcare"],
    sampleBusinesses: [
      { name: "Main Street Franklin Boutique", type: "Specialty retail", useCase: "Revolving line for seasonal inventory" },
      { name: "CoolSprings Tech Services", type: "B2B tech services", useCase: "Revenue-based financing for hiring" },
      { name: "Carnton-Area Hospitality Group", type: "Hospitality", useCase: "SBA 7(a) for second-property" },
    ],
    zips: ["37064", "37067"],
  },
  {
    slug: "hendersonville",
    name: "Hendersonville",
    county: "Sumner County",
    tagline: "Old Hickory Lake suburb mixing trades, retail and family-owned operators",
    intro:
      "Hendersonville sits northeast of Nashville on Old Hickory Lake - a fast-growing suburb mixing trades (HVAC, plumbing, electrical), retail along Indian Lake Boulevard and a deep base of family-owned restaurants and boutique services. Operators trend mid-tenure and growth-oriented. Foxglove Lenders routes Hendersonville financing through equipment lines for trades, SBA 7(a) for franchise QSR expansions and revolving lines for the in-between work.",
    landmarks: ["Old Hickory Lake", "Indian Lake Boulevard", "Drakes Creek Park", "Streets of Indian Lake"],
    industries: ["Trades / HVAC", "Franchise QSR", "Retail", "Family-owned services"],
    sampleBusinesses: [
      { name: "Old Hickory Heating & Cooling", type: "HVAC trade", useCase: "Equipment line for fleet refresh" },
      { name: "Indian Lake Franchise Group", type: "QSR franchise", useCase: "SBA 7(a) for second-unit expansion" },
      { name: "Drakes Creek Specialty Retail", type: "Specialty retail", useCase: "Revolving inventory line" },
    ],
    zips: ["37075"],
  },
  {
    slug: "wedgewood-houston",
    name: "Wedgewood-Houston",
    county: "City of Nashville",
    tagline: "Industrial-loft creative district, breweries and design studios",
    intro:
      "Wedgewood-Houston (WeHo) sits south of Downtown Nashville - converted industrial lofts, breweries, design studios, art galleries and small-batch food producers. Operators here trend creative-class and equipment-heavy, with revenue patterns that lean seasonal and event-driven. Foxglove Lenders routes WeHo financing through equipment loans for breweries and producers, working capital for creative shops with lumpy cash flow, and revenue-based financing for fast-growing brands.",
    landmarks: ["The Packing District", "Fort Negley", "WeHo galleries", "Houston Station"],
    industries: ["Breweries", "Small-batch food production", "Design studios", "Art galleries"],
    sampleBusinesses: [
      { name: "Houston Station Brewing", type: "Craft brewery", useCase: "Equipment financing for fermenters" },
      { name: "Packing District Creative", type: "Design studio", useCase: "Working capital line" },
      { name: "WeHo Small-Batch Foods", type: "Food producer", useCase: "Revenue-based financing for production scaling" },
    ],
    zips: ["37203", "37210"],
  },
];

export function getSuburb(slug: string): Suburb | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
