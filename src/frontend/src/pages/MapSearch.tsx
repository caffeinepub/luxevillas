import { VILLAS } from "@/data/villas";
import { Link } from "@tanstack/react-router";
import { Bed, MapPin, Search, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const MAP_MARKERS = [
  { id: "1", city: "Goa", top: "72%", left: "22%" },
  { id: "2", city: "Udaipur", top: "45%", left: "30%" },
  { id: "3", city: "Coorg", top: "78%", left: "28%" },
  { id: "4", city: "Manali", top: "18%", left: "38%" },
  { id: "5", city: "Kerala", top: "82%", left: "30%" },
  { id: "6", city: "Jaipur", top: "42%", left: "38%" },
];

export default function MapSearch() {
  const [selectedVilla, setSelectedVilla] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = VILLAS.filter(
    (v) =>
      !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen pt-20 flex flex-col">
      <div className="border-b border-border bg-card px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold">
              Map <span className="text-gold italic">Search</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore villas by location
            </p>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search location..."
              data-ocid="map.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-full py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 160px)" }}
      >
        {/* Left Panel */}
        <div className="w-80 lg:w-96 shrink-0 overflow-y-auto border-r border-border bg-background">
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-4">
              {filtered.length} properties
            </p>
            <div className="space-y-3">
              {filtered.map((villa, i) => (
                <button
                  key={villa.id}
                  type="button"
                  data-ocid={`map.item.${i + 1}`}
                  onClick={() =>
                    setSelectedVilla(
                      villa.id === selectedVilla ? null : villa.id,
                    )
                  }
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-300 ${
                    selectedVilla === villa.id
                      ? "border-gold bg-gold/5"
                      : "border-border hover:border-gold/40"
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={villa.image}
                      alt={villa.name}
                      className="w-20 h-16 object-cover rounded-lg shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm truncate">
                        {villa.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin className="w-3 h-3" />
                        {villa.city}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gold font-bold">
                          ₹{villa.price.toLocaleString()}/night
                        </span>
                        <div className="flex items-center gap-1">
                          <Star
                            className="w-3 h-3 text-gold"
                            fill="currentColor"
                          />
                          <span className="text-xs font-semibold">
                            {villa.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3 text-[10px] text-muted-foreground mt-1">
                        <span>
                          <Bed className="w-3 h-3 inline mr-0.5" />
                          {villa.bedrooms}
                        </span>
                        <span>
                          <Users className="w-3 h-3 inline mr-0.5" />
                          {villa.maxGuests}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedVilla === villa.id && (
                    <Link
                      to="/villas/$id"
                      params={{ id: villa.id }}
                      data-ocid={`map.item.${i + 1}`}
                      className="mt-3 block w-full py-2 text-center text-[10px] font-bold tracking-[0.1em] uppercase gold-gradient text-primary-foreground rounded-lg"
                    >
                      View Details
                    </Link>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative bg-gradient-to-br from-[#1a3a2a] via-[#0f2a1a] to-[#1a2a3a] overflow-hidden">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 50px, oklch(1 0 0 / 0.3) 50px, oklch(1 0 0 / 0.3) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, oklch(1 0 0 / 0.3) 50px, oklch(1 0 0 / 0.3) 51px)",
            }}
          />

          {/* India outline placeholder text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center opacity-20">
              <p className="font-serif text-6xl font-bold text-foreground">
                India
              </p>
            </div>
          </div>

          {/* Location Markers */}
          {MAP_MARKERS.map((m) => {
            const villa = VILLAS.find((v) => v.id === m.id);
            if (!villa) return null;
            const isSelected = selectedVilla === m.id;
            return (
              <button
                key={m.id}
                type="button"
                data-ocid="map.map_marker"
                onClick={() => setSelectedVilla(isSelected ? null : m.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: m.top, left: m.left }}
              >
                <div
                  className={`relative transition-all duration-300 ${
                    isSelected ? "scale-125" : "hover:scale-110"
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-xl transition-all ${
                      isSelected
                        ? "bg-gold text-primary-foreground"
                        : "bg-background/90 backdrop-blur-sm text-foreground border border-border hover:border-gold"
                    }`}
                  >
                    ₹{(villa.price / 1000).toFixed(0)}K
                  </div>
                  <MapPin
                    className={`w-4 h-4 mx-auto mt-0.5 transition-colors ${
                      isSelected ? "text-gold" : "text-foreground/60"
                    }`}
                  />
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-card border border-gold/30 rounded-xl shadow-2xl p-3 pointer-events-none"
                  >
                    <img
                      src={villa.image}
                      alt={villa.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <p className="font-semibold text-xs">{villa.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {m.city}
                    </p>
                    <p className="text-xs text-gold font-bold mt-1">
                      ₹{villa.price.toLocaleString()}/night
                    </p>
                  </motion.div>
                )}
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">
              Legend
            </p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <span className="text-xs text-foreground/70">Selected</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-card border border-border" />
              <span className="text-xs text-foreground/70">Available</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
