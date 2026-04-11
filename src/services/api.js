// ─── African Wildlife — curated Wikimedia Commons images ─────────────────────
// These are stable, publicly licensed image URLs (no API key needed)
const WILDLIFE_CARDS = [
  { name: "Lion",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/320px-Lion_waiting_in_Namibia.jpg" },
  { name: "Elephant",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/320px-African_Bush_Elephant.jpg" },
  { name: "Giraffe",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/213px-Giraffe_Mikumi_National_Park.jpg" },
  { name: "Zebra",      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Plains_Zebra_Equus_quagga.jpg/320px-Plains_Zebra_Equus_quagga.jpg" },
  { name: "Cheetah",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cheetah_portrait_Whipsnade_Zoo.jpg/240px-Cheetah_portrait_Whipsnade_Zoo.jpg" },
  { name: "Gorilla",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Two_gorillas.jpg/266px-Two_gorillas.jpg" },
  { name: "Hippo",      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Hippopotamus_in_the_Serengeti.jpg/320px-Hippopotamus_in_the_Serengeti.jpg" },
  { name: "Leopard",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Leopard_africat.jpg/320px-Leopard_africat.jpg" },
  { name: "Rhino",      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/White_rhinoceros.jpg/320px-White_rhinoceros.jpg" },
  { name: "Flamingo",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Greater_flamingo_Phoenicopterus_ruber.jpg/240px-Greater_flamingo_Phoenicopterus_ruber.jpg" },
  { name: "Meerkat",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Suricata_suricatta.jpg/320px-Suricata_suricatta.jpg" },
  { name: "Crocodile",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Nile_crocodile_head.jpg/320px-Nile_crocodile_head.jpg" },
];

// ─── Fetch African countries with flags from REST Countries ──────────────────
let flagCache = null;

export const fetchAfricanFlags = async () => {
  if (flagCache) return flagCache;

  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/region/africa?fields=name,flags,cca2"
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();

    // Map to a consistent shape { name, img }
    flagCache = data
      .filter((c) => c.flags?.png)
      .map((c) => ({
        name: c.name.common,
        img: c.flags.png,
      }));

    return flagCache;
  } catch (err) {
    console.error("Failed to fetch flags:", err);
    // Fallback to emoji flags if API is down
    return [
      { name: "Kenya",   img: null, emoji: "🇰🇪" },
      { name: "Nigeria", img: null, emoji: "🇳🇬" },
      { name: "Ghana",   img: null, emoji: "🇬🇭" },
      { name: "Egypt",   img: null, emoji: "🇪🇬" },
      { name: "Morocco", img: null, emoji: "🇲🇦" },
      { name: "S. Africa", img: null, emoji: "🇿🇦" },
      { name: "Ethiopia", img: null, emoji: "🇪🇹" },
      { name: "Tanzania", img: null, emoji: "🇹🇿" },
      { name: "Uganda",  img: null, emoji: "🇺🇬" },
      { name: "Senegal", img: null, emoji: "🇸🇳" },
      { name: "Cameroon", img: null, emoji: "🇨🇲" },
      { name: "Ivory Coast", img: null, emoji: "🇨🇮" },
    ];
  }
};

export const getWildlifeCards = () => WILDLIFE_CARDS;