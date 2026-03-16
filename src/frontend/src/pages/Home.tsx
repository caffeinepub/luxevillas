import { VILLAS } from "@/data/villas";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bath,
  Bed,
  ChevronDown,
  Gem,
  Headphones,
  Home as HomeIcon,
  MapPin,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const DESTINATIONS = [
  {
    name: "Goa",
    count: 48,
    image: "/assets/generated/dest-goa.dim_600x400.jpg",
  },
  {
    name: "Udaipur",
    count: 32,
    image: "/assets/generated/dest-udaipur.dim_600x400.jpg",
  },
  { name: "Coorg", count: 19, image: null },
  {
    name: "Manali",
    count: 41,
    image: "/assets/generated/dest-manali.dim_600x400.jpg",
  },
  {
    name: "Kerala",
    count: 55,
    image: "/assets/generated/dest-kerala.dim_600x400.jpg",
  },
  {
    name: "Jaipur",
    count: 27,
    image: "/assets/generated/dest-jaipur.dim_600x400.jpg",
  },
];

const DEST_GRADIENTS = [
  "from-[#1a6b5a] to-[#0d3b2e]",
  "from-[#7b3a5c] to-[#3d1a2e]",
  "from-[#2d5a27] to-[#1a3318]",
  "from-[#2d4a7a] to-[#1a2d4d]",
  "from-[#1a5c6b] to-[#0d333d]",
  "from-[#8b4513] to-[#5c2d0a]",
];

const EXPERIENCES = [
  {
    title: "Destination Weddings",
    desc: "Unforgettable ceremonies in India's most scenic villas",
    image: "/assets/generated/exp-wedding.dim_800x500.jpg",
  },
  {
    title: "Corporate Retreats",
    desc: "Inspire your team with luxury off-site experiences",
    image: "/assets/generated/exp-corporate.dim_800x500.jpg",
  },
  {
    title: "Private Celebrations",
    desc: "Birthdays, anniversaries & milestones done in style",
    image: "/assets/generated/exp-celebration.dim_800x500.jpg",
  },
];

const TESTIMONIALS = [
  {
    text: "The villa exceeded every expectation. From the infinity pool overlooking the sea to the impeccable service — pure luxury.",
    name: "Priya Sharma",
    location: "Mumbai",
    image: "/assets/generated/testimonial-2.dim_200x200.jpg",
  },
  {
    text: "We hosted our anniversary here and it was absolutely magical. The team arranged everything perfectly.",
    name: "Rahul & Neha Gupta",
    location: "Delhi",
    image: "/assets/generated/testimonial-1.dim_200x200.jpg",
  },
  {
    text: "Best workcation I've ever had. Fast WiFi, stunning views, and the most peaceful work environment imaginable.",
    name: "Arjun Mehta",
    location: "Bangalore",
    image: "/assets/generated/testimonial-3.dim_200x200.jpg",
  },
];

const STATS = [
  { value: "500+", label: "Luxury Villas" },
  { value: "50+", label: "Destinations" },
  { value: "10,000+", label: "Happy Guests" },
  { value: "4.9★", label: "Average Rating" },
];

