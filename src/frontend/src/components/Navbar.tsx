import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useRouterState } from "@tanstack/react-router";
import { Diamond, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Villas", to: "/villas" },
  { label: "Experiences", to: "/experiences" },
  { label: "Map", to: "/map" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isHome = currentPath === "/";
  const { identity, clear } = useInternetIdentity();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <motion.header
      data-ocid="navbar.panel"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-xl border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            data-ocid="navbar.link"
            className="flex items-center gap-2.5 group"
          >
            <Diamond className="w-4 h-4 text-gold" fill="currentColor" />
            <span className="font-serif text-xl lg:text-2xl font-bold text-gold tracking-widest">
              LuxeVillas
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="navbar.link"
                className={`text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                  currentPath === link.to
                    ? "text-gold"
                    : isTransparent
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              className="text-foreground/50 hover:text-foreground transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            {identity ? (
              <>
                <Link
                  to="/admin"
                  data-ocid="navbar.link"
                  className="text-[11px] font-semibold text-foreground/60 hover:text-foreground tracking-[0.1em] uppercase transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => clear()}
                  className="text-[11px] font-semibold text-foreground/60 hover:text-foreground tracking-[0.1em] uppercase transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  data-ocid="navbar.link"
                  className="text-[11px] font-semibold text-foreground/60 hover:text-foreground tracking-[0.1em] uppercase transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/villas"
                  data-ocid="navbar.primary_button"
                  className="px-5 py-2.5 text-primary-foreground text-[11px] font-bold tracking-[0.14em] uppercase rounded-sm hover:opacity-90 transition-opacity gold-gradient"
                >
                  Book Now
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden text-foreground/70 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="navbar.link"
                  className="text-foreground/70 hover:text-foreground py-2.5 text-sm font-medium transition-colors block"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-4 flex flex-col gap-2">
                {identity ? (
                  <button
                    type="button"
                    onClick={() => {
                      clear();
                      setMenuOpen(false);
                    }}
                    className="text-left text-foreground/70 hover:text-foreground py-2.5 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    data-ocid="navbar.link"
                    className="text-left text-foreground/70 hover:text-foreground py-2.5 text-sm font-medium block"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  to="/villas"
                  data-ocid="navbar.primary_button"
                  className="w-full py-3 text-primary-foreground text-sm font-bold text-center gold-gradient block"
                  onClick={() => setMenuOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
