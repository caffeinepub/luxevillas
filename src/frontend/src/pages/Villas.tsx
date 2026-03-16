import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { VILLAS } from "@/data/villas";
import { Link } from "@tanstack/react-router";
import {
  Bath,
  Bed,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LOCATIONS = [
  "All",
  "Goa",
  "Udaipur",
  "Coorg",
  "Manali",
  "Kerala",
  "Jaipur",
];
const AMENITY_OPTS = [
  "Pool",
  "WiFi",
  "Kitchen",
  "AC",
  "Parking",
  "Beach Access",
  "Mountain View",
  "Lake View",
];

export default function Villas() {
  const [locationFilter, setLocationFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedroomsFilter, setBedroomsFilter] = useState(0);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVillas = useMemo(() => {
    let v = [...VILLAS];
    if (locationFilter !== "All")
      v = v.filter((x) => x.location === locationFilter);
    v = v.filter((x) => x.price >= priceRange[0] && x.price <= priceRange[1]);
    if (bedroomsFilter > 0) v = v.filter((x) => x.bedrooms >= bedroomsFilter);
    if (amenitiesFilter.length > 0)
      v = v.filter((x) =>
        amenitiesFilter.every((a) => x.amenities.includes(a)),
      );
    if (searchQuery)
      v = v.filter(
        (x) =>
          x.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          x.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    if (sortBy === "price_asc") v.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") v.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") v.sort((a, b) => b.rating - a.rating);
    return v;
  }, [
    locationFilter,
    priceRange,
    bedroomsFilter,
    amenitiesFilter,
    sortBy,
    searchQuery,
  ]);

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (locationFilter !== "All")
    activeFilters.push({
      label: locationFilter,
      clear: () => setLocationFilter("All"),
    });
  if (bedroomsFilter > 0)
    activeFilters.push({
      label: `${bedroomsFilter}+ Bedrooms`,
      clear: () => setBedroomsFilter(0),
    });
  for (const a of amenitiesFilter) {
    activeFilters.push({
      label: a,
      clear: () => setAmenitiesFilter((prev) => prev.filter((x) => x !== a)),
    });
  }

  const toggleAmenity = (a: string) =>
    setAmenitiesFilter((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Browse Our Collection
          </p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold mb-6">
            Luxury <span className="text-gold italic">Villas</span>
          </h1>
          <p className="text-foreground/60 text-lg mb-8">
            Discover handpicked properties across India's finest destinations
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search villas or destinations..."
              data-ocid="villas.search_input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-full py-3 pl-11 pr-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="villas.toggle"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-foreground/70 hover:border-gold hover:text-gold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <span className="text-sm text-muted-foreground">
              {filteredVillas.length} properties found
            </span>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              data-ocid="villas.select"
              className="w-48 border-border text-sm"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeFilters.map((f) => (
              <Badge
                key={f.label}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1.5 bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 cursor-pointer"
                onClick={f.clear}
              >
                {f.label} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            <button
              type="button"
              onClick={() => {
                setLocationFilter("All");
                setBedroomsFilter(0);
                setAmenitiesFilter([]);
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-64 shrink-0"
            >
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-sm mb-6 uppercase tracking-widest text-muted-foreground">
                  Filters
                </h3>

                {/* Location */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3">Location</h4>
                  <div className="flex flex-col gap-2">
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        data-ocid="villas.toggle"
                        onClick={() => setLocationFilter(loc)}
                        className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                          locationFilter === loc
                            ? "bg-gold/10 text-gold"
                            : "text-foreground/60 hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3">
                    Price Per Night
                  </h4>
                  <Slider
                    data-ocid="villas.toggle"
                    min={0}
                    max={100000}
                    step={5000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3">Bedrooms</h4>
                  <div className="flex gap-2">
                    {[0, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        data-ocid="villas.toggle"
                        onClick={() => setBedroomsFilter(n)}
                        className={`w-9 h-9 rounded-lg text-xs font-semibold border transition-colors ${
                          bedroomsFilter === n
                            ? "bg-gold text-primary-foreground border-gold"
                            : "border-border text-foreground/60 hover:border-gold"
                        }`}
                      >
                        {n === 0 ? "Any" : `${n}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Amenities</h4>
                  <div className="flex flex-col gap-2.5">
                    {AMENITY_OPTS.map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <Checkbox
                          id={`amenity-${a}`}
                          data-ocid="villas.checkbox"
                          checked={amenitiesFilter.includes(a)}
                          onCheckedChange={() => toggleAmenity(a)}
                          className="border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <Label
                          htmlFor={`amenity-${a}`}
                          className="text-sm text-foreground/70 cursor-pointer"
                        >
                          {a}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Villa Grid */}
          <div className="flex-1">
            {filteredVillas.length === 0 ? (
              <div data-ocid="villas.empty_state" className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No villas match your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLocationFilter("All");
                    setBedroomsFilter(0);
                    setAmenitiesFilter([]);
                    setPriceRange([0, 100000]);
                  }}
                  className="mt-4 text-gold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVillas.map((villa, i) => (
                  <motion.div
                    key={villa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                    data-ocid={`villas.item.${i + 1}`}
                    className="luxury-card group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={villa.image}
                        alt={villa.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star
                          className="w-3 h-3 text-gold"
                          fill="currentColor"
                        />
                        <span className="text-xs font-bold">
                          {villa.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({villa.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-serif text-lg font-bold leading-tight">
                          {villa.name}
                        </h3>
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-gold font-bold text-lg">
                            ₹{villa.price.toLocaleString()}
                          </span>
                          <div className="text-[10px] text-muted-foreground">
                            /night
                          </div>
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
                          {villa.bedrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5" />
                          {villa.bathrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {villa.maxGuests} guests
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-5">
                        {villa.amenities.slice(0, 3).map((a) => (
                          <span
                            key={a}
                            className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground"
                          >
                            {a}
                          </span>
                        ))}
                        {villa.amenities.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">
                            +{villa.amenities.length - 3}
                          </span>
                        )}
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
