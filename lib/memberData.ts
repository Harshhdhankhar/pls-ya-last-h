/**
 * Mock member-area data. No backend exists yehis is the seam where
 * real account/order/inventory APIs would plug in later.
 */
import { products, collections, img, type Product } from "@/lib/data";

export type PreorderStatus =
  | "Reserved"
  | "In Production"
  | "Ready to Ship"
  | "Shipped"
  | "Cancelled";

export type TimelineStep = {
  label: string;
  date: string;
  complete: boolean;
};

export type Preorder = {
  id: string;
  product: Product;
  size: number;
  status: PreorderStatus;
  progressPercent: number;
  estimatedDelivery: string;
  paymentStatus: "Paid in Full" | "Deposit Paid" | "Authorization Hold";
  placedOn: string;
  timeline: TimelineStep[];
  canCancel: boolean;
  canUpgradeShipping: boolean;
};

export const preorders: Preorder[] = [
  {
    id: "PRE-40231",
    product: products[0],
    size: 10,
    status: "In Production",
    progressPercent: 62,
    estimatedDelivery: "Aug 14 - Aug 21, 2026",
    paymentStatus: "Paid in Full",
    placedOn: "Jun 02, 2026",
    canCancel: true,
    canUpgradeShipping: true,
    timeline: [
      { label: "Reservation Confirmed", date: "Jun 02", complete: true },
      { label: "Materials Sourced", date: "Jun 19", complete: true },
      { label: "In Production", date: "Jul 05", complete: true },
      { label: "Quality Inspection", date: "Est. Jul 30", complete: false },
      { label: "Shipped", date: "Est. Aug 14", complete: false },
    ],
  },
  {
    id: "PRE-40198",
    product: products[5],
    size: 9,
    status: "Reserved",
    progressPercent: 18,
    estimatedDelivery: "Sep 02 - Sep 12, 2026",
    paymentStatus: "Deposit Paid",
    placedOn: "Jun 28, 2026",
    canCancel: true,
    canUpgradeShipping: false,
    timeline: [
      { label: "Reservation Confirmed", date: "Jun 28", complete: true },
      { label: "Materials Sourced", date: "Est. Jul 20", complete: false },
      { label: "In Production", date: "Est. Aug 04", complete: false },
      { label: "Quality Inspection", date: "Est. Aug 25", complete: false },
      { label: "Shipped", date: "Est. Sep 02", complete: false },
    ],
  },
  {
    id: "PRE-39810",
    product: products[3],
    size: 11,
    status: "Shipped",
    progressPercent: 100,
    estimatedDelivery: "Delivered Jun 30, 2026",
    paymentStatus: "Paid in Full",
    placedOn: "Apr 11, 2026",
    canCancel: false,
    canUpgradeShipping: false,
    timeline: [
      { label: "Reservation Confirmed", date: "Apr 11", complete: true },
      { label: "Materials Sourced", date: "Apr 29", complete: true },
      { label: "In Production", date: "May 20", complete: true },
      { label: "Quality Inspection", date: "Jun 18", complete: true },
      { label: "Shipped", date: "Jun 24", complete: true },
    ],
  },
];

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type OrderItem = {
  name: string;
  image: string;
  qty: number;
  price: number;
  size: number;
  colorway: string;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  carrier?: string;
  deliveryEstimate?: string;
};

export const orders: Order[] = [
  {
    id: "SA-89507",
    date: "Jul 08, 2026",
    status: "Shipped",
    items: [
      {
        name: "Vector Runner",
        image: products[6].image,
        qty: 1,
        price: 260,
        size: 9,
        colorway: "Carbon / Gold",
      },
    ],
    subtotal: 260,
    shipping: 0,
    tax: 20.8,
    total: 280.8,
    trackingNumber: "1Z999AA10128841203",
    carrier: "UPS",
    deliveryEstimate: "Arriving Jul 15, 2026",
  },
  {
    id: "SA-88213",
    date: "Jun 24, 2026",
    status: "Delivered",
    items: [
      {
        name: "Atlas High",
        image: products[3].image,
        qty: 1,
        price: 320,
        size: 11,
        colorway: "Noir / Amber",
      },
    ],
    subtotal: 320,
    shipping: 0,
    tax: 25.6,
    total: 345.6,
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    deliveryEstimate: "Delivered Jun 30, 2026",
  },
  {
    id: "SA-86042",
    date: "Feb 14, 2026",
    status: "Delivered",
    items: [
      {
        name: "Vector Runner",
        image: products[2].image,
        qty: 1,
        price: 260,
        size: 10,
        colorway: "Slate / Ivory",
      },
      {
        name: "Meridian Mid",
        image: products[1].image,
        qty: 1,
        price: 285,
        size: 10,
        colorway: "Onyx / Ash",
      },
    ],
    subtotal: 545,
    shipping: 0,
    tax: 43.6,
    total: 588.6,
    trackingNumber: "1Z999AA10119876543",
    carrier: "UPS",
    deliveryEstimate: "Delivered Feb 19, 2026",
  },
];

