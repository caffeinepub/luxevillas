export interface Villa {
  id: string;
  name: string;
  location: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  reviews: number;
  amenities: string[];
  image: string;
  images: string[];
  gradient: string;
  description: string;
  size: string;
}

export const VILLAS: Villa[] = [
  {
    id: "1",
    name: "The Golden Retreat",
    location: "Goa",
    city: "North Goa",
    price: 45000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    rating: 4.9,
    reviews: 128,
    amenities: ["Pool", "WiFi", "Parking", "Kitchen", "AC", "Beach Access"],
    image: "/assets/generated/villa-1.dim_800x600.jpg",
    images: [
      "/assets/generated/villa-1.dim_800x600.jpg",
      "/assets/generated/villa-2.dim_800x600.jpg",
      "/assets/generated/villa-3.dim_800x600.jpg",
      "/assets/generated/villa-kerala.dim_800x600.jpg",
      "/assets/generated/villa-manali.dim_800x600.jpg",
    ],
    gradient: "from-[#1a6b5a] to-[#0d3b2e]",
    description:
      "Nestled along the pristine shores of North Goa, The Golden Retreat is the epitome of coastal luxury. This architectural marvel seamlessly blends Portuguese colonial influences with contemporary design, offering an unparalleled experience for discerning travelers. Wake up to the sound of waves, sip sundowners by the private infinity pool, and indulge in world-class amenities crafted for the modern connoisseur.\n\nThe villa spans across a lush 8,000 sq ft plot, featuring four en-suite bedrooms, each meticulously appointed with custom furnishings and premium linens. The open-plan living areas flow effortlessly onto expansive terraces, creating an indoor-outdoor lifestyle that perfectly captures the Goan spirit.",
    size: "8,000 sq ft",
  },
  {
    id: "2",
    name: "Udaipur Palace Villa",
    location: "Udaipur",
    city: "Rajasthan",
    price: 62000,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    rating: 4.8,
    reviews: 94,
    amenities: ["Pool", "WiFi", "Parking", "Kitchen", "Lake View", "Butler"],
    image: "/assets/generated/villa-2.dim_800x600.jpg",
    images: [
      "/assets/generated/villa-2.dim_800x600.jpg",
      "/assets/generated/villa-1.dim_800x600.jpg",
      "/assets/generated/villa-3.dim_800x600.jpg",
      "/assets/generated/villa-manali.dim_800x600.jpg",
      "/assets/generated/villa-kerala.dim_800x600.jpg",
    ],
    gradient: "from-[#7b3a5c] to-[#3d1a2e]",
    description:
      "Rising like a jewel above the shimmering Pichola Lake, Udaipur Palace Villa is a testament to Rajasthani grandeur reimagined for the modern age. Every corner whispers tales of royal heritage — from hand-carved marble facades to ornate jharokha windows that frame breathtaking lake vistas.\n\nThe villa's five palatial bedrooms are adorned with antique furnishings sourced from across Rajasthan, silk drapes in jewel tones, and marble bathrooms with gold-plated fixtures. Your dedicated butler ensures every whim is attended to, from arranging private boat rides on the lake to organizing candlelit dinners on the rooftop terrace.",
    size: "12,000 sq ft",
  },
  {
    id: "3",
    name: "Coorg Coffee Estate",
    location: "Coorg",
    city: "Karnataka",
    price: 28000,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    rating: 4.7,
    reviews: 67,
    amenities: ["Pool", "WiFi", "Kitchen", "Garden", "Mountain View"],
    image: "/assets/generated/villa-3.dim_800x600.jpg",
    images: [
      "/assets/generated/villa-3.dim_800x600.jpg",
      "/assets/generated/villa-1.dim_800x600.jpg",
      "/assets/generated/villa-2.dim_800x600.jpg",
      "/assets/generated/villa-kerala.dim_800x600.jpg",
      "/assets/generated/villa-manali.dim_800x600.jpg",
    ],
    gradient: "from-[#2d5a27] to-[#1a3318]",
    description:
      "Immerse yourself in the emerald embrace of Coorg's legendary coffee country at this enchanting estate. Surrounded by 15 acres of working coffee and pepper plantations, the villa offers an extraordinary opportunity to experience the rhythms of estate life while cocooned in absolute luxury.\n\nMornings begin with the aroma of freshly harvested and roasted single-origin coffee served on the veranda, overlooking mist-draped valleys and the distant peaks of the Western Ghats. Three beautifully appointed cottage-style suites each feature private sit-outs where you can listen to birdsong while the world outside remains blissfully unaware of your existence.",
    size: "5,500 sq ft",
  },
  {
    id: "4",
    name: "Himalayan Sky Villa",
    location: "Manali",
    city: "Himachal Pradesh",
    price: 35000,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.9,
    reviews: 45,
    amenities: ["WiFi", "Kitchen", "Mountain View", "Fireplace", "Jacuzzi"],
    image: "/assets/generated/villa-manali.dim_800x600.jpg",
    images: [
      "/assets/generated/villa-manali.dim_800x600.jpg",
      "/assets/generated/villa-1.dim_800x600.jpg",
      "/assets/generated/villa-2.dim_800x600.jpg",
      "/assets/generated/villa-3.dim_800x600.jpg",
      "/assets/generated/villa-kerala.dim_800x600.jpg",
    ],
    gradient: "from-[#2d4a7a] to-[#1a2d4d]",
    description:
      "Perched at 7,500 feet above sea level, Himalayan Sky Villa is a bold architectural statement against the dramatic canvas of the Kullu Valley. Floor-to-ceiling glass walls ensure that the ever-changing mountain theater — from sunrise alpenglow to star-filled nights — is always the centerpiece.\n\nThe villa's four bedrooms each offer unique mountain perspectives, with the master suite featuring a glass-walled jacuzzi from which you can soak while watching snowflakes fall. A wood-burning fireplace, gourmet kitchen stocked with local Himachali produce, and heated floors make this a year-round sanctuary for those who seek nature's grandeur without sacrificing comfort.",
    size: "6,200 sq ft",
  },
  {
    id: "5",
    name: "Kerala Backwater Retreat",
    location: "Kerala",
    city: "Alleppey",
    price: 38000,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    rating: 4.8,
    reviews: 82,
    amenities: ["Pool", "WiFi", "Kitchen", "Waterfront", "Boat Jetty"],
    image: "/assets/generated/villa-kerala.dim_800x600.jpg",
    images: [
      "/assets/generated/villa-kerala.dim_800x600.jpg",
      "/assets/generated/villa-1.dim_800x600.jpg",
      "/assets/generated/villa-2.dim_800x600.jpg",
      "/assets/generated/villa-3.dim_800x600.jpg",
      "/assets/generated/villa-manali.dim_800x600.jpg",
    ],
    gradient: "from-[#1a5c6b] to-[#0d333d]",
    description:
      "At the edge of Alleppey's legendary backwaters, this extraordinary retreat unfolds along 200 meters of private waterfront. The villa's architecture draws deeply from Kerala's centuries-old nalukettu tradition, with a central courtyard that captures the breeze and opens to the sky, while its own private boat jetty provides exclusive access to the backwater labyrinth.\n\nThree opulent bedrooms, each in a separate cottage connected by covered walkways through the spice garden, create an intimate sense of privacy. Ayurvedic treatments, traditional Kerala cuisine prepared by your resident chef, and sunset canoe rides through lily-covered channels complete an experience that is distinctly, irreplaceably Kerala.",
    size: "7,000 sq ft",
  },
  {
    id: "6",
    name: "Jaipur Heritage Haveli",
    location: "Jaipur",
    city: "Rajasthan",
    price: 52000,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    rating: 4.7,
    reviews: 113,
    amenities: ["Pool", "WiFi", "Parking", "Kitchen", "Heritage", "City View"],
    image: "/assets/generated/villa-2.dim_800x600.jpg",
    images: [
      "/assets/generated/villa-2.dim_800x600.jpg",
      "/assets/generated/villa-1.dim_800x600.jpg",
      "/assets/generated/villa-3.dim_800x600.jpg",
      "/assets/generated/villa-manali.dim_800x600.jpg",
      "/assets/generated/villa-kerala.dim_800x600.jpg",
    ],
    gradient: "from-[#8b4513] to-[#5c2d0a]",
    description:
      "A 19th-century masterpiece lovingly restored to its former glory and elevated to contemporary luxury standards, Jaipur Heritage Haveli stands as one of the Pink City's most coveted private residences. The haveli's five bedrooms each bear the name and decorative vocabulary of a different Rajput kingdom, telling the story of Rajasthan's royal tapestry through art, textiles, and architecture.\n\nThe central courtyard, with its hand-painted frescoes, marble fountain, and jasmine-draped colonnades, creates a magical atmosphere for private events and intimate dinners. The rooftop terrace commands sweeping views of the Amber Fort and the Old City's rose-hued skyline, while the newly constructed underground pool room provides a dramatic contrast of ancient and modern.",
    size: "10,000 sq ft",
  },
];

export const AMENITY_ICONS: Record<string, string> = {
  Pool: "🏊",
  WiFi: "📶",
  Parking: "🚗",
  Kitchen: "🍳",
  AC: "❄️",
  "Beach Access": "🏖️",
  "Lake View": "🏞️",
  Butler: "🎩",
  Garden: "🌿",
  "Mountain View": "⛰️",
  Fireplace: "🔥",
  Jacuzzi: "🛁",
  Waterfront: "🌊",
  "Boat Jetty": "⛵",
  Heritage: "🏛️",
  "City View": "🌆",
};
