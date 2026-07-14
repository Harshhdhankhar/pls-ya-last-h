# Sole Arium  -  Data Reference

## Project Overview
- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Fonts**: Fraunces (display), Inter (sans)
- **Images**: Unsplash (via `lib/data.ts` helper `img(id, w, q)`)
- **State**: React Context (`lib/store.tsx`, `lib/auth.tsx`, `lib/theme.tsx`)
- **Auth**: Mock provider (`lib/auth.tsx`), no real backend

---

## Routes

### Public (marketing layout  -  `/app/(marketing)/`)
| Route | Page | Key Sections |
|---|---|---|
| `/` | `page.tsx` | Hero, FeaturedDrop, ProductGrid, EditorialStory, ProductShowcase, Lookbook, WhySoleArium, Testimonials, InstagramGrid, Newsletter |
| `/shop` | `shop/page.tsx` | Product grid with filters |
| `/shop/[slug]` | `shop/[slug]/page.tsx` | PDP  -  ProductDetailClient, PurchasePanel, Gallery, DesignedFor |
| `/collections` | `collections/page.tsx` | Collection cards |
| `/about` | `about/page.tsx` | Brand story, hero image, values |
| `/contact` | `contact/page.tsx` | ContactForm |
| `/foot-problems` | `foot-problems/page.tsx` | NeedHero, NeedCard grid, EditorialStrip |
| `/foot-problems/[slug]` | `foot-problems/[slug]/page.tsx` | Individual foot problem detail |

### Auth (auth layout  -  `/app/(auth)/`)
| Route | Page |
|---|---|
| `/sign-in` | `sign-in/page.tsx` |
| `/create-account` | `create-account/page.tsx` |
| `/forgot-password` | `forgot-password/page.tsx` |
| `/reset-password` | `reset-password/page.tsx` |
| `/verify-email` | `verify-email/page.tsx` |

### Account (account layout  -  `/app/account/`)
| Route | Page | Key Content |
|---|---|---|
| `/account` | `page.tsx` | Dashboard  -  stats, preorders, recent orders, wishlist preview, upcoming releases |
| `/account/orders` | `orders/page.tsx` | Order history |
| `/account/pre-orders` | `pre-orders/page.tsx` | Reservation tracking with timelines |
| `/account/wishlist` | `wishlist/page.tsx` | Wishlist items with colour variants |
| `/account/addresses` | `addresses/page.tsx` | Saved addresses |
| `/account/notifications` | `notifications/page.tsx` | Notification list with preferences |
| `/account/settings` | `settings/page.tsx` | Account settings, language, communication prefs |
| `/account/support` | `support/page.tsx` | Support tickets, FAQ |
| `/account/profile` | `profile/page.tsx` | Profile editing, membership status |

---

## Data Models

### `lib/data.ts`  -  Product & Marketing Content

```typescript
type Product = {
  slug: string;            // URL slug (e.g. "arium-one-bone")
  name: string;            // Product name (e.g. "Arium One")
  line: string;            // Collection line (e.g. "Signature Low")
  price: number;           // Price in USD
  colorway: string;        // Colour name (e.g. "Bone / Gold")
  category: "Low" | "Mid" | "High" | "Runner";
  image: string;           // Primary image URL (Unsplash)
  hoverImage: string;      // Secondary/alt image URL
  badge?: string;          // "New", "Limited", "Drop 04", etc.
  gallery?: string[];      // Additional PDP images (optional)
  description?: string;    // Short benefit copy
  highlights?: string[];   // Feature chips (e.g. ["Contoured footbed", ...])
  materials?: string;      // Materials accordion text
  fit?: string;            // Fit notes accordion text
  availability?: "In Stock" | "Low Stock" | "Pre-Order" | "Sold Out";
};
```

**8 products**  -  Arium One (2 colourways), Meridian Mid (2), Vector Runner (2), Atlas High (2)

```typescript
// Marketing content
type LookbookShot = { id, caption, location, image, span: "tall" | "wide" | "regular" };
type Collection = { slug, title, season, count, description, image };
type Testimonial = { quote, author, role };
type Value = { index, title, description };

// Homepage data
hero     = { eyebrow, heading: string[], copy, image, floatImage }
featured = Product  // FeaturedDrop section
story    = { eyebrow, heading, image, lead, quote, quoteAttribution }
```

### `lib/memberData.ts`  -  Member Area (Mock Data)

| Entity | Fields | Usage |
|---|---|---|
| `Preorder` | id, product, size, status, progressPercent, estimatedDelivery, paymentStatus, placedOn, timeline, canCancel, canUpgradeShipping | `/account/pre-orders` |
| `Order` | id, date, status, items[], subtotal, shipping, tax, total, trackingNumber, carrier, deliveryEstimate | `/account/orders` |
| `Address` | id, label, fullName, line1, line2?, city, state, zip, country, phone, isDefault | `/account/addresses` |
| `Notification` | id, category, title, message, date, read | `/account/notifications` |
| `ActivityItem` | id, message, date | Dashboard activity feed |
| `UpcomingRelease` | id, name, dropDate, image, notifyEnabled | Dashboard sidebar |
| `Benefit` | title, description | Membership tiers |
| `membershipBenefits` | Record<string, Benefit[]> | Guest → Member → Founding Member → Icon Status |
| `pointsToNextTier` | Record<string, number> | Guest: 0, Member: 2500, Founding Member: 6000 |

### `lib/footProblems.ts`  -  Foot Problem Encyclopedia