export type Address = {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export const addresses: Address[] = [
  {
    id: "addr_1",
    label: "Home",
    fullName: "Jordan Ellis",
    line1: "412 Wren Street",
    line2: "Apt 6B",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    country: "United States",
    phone: "+1 (718) 555 0142",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Studio",
    fullName: "Jordan Ellis",
    line1: "88 Founders Yard",
    city: "New York",
    state: "NY",
    zip: "10013",
    country: "United States",
    phone: "+1 (212) 555 0198",
    isDefault: false,
  },
];

export type NotificationCategory =
  | "Drop"
  | "Restock"
  | "Preorder"
  | "Shipping"
  | "Offer";

export type Notification = {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    category: "Preorder",
    title: "Your Meridian Mid has entered production",
    message: "PRE-40231 has moved into the production stagstimated delivery Aug 14-21.",
    date: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    category: "Drop",
    title: "Nocturne restocarly access opens Friday",
    message: "As a Founding Member, you get 24-hour early access before the public.",
    date: "Yesterday",
    read: false,
  },
  {
    id: "n3",
    category: "Shipping",
    title: "Atlas High has shipped",
    message: "Order SA-88213 is on its way via UPS. Est. arrival Jun 30.",
    date: "3 days ago",
    read: true,
  },
  {
    id: "n4",
    category: "Offer",
    title: "A gift for your membership anniversary",
    message: "Enjoy complimentary express shipping on your next reservation.",
    date: "1 week ago",
    read: true,
  },
  {
    id: "n5",
    category: "Restock",
    title: "Vector Runnelate / Ivory is back",
    message: "A limited restock of 40 pairs is available in your size.",
    date: "2 weeks ago",
    read: true,
  },
];

export type NotificationPreferenceKey =
  | "dropAnnouncements"
  | "restockAlerts"
  | "preorderUpdates"
  | "shippingUpdates"
  | "exclusiveOffers";

export const notificationPreferenceCopy: Record<
  NotificationPreferenceKey,
  { title: string; description: string }
> = {
  dropAnnouncements: {
    title: "New Drops",
    description: "Be the first to know when a new collection is revealed.",
  },
  restockAlerts: {
    title: "Restock Alerts",
    description: "Get notified the moment your size returns.",
  },
  preorderUpdates: {
    title: "Reservation Updates",
    description: "Production milestones for reservations you hold.",
  },
  shippingUpdates: {
    title: "Shipping Updates",
    description: "Tracking and delivery notifications for active orders.",
  },
  exclusiveOffers: {
    title: "Exclusive Offers",
    description: "Members-only pricing, gifts and studio invitations.",
  },
};

export type ActivityItem = {
  id: string;
  message: string;
  date: string;
};

export const activity: ActivityItem[] = [
  { id: "a1", message: "PRE-40231 moved to “In Production”", date: "2 hours ago" },
  { id: "a2", message: "You reserved Meridian Milay / Bone", date: "Jun 28, 2026" },
  { id: "a3", message: "You earned 240 points from order SA-88213", date: "Jun 24, 2026" },
  { id: "a4", message: "Atlas Higoir / Amber was delivered", date: "Jun 30, 2026" },
  { id: "a5", message: "You added Vector Runner to your wishlist", date: "Jun 12, 2026" },
];

export type UpcomingRelease = {
  id: string;
  name: string;
  dropDate: string;
  image: string;
  notifyEnabled: boolean;
};

export const upcomingReleases: UpcomingRelease[] = [
  {
    id: "up1",
    name: "Nocturnestock",
    dropDate: "Fri, Jul 18",
    image: collections[1].image,
    notifyEnabled: true,
  },
  {
    id: "up2",
    name: "Monumenrop 05",
    dropDate: "Thu, Aug 06",
    image: collections[0].image,
    notifyEnabled: false,
  },
  {
    id: "up3",
    name: "Arium One - Archive Colourway",
    dropDate: "Wed, Aug 26",
    image: img("1595341888016-a392ef81b7de", 900),
    notifyEnabled: true,
  },
];

export const recommendedProducts: Product[] = products.slice(4, 8);

export type Benefit = {
  title: string;
  description: string;
};

export const membershipBenefits: Record<string, Benefit[]> = {
  Guest: [
    { title: "Create an account", description: "Unlock reservations, wishlist sync and order tracking." },
  ],
  Member: [
    { title: "Early Access", description: "12-hour early access to new drops." },
    { title: "Free Standard Shipping", description: "On every order, no minimum." },
    { title: "Wishlist Sync", description: "Synced across every device." },
  ],
  "Founding Member": [
    { title: "24-Hour Early Access", description: "First in line before every public release." },
    { title: "Complimentary Express Shipping", description: "On all orders and reservations." },
    { title: "Members-Only Archive Pricing", description: "Preferred rates on past-season releases." },
    { title: "Priority Studio Support", description: "A dedicated line for reservations and fit questions." },
  ],
  "Icon Status": [
    { title: "48-Hour Early Access", description: "The earliest access tier we offer." },
    { title: "Complimentary Express Shipping", description: "On all orders and reservations." },
    { title: "Annual Studio Visit", description: "A standing invitation to the Sole-arium studio." },
    { title: "Dedicated Concierge", description: "A single point of contact for anything you need." },
  ],
};

export const pointsToNextTier: Record<string, number> = {
  Guest: 0,
  Member: 2500,
  "Founding Member": 6000,
  "Icon Status": 0,
};
