/* the same 5 real client quotes used site-wide (Homepage carousel,
   About/Team/Industry/Product detail pages) — used here as a fixed,
   non-live array for pages that intentionally stay outside the
   admin-editable testimonials system (the 8 core + 18 additional
   service pages), so their testimonial section still gets the full
   TestimonialSpotlight design (multiple quotes, dots, marquee)
   without pulling from Supabase. */
export const STATIC_TESTIMONIALS = [
  { quote: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.", name: "Rajesh Patel", position: "CEO, Harmony Inc." },
  { quote: "Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.", name: "Priya Sharma", position: "Founder, Nexa Digital" },
  { quote: "Amazing team! Delivered everything on time with exceptional quality. Totally recommend!", name: "Amit Kumar", position: "CTO, PixelWave" },
  { quote: "Honestly, we were struggling to keep up with our growth until they stepped in. They didn't just build the tech; they actually understood our users. It's been a total game-changer for our workflow, and the design is just spot on.", name: "Emily Watson", position: "Director, Nova Corp" },
  { quote: "What I love most is that they don't just say 'yes' to everything — they tell us what's actually going to work. The whole process felt super collaborative, and they genuinely cared about making the project a success.", name: "Chris Taylor", position: "COO, Orbit Labs" },
];
