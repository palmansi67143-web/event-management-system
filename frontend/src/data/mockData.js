export const initialPackages = [
  {
    id: 1,
    name: "Wedding Packages",
    category: "Wedding",
    image: "1770007264_Post-34-First-birthday-1-990x660.jpg",
    fallbackImage: "/static/user/image/gallery20.jpg",
  },
  {
    id: 2,
    name: "Birthday Party Packages",
    category: "Birthday Party",
    image: "1770007270_Post-34-First-birthday-1-990x660.jpg",
    fallbackImage: "/static/user/image/gallery15.jpg",
  },
  {
    id: 3,
    name: "Corporate Event Packages",
    category: "Corporate Event",
    image: "1770701940_Agency-EA-Holiday-Party-2.jpg",
    fallbackImage: "/static/user/image/gallery22.jpg",
  },
  {
    id: 4,
    name: "Engagement & Sangeet",
    category: "Wedding",
    image: "1770700398_ballroom-sangeet_51_490335-1571168149.jpeg",
    fallbackImage: "/static/user/image/gallery10.jpg",
  },
  {
    id: 5,
    name: "Social Gathering & Anniversaries",
    category: "Social Gathering",
    image: "1770702061_weddingtwinkles-1.jpg",
    fallbackImage: "/static/user/image/gallery12.jpg",
  },
  {
    id: 6,
    name: "Concerts & Live Shows",
    category: "Concert",
    image: "1770725412_Agency-EA-Holiday-Party-2.jpg",
    fallbackImage: "/static/user/image/gallery24.jpg",
  },
];

export const initialVenues = [
  {
    id: 1,
    name: "The Royal Heritage Haveli",
    location: "Jaipur, Rajasthan",
    price: "1,50,000",
    image: "venue1.jpg",
  },
  {
    id: 2,
    name: "Lake Palace Resort",
    location: "Udaipur, Rajasthan",
    price: "2,20,000",
    image: "venue2.jpg",
  },
  {
    id: 3,
    name: "Fort View Courtyard",
    location: "Jodhpur, Rajasthan",
    price: "1,80,000",
    image: "venue3.jpg",
  },
  {
    id: 4,
    name: "Grand Ballroom & Lawns",
    location: "Chandigarh",
    price: "1,20,000",
    image: "venue4.jpg",
  },
  {
    id: 5,
    name: "Emerald Palms Garden",
    location: "Jaipur, Rajasthan",
    price: "95,000",
    image: "venue5.jpg",
  },
  {
    id: 6,
    name: "Dune Palace Luxury Camp",
    location: "Jaisalmer, Rajasthan",
    price: "2,50,000",
    image: "venue6.jpg",
  },
  {
    id: 7,
    name: "The Crown Banquet Hall",
    location: "Jaipur, Rajasthan",
    price: "1,10,000",
    image: "venue7.jpg",
  },
  {
    id: 8,
    name: "Skyline Terrace Pavilion",
    location: "Jaipur, Rajasthan",
    price: "1,40,000",
    image: "venue8.jpg",
  },
];

export const initialServices = [
  {
    id: 1,
    name: "Catering & Fine Dining",
    image: "service1.jpg",
  },
  {
    id: 2,
    name: "Theme Stage & Floral Decor",
    image: "service2.jpg",
  },
  {
    id: 3,
    name: "DJ & Live Sound Setup",
    image: "service3.jpg",
  },
  {
    id: 4,
    name: "Cinematic Photography",
    image: "service4.jpg",
  },
  {
    id: 5,
    name: "Bridal Makeup & Grooming",
    image: "service5.jpg",
  },
  {
    id: 6,
    name: "Hospitality & Guest Concierge",
    image: "service.jpg",
  },
];

