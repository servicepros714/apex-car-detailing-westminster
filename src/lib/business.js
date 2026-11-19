// Central business config — Apex Car Detailing Westminster.
// Used by the pages, the SEO head tags / schema (src/lib/seo.js) and the booking flow.
//
// Confirmed by the owner (Nov 2026): mobile only (we come to you), same price for every
// vehicle size, own water and power, satisfaction guaranteed, job times as listed,
// open 7 days 7 AM – 7 PM. NOT confirmed, so never state: insurance, a shop customers
// visit, years in business, ratings, number of cars detailed, reviews we don't have.
export const BUSINESS = {
  name: 'Apex Car Detailing',
  location: 'Westminster',
  fullName: 'Apex Car Detailing Westminster',
  phone: '(714) 276-1658',
  phoneHref: 'tel:+17142761658',
  city: 'Westminster, CA',
  source: 'apex-westminster',
  bookingPrefix: 'APX-',
}

export const HOURS = 'Open 7 days, 7 AM – 7 PM'

// Canonical site address (no www). Every canonical tag, sitemap URL and schema URL uses this.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://apexcardetailinwestminster.site').replace(/\/$/, '')

// Google Business Profile. GOOGLE_PROFILE_URL is the share link people click;
// GOOGLE_PROFILE_ID is the stable kgmid search URL used in schema (sameAs).
export const GOOGLE_PROFILE_URL = 'https://share.google/TbfHkPfPeZepHeKHM'
export const GOOGLE_PROFILE_ID = 'https://www.google.com/search?kgmid=/g/11msp6lwbw'

// The packages (home cards, landing pages, booking flow). Prices must match
// worker/index.js SERVICES / EXTERIOR_ADDON, which the server charges from.
export const SERVICES = [
  {
    id: 'basic',
    name: 'Basic Interior Detail',
    price: 150,
    duration: '2–3 hours',
    tagline: 'A thorough interior reset.',
    features: [
      'Triple-Stage Vacuuming for Deep Debris Removal',
      'Complete Interior Surface Wipe-Down',
      'Floor Mat Cleaning & Restoration',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Detail',
    price: 200,
    duration: '3–5 hours',
    tagline: 'The full interior treatment.',
    popular: true,
    features: [
      'Triple-Stage Vacuuming',
      'Cabin Application',
      'Dust Elimination',
      'Interior Window Cleaning',
      'Deep Carpet Cleaning',
      'Cloth & Carpet Extraction',
      'Full Interior Shampooing',
      'UV-Protectant Coating',
    ],
  },
  {
    id: 'exterior',
    name: 'Exterior Wash',
    price: 50,
    duration: 'adds 1–2 hours',
    tagline: 'Add-on to either detail.',
    addOn: true,
    features: [
      'Hand-Washed Exterior',
      'Detailed Rim Cleaning',
      'Tire Scrub and Degrease',
      'Door Jamb & Panel Wipe-Down',
      'Premium Tire Shine Application',
      'Spot-Free Hand Drying',
    ],
  },
]

// Home page FAQ. Also used for the FAQPage schema on the home page, so only list
// questions that are shown on the page, and only confirmed facts.
export const FAQS = [
  { q: 'Do you come to me?', a: 'Yes. Apex is fully mobile: we detail your car at your home or office in Westminster and nearby. Enter your address when you book.' },
  { q: 'Do I need to provide water or power?', a: 'No. We bring our own water, power and supplies. We only need room to open every door.' },
  { q: 'How much is a detail?', a: 'The Basic Interior Detail is $150 and the Premium Detail is $200. Add the Exterior Wash to either one for $50.' },
  { q: 'Can I book only the Exterior Wash?', a: 'No. The Exterior Wash is an add-on. Choose the Basic Interior Detail or the Premium Detail, then add the wash.' },
  { q: 'Is it more for a truck or SUV?', a: 'No. Every vehicle size pays the same package price.' },
  { q: 'How long does it take?', a: 'About 2–3 hours for the Basic Interior Detail and 3–5 hours for the Premium Detail. The Exterior Wash adds about 1–2 hours.' },
  { q: 'What if I’m not happy with the result?', a: 'Let us know. Every detail comes with our satisfaction guarantee, and we’ll make it right.' },
  { q: 'When can I book, and how do I pay?', a: 'Any day, with start times every 30 minutes from 7 AM to 7 PM (same-day needs 2 hours notice). Prepay online with code PREPAY to save $15, or pay after the detail.' },
]

// Real customer reviews only, copied from the Google Business Profile
// (first name + last initial, spelling typos fixed). While empty, the home page shows
// a Google link if there is a profile, or nothing. To add one: { name: 'Maria G.', text: '...' }.
export const REVIEWS = [
  { name: 'Marc L.', text: 'Really happy with how everything turned out! Apex Car Detailing did a great job with the wash, and the car looks so much cleaner. They clearly put effort into their work. Would definitely recommend their service!' },
  { name: 'Andrea F.', text: 'Honest prices, on time, professional and knowledgeable. Wouldn’t trust anyone else with my car' },
  { name: 'Tiffany W.', text: 'My car looked fresh and felt brand new. I was impressed. Great job' },
  { name: 'Ryan G.', text: 'Leaves no spots behind. Is flexible with his schedule. Never had an issue with him only positive experiences 🙏' },
  { name: 'Haley M.', text: 'Hooked my charger up! Great service!' },
  { name: 'Jiwoo P.', text: 'super neat and nice service!!' },
]
