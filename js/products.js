/**
 * Purple Intimate Lingerie - Product Catalog Database
 * Kilimani Boutique - Nairobi, Kenya
 */

const PRODUCTS_DATA = [
  // --- BEST SELLERS & BRA SETS ---
  {
    id: "pi-01",
    name: "Amethyst Royal Eyelash Lace Bra Set",
    category: "bra-sets",
    categoryName: "Bra Sets",
    price: 4500,
    originalPrice: 5500,
    rating: 4.9,
    reviewsCount: 84,
    image: "assets/images/bra_set.jpg",
    badge: "Best Seller",
    bestSeller: true,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    description: "Handcrafted underwire balcony bra with scalloped eyelash French lace and matching high-cut cheeky brief. Accented with 18k rose gold-plated rings and sliders for a regal silhouette.",
    features: [
      "Plunge underwire support with custom lift",
      "Breathable velvet-touch floral lace",
      "Adjustable double straps & 3-row hook eye",
      "Includes matching Brazilian cut brief"
    ]
  },
  {
    id: "pi-02",
    name: "Hourglass Tummy Tuck Waist Trainer",
    category: "shapewear",
    categoryName: "Shapewear",
    price: 4800,
    originalPrice: 5800,
    rating: 5.0,
    reviewsCount: 112,
    image: "assets/images/shapewear.jpg",
    badge: "Best Seller",
    bestSeller: true,
    isNew: false,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    description: "Triple-layer natural latex core with flexible steel flexi-boning. Snatches the waist by 2-4 inches instantly while providing lumbar back support and thermal toning.",
    features: [
      "9 flexible memory steel bones prevent rolling",
      "3 rows of reinforced hook-and-eye closures",
      "Breathable organic cotton interior lining",
      "Ideal for postpartum recovery and everyday contour"
    ]
  },
  {
    id: "pi-03",
    name: "Velvet Nights Seductive Lace Bodysuit",
    category: "bodysuits",
    categoryName: "Body Suits",
    price: 5200,
    originalPrice: 6200,
    rating: 4.9,
    reviewsCount: 67,
    image: "assets/images/bodysuit.jpg",
    badge: "Trending",
    bestSeller: true,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    description: "Plum purple floral lace bonded with sheer illusion mesh. Features a deep plunge neckline, caged criss-cross back strapping, and a snap-closure cotton gusset.",
    features: [
      "Deep plunge illusion front with satin ribbon ties",
      "Ultra-stretch semi-sheer eyelash lace",
      "Multi-strap criss-cross back adjustment",
      "Double snap-button bottom closure for convenience"
    ]
  },
  {
    id: "pi-04",
    name: "SculptPro High-Waist Shaping Panties",
    category: "shaping-panties",
    categoryName: "Shaping Panties",
    price: 2800,
    originalPrice: 3500,
    rating: 4.8,
    reviewsCount: 96,
    image: "assets/images/shaping_panties.jpg",
    badge: "Best Seller",
    bestSeller: true,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description: "Seamless target tummy control brief with medical-grade silicone waistband. Smoothes out love handles and lifts the buttocks naturally under bodycon dresses.",
    features: [
      "No-roll anti-slip silicone interior band",
      "Zero panty lines (laser cut edges)",
      "Targeted firm compression on lower abdomen",
      "100% antibacterial cotton crotch"
    ]
  },
  {
    id: "pi-05",
    name: "ContourElite Full Body Shaper Suit",
    category: "full-body-suits",
    categoryName: "Full Body Suits",
    price: 6500,
    originalPrice: 7800,
    rating: 4.9,
    reviewsCount: 78,
    image: "assets/images/full_body_suit.jpg",
    badge: "Staff Pick",
    bestSeller: true,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    description: "Complete full-body slimming suit offering 360-degree targeted compression from upper back down to mid-thigh. Open bust design lets you wear your favourite bra.",
    features: [
      "Open-bust design with side bust push-up panels",
      "Mid-thigh anti-chafing length with silicone grip lace",
      "Easy bathroom zipper access gusset",
      "Invisible seamless finish under fitted gowns"
    ]
  },

  // --- BRAS ---
  {
    id: "pi-06",
    name: "Midnight Plunge Balconette Bra",
    category: "bras",
    categoryName: "Bras",
    price: 3200,
    originalPrice: 3800,
    rating: 4.8,
    reviewsCount: 42,
    image: "assets/images/bra_balconette.jpg",
    badge: "New",
    bestSeller: false,
    isNew: true,
    sizes: ["32B", "34B", "34C", "36C", "36D", "38D"],
    description: "Sensual underwire balconette bra crafted with fine Italian mesh and intricate embroidery. Engineered for everyday comfort with superior lift and shaping.",
    features: [
      "Memory foam molded cups with natural cleavage lift",
      "Brushed microfiber wings for all-day comfort",
      "Rose gold accent hardware",
      "Convertible multi-way back straps"
    ]
  },
  {
    id: "pi-07",
    name: "Silk Comfort Wireless T-Shirt Bra",
    category: "bras",
    categoryName: "Bras",
    price: 2900,
    originalPrice: 3400,
    rating: 4.9,
    reviewsCount: 55,
    image: "assets/images/bra_set.jpg",
    badge: "Essential",
    bestSeller: false,
    isNew: false,
    sizes: ["34B", "34C", "36B", "36C", "38C", "38D"],
    description: "The ultimate wireless bra offering cloud-like softness, invisible lines under snug clothing, and gentle support suitable for 14+ hours of continuous wear.",
    features: [
      "Completely wire-free zero-pinch technology",
      "Breathable cooling foam lining",
      "Seamless edge construction",
      "Smooth silhouette under t-shirts and silks"
    ]
  },

  // --- SHAPEWEAR ---
  {
    id: "pi-08",
    name: "Thermal Latex Sweat Belt Cincher",
    category: "shapewear",
    categoryName: "Shapewear",
    price: 3600,
    originalPrice: 4200,
    rating: 4.7,
    reviewsCount: 51,
    image: "assets/images/shapewear.jpg",
    badge: "Workout & Posture",
    bestSeller: false,
    isNew: true,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Active compression thermal waist cincher designed to enhance core sweating during light workouts and posture correction during desk work.",
    features: [
      "Double adjustable velcro compression belt",
      "High thermal neoprene core",
      "Strong ergonomic lumbar back support",
      "Quick dry anti-odor lining"
    ]
  },

  // --- PANTIES ---
  {
    id: "pi-09",
    name: "Velvet Petals Seamless Thong (3-Pack)",
    category: "panties",
    categoryName: "Panties",
    price: 2400,
    originalPrice: 3000,
    rating: 4.9,
    reviewsCount: 63,
    image: "assets/images/panties_pack.jpg",
    badge: "3-Pack Value",
    bestSeller: false,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    description: "Pack of 3 buttery-soft seamless laser-cut thongs in Royal Plum, Onyx Black, and Champagne Nude. Completely invisible under leggings and silk slip dresses.",
    features: [
      "Laser-cut raw edges with zero panty lines",
      "Second-skin microfiber with 4-way stretch",
      "100% organic cotton inner gusset",
      "Fade-resistant and machine washable"
    ]
  },
  {
    id: "pi-10",
    name: "French Lace Cheeky Briefs Set",
    category: "panties",
    categoryName: "Panties",
    price: 2200,
    originalPrice: 2800,
    rating: 4.8,
    reviewsCount: 39,
    image: "assets/images/shaping_panties.jpg",
    badge: "Popular",
    bestSeller: false,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    description: "Sensual sheer floral lace cheeky briefs with scalloped edges and delicate satin bow detail. Cut to flatter curves without digging into hips.",
    features: [
      "Ultra-soft elastic waistband that won't bite",
      "Flattering cheeky cut that elongates the legs",
      "Breathable floral stretch lace",
      "Hypoallergenic cotton lining"
    ]
  },

  // --- LINGERIE & NIGHTWEAR ---
  {
    id: "pi-11",
    name: "Sultry Plum Silk & Lace Babydoll",
    category: "lingerie",
    categoryName: "Lingerie",
    price: 4900,
    originalPrice: 5900,
    rating: 5.0,
    reviewsCount: 89,
    image: "assets/images/lingerie_babydoll.jpg",
    badge: "Customer Favorite",
    bestSeller: true,
    isNew: false,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Float into fantasy with this rich royal plum silk-satin babydoll nightie. Features sheer scalloped lace cups, empire silhouette, and matching G-string.",
    features: [
      "High-grade mulberry silk satin touch",
      "Unlined lace cups with delicate bow accent",
      "Flowy asymmetrical hemline for effortless romance",
      "Matching satin G-string included"
    ]
  },
  {
    id: "pi-12",
    name: "Aphrodite Kimono Silk Robe with Feather Trim",
    category: "lingerie",
    categoryName: "Lingerie",
    price: 5800,
    originalPrice: 7000,
    rating: 4.9,
    reviewsCount: 47,
    image: "assets/images/lingerie_robe.jpg",
    badge: "Luxury Edition",
    bestSeller: false,
    isNew: true,
    sizes: ["Free Size (Fits S-2XL)"],
    description: "Opulent knee-length satin robe featuring lavish faux-feather trimmed bell cuffs, an internal modesty tie, and an oversized detachable sash belt.",
    features: [
      "Feather cuff detailing for iconic boudoir style",
      "Silky liquid-drape satin fabric",
      "Dual interior security tie and wide waist belt",
      "Deep side pockets for modern lounging convenience"
    ]
  },

  // --- SHAPING PANTIES ---
  {
    id: "pi-13",
    name: "Booty Booster Butt-Lifter Shaping Panty",
    category: "shaping-panties",
    categoryName: "Shaping Panties",
    price: 3200,
    originalPrice: 3900,
    rating: 4.9,
    reviewsCount: 71,
    image: "assets/images/shaping_panties.jpg",
    badge: "Curve Lifter",
    bestSeller: false,
    isNew: false,
    sizes: ["M", "L", "XL", "2XL"],
    description: "Specialized anatomical circular cut-outs and compression bands that lift, round, and enhance your glutes naturally while pulling in the waistline.",
    features: [
      "Natural rear lift without artificial padding",
      "High-waist firm compression band",
      "Breathable honeycomb mesh sides",
      "Non-binding leg openings"
    ]
  },

  // --- FULL BODY SUITS ---
  {
    id: "pi-14",
    name: "Bridal Goddess Sheer Mid-Thigh Shaper",
    category: "full-body-suits",
    categoryName: "Full Body Suits",
    price: 6900,
    originalPrice: 8200,
    rating: 5.0,
    reviewsCount: 53,
    image: "assets/images/full_body_suit.jpg",
    badge: "Bridal Special",
    bestSeller: false,
    isNew: true,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "Designed specifically for wedding gowns and gala dresses. Flattens tummy, smooths back bulges, contours hips, and prevents thigh chafing without showing.",
    features: [
      "Low-back cutout compatible with backless dresses",
      "Bonded ergonomic panels for zoned compression",
      "Easy-access bathroom opening",
      "Ultra-thin silicone leg grippers"
    ]
  },

  // --- BODY SUITS ---
  {
    id: "pi-15",
    name: "Obsidian Backless Lace Teddy",
    category: "bodysuits",
    categoryName: "Body Suits",
    price: 4900,
    originalPrice: 5800,
    rating: 4.8,
    reviewsCount: 38,
    image: "assets/images/bodysuit.jpg",
    badge: "Date Night",
    bestSeller: false,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    description: "A daring yet sophisticated backless lace bodysuit with a halter tie neckline. Wear it alone in the bedroom or styled under a tailored blazer for dinner.",
    features: [
      "Halter neck with adjustable satin tie",
      "Scalloped thong cut back",
      "Comfort-stretch French floral lace",
      "Double snap gusset"
    ]
  },

  // --- TOYS & NOVELTIES ---
  {
    id: "pi-16",
    name: "Luxe Rosebud Discreet Ultrasonic Stimulator",
    category: "toys",
    categoryName: "Toys & Novelties",
    price: 4200,
    originalPrice: 5500,
    rating: 5.0,
    reviewsCount: 124,
    image: "assets/images/toy_stimulator.jpg",
    badge: "100% Discreet",
    bestSeller: true,
    isNew: false,
    sizes: ["Compact (USB Rechargeable)"],
    description: "Whisper-quiet (under 40dB) waterproof sonic pulse pleasure device. Ergonomic body-safe silicone with 10 magnetic pulse intensity settings. Delivered in 100% unmarked sealed plain packaging.",
    features: [
      "Medical-grade ultra-hygienic soft silicone",
      "10 whisper-quiet suction pulse modes",
      "IPX7 100% waterproof for shower ease",
      "Magnetic fast USB charging with travel lock"
    ]
  },
  {
    id: "pi-17",
    name: "Satin Romance Blindfold & Hand Cuffs Set",
    category: "toys",
    categoryName: "Toys & Novelties",
    price: 2500,
    originalPrice: 3200,
    rating: 4.9,
    reviewsCount: 44,
    image: "assets/images/toy_cuffs.jpg",
    badge: "Novelty",
    bestSeller: false,
    isNew: true,
    sizes: ["Adjustable One Size"],
    description: "Padded royal purple and black silk-satin blindfold and matching plush wrist cuffs with rose gold lobster clasp chain. Soft, gentle, and tantalizing.",
    features: [
      "Padded blackout double-layer silk satin",
      "Soft fleece wrist cuff inner lining (gentle on skin)",
      "Detachable polished rose gold chain",
      "Includes discreet velvet travel storage pouch"
    ]
  },
  {
    id: "pi-18",
    name: "Warm Scented Aphrodisiac Massage Candle",
    category: "toys",
    categoryName: "Toys & Novelties",
    price: 2200,
    originalPrice: 2800,
    rating: 4.8,
    reviewsCount: 36,
    image: "assets/images/toy_candle.jpg",
    badge: "Sensual Care",
    bestSeller: false,
    isNew: false,
    sizes: ["200ml Glass Jar"],
    description: "Infused with organic shea butter, jojoba oil, and pure ylang-ylang essential oil. Melts into a warm, deeply moisturizing erotic massage oil.",
    features: [
      "100% natural soy and shea butter formula",
      "Low melting temperature — safe for skin contact",
      "Sensual jasmine and amber aromatics",
      "Leaves skin silky smooth without greasy residue"
    ]
  },
  {
    id: "pi-19",
    name: "The Iconic Rose Clitoral Suction Vibrator",
    category: "toys",
    categoryName: "Toys & Novelties",
    price: 3800,
    originalPrice: 4800,
    rating: 5.0,
    reviewsCount: 184,
    image: "assets/images/toy_rose.jpg",
    badge: "#1 Trending",
    bestSeller: true,
    isNew: true,
    sizes: ["USB Rechargeable"],
    description: "The viral luxury clitoral suction rose. Engineered with contactless air-wave pulsation technology that mimics oral pleasure with 10 frequency settings. 100% waterproof, whisper-quiet, and discreetly packaged.",
    features: [
      "Contactless air-pulse suction technology",
      "Silky petal-soft medical grade silicone",
      "10 whisper-quiet suction frequency modes",
      "IPX7 100% waterproof & magnetic USB quick charge"
    ]
  },
  {
    id: "pi-20",
    name: "Aura Velvet & Leatherette Intimate Body Harness",
    category: "toys",
    categoryName: "Toys & Novelties",
    price: 5500,
    originalPrice: 6800,
    rating: 4.9,
    reviewsCount: 52,
    image: "assets/images/toy_harness.jpg",
    badge: "Luxury Kit",
    bestSeller: false,
    isNew: true,
    sizes: ["Fully Adjustable (XS - 3XL)"],
    description: "Opulent royal purple velvet and supple vegan leather body harness with polished rose gold O-rings and buckle hardware. Fully adjustable straps with matching thong brief for seductive boudoir play.",
    features: [
      "Multi-point adjustable straps for custom contour fit",
      "Plush velvet exterior with skin-soft inner lining",
      "Polished rose gold metal O-rings and buckles",
      "Includes matching velvet strap brief"
    ]
  },
  {
    id: "pi-21",
    name: "Empress Dual-Stimulation Rabbit Vibrator",
    category: "toys",
    categoryName: "Toys & Novelties",
    price: 4600,
    originalPrice: 5800,
    rating: 5.0,
    reviewsCount: 78,
    image: "assets/images/toy_rabbit.jpg",
    badge: "Dual Action",
    bestSeller: true,
    isNew: false,
    sizes: ["USB Fast Rechargeable"],
    description: "Ergonomic dual-action rabbit vibrator targeting both the G-spot and clitoris simultaneously. Features dual whisper-quiet motors with 12 synchronized vibration patterns and rose gold metallic base.",
    features: [
      "Simultaneous internal G-spot & external clitoral stimulation",
      "Dual high-torque whisper-quiet independent motors",
      "12 rhythmic vibration & pulsation modes",
      "IPX7 waterproof with travel lock safety"
    ]
  }
];