export const initialTransports = [
  {
    id: 1,
    vehicle: "Vintage Rolls Royce Classic",
    image: "tr_1.jpg",
  },
  {
    id: 2,
    vehicle: "Mercedes-Benz S-Class",
    image: "tr_2.jpg",
  },
  {
    id: 3,
    vehicle: "Open-Top Classic Convertible",
    image: "tr_3.jpg",
  },
  {
    id: 4,
    vehicle: "Audi Stretch Limousine",
    image: "tr_4.jpg",
  },
  {
    id: 5,
    vehicle: "Luxury Guest Coach",
    image: "tra_tion.jpg",
  },
];

export const initialEvents = [
  {
    id: 1,
    name: "Royal Heritage Wedding Celebration",
    price: "2,50,000",
    food_type: "Veg & Non-Veg",
    pax: 500,
    room: "25",
    city: "Jaipur",
    category: "Wedding",
    venue_id: 1,
    venue: { name: "The Royal Heritage Haveli" },
    image: "card1.jpg",
  },
  {
    id: 2,
    name: "Grand Birthday Bash",
    price: "75,000",
    food_type: "Pure Veg Buffet",
    pax: 150,
    room: "5",
    city: "Jaipur",
    category: "Birthday Party",
    venue_id: 5,
    venue: { name: "Emerald Palms Garden" },
    image: "card2.jpg",
  },
  {
    id: 3,
    name: "Executive Corporate Gala Dinner",
    price: "1,80,000",
    food_type: "Multi-Cuisine Gourmet",
    pax: 300,
    room: "15",
    city: "Chandigarh",
    category: "Corporate Event",
    venue_id: 4,
    venue: { name: "Grand Ballroom & Lawns" },
    image: "card3.jpg",
  },
  {
    id: 4,
    name: "Romantic Sunset Sangeet & Cocktail",
    price: "1,60,000",
    food_type: "Veg & Non-Veg",
    pax: 250,
    room: "12",
    city: "Udaipur",
    category: "Wedding",
    venue_id: 2,
    venue: { name: "Lake Palace Resort" },
    image: "card4.jpg",
  },
  {
    id: 5,
    name: "Glamorous DJ Night & Social Gathering",
    price: "95,000",
    food_type: "Snacks & Starters",
    pax: 200,
    room: "8",
    city: "Jodhpur",
    category: "Social Event",
    venue_id: 3,
    venue: { name: "Fort View Courtyard" },
    image: "card5.jpg",
  },
  {
    id: 6,
    name: "Private Silver Jubilee Anniversary",
    price: "85,000",
    food_type: "Pure Veg Fine Dine",
    pax: 120,
    room: "6",
    city: "Jaipur",
    category: "Social Gathering",
    venue_id: 7,
    venue: { name: "The Crown Banquet Hall" },
    image: "card6.jpg",
  },
];

