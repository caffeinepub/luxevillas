import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE },
  }),
};

const EXPERIENCES = [
  {
    id: 1,
    title: "Yacht Charter",
    category: "Transport",
    desc: "Set sail on the azure waters aboard your private luxury yacht. Complete with a professional crew, gourmet catering, and customized routes along India's finest coastlines.",
    duration: "Full Day",
    price: 85000,
    image: "/assets/generated/exp-yacht.dim_800x500.jpg",
  },
  {
    id: 2,
    title: "Helicopter Tour",
    category: "Adventure",
    desc: "Soar above India's iconic landmarks in a private helicopter. Take in panoramic vistas of palaces, mountains, and coastlines that few ever witness from such heights.",
    duration: "3 Hours",
    price: 45000,
    image: "/assets/generated/exp-helicopter.dim_800x500.jpg",
  },
  {
    id: 3,
    title: "Private Chef Experience",
    category: "Culinary",
    desc: "A Michelin-trained chef comes to your villa to craft a bespoke multi-course dinner using locally sourced ingredients and centuries-old Indian culinary traditions.",
    duration: "4 Hours",
    price: 25000,
    image: "/assets/generated/exp-chef.dim_800x500.jpg",
  },
  {
    id: 4,
    title: "Luxury Spa Retreat",
    category: "Wellness",
    desc: "Master therapists travel to your villa for an immersive wellness day — Ayurvedic treatments, hot stone massages, and personalized wellness consultations.",
    duration: "Full Day",
    price: 18000,
    image: "/assets/generated/exp-spa.dim_800x500.jpg",
  },
  {
    id: 5,
    title: "Wildlife Safari",
    category: "Adventure",
    desc: "A private jungle safari in India's premier national parks — luxury vehicle, expert naturalist guide, and gourmet picnic in the wilderness.",
    duration: "8 Hours",
    price: 32000,
    image: "/assets/generated/exp-safari.dim_800x500.jpg",
  },
  {
    id: 6,
    title: "Vineyard Tour",
    category: "Culinary",
    desc: "Explore India's emerging wine country with a sommelier-guided tour, private tastings at exclusive estates, and a sunset dinner among the vines.",
    duration: "Half Day",
    price: 15000,
    image: "/assets/generated/exp-vineyard.dim_800x500.jpg",
  },
];

const CATEGORIES = ["All", "Adventure", "Wellness", "Culinary", "Transport"];

export default function Experiences() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered =
    activeCategory === "All"
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.category === activeCategory);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3"
          >
            Beyond the Villa
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif text-5xl lg:text-7xl font-bold mb-6"
          >
            Curated <span className="text-gold italic">Experiences</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-foreground/60 text-xl max-w-xl mx-auto"
          >
            Every moment deserves to be extraordinary
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-b border-border sticky top-20 z-10 bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="experiences.tab"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-6 py-4 text-sm font-semibold tracking-wide border-b-2 transition-all ${
                  activeCategory === cat
                    ? "border-gold text-gold"
                    : "border-transparent text-foreground/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
              data-ocid={`experiences.item.${i + 1}`}
              className="luxury-card group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 bg-gold/90 text-primary-foreground rounded-full">
                    {exp.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2">
                  {exp.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-5">
                  {exp.desc}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {exp.duration}
                  </div>
                  <span className="text-gold font-bold">
                    ₹{exp.price.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid={`experiences.item.${i + 1}`}
                  className="mt-5 w-full py-3 border border-gold text-gold text-sm font-bold tracking-[0.1em] uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
                >
                  Book Experience <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
