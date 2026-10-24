import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const contacts = [
  { label: "785 901 1622", href: "tel:+17859011622" },
  { label: "info@wanderlast.com", href: "mailto:info@wanderlast.com" },
];

const socials = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] px-5 pt-16 pb-6 text-white lg:px-16">
      <div className="mx-auto max-w-[1100px]">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="h-12 w-auto sm:h-14"
        />
        <p className="mt-2 text-xs text-white/80">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-10 grid gap-8 text-xs sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 className="uppercase text-white/90">Newsletter</h4>
            <p className="mt-2 text-[10px] text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-3 flex items-center bg-zinc-800">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full bg-transparent px-3 py-2 text-[11px] text-white outline-none placeholder:text-white/50"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-3 text-white/80 transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-3.5" />
              </button>
            </form>
          </div>

          <div>
            <h4 className="uppercase text-white/90">Quick Links</h4>
            <ul className="mt-3 flex flex-col gap-3 text-white/70">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white/90">Support</h4>
            <ul className="mt-3 flex flex-col gap-3 text-white/70">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white/90">Contact Us</h4>
            <ul className="mt-3 flex flex-col gap-3 text-white/70">
              {contacts.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] text-white/60">
          <p>© 2026 Wanderlast. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;