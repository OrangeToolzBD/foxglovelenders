// Anchor Capital Group — San Antonio neighborhood pages.
// Unique local content per neighborhood — never a city-page find/replace.

export type Suburb = {
  slug: string;
  name: string;
  /** "City of San Antonio" | "Bexar County" | "Comal County" */
  county: string;
  /** Short tagline / sub-heading. */
  tagline: string;
  /** First paragraph — unique local intro (700+ word pages should expand on this). */
  intro: string;
  /** Local landmarks and notable spots — used in body copy. */
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
    slug: "downtown-san-antonio",
    name: "Downtown San Antonio",
    county: "City of San Antonio",
    tagline: "Riverwalk hospitality, professional services and tourism operators",
    intro:
      "Downtown San Antonio is the city's tourism, hospitality and professional-services engine — anchored by the Riverwalk, the Convention Center, the Alamo and a deep base of law, accounting and consulting firms. Anchor Capital Group works with Downtown owners on hotel financing, restaurant working capital, professional-services lines and SBA acquisition deals tailored to event-driven cash flow.",
    landmarks: ["The Alamo", "San Antonio River Walk", "Henry B. González Convention Center", "Tower of the Americas", "Hemisfair"],
    industries: ["Hospitality", "Tourism", "Restaurants", "Professional services"],
    sampleBusinesses: [
      { name: "Riverwalk Boutique Hotel Co.", type: "Hospitality", useCase: "SBA 504 for a PIP renovation" },
      { name: "Alamo Plaza Bistro", type: "Restaurant", useCase: "Working capital line for shoulder season" },
      { name: "Houston Street Legal Group", type: "Law firm", useCase: "Unsecured partner buy-in financing" },
    ],
    zips: ["78205", "78207", "78215"],
  },
  {
    slug: "stone-oak",
    name: "Stone Oak",
    county: "City of San Antonio",
    tagline: "North-side medical, dental and high-income professional services",
    intro:
      "Stone Oak is San Antonio's North-side hub for medical practices, dental groups, specialty clinics, and the professional services and retail that surround them. Anchor Capital Group finances Stone Oak operators with practice acquisition, equipment, build-out and partner-buy-in capital — sized for insurance-reimbursement cycles and high build-out costs.",
    landmarks: ["Stone Oak Parkway", "Methodist Stone Oak Hospital", "The Rim", "Sonterra"],
    industries: ["Medical", "Dental", "Professional services", "Specialty retail"],
    sampleBusinesses: [
      { name: "Stone Oak Family Dental", type: "Dental practice", useCase: "Practice acquisition + CBCT imaging" },
      { name: "Sonterra Specialty Clinic", type: "Medical group", useCase: "SBA 7(a) for partner buy-in" },
      { name: "Methodist-Area MedSpa", type: "Aesthetic medicine", useCase: "Equipment lease + working capital" },
    ],
    zips: ["78258", "78259"],
  },
  {
    slug: "pearl-district",
    name: "Pearl District",
    county: "City of San Antonio",
    tagline: "Chef-driven restaurants, boutique retail and creative studios",
    intro:
      "The Pearl is San Antonio's chef-driven hospitality and boutique-retail district — built around the redeveloped Pearl Brewery, Hotel Emma and the Culinary Institute of America's San Antonio campus. Anchor Capital Group finances Pearl operators with restaurant working capital, hotel CapEx, equipment loans and inventory lines that respect the area's premium rent base.",
    landmarks: ["The Pearl", "Hotel Emma", "CIA San Antonio", "San Antonio River — Museum Reach"],
    industries: ["Restaurants", "Boutique retail", "Hospitality", "Food & beverage production"],
    sampleBusinesses: [
      { name: "Pearl Provisions Cafe", type: "Restaurant", useCase: "Equipment + build-out for second location" },
      { name: "Museum Reach Goods", type: "Boutique retail", useCase: "Inventory line for Q4 ramp" },
      { name: "Brewery Quarter Roasters", type: "Coffee roaster", useCase: "Roasting equipment financing" },
    ],
    zips: ["78215"],
  },
  {
    slug: "alamo-heights",
    name: "Alamo Heights",
    county: "City of Alamo Heights",
    tagline: "Independent retail, dental and professional services on Broadway",
    intro:
      "Alamo Heights — an independent municipality inside San Antonio — concentrates a deep base of independent retail, dental and professional services along the Broadway corridor, plus Trinity University and the San Antonio Botanical Garden. Anchor Capital Group works with '09 operators on acquisition, build-out, equipment and unsecured working capital.",
    landmarks: ["Broadway corridor", "Trinity University", "San Antonio Botanical Garden", "Witte Museum"],
    industries: ["Independent retail", "Dental", "Professional services", "Education-adjacent services"],
    sampleBusinesses: [
      { name: "Broadway Independent Dental", type: "Dental", useCase: "Practice acquisition + remodel" },
      { name: "Olmos Boutique Co.", type: "Retail", useCase: "Inventory line + storefront refresh" },
      { name: "Trinity Area CPAs", type: "Accounting", useCase: "Unsecured working capital line" },
    ],
    zips: ["78209"],
  },
  {
    slug: "southtown",
    name: "Southtown",
    county: "City of San Antonio",
    tagline: "Arts district restaurants, breweries and creative trades",
    intro:
      "Southtown is San Antonio's arts and creative district — King William mansions, the Blue Star Arts Complex, breweries and the chef-driven restaurants along South Alamo. Anchor Capital Group finances Southtown operators with restaurant working capital, brewery equipment loans and storefront build-out financing built for a tight rent base and event-driven sales.",
    landmarks: ["King William Historic District", "Blue Star Arts Complex", "South Alamo Street", "Mission Reach"],
    industries: ["Restaurants", "Craft beverage", "Arts & creative", "Boutique retail"],
    sampleBusinesses: [
      { name: "South Alamo Kitchen", type: "Restaurant", useCase: "Same-day working capital for slow shoulder season" },
      { name: "Blue Star Brewing Co.", type: "Brewery", useCase: "Tank + canning line equipment financing" },
      { name: "King William Studio", type: "Creative services", useCase: "Revenue-based financing for studio expansion" },
    ],
    zips: ["78204", "78210"],
  },
  {
    slug: "westside",
    name: "Westside",
    county: "City of San Antonio",
    tagline: "Family-owned manufacturing, auto and trades",
    intro:
      "San Antonio's Westside is the cultural and manufacturing heart of the city — a deep base of family-owned panaderías, auto shops, light manufacturers and trades along Guadalupe Street and Commerce. Anchor Capital Group works with Westside owners on equipment, real estate and SBA acquisition deals priced for legacy operators and second-generation owners.",
    landmarks: ["Guadalupe Cultural Arts Center", "Market Square (El Mercado)", "Our Lady of the Lake University", "Westside business corridor"],
    industries: ["Light manufacturing", "Auto repair", "Family food production", "Trades"],
    sampleBusinesses: [
      { name: "Guadalupe Auto Body", type: "Collision repair", useCase: "Frame rack + paint booth equipment" },
      { name: "Mercado Panadería", type: "Bakery", useCase: "Second-location SBA 7(a)" },
      { name: "Commerce Street Fabricators", type: "Light manufacturing", useCase: "CNC equipment financing" },
    ],
    zips: ["78207", "78237"],
  },
  {
    slug: "south-san-antonio",
    name: "South San Antonio",
    county: "City of San Antonio",
    tagline: "Manufacturing, distribution and Toyota-corridor suppliers",
    intro:
      "South San Antonio is the industrial backbone of the city — anchored by the Toyota Texas truck plant, Port San Antonio (the redeveloped Kelly AFB), and a wide base of distribution, manufacturing and aerospace-adjacent suppliers. Anchor Capital Group finances South Side operators with equipment loans, AR factoring and SBA 504 industrial real estate.",
    landmarks: ["Toyota Texas (Tundra plant)", "Port San Antonio", "Brooks City Base", "Mission Trail"],
    industries: ["Automotive manufacturing", "Aerospace & defense", "Distribution & logistics", "Industrial services"],
    sampleBusinesses: [
      { name: "Toyota-Corridor Supplier Co.", type: "Tier-2 auto supplier", useCase: "Equipment + AR factoring combo" },
      { name: "Port SA Aerospace Services", type: "MRO", useCase: "SBA 504 for hangar real estate" },
      { name: "South Side Distribution", type: "3PL", useCase: "Revenue-based financing for peak season" },
    ],
    zips: ["78211", "78214", "78223", "78224"],
  },
  {
    slug: "northside",
    name: "Northside / I-10 Corridor",
    county: "Bexar County",
    tagline: "USAA-area professional, healthcare and tech-enabled services",
    intro:
      "The I-10 / Loop 1604 Northside corridor concentrates San Antonio's largest employers — USAA, Valero, the South Texas Medical Center and a thick base of tech-enabled professional services. Anchor Capital Group finances Northside operators with unsecured working capital, revenue-based financing and SBA expansion capital sized for white-collar businesses.",
    landmarks: ["South Texas Medical Center", "USAA headquarters", "La Cantera", "The Rim", "UTSA Main Campus"],
    industries: ["Healthcare", "Insurance services", "Tech-enabled services", "Professional services"],
    sampleBusinesses: [
      { name: "Medical Center Imaging Group", type: "Imaging center", useCase: "Equipment refresh + working capital" },
      { name: "USAA-Area Consulting", type: "Consulting", useCase: "Revenue-based financing for hiring ramp" },
      { name: "La Cantera Retail Co.", type: "Retail", useCase: "Inventory line for holiday season" },
    ],
    zips: ["78229", "78230", "78249"],
  },
  {
    slug: "schertz-cibolo",
    name: "Schertz & Cibolo",
    county: "Guadalupe County",
    tagline: "I-35 NE distribution, trades and franchise operators",
    intro:
      "Schertz and Cibolo together form the I-35 NE distribution corridor between San Antonio and Austin — Amazon, Sysco, and a deep base of franchise food, trades and distribution operators serving the metro from the suburbs. Anchor Capital Group works with Schertz/Cibolo owners on equipment, franchise SBA 7(a) and revolving lines.",
    landmarks: ["I-35 NE corridor", "Schertz/Cibolo Sports Complex", "Amazon Schertz fulfillment center", "Randolph AFB (adjacent)"],
    industries: ["Distribution & logistics", "Franchise food", "Trades", "Defense-adjacent services"],
    sampleBusinesses: [
      { name: "I-35 NE Distribution", type: "3PL", useCase: "AR financing for big-box client base" },
      { name: "Cibolo Franchise Group", type: "Franchise QSR", useCase: "SBA 7(a) for a third unit" },
      { name: "Schertz HVAC Co.", type: "Trades", useCase: "Truck + equipment financing" },
    ],
    zips: ["78108", "78154"],
  },
  {
    slug: "new-braunfels",
    name: "New Braunfels",
    county: "Comal County",
    tagline: "Hospitality, tubing-economy retail and Tex-German manufacturing",
    intro:
      "New Braunfels sits at the north end of the San Antonio metro on the Comal and Guadalupe rivers — a hospitality and tubing-economy town with a growing roster of manufacturers and breweries. Anchor Capital Group works with New Braunfels owners on seasonal working capital, hospitality SBA and equipment financing structured for the warm-season revenue curve.",
    landmarks: ["Schlitterbahn", "Comal River", "Gruene Historic District", "Wurstfest grounds"],
    industries: ["Hospitality & tourism", "Restaurants", "Manufacturing", "Outdoor recreation retail"],
    sampleBusinesses: [
      { name: "Gruene Hospitality Group", type: "Restaurants", useCase: "Seasonal working capital line" },
      { name: "Comal River Outfitters", type: "Outdoor retail", useCase: "Inventory + equipment financing" },
      { name: "Wurst Manufacturing Co.", type: "Food manufacturing", useCase: "SBA 504 for plant expansion" },
    ],
    zips: ["78130", "78132"],
  },
];

export function getSuburb(slug: string): Suburb | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
