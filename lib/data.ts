/**
 * Central content model for SOLE ARIUM.
 * All imagery is centralised here so art direction can be swapped in one place.
 * Photography sourced from Unsplash (stable long-form photo IDs).
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Build a responsive Unsplash URL. */
export function img(id: string, w = 1400, q = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export type Product = {
  slug: string;
  name: string;
  line: string;
  /** Editorial collection this silhouette belongs to (filters on /shop). */
  collection: "monument" | "nocturne" | "meridian";
  price: number;
  colorway: string;
  category: "Low" | "Mid" | "High" | "Runner";
  image: string;
  hoverImage: string;
  badge?: string;
  /** Local product-detail imagery (e.g. "/products/arium-one-bone/01.jpg").
   *  Optionahe PDP gallery falls back to [image, hoverImage] when absent. */
  gallery?: string[];
  /** Short benefit copy shown on the PDP purchase panel. */
  description?: string;
  /** Compact highlight chips shown on the PDP purchase panel. */
  highlights?: string[];
  /** Materials accordion copy on the PDP. */
  materials?: string;
  /** Fit accordion copy on the PDP. */
  fit?: string;
  availability?: "In Stock" | "Low Stock" | "Pre-Order" | "Sold Out";
  /** Whether this product is coming soon (not yet available for purchase). */
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    slug: "arium-one-bone",
    name: "Arium One",
    line: "Signature Low",
    collection: "monument",
    price: 4999,
    colorway: "Bone / Gold",
    category: "Low",
    image: img("1595950653106-6c9ebd614d3a"),
    hoverImage: img("1600185365483-26d7a4cc7519"),
    description:
      "Every step, considered. A low-profile silhouette with contoured comfort and a subtle gold accent.",
    highlights: ["Contoured footbed", "Gold accent stripe", "Lightweight recycled midsole"],
    materials:
      "Plush recycled foam footbed cradles your foot with every step. Bone leather upper selected for softness and breathability. Lightweight outsole designed for flexibility and grip on any surface.",
    fit: "True to size. The Arium One fits true across most feef you're between sizes, size down for a secure low-top feel.",
    availability: "In Stock",
  },
  {
    slug: "meridian-mid-onyx",
    name: "Meridian Mid",
    line: "Structured Mid",
    collection: "meridian",
    price: 5199,
    colorway: "Onyx / Ash",
    category: "Mid",
    image: img("1606107557195-0e29a4b5b4aa"),
    hoverImage: img("1608231387042-66d1773070a5"),
    description:
      "Extended comfort for long days on your feet. A structured mid-top with support where you need it most.",
    highlights: ["Targeted ankle support", "Plush cushioning throughout", "All-day comfort"],
    materials:
      "Onyx nubuck with ash suede overlays for structure without stiffness. Plush foam collar reduces pressure around the ankle. Cushioned insole supports every hour on concrete.",
    fit: "True to size with a slightly roomier midfoot. Ideal if you prefer space to breathe without losing secure support.",
    availability: "In Stock",
  },
  {
    slug: "atlas-high-noir",
    name: "Atlas High",
    line: "Elevated High",
    collection: "nocturne",
    price: 5099,
    colorway: "Noir / Amber",
    category: "High",
    image: img("1542291026-7eec264c27ff"),
    hoverImage: img("1525966222134-fcfa99b8ae77"),
    description:
      "Confidence at every elevation. A supportive high-top that moves with you, finished in matte noir.",
    highlights: ["Secure padded collar", "Full-range ankle support", "Amber accent detail"],
    materials:
      "Matte leather upper wraps the foot in structure without sacrificing flexibility. Padded ankle collar provides secure support while allowing natural movement. Hand-applied amber accent.",
    fit: "True to size. The high collar sits snugly around the anklonsider half a size up if you wear thicker socks.",
    availability: "In Stock",
  },
  {
    slug: "vector-runner-carbon",
    name: "Vector Runner",
    line: "Performance Runner",
    collection: "meridian",
    price: 9900,
    colorway: "Carbon / Gold",
    category: "Runner",
    image: img("1560769629-975ec94e6a86"),
    hoverImage: img("1552346154-21d32810aba3"),
    description:
      "Effortless movement, reimagined in carbon and gold. The same responsive comfort, a darker expression.",
    highlights: ["Energy-return foam", "Breathable knit upper", "Reflective heel detail"],
    materials:
      "Breathable knit upper moves with your foot for natural flexibility. Dual-density foam returns energy with every stride for a smooth, low-fatigue ride.",
    fit: "Slightly narrow through the forefoot, identical last to Vector Runnelate / Ivory.",
    availability: "In Stock",
    comingSoon: true,
  },
  {
    slug: "atlas-high-fog",
    name: "Atlas High",
    line: "Elevated High",
    collection: "nocturne",
    price: 12900,
    colorway: "Fog / Steel",
    category: "High",
    image: img("1608231387042-66d1773070a5"),
    hoverImage: img("1542291026-7eec264c27ff"),
    description:
      "The Atlas High in fog and steeool, quiet and built for comfortable movement at every step.",
    highlights: ["Secure padded collar", "Full-range ankle support", "Steel-toned hardware"],
    materials:
      "Matte leather upper with padded ankle collar for secure, comfortable support. Steel-toned hardware completes the refined silhouette.",
    fit: "True to size, identical last to Atlas Higoir / Amber.",
    availability: "In Stock",
    comingSoon: true,
  },
];

