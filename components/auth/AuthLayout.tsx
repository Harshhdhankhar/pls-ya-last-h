import Link from "next/link";
import Image from "next/image";
import { img } from "@/lib/data";
import { Reveal, RevealText } from "@/components/ui/Reveal";

const AUTH_IMAGE = img("1600185365483-26d7a4cc7519", 1600);

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src={AUTH_IMAGE}
            alt="Sole-ariuade for movement"
            fill
            sizes="50vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/40" />

        <Link
          href="/"
          className="absolute left-10 top-10"
        >
          <Image src="/logo.png" alt="Sole-arium home" width={752} height={332} className="h-14 w-auto brightness-0 invert" priority />
        </Link>

        <div className="absolute inset-x-10 bottom-14 max-w-md">
          <span className="eyebrow mb-5 flex items-center gap-2 text-paper/50">
            <span className="h-1 w-1 rounded-full bg-gold" />
            Private Access
          </span>
          <p className="font-display text-4xl leading-[1.1] tracking-editorial text-paper xl:text-5xl">
            Designed for those who never stand still.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:px-12 lg:px-16">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-12 block lg:hidden"
          >
            <Image src="/logo.png" alt="Sole-arium home" width={752} height={332} className="h-14 w-auto" priority />
          </Link>

          <Reveal>
            <h1 className="font-display text-4xl leading-tight tracking-editorial">
              <RevealText text={title} />
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-ink-muted">{subtitle}</p>
          </Reveal>

          <Reveal delay={0.12} className="mt-10">
            {children}
          </Reveal>

          {footer && (
            <Reveal delay={0.2} className="mt-8 text-center text-sm text-ink-muted">
              {footer}
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
