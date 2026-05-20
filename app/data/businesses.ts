import type { Business } from "~/types/business";

export const businesses: Business[] = [
  {
    id: 1,
    name: "Bon Matin Bakery",
    description:
      "Freshly baked sourdough, croissants, and seasonal pastries made at home every morning. Order by Thursday for weekend pickup.",
    category: "Food & Bakery",
    location: "Brooklyn, NY",
    tags: ["sourdough", "pastries", "gluten-free option", "pre-order"],
    cover:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    instagram: "bonmatinbakery",
    contact: "hello@bonmatin.com",
    featured: true,
  },
  {
    id: 2,
    name: "Thread & Thyme",
    description:
      "Handwoven wall hangings, macramé planters, and custom fiber art. Each piece is one-of-a-kind, woven with natural dyes.",
    category: "Handmade & Crafts",
    location: "Portland, OR",
    tags: ["macramé", "wall art", "natural dyes", "custom orders"],
    cover:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    instagram: "threadandthyme",
    featured: true,
  },
  {
    id: 3,
    name: "Sol Skin Studio",
    description:
      "Small-batch botanical skincare — face oils, balms, and serums crafted with organic ingredients and zero synthetic fragrance.",
    category: "Beauty & Wellness",
    location: "Austin, TX",
    tags: ["organic", "botanical", "vegan", "small-batch"],
    cover:
      "https://images.unsplash.com/photo-1556228852-6d35a585d566?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    instagram: "solskinstudio",
    contact: "sol@solskin.co",
    featured: true,
  },
  {
    id: 4,
    name: "Green Thumb Co.",
    description:
      "Rare tropical houseplants, custom planters, and curated starter kits for beginners. Local pickup and metro delivery available.",
    category: "Plants & Garden",
    location: "Chicago, IL",
    tags: ["tropical plants", "rare finds", "delivery", "starter kits"],
    cover:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    instagram: "greenthumbco",
  },
  {
    id: 5,
    name: "Ink & Form",
    description:
      "Minimalist risograph prints, illustrated cards, and custom pet portraits. Ships worldwide — limited edition drops monthly.",
    category: "Art & Design",
    location: "Seattle, WA",
    tags: ["risograph", "prints", "pet portraits", "limited edition"],
    cover:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    instagram: "inkandform",
    contact: "hello@inkandform.art",
  },
  {
    id: 6,
    name: "Loom & Stitch",
    description:
      "Upcycled denim, hand-embroidered tote bags, and slow-fashion pieces that celebrate individuality. No fast fashion, ever.",
    category: "Clothing & Fashion",
    location: "Los Angeles, CA",
    tags: ["upcycled", "embroidery", "slow fashion", "denim"],
    cover:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    instagram: "loomandstitch",
  },
  {
    id: 7,
    name: "Hearth & Hold",
    description:
      "Hand-poured soy candles, ceramic catch-alls, and cozy home goods designed to bring warmth to every room.",
    category: "Home & Decor",
    location: "Nashville, TN",
    tags: ["soy candles", "ceramics", "home goods", "gifts"],
    cover:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    instagram: "hearthandhold",
    contact: "shop@hearthandhold.com",
  },
  {
    id: 8,
    name: "Paw & Knit",
    description:
      "Custom hand-knitted sweaters, bandanas, and bow ties for dogs and cats. Sizing guide available — every piece is made to order.",
    category: "Pets",
    location: "Denver, CO",
    tags: ["dogs", "cats", "handknit", "made to order"],
    cover:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80",
    instagram: "pawandknit",
  },
  {
    id: 9,
    name: "Dulce Dreams",
    description:
      "Authentic Mexican pan dulce, tres leches cakes, and custom celebration cakes. Available for local pickup in East LA.",
    category: "Food & Bakery",
    location: "Los Angeles, CA",
    tags: ["pan dulce", "tres leches", "custom cakes", "pickup"],
    cover:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
    instagram: "dulcedreams_la",
    contact: "orders@dulcedreams.com",
  },
  {
    id: 10,
    name: "The Clay Atelier",
    description:
      "Wheel-thrown stoneware mugs, bowls, and vases fired in a tiny home studio. Functional art for your everyday table.",
    category: "Home & Decor",
    location: "Asheville, NC",
    tags: ["stoneware", "wheel-thrown", "mugs", "functional art"],
    cover:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    instagram: "theclaytelier",
  },
  {
    id: 11,
    name: "Ferment & Flourish",
    description:
      "Artisan kombucha, kimchi, and lacto-fermented hot sauces. Gut-friendly goods made in small batches, never mass produced.",
    category: "Food & Bakery",
    location: "San Francisco, CA",
    tags: ["kombucha", "kimchi", "fermented", "gut health"],
    cover:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80",
    instagram: "fermentflourish",
    contact: "hi@fermentflourish.com",
  },
  {
    id: 12,
    name: "Bloom Press Studio",
    description:
      "Botanical cyanotype prints and pressed flower art framed for your walls. Every print captures a fleeting moment in nature.",
    category: "Art & Design",
    location: "Burlington, VT",
    tags: ["cyanotype", "botanicals", "pressed flowers", "wall art"],
    cover:
      "https://images.unsplash.com/photo-1490750967868-88df5691cc3e?w=600&q=80",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    instagram: "bloompressstudio",
  },
];

export const categories = [
  "All",
  "Food & Bakery",
  "Handmade & Crafts",
  "Beauty & Wellness",
  "Plants & Garden",
  "Art & Design",
  "Clothing & Fashion",
  "Home & Decor",
  "Pets",
];
