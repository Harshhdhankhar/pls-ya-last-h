"use client";

import { useId, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function AddressAutocompleteInput({
  label,
  value,
  onChange,
  required,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative flex items-end gap-2.5 border-b transition-colors",
          focused ? "border-ink" : "border-line"
        )}
      >
        <MapPin
          className={cn("mb-2.5 h-4 w-4 shrink-0 transition-colors", focused ? "text-ink" : "text-ink-faint")}
          strokeWidth={1.5}
        />
        <div className="relative flex-1">
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-0 origin-left text-ink-faint transition-all duration-300 ease-premium",
              floated ? "top-1 -translate-y-1 text-[11px] uppercase tracking-wide" : "top-3.5 text-base"
            )}
          >
            {label}
          </label>
          <input
            id={id}
            type="text"
            value={value}
            required={required}
            autoComplete="off"
            // TODO: wire google.maps.places.Autocomplete to this input once an API key is configured
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent pb-2.5 pt-6 text-base text-ink focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