// Collections metadata for filters & grid headers
const COLLECTIONS = [
  { id: "all", name: "All Collection", icon: "✨" },
  { id: "bras", name: "Bras", icon: "👙" },
  { id: "shapewear", name: "Shapewear", icon: "⏳" },
  { id: "panties", name: "Panties", icon: "🩲" },
  { id: "bodysuits", name: "Body Suits", icon: "🖤" },
  { id: "bra-sets", name: "Bra Sets", icon: "💜" },
  { id: "lingerie", name: "Lingerie", icon: "👗" },
  { id: "shaping-panties", name: "Shaping Panties", icon: "🍑" },
  { id: "full-body-suits", name: "Full Body Suits", icon: "👑" },
  { id: "toys", name: "Toys & Novelties", icon: "🌹" }
];

// Customer Reviews Database
const REVIEWS_DATA = [
  {
    name: "Wanjiku M.",
    location: "Kilimani, Nairobi",
    rating: 5,
    date: "2 days ago",
    verified: true,
    title: "Same day delivery was under 2 hours!",
    text: "Ordered the Amethyst Lace Bra Set at 11 AM, and it arrived at my office in Kilimani by 1:30 PM in a totally plain brown unmarked box. The lace quality is European boutique level and fits like a dream!",
    productName: "Amethyst Royal Eyelash Lace Bra Set"
  },
  {
    name: "Sharon K.",
    location: "Westlands, Nairobi",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "Best waist trainer I've owned in Kenya",
    text: "I was hesitant about sizing so I used their WhatsApp chat. The stylist recommended Size L and it was SPOT ON. It takes my waist in without poking my ribs. Also love that they have an actual shop at The Circle Mall.",
    productName: "Hourglass Tummy Tuck Waist Trainer"
  },
  {
    name: "Amina O.",
    location: "Karen, Nairobi",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    title: "Discreet and super professional",
    text: "The delivery rider had zero clue what was inside the parcel. That privacy guarantee is 100% genuine. The sheer bodysuit and robe made me feel so gorgeous and confident. Will definitely be a regular customer!",
    productName: "Velvet Nights Seductive Lace Bodysuit"
  },
  {
    name: "Faith N.",
    location: "Mombasa (Courier)",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    title: "Countrywide shipping was seamless",
    text: "I live in Nyali and received my parcel via speed courier in less than 24 hours. The Full Body Shaper is magic under my silk dresses. Customer service on WhatsApp was attentive and respectful.",
    productName: "ContourElite Full Body Shaper Suit"
  }
];

