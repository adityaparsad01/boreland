export const products = [
  // Men's Wear
  {
    id: 1,
    name: 'The Sovereign Suit',
    description: 'A meticulously tailored wool-blend suit, designed for the modern executive. Features a classic fit.',
    price: 899.99,
    imageUrl: '/images/products/sovereign_suit.png',
    category: "Men's Wear",
    rating: { average: 4.9, count: 120 },
    variants: {
      colors: ['Charcoal', 'Navy', 'Black'],
      sizes: ['38R', '40R', '40L', '42R', '42L'],
    },
    specifications: [
      { name: 'Material', value: '90% Wool, 10% Polyester' },
      { name: 'Fit', value: 'Classic Regular' },
      { name: 'Care', value: 'Dry Clean Only' },
    ],
    reviews: [
      { id: 1, author: 'James B.', rating: 5, date: '2 weeks ago', comment: 'Impeccable quality and a perfect fit right out of the box. Worth every penny.' },
      { id: 2, author: 'Robert K.', rating: 5, date: '1 month ago', comment: 'This is my new go-to suit for important meetings. Exudes confidence.' },
    ],
  },
  {
    id: 2,
    name: 'Executive Blazer',
    description: 'A versatile single-breasted blazer crafted from Italian wool. A timeless addition to any wardrobe.',
    price: 450.00,
    imageUrl: '/images/products/executive_blazer.png',
    category: "Men's Wear",
    rating: { average: 4.8, count: 95 },
    variants: { colors: ['Heather Grey', 'Blue'], sizes: ['S', 'M', 'L', 'XL'] },
    specifications: [{ name: 'Material', value: '100% Italian Wool' }, { name: 'Pockets', value: 'Two flap pockets, one chest pocket' }],
    reviews: [],
  },
  {
    id: 3,
    name: 'Prestige Dress Shirt',
    description: 'A classic long-sleeve dress shirt crafted from premium Egyptian cotton for exceptional comfort.',
    price: 150.00,
    imageUrl: '/images/products/prestige_shirt.png',
    category: "Men's Wear",
    rating: { average: 4.9, count: 210 },
    variants: { colors: ['White', 'Light Blue'], sizes: ['15.5', '16', '16.5', '17'] },
    specifications: [{ name: 'Material', value: '100% Egyptian Cotton' }, { name: 'Cuff Style', value: 'Button' }],
    reviews: [{ id: 1, author: 'Michael T.', rating: 5, date: '3 days ago', comment: 'The fabric is incredibly soft and breathable. Best dress shirt I own.' }],
  },
  // Women's Wear
  {
    id: 4,
    name: 'The CEO Blazer',
    description: 'A powerful, structured blazer with a modern silhouette, designed for the female leader.',
    price: 475.00,
    imageUrl: '/images/products/ceo_blazer.png',
    category: "Women's Wear",
    rating: { average: 4.9, count: 88 },
    variants: { colors: ['Black', 'Ivory'], sizes: ['2', '4', '6', '8', '10'] },
    specifications: [{ name: 'Material', value: 'Crepe Blend' }, { name: 'Lining', value: '100% Silk' }],
    reviews: [{ id: 1, author: 'Sarah J.', rating: 5, date: '1 month ago', comment: 'A true power piece. The fit is impeccable and it instantly elevates any outfit.' }],
  },
  {
    id: 5,
    name: 'Corporate Sheath Dress',
    description: 'An elegant and professional business formal dress, tailored to create a flattering silhouette.',
    price: 350.00,
    imageUrl: '/images/products/sheath_dress.png',
    category: "Women's Wear",
    rating: { average: 4.7, count: 65 },
    variants: { colors: ['Red', 'Navy'], sizes: ['4', '6', '8'] },
    specifications: [{ name: 'Material', value: 'Stretch-Ponte' }, { name: 'Length', value: 'Knee-Length' }],
    reviews: [],
  },
  // ... (Other products will use this structure but might have empty review arrays etc.)
  {
    id: 6, name: 'Tailored Trousers', price: 220.00, category: "Women's Wear", imageUrl: '/images/products/tailored_trousers.png', description: 'High-waisted, wide-leg trousers that combine comfort with a sharp, professional look.', rating: { average: 4.6, count: 112 }, variants: { colors: ['Black', 'Beige'], sizes: ['2', '4', '6', '8', '10'] }, specifications: [], reviews: [],
  },
  {
    id: 7, name: 'Classic Leather Oxfords', price: 450.00, category: "Men's Shoes", imageUrl: '/images/products/leather_oxfords.png', description: 'Hand-burnished calfskin leather Oxfords, the cornerstone of any gentleman\'s wardrobe.', rating: { average: 5.0, count: 150 }, variants: { colors: ['Cognac', 'Black'], sizes: ['9', '10', '10.5', '11', '12'] }, specifications: [], reviews: [],
  },
  {
    id: 8, name: 'Suede Loafers', price: 320.50, category: "Men's Shoes", imageUrl: '/images/products/suede_loafers.png', description: 'Luxurious suede loafers offering a perfect blend of comfort and casual elegance.', rating: { average: 4.8, count: 89 }, variants: { colors: ['Brown', 'Navy'], sizes: ['9', '10', '11'] }, specifications: [], reviews: [],
  },
  {
    id: 9, name: 'Signature Pumps', price: 380.00, category: "Women's Shoes", imageUrl: '/images/products/signature_pumps.png', description: 'Classic pointed-toe heels in Nappa leather, designed for all-day comfort and timeless style.', rating: { average: 4.9, count: 201 }, variants: { colors: ['Black', 'Nude'], sizes: ['6', '7', '8', '9'] }, specifications: [], reviews: [],
  },
  {
    id: 10, name: 'Leather Ballet Flats', price: 250.00, category: "Women's Shoes", imageUrl: '/images/products/ballet_flats.png', description: 'Sophisticated yet comfortable ballet flats, handcrafted from supple Italian leather.', rating: { average: 4.7, count: 130 }, variants: { colors: ['Black', 'Saddle'], sizes: ['6', '7', '8', '9'] }, specifications: [], reviews: [],
  },
  {
    id: 11, name: 'The Ambassador\'s Silk Tie', price: 85.00, category: 'Accessories', imageUrl: '/images/products/silk_tie.png', description: 'A luxurious 100% silk tie featuring a subtle geometric pattern. The perfect finishing touch.', rating: { average: 4.9, count: 300 }, variants: { colors: ['Blue Stripe', 'Red Paisley'], sizes: ['Standard'] }, specifications: [], reviews: [],
  },
  {
    id: 12, name: 'Emblem Cufflinks', price: 120.00, category: 'Accessories', imageUrl: '/images/products/emblem_cufflinks.png', description: 'Polished silver cufflinks engraved with the Boreland emblem. A subtle statement of class.', rating: { average: 5.0, count: 98 }, variants: { colors: ['Silver'], sizes: ['One Size'] }, specifications: [], reviews: [],
  },
  {
    id: 13, name: 'Elysian Fields Eau de Parfum', price: 180.00, category: "Perfumes", imageUrl: '/images/products/elysian_fields.png', description: 'A sophisticated fragrance with notes of bergamot, sandalwood, and white musk.', rating: { average: 4.9, count: 450 }, variants: { colors: [], sizes: ['50ml', '100ml'] }, specifications: [], reviews: [],
  },
  {
    id: 14, name: 'Midnight Noir Parfum', price: 220.00, category: "Perfumes", imageUrl: '/images/products/midnight_noir.png', description: 'A bold and mysterious scent featuring black orchid, incense, and dark spices.', rating: { average: 4.8, count: 325 }, variants: { colors: [], sizes: ['50ml', '100ml'] }, specifications: [], reviews: [],
  },
];
