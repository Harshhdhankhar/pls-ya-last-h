import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { navLinks } from "@/lib/data";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:business@sole-arium.com",
    Icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sole-arium/",
    Icon: Linkedin,
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www-fallback.instagram.com/sole_arium/",
    Icon: Instagram,
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="bg-noir text-bone">
      <div className="container grid grid-cols-1 gap-16 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <Image src="/logo.png" alt="Sole-arium" width={752} height={332} className="h-16 w-auto md:h-20" priority />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/50">
            Premium footwear for a life in motion. Designed in small studios,
            produced in limited editions, built to last.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:gap-6">
          <div>
            <p className="eyebrow mb-6 text-bone/40">Explore</p>
            <ul className="space-y-3.5">
              {navLinks
                .filter((link) => link.href !== "/contact")
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-cursor="pointer"
                      className="link-underline text-sm text-bone/80 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-6 text-bone/40">Contact Us</p>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/contact"
                  data-cursor="pointer"
                  className="link-underline text-sm text-bone/80 hover:text-gold"
                >
                  Contact
                </Link>
              </li>
              {contactLinks.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    data-cursor="pointer"
                    className="inline-flex items-center gap-2 text-sm text-bone/80 transition-colors hover:text-gold"
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container flex flex-col items-center justify-between gap-6 py-8 text-xs tracking-widest text-bone/40 md:flex-row">
          <span className="uppercase">&copy; {new Date().getFullYear()} Sole-arium</span>
        </div>
      </div>
    </footer>
  );
}
