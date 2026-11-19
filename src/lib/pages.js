// ---------------------------------------------------------------------------
// SEO landing pages (service + city). One template renders all of them
// (src/pages/Landing.jsx); head tags and schema come from src/lib/seo.js.
//
// Only confirmed facts: prices, package contents and job times (business.js SERVICES),
// mobile (we come to you), own water and power, same price for every vehicle size,
// satisfaction guarantee, open 7 days 7 AM – 7 PM, prepay online (PREPAY = $15 off) or
// pay later. Never state: insurance, a shop, years, ratings, counts.
// The Exterior Wash is an add-on: never bookable on its own.
// Same owner as Imperial Shine, Nitos, Phantom and Vetra, which all have Westminster
// city pages: Apex's city pages use places none of the sister sites cover.
// ---------------------------------------------------------------------------

const BRANDS = ['Apex Car Detailing', 'Apex Detailing', 'Apex'];

// Longest title that fits in 60 chars (counting '&' as the escaped '&amp;').
// Keep ", CA" before the long brand name, then drop ", CA" if nothing fits.
export function fitTitle(keyword, city) {
  const options = [
    ...BRANDS.map((b) => `${keyword} ${city}, CA | ${b}`),
    ...BRANDS.map((b) => `${keyword} ${city} | ${b}`),
  ];
  const len = (t) => t.replace(/&/g, '&amp;').length;
  return options.find((t) => len(t) <= 60) || options[options.length - 1];
}

export const HOME_CITY = 'Westminster';

const FAQ_WATER = { q: 'Do I need to provide water or power?', a: 'No. We bring our own water, power and supplies. We only need room to open every door.' };
const FAQ_PAY = { q: 'How do I pay?', a: 'Prepay online at checkout and save $15 with code PREPAY, or choose Pay Later and pay after the detail.' };
const FAQ_WASH = { q: 'Can I book only the Exterior Wash?', a: 'No. The Exterior Wash is a $50 add-on to the Basic Interior Detail or the Premium Detail.' };
const FAQ_TIME = { q: 'How long does it take?', a: 'About 2–3 hours for the Basic Interior Detail and 3–5 hours for the Premium Detail. The Exterior Wash adds about 1–2 hours.' };
const FAQ_GUARANTEE = { q: 'What if I’m not happy with the result?', a: 'Let us know. Every detail comes with our satisfaction guarantee, and we’ll make it right.' };
const FAQ_PACKAGES = {
  q: 'What comes with each package?',
  a: 'Basic Interior Detail ($150): triple-stage vacuuming, a complete interior surface wipe-down and floor mat cleaning. Premium Detail ($200): adds cabin application, dust elimination, interior windows, deep carpet cleaning, cloth and carpet extraction, full interior shampooing and a UV-protectant coating. The Exterior Wash is a $50 add-on to either one.',
};

// Schema offers: only things a customer can actually book. The wash never appears alone.
const DETAIL_OFFERS = [
  ['Basic Interior Detail', 150], ['Premium Detail', 200],
  ['Basic Interior Detail + Exterior Wash', 200], ['Premium Detail + Exterior Wash', 250],
];

// Real job photos (public/images).
const PHOTO = {
  bmw: { src: '/images/hero-bmw.jpg', alt: 'Gray BMW X5 after a hand wash on a residential street', w: 1080, h: 1350 },
  charger: { src: '/images/gallery-charger.jpg', alt: 'White Dodge Charger with a clean finish in a parking lot', w: 1080, h: 1080 },
  jeep: { src: '/images/gallery-jeep.jpg', alt: 'Black Jeep Grand Cherokee after a detail', w: 1080, h: 1439 },
  accord: { src: '/images/gallery-accord.jpg', alt: 'Silver Honda Accord after a detail on a residential street', w: 1080, h: 1080 },
  silverado: { src: '/images/gallery-silverado.jpg', alt: 'Black Chevrolet Silverado covered in foam during a curbside hand wash', w: 1080, h: 1080 },
};