// Frequently Asked Questions
const FAQS_DATA = [
  {
    q: "How does Same-Day Delivery in Nairobi work?",
    a: "Orders placed before 3:00 PM (Monday to Saturday) are dispatched via our discreet motorcycle couriers for same-day delivery anywhere in Nairobi (Kilimani, Westlands, CBD, Karen, Kileleshwa, South C, Thika Road, etc.). Orders placed after 3:00 PM are delivered the next morning."
  },
  {
    q: "What is your 24-Hour Return & Exchange Policy?",
    a: "Because intimate apparel, lingerie, and shapewear are intimate hygienic personal items, returns and exchanges are strictly accepted within 24 hours of delivery. The item must be unworn, unwashed, in its original pristine packaging with all tags and hygiene protective liners intact. For exchanges, simply contact our WhatsApp line at 0794 672 167 within 24 hours."
  },
  {
    q: "Is the packaging 100% discreet?",
    a: "Yes! Privacy is our highest priority. All parcels are packaged in plain, opaque, unmarked brown boxes or tamper-evident bubble mailers. There is NO mention of 'lingerie', 'intimate', or adult contents anywhere on the exterior label. The delivery rider will never know what is inside."
  },
  {
    q: "Can I visit your physical boutique in Kilimani to try items on?",
    a: "Yes! You are warmly welcome to visit our physical boutique at Shop MF18, The Circle Mall, Timau Road, Kilimani, Nairobi. We have private fitting rooms and friendly female stylists ready to take your measurements and recommend the best cuts. Operating hours: Mon-Fri 9:00 AM – 6:00 PM, Sat 10:00 AM – 4:00 PM."
  },
  {
    q: "How do I choose my correct size?",
    a: "We have an interactive Size Guide on the website with bust, underbust, waist, and hip charts. If you are ever unsure, tap our WhatsApp Concierge button. Send us your height, weight, or regular dress size, and our fit specialists will pinpoint your exact match."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa (Till / Paybill), Debit & Credit Cards (Visa / Mastercard), and Cash / M-Pesa on Delivery for approved addresses within Nairobi. For countrywide deliveries outside Nairobi, payment is confirmed prior to parcel dispatch."
  }
];
