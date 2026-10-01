import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

export const SITE_NAME = SITE.name;

/** The logo mark – the same drawing as src/app/icon.svg (the favicon). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-8 shrink-0 drop-shadow-sm", className)} aria-hidden>
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5b5bf6" />
          <stop offset="0.55" stopColor="#8b3df0" />
          <stop offset="1" stopColor="#e0408f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#logo-bg)" />
      <rect x="14" y="10" width="30" height="40" rx="4.5" fill="#fff" />
      <circle cx="23.5" cy="20.5" r="4.5" fill="#6d4ef2" />
      <rect x="31" y="17" width="9" height="3" rx="1.5" fill="#c9c3fb" />
      <rect x="31" y="22" width="6" height="3" rx="1.5" fill="#e3dffd" />
      <rect x="19" y="30" width="20" height="3" rx="1.5" fill="#dcd8fc" />
      <rect x="19" y="36" width="14" height="3" rx="1.5" fill="#dcd8fc" />
      <circle cx="44" cy="44" r="11" fill="#fbbf24" stroke="#fff" strokeWidth="3.5" />
      <path d="M39 44.4l3.4 3.4 6.6-6.8" fill="none" stroke="#3b1d8f" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "GetPro" + a gradient "CV". */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[16px] font-semibold tracking-tight text-fg">
        GetPro<span className="bg-linear-to-r from-primary via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">CV</span>
      </span>
    </span>
  );
}
