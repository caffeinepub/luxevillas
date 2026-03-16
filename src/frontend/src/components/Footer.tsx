import { Link } from "@tanstack/react-router";
import { Diamond, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "luxevillas")}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <Diamond className="w-4 h-4 text-gold" fill="currentColor" />
              <span className="font-serif text-xl font-bold text-gold tracking-widest">
                LuxeVillas
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              India's premier luxury villa rental platform. Handpicked
              properties, unparalleled service, extraordinary experiences.
            </p>
            <div className="flex gap-3">
              {[
                {
                  icon: <SiInstagram className="w-4 h-4" />,
                  label: "Instagram",
                },
                { icon: <SiFacebook className="w-4 h-4" />, label: "Facebook" },
                { icon: <SiX className="w-4 h-4" />, label: "X" },
                { icon: <SiYoutube className="w-4 h-4" />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors duration-300"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Destinations
            </h3>
            <ul className="space-y-2.5">
              {["Goa", "Udaipur", "Coorg", "Manali", "Kerala", "Jaipur"].map(
                (d) => (
                  <li key={d}>
                    <Link
                      to="/villas"
                      className="text-sm text-foreground/60 hover:text-gold transition-colors"
                    >
                      {d}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "All Villas", to: "/villas" },
                { label: "Experiences", to: "/experiences" },
                { label: "Map Search", to: "/map" },
                { label: "Blog", to: "/blog" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-foreground/60 hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/60">
                  hello@luxevillas.in
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/60">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/60">
                  14 Marine Lines, Mumbai 400002
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} LuxeVillas. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ♥ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-5">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