const FEATURES = [
  {
    icon: <HomeIcon className="w-5 h-5" />,
    title: "Handpicked Properties",
    desc: "Every villa personally vetted for quality",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure Booking",
    desc: "End-to-end encrypted payments",
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    title: "Dedicated Concierge",
    desc: "24/7 support before and during your stay",
  },
  {
    icon: <Gem className="w-5 h-5" />,
    title: "Exclusive Access",
    desc: "Private villas not listed anywhere else",
  },
];

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function AnimSection({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState("");

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-villa.dim_1920x1080.jpg"
            alt="Luxury Villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full pt-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[10px] font-bold tracking-[0.4em] text-gold/80 uppercase mb-6"
          >
            ◆ &nbsp; Handpicked Luxury Villas &nbsp; ◆
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif font-bold text-foreground leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Experience India's
            <br />
            <em className="text-gold not-italic">Finest Villas</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-foreground/60 text-base lg:text-xl mb-14 font-light max-w-lg mx-auto"
          >
            Curated luxury villas across India's most coveted destinations
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card/90 backdrop-blur-2xl border border-border rounded-2xl shadow-[0_8px_64px_oklch(0_0_0/0.7)] overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                <div className="flex flex-col gap-1 px-5 py-4 border-b border-border lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-[0.18em] uppercase flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> Destination
                  </p>
                  <select
                    data-ocid="hero.select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-foreground/90 text-sm py-1 focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="" className="bg-card">
                      Where to?
                    </option>
                    {[
                      "Goa",
                      "Udaipur",
                      "Coorg",
                      "Manali",
                      "Kerala",
                      "Jaipur",
                    ].map((c) => (
                      <option key={c} value={c} className="bg-card">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 px-5 py-4 border-b border-border lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-[0.18em] uppercase">
                    Check In
                  </p>
                  <input
                    type="date"
                    data-ocid="hero.input"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    className="bg-transparent text-foreground/90 text-sm py-1 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 px-5 py-4 border-b border-border lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-[0.18em] uppercase">
                    Check Out
                  </p>
                  <input
                    type="date"
                    data-ocid="hero.input"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                    className="bg-transparent text-foreground/90 text-sm py-1 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 px-5 py-4 border-b border-border lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-[0.18em] uppercase flex items-center gap-1">
                    <Users className="w-2.5 h-2.5" /> Guests
                  </p>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    data-ocid="hero.input"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-transparent text-foreground/90 text-sm py-1 focus:outline-none w-16"
                  />
                </div>
                <div className="flex items-center justify-center p-3">
                  <button
                    type="button"
                    data-ocid="hero.primary_button"
                    onClick={() => navigate({ to: "/villas" })}
                    className="w-full h-full py-3 px-6 gold-gradient text-primary-foreground font-bold text-sm tracking-wide rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="button"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 animate-bounce"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </section>

      {/* ─── Stats Bar ───────────────────────────────────────── */}
      <section className="bg-card border-y border-border py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="text-center"
            >
              <div className="font-serif text-3xl font-bold text-gold mb-1">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Featured Destinations ───────────────────────────── */}
      <section className="section-padding max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Explore India
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="text-gold italic">Destinations</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From Himalayan peaks to tropical backwaters — find your perfect
              escape
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={fadeUp}
                custom={i}
                className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group"
              >
                <Link to="/villas">
                  {dest.image ? (
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${DEST_GRADIENTS[i]} transition-transform duration-700 group-hover:scale-110`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-gold font-semibold">
                      {dest.count} Villas
                    </p>
                  </div>
                  <div className="absolute inset-0 ring-2 ring-gold/0 group-hover:ring-gold/40 rounded-xl transition-all duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* ─── Featured Villas ────────────────────────────────── */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Curated For You
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
                Featured <span className="text-gold italic">Villas</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VILLAS.slice(0, 3).map((villa, i) => (
                <motion.div
                  key={villa.id}
                  variants={fadeUp}
                  custom={i}
                  data-ocid={`villas.item.${i + 1}`}
                  className="luxury-card group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={villa.image}
                      alt={villa.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 text-gold" fill="currentColor" />
                      <span className="text-xs font-bold text-foreground">
                        {villa.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-lg font-bold">
                        {villa.name}
                      </h3>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-gold font-bold">
                          ₹{villa.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /night
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-4">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {villa.city}, {villa.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5" />
                        {villa.bedrooms} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5" />
                        {villa.bathrooms} Baths
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {villa.maxGuests} Guests
                      </span>
                    </div>
                    <Link
                      to="/villas/$id"
                      params={{ id: villa.id }}
                      data-ocid={`villas.item.${i + 1}`}
                      className="block w-full py-2.5 text-center text-[11px] font-bold tracking-[0.1em] uppercase border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300 rounded-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-12">
              <Link
                to="/villas"
                data-ocid="home.primary_button"
                className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity"
              >
                Explore All Villas <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ─── Experiences ─────────────────────────────────────── */}
      <section className="section-padding max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Beyond the Villa
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Curated <span className="text-gold italic">Experiences</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.title}
                variants={fadeUp}
                custom={i}
                className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[4/3]"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-xl font-bold mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-foreground/70">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} className="text-center mt-10">
            <Link
              to="/experiences"
              data-ocid="home.secondary_button"
              className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-3 transition-all"
            >
              View All Experiences <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </AnimSection>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────── */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Guest Stories
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
                What Our <span className="text-gold italic">Guests Say</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  custom={i}
                  data-ocid={`testimonials.item.${i + 1}`}
                  className="bg-background p-7 rounded-xl border border-border"
                >
                  <div className="flex mb-4">
                    {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                      <Star
                        key={k}
                        className="w-4 h-4 text-gold"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ─── Luxury Promise ──────────────────────────────────── */}
      <section className="section-padding max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimSection>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Our Commitment
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              The <span className="text-gold italic">LuxeVillas</span> Promise
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="p-6 rounded-xl border border-border bg-card hover:border-gold/40 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimSection>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gold-gradient opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience{" "}
              <span className="text-gold italic">True Luxury</span>?
            </h2>
            <p className="text-foreground/60 text-lg mb-10">
              Your perfect villa awaits. Let us craft an unforgettable stay.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/villas"
                data-ocid="cta.primary_button"
                className="px-10 py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity"
              >
                Browse Villas
              </Link>
              <Link
                to="/contact"
                data-ocid="cta.secondary_button"
                className="px-10 py-4 border border-gold text-gold font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-gold hover:text-primary-foreground transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
