import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ARTICLES = [
  {
    id: 1,
    title: "The Ultimate Guide to Goa's Luxury Villas",
    category: "Destinations",
    excerpt:
      "From clifftop retreats to beachfront estates — we unveil Goa's most extraordinary private villas and the secrets that make them unforgettable.",
    date: "March 8, 2026",
    author: "Priya Mehta",
    image: "/assets/generated/blog-goa.dim_800x500.jpg",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Udaipur by Night: A Palace City After Dark",
    category: "Destinations",
    excerpt:
      "The City of Lakes transforms after sunset into something truly magical. We explore the after-hours charm of this Rajasthani jewel.",
    date: "February 22, 2026",
    author: "Rohan Verma",
    image: "/assets/generated/blog-udaipur.dim_800x500.jpg",
    readTime: "6 min",
  },
  {
    id: 3,
    title: "10 Villa Décor Trends Shaping Luxury Travel",
    category: "Luxury Life",
    excerpt:
      "Biophilic design, local artisanship, and wellness spaces are redefining what it means to stay in a luxury villa. Here's what's in for 2026.",
    date: "February 10, 2026",
    author: "Ananya Iyer",
    image: "/assets/generated/blog-interior.dim_800x500.jpg",
    readTime: "5 min",
  },
  {
    id: 4,
    title: "Kerala's Backwaters: A Complete Travel Guide",
    category: "Destinations",
    excerpt:
      "Navigate the serene labyrinth of canals, lagoons, and lakes that make Kerala one of India's most spellbinding destinations.",
    date: "January 28, 2026",
    author: "Kiran Nair",
    image: "/assets/generated/blog-kerala.dim_800x500.jpg",
    readTime: "10 min",
  },
  {
    id: 5,
    title: "How to Choose the Perfect Luxury Villa for Your Group",
    category: "Tips",
    excerpt:
      "From assessing amenities to understanding caretaker services — a definitive checklist for booking your next luxury villa as a group.",
    date: "January 15, 2026",
    author: "Priya Mehta",
    image: "/assets/generated/blog-goa.dim_800x500.jpg",
    readTime: "7 min",
  },
  {
    id: 6,
    title: "Festivals of Rajasthan: Culture Meets Luxury",
    category: "Culture",
    excerpt:
      "Time your villa stay to coincide with the Desert Festival or Pushkar Fair, and experience Rajasthan's cultural heartbeat at its most vivid.",
    date: "January 5, 2026",
    author: "Rohan Verma",
    image: "/assets/generated/blog-udaipur.dim_800x500.jpg",
    readTime: "9 min",
  },
];

const CATS = ["All", "Destinations", "Tips", "Luxury Life", "Culture"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3"
          >
            Stories & Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl lg:text-7xl font-bold mb-6"
          >
            The <span className="text-gold italic">LuxeVillas</span> Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 text-xl max-w-lg mx-auto"
          >
            Travel inspiration, destination guides, and the art of luxury living
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-b border-border sticky top-20 z-10 bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {CATS.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="blog.tab"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-6 py-4 text-sm font-semibold border-b-2 transition-all ${
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

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div data-ocid="blog.empty_state" className="text-center py-20">
            <p className="text-muted-foreground">
              No articles in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                data-ocid={`blog.item.${i + 1}`}
                className="luxury-card group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 bg-gold/90 text-primary-foreground rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-xl font-bold mb-3 leading-tight group-hover:text-gold transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-5">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {article.date}
                      </span>
                    </div>
                    <button
                      type="button"
                      data-ocid={`blog.item.${i + 1}`}
                      className="flex items-center gap-1 text-gold font-semibold hover:gap-2 transition-all"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