export const SERVICE_PAGES = [
  {
    path: '/car-interior-cleaning-westminster',
    kind: 'service',
    nav: 'Car interior cleaning',
    city: HOME_CITY,
    title: fitTitle('Car Interior Cleaning', HOME_CITY),
    description: 'Car interior cleaning in Westminster, CA, done at your home: $150 Basic Interior Detail or $200 Premium Detail with shampoo and extraction. Book online.',
    eyebrow: 'Interior cleaning · Westminster, CA',
    h1: ['Car interior cleaning', 'in Westminster.'],
    lede: 'Two levels of interior cleaning, both done where your car is parked. About 2–3 hours for Basic, 3–5 for Premium.',
    facts: ['From $150', 'Any vehicle size, same price', 'Satisfaction guaranteed'],
    card: 'premium',
    photo: PHOTO.accord,
    intro: {
      h2: 'Clean where you sit every day.',
      paras: [
        'Coffee rings in the cupholders, dust in the vents, grit worked into the floor mats: the inside of a commuter car collects a lot between washes.',
        'Basic Interior Detail (about 2–3 hours): triple-stage vacuuming for deep debris removal, a complete interior surface wipe-down, and floor mat cleaning and restoration.',
        'Premium Detail (about 3–5 hours): adds cabin application, dust elimination, interior window cleaning, deep carpet cleaning, cloth and carpet extraction, full interior shampooing and a UV-protectant coating.',
      ],
    },
    points: [
      { title: 'At your home or office', text: 'We arrive with our own water, power and supplies.' },
      { title: 'Two levels', text: 'Basic for upkeep, Premium when the seats and carpet need shampoo and extraction.' },
      { title: 'Guaranteed', text: 'Not happy with the result? Tell us and we’ll make it right.' },
    ],
    faqs: [
      { q: 'Basic or Premium?', a: 'Basic suits a car that gets regular care: a deep vacuum, a full wipe-down and clean mats. Premium suits stained seats or carpet, or a car that hasn’t been detailed in a while.' },
      { q: 'Can you wash the outside too?', a: 'Yes. Add the Exterior Wash for $50 (about 1–2 more hours): hand wash, rim cleaning, tire scrub and degrease, door jambs, tire shine and a spot-free hand dry.' },
      FAQ_TIME,
      FAQ_WATER,
      FAQ_PAY,
    ],
    service: { type: 'Car interior cleaning', offers: [['Basic Interior Detail', 150], ['Premium Detail', 200]] },
  },
  {
    path: '/car-carpet-shampoo-westminster',
    kind: 'service',
    nav: 'Carpet & seat shampoo',
    city: HOME_CITY,
    title: fitTitle('Car Carpet Shampoo', HOME_CITY),
    description: 'Car carpet and seat shampoo in Westminster, CA. Full interior shampoo, cloth and carpet extraction and UV protection in the $200 Premium Detail.',
    eyebrow: 'Carpet & seat shampoo · Westminster, CA',
    h1: ['Car carpet & seat shampoo', 'in Westminster.'],
    lede: 'Carpet and cloth seats shampooed and extracted in your driveway, as part of the $200 Premium Detail.',
    facts: ['$200 for any vehicle', 'Shampoo + extraction', 'About 3–5 hours'],
    card: 'premium',
    photo: PHOTO.jeep,
    intro: {
      h2: 'Lift it out, don’t just vacuum it.',
      paras: [
        'Spilled drinks, muddy shoes and busy back seats leave marks that a vacuum can’t touch.',
        'The Premium Detail shampoos the carpet and cloth seats, then extracts the dirty water so the fibers come out clean. It also includes deep carpet cleaning, triple-stage vacuuming, dust elimination, interior windows and a UV-protectant coating.',
        'Most stains come out. Old, set-in stains may be lighter afterward rather than gone completely.',
      ],
    },
    points: [
      { title: 'Carpet and cloth', text: 'Floor carpet, mats and fabric seats shampooed and extracted.' },
      { title: 'We bring everything', text: 'Water, power and the extractor come with us.' },
      { title: 'One flat price', text: '$200 for every vehicle size, plus $50 if you add the Exterior Wash.' },
    ],
    faqs: [
      { q: 'Which package includes the shampoo?', a: 'The Premium Detail ($200). The Basic Interior Detail is a vacuum, wipe-down and floor mat cleaning without shampoo or extraction.' },
      { q: 'Will every stain come out?', a: 'Most do. Old or set-in stains, like ink or dye, may only fade.' },
      { q: 'How long until the carpet is dry?', a: 'Extraction removes most of the water. Leaving the windows cracked for a few hours afterward helps the rest dry.' },
      FAQ_GUARANTEE,
      FAQ_WATER,
    ],
    service: { type: 'Car carpet and seat shampoo', offers: [['Premium Detail', 200], ['Premium Detail + Exterior Wash', 250]] },
  },
  {
    path: '/car-wash-and-detail-westminster',
    kind: 'service',
    nav: 'Wash & detail combo',
    city: HOME_CITY,
    title: fitTitle('Car Wash & Detail', HOME_CITY),
    description: 'Car wash and detail in Westminster, CA: Premium Detail plus hand wash for $250, or Basic Interior Detail plus wash for $200. We come to you.',
    eyebrow: 'Wash + detail · Westminster, CA',
    h1: ['Car wash & detail', 'in Westminster.'],
    lede: 'Add the Exterior Wash to either interior detail and get the whole car done in one visit at your home.',
    facts: ['$200 or $250 total', 'One visit', 'Any vehicle size'],
    card: 'combo',
    photo: PHOTO.silverado,
    intro: {
      h2: 'Inside and out, one stop.',
      paras: [
        'The Exterior Wash is an add-on, so a full wash and detail starts with an interior package: Basic + wash for $200, or Premium + wash for $250.',
        'Outside, the car gets a hand wash, detailed rim cleaning, a tire scrub and degrease, a door jamb and panel wipe-down, tire shine and a spot-free hand dry.',
        'Inside, Basic covers triple-stage vacuuming, a surface wipe-down and floor mats; Premium adds shampoo, extraction, interior windows and a UV-protectant coating.',
      ],
    },
    points: [
      { title: 'Two combinations', text: 'Basic + wash ($200) or Premium + wash ($250).' },
      { title: 'Plan the time', text: 'The wash adds about 1–2 hours to the interior detail.' },
      { title: 'Guaranteed', text: 'Every detail comes with our satisfaction guarantee.' },
    ],
    faqs: [
      FAQ_WASH,
      { q: 'How long does a wash and detail take?', a: 'Basic + wash is about 3–5 hours in total; Premium + wash about 4–7 hours, depending on the car.' },
      FAQ_WATER,
      FAQ_GUARANTEE,
      FAQ_PAY,
    ],
    service: { type: 'Car wash and interior detailing', offers: [['Basic Interior Detail + Exterior Wash', 200], ['Premium Detail + Exterior Wash', 250]] },
  },
  {
    path: '/truck-suv-detailing-westminster',
    kind: 'service',
    nav: 'Truck & SUV detailing',
    city: HOME_CITY,
    title: fitTitle('Truck & SUV Detailing', HOME_CITY),
    description: 'Truck and SUV detailing in Westminster, CA at the same price as a sedan: $150 Basic, $200 Premium, plus a $50 hand wash. Done at your home.',
    eyebrow: 'Trucks & SUVs · Westminster, CA',
    h1: ['Truck & SUV detailing', 'in Westminster.'],
    lede: 'No size upcharge. Basic $150, Premium $200, and the $50 Exterior Wash if you want the outside done.',
    facts: ['Same price as a sedan', 'Every row included', 'Water & power included'],
    card: 'premium',
    photo: PHOTO.charger,
    intro: {
      h2: 'Big vehicle, standard price.',
      paras: [
        'Crew cabs, three-row SUVs and work trucks have more carpet and more seats, but they pay the same package price as a compact.',
        'The Basic Interior Detail covers every row with triple-stage vacuuming, a complete surface wipe-down and floor mat cleaning. The Premium adds deep carpet cleaning, extraction, full interior shampooing and a UV-protectant coating.',
        'Larger vehicles can take toward the longer end of the job time (about 2–3 hours for Basic, 3–5 for Premium), so leave room in your day.',
      ],
    },
    points: [
      { title: 'No upcharge', text: '$150 Basic, $200 Premium, whatever you drive.' },
      { title: 'Every seat', text: 'Third rows, rear benches and cargo carpet are part of the detail.' },
      { title: 'At your curb', text: 'Driveway or street parking, with our own water and power.' },
    ],
    faqs: [
      { q: 'Do trucks or SUVs cost more?', a: 'No. Every vehicle size pays the same package price.' },
      { q: 'Can you clean a work truck?', a: 'Yes. Premium is the better fit if the carpet or cloth seats are heavily soiled: it adds shampoo and extraction.' },
      FAQ_TIME,
      FAQ_WASH,
      FAQ_WATER,
    ],
    service: { type: 'Truck and SUV detailing', offers: DETAIL_OFFERS },
  },
];

