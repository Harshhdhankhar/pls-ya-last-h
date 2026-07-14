import {
  Bell,
  Heart,
  LayoutGrid,
  LifeBuoy,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  User,
  Watch,
} from "lucide-react";

export const accountNav = [
  { label: "Overview", href: "/account", icon: LayoutGrid },
  { label: "Reservations", href: "/account/pre-orders", icon: Watch },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Purchases", href: "/account/orders", icon: ShoppingBag },
  { label: "Profile", href: "/account/profile", icon: User },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Notifications", href: "/account/notifications", icon: Bell },
  { label: "Settings", href: "/account/settings", icon: Settings },
  { label: "Support", href: "/account/support", icon: LifeBuoy },
] as const;