export type LookbookShot = {
  id: string;
  caption: string;
  location: string;
  image: string;
  span: "tall" | "wide" | "regular";
};

export const lookbook: LookbookShot[] = [
  {
    id: "lb-1",
    caption: "Structure & Flow",
    location: "Studio Light",
    image: img("1606107557195-0e29a4b5b4aa", 1200),
    span: "tall",
  },
  {
    id: "lb-2",
    caption: "Silhouette Study",
    location: "Natural Light",
    image: img("1542291026-7eec264c27ff", 1200),
    span: "regular",
  },
  {
    id: "lb-3",
    caption: "On The Move",
    location: "City Streets",
    image: img("1595950653106-6c9ebd614d3a", 1200),
    span: "wide",
  },
  {
    id: "lb-4",
    caption: "Material Detail",
    location: "After Hours",
    image: img("1491553895911-0055eca6402d", 1200),
    span: "regular",
  },
  {
    id: "lb-5",
    caption: "Last & Leather",
    location: "Workbench",
    image: img("1525966222134-fcfa99b8ae77", 1200),
    span: "tall",
  },
];

export const hero = {
  eyebrow: "Comfort in every step",
  heading: ["Designed for", "how you move"],
  copy:
    "We begin with how you walk, stand and move. Every measurement shapes your footwear, creating comfort that's built exclusively for you.",
  image: img("1600185365483-26d7a4cc7519", 1800),
  floatImage: img("1595950653106-6c9ebd614d3a", 900),
};

export const featured: Product = {
  slug: "arium-one-bone",
  name: "Arium Onone",
  line: "Drop 04 · Built Around Your Stride",
  collection: "monument",
  price: 8900,
  colorway: "Bone / Gold",
  category: "Low",
  image: img("1600185365483-26d7a4cc7519", 1800),
  hoverImage: img("1595950653106-6c9ebd614d3a", 1800),
  badge: "Limited Release",
};

export const story = {
  eyebrow: "Our Method",
  heading: "Designed Around Your Movement",
  image: img("1552346154-21d32810aba3", 1920),
  lead:
    "We don't start with a sketch. We start with how you movhe way your foot lands, the hours you spend standing, the surfaces you cross. Then you make it yours: your colours, your materials, your finish. Comfort that's engineered, style that's chosen.",
  quote:
    "When a shoe is built around you, you forget you're wearing it.",
  quoteAttribution: "Founder, Sole-arium",
};

export type Collection = {
  slug: string;
  title: string;
  season: string;
  count: number;
  description: string;
  image: string;
};

export const collections: Collection[] = [
  {
    slug: "monument",
    title: "Monument",
    season: "SS / 26",
    count: 12,
    description:
      "Clean, architectural forms in bone, ash and warm stone. Built for standing still and moving freely.",
    image: img("1600185365483-26d7a4cc7519", 1600),
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    season: "FW / 25",
    count: 9,
    description:
      "A study in contraseep onyx, matte suede and accents of amber. Serious comfort, serious style.",
    image: img("1542291026-7eec264c27ff", 1600),
  },
  {
    slug: "meridian",
    title: "Meridian",
    season: "Core",
    count: 15,
    description:
      "Everyday essentials, refined. Proportions built around how you move through a city day.",
    image: img("1606107557195-0e29a4b5b4aa", 1600),
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I forgot I was wearing them by day three. They just become part of how you move.",
    author: "Ada Morau",
    role: "Creative Director, Berlin",
  },
  {
    quote:
      "Finally, a shoe designed for people who spend all day standing and still want to look put together.",
    author: "Kenji Alvarez",
    role: "Architect, Tokyo",
  },
  {
    quote:
      "They adapt to how I walk, not the other way around. That makes all the difference.",
    author: "Noor El-Amin",
    role: "Photographer, London",
  },
];

export type Value = {
  index: string;
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    index: "01",
    title: "Premium Materials",
    description:
      "Thoughtfully sourced materials selected for comfort, durability and how gracefully they age beside you.",
  },
  {
    index: "02",
    title: "Yours to Customise",
    description:
      "Choose your colourway, materials and finishing details. A refined silhouette, expressed entirely in your taste.",
  },
  {
    index: "03",
    title: "Built for Comfort",
    description:
      "Our sole compound is tuned for all-day wear. Support where you need it, flexibility where you move.",
  },
  {
    index: "04",
    title: "Crafted to Last",
    description:
      "Hand-assembled in limited runs. Finished to a standard that rewards years of movement, not seasons of trends.",
  },
];

export const instagram: string[] = [
  img("1600185365483-26d7a4cc7519", 800),
  img("1542291026-7eec264c27ff", 800),
  img("1608231387042-66d1773070a5", 800),
  img("1606107557195-0e29a4b5b4aa", 800),
  img("1584735175315-9d5df23860e6", 800),
  img("1595950653106-6c9ebd614d3a", 800),
  img("1560769629-975ec94e6a86", 800),
  img("1552346154-21d32810aba3", 800),
];

export const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Find Your Fit", href: "/foot-problems" },
  { label: "Analyse", href: "/analyse" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