function areaPage({ slug, city, description, lede, intro, photo, localH2, localText, spots, spotsLabel = 'Areas we cover', faqs }) {
  return {
    path: `/mobile-car-detailing-${slug}`,
    kind: 'city',
    nav: city,
    city,
    title: fitTitle('Mobile Car Detailing', city),
    description,
    eyebrow: `Mobile detailing · ${city}, CA`,
    h1: ['Mobile car detailing', `in ${city}.`],
    lede,
    facts: ['Interior from $150', 'Satisfaction guaranteed', '7 days, 7 AM–7 PM'],
    card: 'premium',
    photo,
    intro,
    points: [
      { title: `We come to you in ${city}`, text: 'Your driveway, garage or curb, with our own water and power.' },
      { title: 'Same price, any size', text: 'Sedans, SUVs and trucks pay the same.' },
      { title: 'Pay now or later', text: 'Prepay online with code PREPAY and save $15, or pay after the detail.' },
    ],
    local: { h2: localH2, text: localText, spots, spotsLabel, map: `${city}, CA` },
    faqs: [...faqs, FAQ_PACKAGES, FAQ_TIME, FAQ_GUARANTEE],
    service: { type: 'Mobile car detailing', offers: DETAIL_OFFERS },
  };
}

export const CITY_PAGES = [
  areaPage({
    slug: 'midway-city',
    city: 'Midway City',
    description: 'Mobile car detailing in Midway City, CA. Interior details from $150, shampoo and extraction for $200, and a $50 hand wash add-on. Book online.',
    lede: 'Interior detailing at your Midway City home, with an optional hand wash. Book any day from 7 AM to 7 PM.',
    photo: PHOTO.accord,
    intro: {
      h2: 'Right next door to Westminster.',
      paras: [
        'Midway City sits between Westminster and Huntington Beach, just minutes from us. We come to your home with our own water and power.',
        'Book the Basic Interior Detail (about 2–3 hours) for triple-stage vacuuming, a full surface wipe-down and floor mats, or the Premium Detail (about 3–5 hours) for shampoo, extraction and a UV-protectant coating.',
        'Add the Exterior Wash for $50 to have the outside hand-washed and dried in the same visit.',
      ],
    },
    localH2: 'Around Midway City.',
    localText: 'We detail cars at homes across Midway City, from the streets off Beach Boulevard to the neighborhoods near Bolsa and McFadden Avenues.',
    spots: ['Along Beach Boulevard', 'Along Bolsa Avenue', 'Along McFadden Avenue'],
    faqs: [
      { q: 'Is street parking OK?', a: 'Yes, as long as we can park next to the car and open every door. If parking is tight on your street, call us before the appointment.' },
    ],
  }),
  areaPage({
    slug: 'huntington-harbour',
    city: 'Huntington Harbour',
    description: 'Mobile car detailing in Huntington Harbour, CA. Interior details from $150 and a $50 hand wash add-on, done in your driveway. Open 7 days.',
    lede: 'Interior detailing in your Huntington Harbour driveway, with an optional hand wash. No drop-off needed.',
    photo: PHOTO.bmw,
    intro: {
      h2: 'Harbour homes, salt air.',
      paras: [
        'Huntington Harbour is a short drive south of Westminster, where the channels meet the coast. Salt air and sand find their way into a car fast.',
        'The Basic Interior Detail is triple-stage vacuuming, a complete interior surface wipe-down and floor mat cleaning. The Premium Detail adds dust elimination, interior windows, deep carpet cleaning, extraction, full shampooing and a UV-protectant coating.',
        'Add the Exterior Wash for $50 to rinse the salt off the paint in the same visit.',
      ],
    },
    localH2: 'Across Huntington Harbour.',
    localText: 'We come to homes across Huntington Harbour, from the streets along Warner Avenue and Algonquin Street to the island neighborhoods.',
    spots: ['Along Warner Avenue', 'Along Algonquin Street', 'Davenport Island', 'Trinidad Island'],
    faqs: [
      { q: 'Can you work in a gated community?', a: 'Yes. Add the gate instructions when you book, or call us before the appointment, so we can get in.' },
    ],
  }),
  areaPage({
    slug: 'sunset-beach',
    city: 'Sunset Beach',
    description: 'Mobile car detailing in Sunset Beach, CA. Interior details from $150, shampoo and extraction for $200, plus a $50 hand wash. We bring water and power.',
    lede: 'Interior detailing at your Sunset Beach home, with an optional hand wash. We bring our own water and power.',
    photo: PHOTO.silverado,
    intro: {
      h2: 'Sand in the carpet? We bring the vacuum.',
      paras: [
        'Sunset Beach is a narrow strip of homes along the coast, a short drive from Westminster. Beach days mean sand in the carpet and salt on the paint.',
        'Choose the Basic Interior Detail for triple-stage vacuuming, a surface wipe-down and floor mats, or the Premium Detail for shampoo, cloth and carpet extraction and a UV-protectant coating.',
        'Add the Exterior Wash for $50 for a hand wash and spot-free dry in the same visit.',
      ],
    },
    localH2: 'Around Sunset Beach.',
    localText: 'We come to homes across Sunset Beach, from Pacific Coast Highway to the streets along North and South Pacific Avenue.',
    spots: ['Along Pacific Coast Highway', 'Along North Pacific Avenue', 'Along South Pacific Avenue'],
    faqs: [
      { q: 'Parking is tight on my street. Can you still come?', a: 'Usually, yes. We need to park next to the car and open every door. If parking is tight, call us before the appointment and we’ll work it out.' },
    ],
  }),
  areaPage({
    slug: 'la-palma',
    city: 'La Palma',
    description: 'Mobile car detailing in La Palma, CA. Interior details from $150 and a $50 hand wash add-on, at your home or office. Book online, open 7 days.',
    lede: 'Interior detailing at your La Palma home or office, with an optional hand wash. Book any day, 7 AM to 7 PM.',
    photo: PHOTO.jeep,
    intro: {
      h2: 'Up Valley View, to your door.',
      paras: [
        'La Palma is a short drive north of Westminster up Valley View Street. Driveways, office lots and curbside spots all work, as long as we can open every door.',
        'Pick the Basic Interior Detail for triple-stage vacuuming, a complete interior surface wipe-down and floor mats, or the Premium Detail for shampoo, extraction and a UV-protectant coating.',
        'The Exterior Wash adds a hand wash, rim cleaning and tire shine for $50, in the same visit.',
      ],
    },
    localH2: 'Across La Palma.',
    localText: 'We detail cars at homes and offices across La Palma, from Valley View Street to the neighborhoods along La Palma Avenue and Walker Street.',
    spots: ['Along Valley View Street', 'Along La Palma Avenue', 'Along Walker Street', 'Along Orangethorpe Avenue'],
    faqs: [
      { q: 'Can you detail my car at work?', a: 'Yes, if we can park next to your car and the property allows it. If your building has rules about service vehicles, call us before the appointment.' },
    ],
  }),
];

export const LANDING_PAGES = [...SERVICE_PAGES, ...CITY_PAGES];

export function findLanding(pathname) {
  return LANDING_PAGES.find((p) => p.path === pathname);
}