```typescript
type FootProblem = {
  slug: string;
  title: string;
  category: "Everyday Comfort" | "Foot Structure & Movement" | "Recovery & Rehabilitation";
  description: string;
  commonSigns: string[];
  supportiveFeatures: string[];
  dailyImpact: string;
  recommendedCategory: string;
  audienceGroups: string[];
  requiresDisclaimer: boolean;
  image: string;  // Unsplash photo ID
};
```

**21 foot problems** across 3 categories:
- **Everyday Comfort** (6): long-standing, long-walking, office-commute, travel-comfort, general-fatigue, everyday-comfort
- **Foot Structure & Movement** (7): flat-feet, high-arches, bunions, hammer-toe, overpronation, supination, uneven-pressure
- **Recovery & Rehabilitation** (8): diabetic-foot, arthritis, plantar-fasciitis, post-polio-support, post-surgical-recovery, rehabilitation-support, varicose-vein-discomfort, acl-recovery

### `lib/store.tsx`  -  Client State (React Context)

```
CartItem     = { slug, name, line, price, colorway, image, qty }
addToCart(product, size?)
removeFromCart(slug)
setQty(slug, qty)
toggleWishlist(product) / isWishlisted(slug)
Cart open/close, Wishlist open/close
cartCount, subtotal
LocalStorage persistence (sole-arium.cart, sole-arium.wishlist)
```

### `lib/auth.tsx`  -  Auth State

```
User = { name, email, firstName, lastName, phone, avatar, membershipTier, joinDate, points, lifetimePoints, address, ... }
isAuthenticated, user, signIn, signOut, signUp, requestPasswordReset, resetPassword
LocalStorage persistence (sole-arium.auth)
```

---

## Component Tree (Key Pages)

### Homepage (`/`)
```
RootLayout
├── ThemeProvider
│   ├── AuthProvider
│   │   ├── StoreProvider
│   │   │   ├── SmoothScroll
│   │   │   ├── Loader
│   │   │   ├── CartDrawer
│   │   │   ├── WishlistDrawer
│   │   │   └── MarketingLayout
│   │   │       ├── Navbar (with MegaMenu, MobileMenu, SearchOverlay)
│   │   │       └── Page
│   │   │           ├── Hero (RevealText headings, floating image)
│   │   │           ├── FeaturedDrop (product card, wishlist/heart)
│   │   │           ├── ProductGrid (ProductCard × 8, QuickViewModal)
│   │   │           ├── EditorialStory (parallax image, quote)
│   │   │           ├── ProductShowcase (horizontal scroll track)
│   │   │           ├── Lookbook (masonry grid)
│   │   │           ├── WhySoleArium (values grid)
│   │   │           ├── Testimonials (carousel)
│   │   │           ├── InstagramGrid (photo grid)
│   │   │           └── Newsletter (signup form)
│   │   │       └── Footer
```

### Product Detail (`/shop/[slug]`)
```
ProductDetailClient
├── ProductGallery (image viewer with thumbnails)
├── PurchasePanel
│   ├── Colour variant swatches
│   ├── Product info (name, price, description)
│   ├── Availability badge
│   ├── Wishlist heart button
│   └── "Reserve Your Pair" button
├── DetailGallery (detail shots)
├── DesignedFor (related foot problems)
├── Accordion (Materials & Fit)
├── Accordion (Pre-order FAQ)
├── ProductCard grid (related products)
└── MobileStickyBar (sticky bottom CTA on mobile)
```

### Account Dashboard (`/account`)
```
AccountLayout (AccountShell with sidebar nav)
└── Dashboard
    ├── StatCard ×3 (orders, preorders, wishlist)
    ├── Activity feed
    ├── PreorderCard (current preorders)
    ├── OrderCard (recent orders)
    ├── WishlistItemCard (wishlist preview)
    ├── Upcoming releases
    └── MembershipBadge
```

---

## Global Styles & Tailwind

### Custom theme (`tailwind.config.ts`)
- **Extended colours**: `ink` (#1a1c1e), `ink-soft`, `ink-muted`, `ink-faint`, `paper` (#faf9f6), `paper-soft`, `gold` (#e8a020), `gold-deep`, `noir` (#0d0d0d), `bone` (#f5f1eb), `line` (#e5e2dc)
- **Font families**: `display` (Fraunces), `sans` (Inter)
- **Custom easing**: `ease-premium` (cubic-bezier(0.16, 1, 0.3, 1))
- **Letter-spacing**: `tracking-editorial` (-0.02em), `tracking-tightest` (-0.05em)
- **Section class**: `.section { @apply py-20 md:py-28; }`

### Animations (`components/ui/Reveal.tsx`)
- **Reveal**: Wrapper  -  fades up with `y: 28px → 0`, `opacity: 0 → 1`
- **RevealText**: Word-by-word split  -  each word slides up from `y: 100% → 0` inside an `overflow-hidden` container with `pb-[0.2em]` for descender space
- **Default stagger**: 0.04s between words, configurable delay

### Theme (`lib/theme.tsx`, `app/globals.css`)
- Light/dark mode via CSS class on `<html>`
- Initial theme from localStorage, fallback to `prefers-color-scheme`
- Dark mode selector: `.dark` class
- Theme toggle component (`ThemeToggle.tsx`)

---

## External Dependencies
| Package | Purpose |
|---|---|
| `next` | Framework |
| `framer-motion` | Animations |
| `lucide-react` | Icons |
| `tailwindcss` | Styling |
| `@tailwindcss/typography` | Prose styles |
