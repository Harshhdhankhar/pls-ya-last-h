import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Loader } from "@/components/ui/Loader";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/cart/WishlistDrawer";

// Runs before hydration so the correct theme applies on first paint -
// without this, the page would flash light mode before React mounts.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("sole-arium.theme");
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solearium.in"),
  title: {
    default: "Sole-ariuustom Footwear, Built Around How You Move",
    template: "%ole-arium",
  },
  description:
    "Premium made-to-order footwear, engineered around how you walk and customised to your aesthetic. Choose your colours, materials and finish - every pair is built for you.",
  keywords: [
    "Sole-arium",
    "custom footwear",
    "made to order shoes",
    "personalised footwear",
    "footwear designed around how you move",
    "aesthetic custom shoes",
    "premium comfort footwear India",
  ],
  openGraph: {
    title: "Sole-ariuustom Footwear, Built Around How You Move",
    description:
      "Made-to-order footwear engineered around your walk and customised to your taste. Your colours, your materials, your pair.",
    siteName: "Sole-arium",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`is-loading ${fraunces.variable} ${inter.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <ThemeProvider>
          <AuthProvider>
            <StoreProvider>
              <SmoothScroll>
                <Loader />
                {children}
                <CartDrawer />
                <WishlistDrawer />
              </SmoothScroll>
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
