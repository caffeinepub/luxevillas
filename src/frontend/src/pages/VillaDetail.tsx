import { AMENITY_ICONS, VILLAS } from "@/data/villas";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bath,
  Bed,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const REVIEWS = [
  {
    name: "Aryan Kapoor",
    date: "March 2026",
    rating: 5,
    comment:
      "Absolutely breathtaking property. The attention to detail is extraordinary. We celebrated our anniversary here and it was beyond words.",
  },
  {
    name: "Sunita Reddy",
    date: "February 2026",
    rating: 5,
    comment:
      "The most luxurious stay we've ever had. The staff was impeccable — they remembered our names and preferences from day one.",
  },
  {
    name: "Vikram & Pooja Singh",
    date: "January 2026",
    rating: 4,
    comment:
      "Beautiful villa, stunning location. The concierge arranged a private chef dinner that we'll talk about for years to come.",
  },
];

export default function VillaDetail() {
  const { id } = useParams({ from: "/villas/$id" });
  const navigate = useNavigate();
  const villa = VILLAS.find((v) => v.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Villa Not Found
          </h2>
          <Link to="/villas" className="text-gold hover:underline">
            Browse All Villas
          </Link>
        </div>
      </div>
    );
  }

  const nights =
    checkin && checkout
      ? Math.max(
          0,
          Math.floor(
            (new Date(checkout).getTime() - new Date(checkin).getTime()) /
              86400000,
          ),
        )
      : 0;
  const total = nights * villa.price;
  const taxes = Math.round(total * 0.18);

  return (
    <main className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <button
          type="button"
          onClick={() => navigate({ to: "/villas" })}
          data-ocid="detail.link"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Villas
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3"
              >
                <img
                  src={villa.images[activeImage]}
                  alt={villa.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      (prev) =>
                        (prev - 1 + villa.images.length) % villa.images.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage((prev) => (prev + 1) % villa.images.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 right-4 bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-foreground">
                  {activeImage + 1} / {villa.images.length}
                </div>
              </motion.div>
              <div className="grid grid-cols-5 gap-2">
                {villa.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-gold"
                        : "border-transparent hover:border-gold/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${villa.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Villa Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
                <div>
                  <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
                    {villa.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>
                      {villa.city}, {villa.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-card border border-border px-4 py-2 rounded-xl">
                  <Star className="w-4 h-4 text-gold" fill="currentColor" />
                  <span className="font-bold">{villa.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({villa.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border">
                {[
                  {
                    icon: <Bed className="w-5 h-5 text-gold" />,
                    value: villa.bedrooms,
                    label: "Bedrooms",
                  },
                  {
                    icon: <Bath className="w-5 h-5 text-gold" />,
                    value: villa.bathrooms,
                    label: "Bathrooms",
                  },
                  {
                    icon: <Users className="w-5 h-5 text-gold" />,
                    value: villa.maxGuests,
                    label: "Max Guests",
                  },
                  {
                    icon: <span className="text-gold text-lg">⬛</span>,
                    value: villa.size,
                    label: "Size",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center text-center"
                  >
                    {s.icon}
                    <span className="font-bold text-lg mt-1">{s.value}</span>
                    <span className="text-xs text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold mb-4">
                About This Villa
              </h2>
              {villa.description.split("\n\n").map((para) => (
                <p
                  key={para.slice(0, 20)}
                  className="text-foreground/70 leading-relaxed mb-4 text-sm"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {villa.amenities.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
                  >
                    <span className="text-xl">{AMENITY_ICONS[a] || "✓"}</span>
                    <span className="text-sm font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold mb-6">Location</h2>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-border">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${villa.gradient}`}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 48px, oklch(1 0 0 / 0.1) 48px, oklch(1 0 0 / 0.1) 50px), repeating-linear-gradient(90deg, transparent, transparent 48px, oklch(1 0 0 / 0.1) 48px, oklch(1 0 0 / 0.1) 50px)",
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 backdrop-blur-sm px-6 py-4 rounded-xl text-center">
                    <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                    <p className="font-semibold">
                      {villa.city}, {villa.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Exact location provided after booking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">
                Guest Reviews
              </h2>
              <div className="space-y-5">
                {REVIEWS.map((r, i) => (
                  <div
                    key={r.name}
                    data-ocid={`reviews.item.${i + 1}`}
                    className="p-6 bg-card border border-border rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-sm">{r.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.date}
                        </p>
                      </div>
                      <div className="flex">
                        {["s1", "s2", "s3", "s4", "s5"]
                          .slice(0, r.rating)
                          .map((k) => (
                            <Star
                              key={k}
                              className="w-3.5 h-3.5 text-gold"
                              fill="currentColor"
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-serif text-3xl font-bold text-gold">
                    ₹{villa.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">/night</span>
                </div>

                <div className="grid grid-cols-2 border border-border rounded-xl overflow-hidden mb-4">
                  <div className="p-3 border-r border-border">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-[0.15em] uppercase mb-1">
                      Check In
                    </p>
                    <input
                      type="date"
                      data-ocid="booking.input"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      className="bg-transparent text-sm text-foreground focus:outline-none w-full"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-[0.15em] uppercase mb-1">
                      Check Out
                    </p>
                    <input
                      type="date"
                      data-ocid="booking.input"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      className="bg-transparent text-sm text-foreground focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div className="border border-border rounded-xl p-3 mb-5">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-[0.15em] uppercase mb-1">
                    Guests
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-colors"
                    >
                      −
                    </button>
                    <span className="font-semibold">
                      {guests} Guest{guests > 1 ? "s" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setGuests(Math.min(villa.maxGuests, guests + 1))
                      }
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-gold hover:text-gold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="border-t border-border pt-4 mb-5 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">
                        ₹{villa.price.toLocaleString()} × {nights} nights
                      </span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">
                        Taxes & fees (18%)
                      </span>
                      <span>₹{taxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-gold">
                        ₹{(total + taxes).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Link
                  to="/booking/$id"
                  params={{ id: villa.id }}
                  data-ocid="detail.primary_button"
                  className="block w-full py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase text-center rounded-xl hover:opacity-90 transition-opacity"
                >
                  Book Now
                </Link>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  No charge yet — confirm on next step
                </p>
              </div>

              {/* Related */}
              <div className="mt-6">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Similar Villas
                </h3>
                {VILLAS.filter((v) => v.id !== id)
                  .slice(0, 2)
                  .map((v) => (
                    <Link
                      key={v.id}
                      to="/villas/$id"
                      params={{ id: v.id }}
                      className="flex gap-3 mb-3 p-3 bg-card border border-border rounded-xl hover:border-gold/40 transition-colors"
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {v.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {v.location}
                        </p>
                        <p className="text-xs text-gold font-bold mt-1">
                          ₹{v.price.toLocaleString()}/night
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
