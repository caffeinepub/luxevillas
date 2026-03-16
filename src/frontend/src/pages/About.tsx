import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Leaf, Trophy } from "lucide-react";
import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

const TEAM = [
  {
    name: "Aisha Kapoor",
    title: "Founder & CEO",
    bio: "Former luxury hotel director with 15 years experience curating exceptional stays across India.",
    image: "/assets/generated/team-1.dim_200x200.jpg",
  },
  {
    name: "Arjun Sharma",
    title: "Head of Curation",
    bio: "Travels 200 days a year vetting properties to ensure every villa meets our exacting standards.",
    image: "/assets/generated/team-2.dim_200x200.jpg",
  },
  {
    name: "Meera Nair",
    title: "Guest Experience Director",
    bio: "Dedicated to creating personalized experiences that turn first-time guests into lifelong travelers.",
    image: "/assets/generated/team-3.dim_200x200.jpg",
  },
  {
    name: "Vikram Patel",
    title: "Technology & Operations",
    bio: "Building the seamless digital backbone that makes every LuxeVillas booking effortless.",
    image: "/assets/generated/team-4.dim_200x200.jpg",
  },
];

const VALUES = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Genuine Care",
    desc: "We don't just book villas — we craft memories. Every guest deserves a stay that exceeds every expectation.",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Uncompromising Quality",
    desc: "Less than 5% of properties we review make it to our platform. Quality is non-negotiable.",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Responsible Luxury",
    desc: "We partner with eco-conscious properties and support local communities in every destination we serve.",
  },
];

const AWARDS = [
  {
    year: "2025",
    award: "Best Luxury Villa Platform",
    org: "India Travel Awards",
  },
  {
    year: "2024",
    award: "Most Trusted Hospitality Brand",
    org: "Economic Times",
  },
  { year: "2024", award: "Top 10 Travel Startups", org: "Forbes India" },
  { year: "2023", award: "Guest Choice Award", org: "TripAdvisor" },
];

export default function About() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3"
          >
            Our Story
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif text-5xl lg:text-7xl font-bold mb-8"
          >
            About <span className="text-gold italic">LuxeVillas</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-foreground/60 text-xl leading-relaxed max-w-2xl mx-auto"
          >
            We believe that where you stay shapes the entire story of your
            journey. We exist to ensure that story is extraordinary.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
              Born from a <span className="text-gold italic">Passion</span> for
              India
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              LuxeVillas was born in 2021 from a simple but powerful conviction:
              that India's most extraordinary private homes were invisible to
              the world. Founder Aisha Kapoor, after 15 years in five-star
              hospitality, saw countless stunning properties sit empty while
              travelers settled for generic hotel rooms.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              What began as a curated collection of 12 properties in Goa has
              grown into India's most trusted luxury villa platform, with over
              500 handpicked homes across 50+ destinations — each one personally
              vetted and continuously reviewed by our team of dedicated
              curators.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="relative aspect-square rounded-2xl overflow-hidden"
          >
            <img
              src="/assets/generated/hero-villa.dim_1920x1080.jpg"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
              What Drives Us
            </p>
            <h2 className="font-serif text-4xl font-bold">
              Our <span className="text-gold italic">Values</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-8 bg-background rounded-2xl border border-border text-center group hover:border-gold/40 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
            The People Behind
          </p>
          <h2 className="font-serif text-4xl font-bold">
            Meet the <span className="text-gold italic">Team</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              data-ocid={`team.item.${i + 1}`}
              className="text-center"
            >
              <div className="relative w-28 h-28 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-2 border-border"
                />
                <div className="absolute inset-0 rounded-full border-2 border-gold/0 hover:border-gold/50 transition-all" />
              </div>
              <h3 className="font-serif text-base font-bold mb-1">
                {member.name}
              </h3>
              <p className="text-xs text-gold font-semibold mb-2 uppercase tracking-wide">
                {member.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl font-bold">
              Recognition & <span className="text-gold italic">Awards</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {AWARDS.map((a, i) => (
              <motion.div
                key={a.award}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-5 bg-background rounded-xl border border-border text-center"
              >
                <div className="text-gold font-bold text-lg mb-2">{a.year}</div>
                <p className="text-sm font-semibold mb-1 leading-tight">
                  {a.award}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {a.org}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl font-bold mb-6">
            Ready to experience{" "}
            <span className="text-gold italic">the difference</span>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/villas"
              data-ocid="about.primary_button"
              className="px-10 py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Browse Villas <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              data-ocid="about.secondary_button"
              className="px-10 py-4 border border-gold text-gold font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-gold hover:text-primary-foreground transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
