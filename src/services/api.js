// ─── AFRICAN FLAGS ────────────────────────────────────────────────────────────

const AFRICAN_FLAG_CARDS = [
  { name: "Kenya",         code: "ke" },
  { name: "Nigeria",       code: "ng" },
  { name: "South Africa",  code: "za" },
  { name: "Ghana",         code: "gh" },
  { name: "Egypt",         code: "eg" },
  { name: "Ethiopia",      code: "et" },
  { name: "Tanzania",      code: "tz" },
  { name: "Uganda",        code: "ug" },
  { name: "Morocco",       code: "ma" },
  { name: "Senegal",       code: "sn" },
  { name: "Cameroon",      code: "cm" },
  { name: "Ivory Coast",   code: "ci" },
  { name: "Angola",        code: "ao" },
  { name: "Mozambique",    code: "mz" },
  { name: "Madagascar",    code: "mg" },
  { name: "Zambia",        code: "zm" },
  { name: "Rwanda",        code: "rw" },
  { name: "Zimbabwe",      code: "zw" },
].map(({ name, code }) => ({
  name,
  code,
  type: "flag",
  
  
  img: `https://flagcdn.com/w320/${code}.png`,
}));

// ─── AFRICAN WILDLIFE ─────────────────────────────────────────────────────────

const WILDLIFE_CARDS = [
  {
    name: "Lion",
    img: "https://unsplash.com/photos/brown-lion-with-silver-chain-link-necklace-3tkxfe2GocY",
  },
  {
    name: "Elephant",
    img: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=480&fit=crop&crop=center&auto=format&q=80",
  },
  {
    name: "Giraffe",
    img: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&h=480&fit=crop&crop=top&auto=format&q=80",
  },
  {
    name: "Zebra",
    img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&h=480&fit=crop&crop=center&auto=format&q=80",
  },
  {
    name: "Cheetah",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=480&fit=crop&crop=top&auto=format&q=80",
  },
  {
    name: "Gorilla",
    img: "https://images.unsplash.com/photo-1489462792310-b254e38e9c30?w=400&h=480&fit=crop&crop=top&auto=format&q=80",
  },
  {
    name: "Hippo",
    img: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=400&h=480&fit=crop&crop=center&auto=format&q=80",
  },
  {
    name: "Leopard",
    img: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&h=480&fit=crop&crop=top&auto=format&q=80",
  },
  {
    name: "Rhino",
    img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=480&fit=crop&crop=center&auto=format&q=80",
  },
  {
    name: "Flamingo",
    img: "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=400&h=480&fit=crop&crop=top&auto=format&q=80",
  },
  {
    name: "Meerkat",
    img: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=480&fit=crop&crop=top&auto=format&q=80",
  },
  {
    name: "Crocodile",
    img: "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?w=400&h=480&fit=crop&crop=center&auto=format&q=80",
  },
].map((c) => ({ ...c, type: "wildlife" }));

// ─── FRUITS ───────────────────────────────────────────────────────────────────

const FRUIT_CARDS = [
  { name: "Mango",      emoji: "🥭" },
  { name: "Watermelon", emoji: "🍉" },
  { name: "Pineapple",  emoji: "🍍" },
  { name: "Banana",     emoji: "🍌" },
  { name: "Strawberry", emoji: "🍓" },
  { name: "Grapes",     emoji: "🍇" },
  { name: "Orange",     emoji: "🍊" },
  { name: "Lemon",      emoji: "🍋" },
  { name: "Cherry",     emoji: "🍒" },
  { name: "Peach",      emoji: "🍑" },
  { name: "Kiwi",       emoji: "🥝" },
  { name: "Coconut",    emoji: "🥥" },
].map((c) => ({ ...c, type: "fruit", img: null }));


export const getAfricanFlags   = () => AFRICAN_FLAG_CARDS;
export const getWildlifeCards  = () => WILDLIFE_CARDS;
export const getFruitCards     = () => FRUIT_CARDS;