export const initialBlogs = [
  {
    id: 1,
    title: "Top 10 Destination Wedding Trends in 2026",
    slug: "top-10-destination-wedding-trends-2026",
    short_description:
      "From royal forts in Rajasthan to intimate lakeside vows, explore how modern couples are reinventing the wedding experience with bespoke styling, sustainable decor, and heritage charm.",
    content: `
      <p>Planning a wedding in 2026 is all about celebrating your authentic story in unforgettable spaces. Whether you dream of palatial ramparts illuminated by fairy lights or an ethereal morning pheras ceremony overlooking Lake Pichola, Rajasthan remains the premier destination for fairytale weddings.</p>
      <h4>1. Immersive Cultural Experiences</h4>
      <p>Couples are moving beyond generic decor to infuse local craftsmanship, folk music, puppet art, and vibrant local cuisines into their celebrations.</p>
      <h4>2. Bespoke Theme Lighting</h4>
      <p>Architectural lighting that highlights sandstone arches, lakeside reflections, and candlelit courtyard dinners transforms evening celebrations into cinematic memories.</p>
      <h4>3. Seamless Guest Hospitality</h4>
      <p>Dedicated airport transfers, welcome hampers with traditional delicacies, and customized itineraries make every guest feel like royalty.</p>
    `,
    image: "blog1.jpg",
    blog_date: "2026-02-15",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Venue for Corporate Conferences",
    slug: "how-to-choose-perfect-venue-for-corporate-conferences",
    short_description:
      "A strategic guide to selecting venues that blend modern AV technology, prime accessibility, comfortable accommodations, and inspiring breakout spaces for corporate milestones.",
    content: `
      <p>Corporate events demand flawless execution, high-speed connectivity, and an environment that sparks collaboration and forward thinking. When selecting your conference venue, prioritize seamless tech integration, acoustic balance, and proximity to transit hubs.</p>
      <h4>Key Considerations:</h4>
      <ul>
        <li>Audio-visual capabilities and stage visibility.</li>
        <li>Capacity and flexible seating arrangements.</li>
        <li>Breakout meeting rooms and lounge hospitality.</li>
      </ul>
    `,
    image: "blog2.jpg",
    blog_date: "2026-02-10",
  },
  {
    id: 3,
    title: "Creative Birthday Party Themes That Everyone Will Love",
    slug: "creative-birthday-party-themes-that-everyone-will-love",
    short_description:
      "Celebrate in style with themed backdrops, interactive food stations, customized photo zones, and curated entertainment that delight guests of all ages.",
    content: `
      <p>Every milestone birthday deserves a joyful and memorable celebration. With the right mix of interactive photo-ops, creative cake designs, and themed entertainment, you can craft an event that is energetic and deeply personal.</p>
    `,
    image: "1770699412_blog2.png",
    blog_date: "2026-01-28",
  },
];

export const initialGalleries = [
  { id: 1, image: "gallery1.jpg" },
  { id: 2, image: "gallery2.jpg" },
  { id: 3, image: "gallery3.jpg" },
  { id: 4, image: "gallery4.jpg" },
  { id: 5, image: "gallery5.jpg" },
  { id: 6, image: "gallery6.jpg" },
  { id: 7, image: "gallery7.jpg" },
  { id: 8, image: "gallery8.jpg" },
  { id: 9, image: "gallery9.jpg" },
  { id: 10, image: "gallery10.jpg" },
  { id: 11, image: "gallery11.jpg" },
  { id: 12, image: "gallery12.jpg" },
  { id: 13, image: "gallery13.jpg" },
  { id: 14, image: "gallery14.jpg" },
  { id: 15, image: "gallery15.jpg" },
  { id: 16, image: "gallery16.jpg" },
  { id: 17, image: "gallery17.jpg" },
  { id: 18, image: "gallery18.jpg" },
  { id: 19, image: "gallery19.jpg" },
  { id: 20, image: "gallery20.jpg" },
  { id: 21, image: "gallery21.jpg" },
  { id: 22, image: "gallery22.jpg" },
  { id: 23, image: "gallery23.jpg" },
  { id: 24, image: "gallery24.jpg" },
];

export const initialBookings = [
  {
    id: 101,
    user_name: "Rahul Sharma",
    user_email: "rahul@example.com",
    user_phone: "9876543210",
    event_id: 1,
    event: { name: "Royal Heritage Wedding Celebration" },
    venue_id: 1,
    venue: { name: "The Royal Heritage Haveli" },
    service_id: 1,
    service: { name: "Catering & Fine Dining" },
    transport_id: 1,
    transport: { vehicle: "Vintage Rolls Royce Classic" },
    event_date: "2026-11-20",
    booking_date: "2026-10-15",
    status: "Confirmed",
  },
  {
    id: 102,
    user_name: "Pooja Verma",
    user_email: "pooja@example.com",
    user_phone: "9123456789",
    event_id: 2,
    event: { name: "Grand Birthday Bash" },
    venue_id: 5,
    venue: { name: "Emerald Palms Garden" },
    service_id: 2,
    service: { name: "Theme Stage & Floral Decor" },
    transport_id: 2,
    transport: { vehicle: "Mercedes-Benz S-Class" },
    event_date: "2026-12-05",
    booking_date: "2026-10-22",
    status: "Pending",
  },
];

