// ─── African Wildlife — Unsplash Source (free, no key, CORS-friendly) ────────
// source.unsplash.com returns a real photo every time, no API key needed.
// Each URL is pinned to a specific photo ID so cards are always consistent.
const WILDLIFE_CARDS = [
  { name: "Lion",      img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=400&fit=crop&auto=format" },
  { name: "Elephant",  img: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=400&fit=crop&auto=format" },
  { name: "Giraffe",   img: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&h=400&fit=crop&auto=format" },
  { name: "Zebra",     img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&h=400&fit=crop&auto=format" },
  { name: "Cheetah",   img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop&auto=format" },
  { name: "Gorilla",   img: "https://images.unsplash.com/photo-1507590134824-ea7e2d1c7e4a?w=400&h=400&fit=crop&auto=format" },
  { name: "Hippo",     img: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=400&h=400&fit=crop&auto=format" },
  { name: "Leopard",   img: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&h=400&fit=crop&auto=format" },
  { name: "Rhino",     img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop&auto=format" },
  { name: "Flamingo",  img: "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=400&h=400&fit=crop&auto=format" },
  { name: "Meerkat",   img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=400&fit=crop&auto=format" },
  { name: "Crocodile", img: "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?w=400&h=400&fit=crop&auto=format" },
];

// ─── African Flags — REST Countries (free, no key) ────────────────────────────
let flagCache = null;

export const fetchAfricanFlags = async () => {
  if (flagCache) return flagCache;
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/region/africa?fields=name,flags,cca2"
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();

    flagCache = data
      .filter((c) => c.flags?.png)
      .map((c) => ({
        name: c.name.common,
        // Use the SVG for crisper rendering, PNG as fallback
        img: c.flags.svg || c.flags.png,
        type: "flag",
      }));

    return flagCache;
  } catch (err) {
    console.error("Failed to fetch flags:", err);
    // Emoji fallback
    return [
      { name: "Kenya",       img: null, emoji: "🇰🇪", type: "flag" },
      { name: "Nigeria",     img: null, emoji: "🇳🇬", type: "flag" },
      { name: "Ghana",       img: null, emoji: "🇬🇭", type: "flag" },
      { name: "Egypt",       img: null, emoji: "🇪🇬", type: "flag" },
      { name: "Morocco",     img: null, emoji: "🇲🇦", type: "flag" },
      { name: "South Africa",img: null, emoji: "🇿🇦", type: "flag" },
      { name: "Ethiopia",    img: null, emoji: "🇪🇹", type: "flag" },
      { name: "Tanzania",    img: null, emoji: "🇹🇿", type: "flag" },
      { name: "Uganda",      img: null, emoji: "🇺🇬", type: "flag" },
      { name: "Senegal",     img: null, emoji: "🇸🇳", type: "flag" },
      { name: "Cameroon",    img: null, emoji: "🇨🇲", type: "flag" },
      { name: "Ivory Coast", img: null, emoji: "🇨🇮", type: "flag" },
    ];
  }
};

export const getWildlifeCards = () => WILDLIFE_CARDS;