"use client";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.78 1.27 5.39l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-ink" aria-hidden>
      <path d="M16.36 1.05c.1 1.02-.29 2.02-.9 2.75-.63.76-1.68 1.35-2.7 1.27-.12-1 .34-2.05.93-2.72.66-.75 1.8-1.31 2.67-1.3ZM19.9 17.36c-.5 1.15-.74 1.66-1.38 2.68-.9 1.43-2.16 3.21-3.73 3.23-1.4.02-1.76-.9-3.66-.9-1.9 0-2.3.88-3.69.92-1.53.05-2.7-1.55-3.6-2.98-2.02-3.2-2.24-6.95-.99-8.95.89-1.42 2.29-2.25 3.6-2.25 1.34 0 2.18.92 3.29.92 1.08 0 1.73-.92 3.28-.92 1.16 0 2.39.63 3.27 1.72-2.87 1.57-2.4 5.65.61 6.55Z" />
    </svg>
  );
}

export function SocialButtons({ onSelect }: { onSelect: (provider: "google" | "apple") => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onSelect("google")}
        data-cursor="pointer"
        className="flex h-12 items-center justify-center gap-2.5 rounded-full border border-line text-[13px] font-medium text-ink transition-colors hover:border-ink"
      >
        <GoogleMark />
Continue with Google
      </button>
      <button
        type="button"
        onClick={() => onSelect("apple")}
        data-cursor="pointer"
        className="flex h-12 items-center justify-center gap-2.5 rounded-full border border-line text-[13px] font-medium text-ink transition-colors hover:border-ink"
      >
        <AppleMark />
Continue with Apple
      </button>
    </div>
  );
}
