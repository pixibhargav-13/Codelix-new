/* City landing pages — "best <service> company in <city>".

   These pages exist for search only. Nothing on the site links to them; they
   are reached from Google (they are listed in sitemap.xml) and the only way
   out of them is the contact page. See LocationLandingV2.jsx.

   Every page is one SERVICE crossed with one CITY. Google treats a set of
   near-identical city pages as doorway pages and demotes them, so the city
   half carries real local substance — the industries that actually run that
   city's economy, and what each service means for them — instead of a city
   name swapped into the same paragraph. Keep it that way when adding a city:
   write its industries out properly.

   Plain data, no image imports: route-config.js reads LOCATION_SLUGS under
   plain Node during the build. */

export const LOCATION_SERVICES = {
  website: {
    key: "website",
    slugPart: "website-development-company",
    label: "Website Development",
    lower: "website development",
    noun: "website development company",
    article: "a",
    short: "websites",
    timeline: "3–6 weeks",
    definition:
      "builds fast, mobile-first business websites, e-commerce stores and web applications — designed, developed, launched and supported by one team.",
    included: [
      { title: "Custom website design", body: "Designed around your business and your buyers, not a reused theme. Every page is planned in Figma and signed off before development starts." },
      { title: "Mobile-first, fast builds", body: "Most of your visitors arrive on a phone. Pages are built mobile-first, with images and scripts budgeted so they load quickly on a 4G connection." },
      { title: "On-page SEO foundations", body: "Clean URLs, titles, meta descriptions, structured data, a sitemap and fast Core Web Vitals — the technical groundwork that lets Google rank the site." },
      { title: "E-commerce & payments", body: "Product catalogues, carts and checkout with Razorpay, PayU or Stripe, GST-ready invoices and order management, when you sell online." },
      { title: "Easy content management", body: "An admin panel your team can use to update products, pages and blog posts without calling a developer." },
      { title: "Hosting, launch & support", body: "Domain, SSL, hosting and launch handled for you, followed by a support window for fixes and an optional monthly maintenance plan." },
    ],
    faqs: (city) => [
      { q: `How much does website development cost in ${city.name}?`, a: `It depends on what the site has to do. A business website with a handful of pages costs far less than an e-commerce store or a custom web application. We give every ${city.name} client a fixed written quote after a short discovery call, so you know the full price before any work starts.` },
      { q: "How long does it take to build a website?", a: "A business website typically takes 3–6 weeks from signed-off scope to launch. E-commerce stores and web applications take longer, usually 6–12 weeks, depending on features and integrations." },
      { q: `Do you only work remotely with ${city.name} businesses?`, a: city.meet },
      { q: "Will my website be SEO-friendly?", a: "Yes. Every site ships with technical SEO in place — fast load times, mobile-first layouts, clean URLs, meta tags, structured data and an XML sitemap — so it is ready to rank from day one." },
      { q: "Who owns the website after it is built?", a: "You do. The domain is registered in your name and you receive admin access, the design files and a handover walkthrough when the project closes." },
    ],
  },
  software: {
    key: "software",
    slugPart: "software-development-company",
    label: "Software Development",
    lower: "software development",
    noun: "software development company",
    article: "a",
    short: "custom software",
    timeline: "6–14 weeks",
    definition:
      "builds custom software — web applications, mobile apps, SaaS products, dashboards and automation — shaped around how your business actually works.",
    included: [
      { title: "Custom web applications", body: "Portals, internal tools and customer-facing platforms built for your exact workflow, not bent around an off-the-shelf product." },
      { title: "Mobile app development", body: "Android and iOS apps from a single cross-platform codebase with Flutter or React Native, published to the Play Store and App Store." },
      { title: "SaaS product development", body: "Multi-tenant SaaS with subscriptions, roles and billing built in from day one, so the product can grow past its first customers." },
      { title: "API & system integration", body: "Connect the tools you already use — accounting, CRM, payment gateways, WhatsApp and SMS — so data moves without anyone retyping it." },
      { title: "AI & workflow automation", body: "AI agents, chatbots and automations that take repetitive data entry and follow-ups off your team." },
      { title: "Maintenance & support", body: "Bug fixes, updates, monitoring and new features after launch, on a support window and an optional monthly retainer." },
    ],
    faqs: (city) => [
      { q: `How much does custom software development cost in ${city.name}?`, a: `Cost depends on scope — the number of modules, user roles, integrations and platforms (web, Android, iOS). We scope every ${city.name} project on a discovery call and send a fixed written quote, so the price does not move halfway through.` },
      { q: "How long does a custom software project take?", a: "Most projects run 6–14 weeks from signed-off scope to launch. We build in short sprints, so you see working software every couple of weeks rather than only at the end." },
      { q: `Do you only work remotely with ${city.name} businesses?`, a: city.meet },
      { q: "Which technologies do you use?", a: "React, Node.js, Laravel, Python, Spring Boot, Flutter and React Native, with PostgreSQL, MySQL or MongoDB, deployed on AWS. We choose per project based on your scale and who will maintain it." },
      { q: "Do we own the source code?", a: "Yes. The source code, design files, documentation and all accounts are handed over to you when the project closes." },
    ],
  },
  erp: {
    key: "erp",
    slugPart: "erp-development-company",
    label: "ERP Development",
    lower: "ERP development",
    noun: "ERP development company",
    article: "an",
    short: "ERP software",
    timeline: "8–12 weeks",
    definition:
      "builds custom ERP software that brings production, inventory, purchase, sales, accounts, GST and HR into one system built around your processes.",
    included: [
      { title: "Inventory & warehouse", body: "Live stock across godowns and locations — batches, lots, reorder levels and stock movement, with no end-of-day reconciliation in Excel." },
      { title: "Production & planning", body: "Bills of materials, work orders, job work and machine-wise production tracking, so the office sees what the shop floor is doing today." },
      { title: "Purchase & sales", body: "Enquiry, quotation, order, dispatch and invoice in one flow, with pending orders and outstanding payments visible at a glance." },
      { title: "Accounts & GST", body: "GST-ready invoicing with e-invoice and e-way bill support, ledgers and receivables, and integration with Tally where you still need it." },
      { title: "HR, attendance & payroll", body: "Employee records, attendance, leave and payroll for office and factory staff in the same system." },
      { title: "Reports & dashboards", body: "Owner dashboards and reports built from live data — production, sales, stock and cash — on desktop and mobile." },
    ],
    faqs: (city) => [
      { q: `How much does custom ERP software cost in ${city.name}?`, a: `It depends on the modules you need, the number of users and locations, and the integrations involved (Tally, GST e-invoice, e-way bill). We map your processes first and then send ${city.name} clients a fixed written quote.` },
      { q: "Why custom ERP instead of a ready-made ERP?", a: "Ready-made ERPs make you change how your business works to fit the software. A custom ERP fits your existing process, includes only the modules you use, and has no per-user licence fees that grow with your team." },
      { q: `Do you only work remotely with ${city.name} businesses?`, a: city.meet },
      { q: "Can the ERP work with Tally and GST?", a: "Yes. We build GST-ready invoicing with e-invoice and e-way bill support, and can sync vouchers and ledgers with Tally if your accountant continues to use it." },
      { q: "How long does ERP implementation take?", a: "A focused ERP with a few core modules can go live in 8–12 weeks. Larger rollouts are delivered module by module, so your team starts using the system early instead of waiting for everything at once." },
    ],
  },
  app: {
    key: "app",
    slugPart: "mobile-app-development-company",
    label: "Mobile App Development",
    lower: "mobile app development",
    noun: "mobile app development company",
    article: "a",
    short: "mobile apps",
    timeline: "8–14 weeks",
    definition:
      "builds Android and iOS apps — customer apps, business apps and on-demand platforms — designed, developed, published to the Play Store and App Store, and supported after launch.",
    included: [
      { title: "Android & iOS apps", body: "One cross-platform codebase with Flutter or React Native, so you launch on both stores for close to the cost of one — with a native look and feel." },
      { title: "Mobile UI/UX design", body: "Screens and flows designed for thumbs and small screens, tested on real devices and signed off before development starts." },
      { title: "Backend & admin panel", body: "The server, database and APIs behind the app, plus a web admin panel to manage users, orders and content." },
      { title: "Payments & integrations", body: "Razorpay and UPI payments, maps and location, push notifications, OTP login, and WhatsApp or SMS alerts." },
      { title: "Play Store & App Store launch", body: "Store listings, screenshots, signing and submission handled for you, including review feedback from Google and Apple." },
      { title: "Updates & support", body: "Bug fixes, OS-version updates and new features after launch, on a support window and an optional monthly plan." },
    ],
    faqs: (city) => [
      { q: `How much does mobile app development cost in ${city.name}?`, a: `It depends on the screens, features, user roles and integrations — and whether you need Android, iOS or both. We scope every ${city.name} app on a discovery call and send a fixed written quote before any work starts.` },
      { q: "How long does it take to build a mobile app?", a: "Most apps take 8–14 weeks from signed-off design to store launch. A focused first version (MVP) can ship sooner, with more features added in later releases." },
      { q: `Do you only work remotely with ${city.name} businesses?`, a: city.meet },
      { q: "Do you build for both Android and iOS?", a: "Yes. We usually build with Flutter or React Native, so one codebase runs on both Android and iOS. That keeps cost and release time down without giving up a native feel." },
      { q: "Will you publish the app on the Play Store and App Store?", a: "Yes. We prepare the store listings, handle signing and submission, and respond to review feedback. The developer accounts are registered in your name, so you own the app." },
    ],
  },
};

/* `meet` answers "do you only work remotely" honestly: the office is in
   Ahmedabad, so only Ahmedabad gets an in-person-by-default answer. */
export const LOCATION_CITIES = {
  ahmedabad: {
    key: "ahmedabad",
    name: "Ahmedabad",
    region: "Gujarat",
    intro: "Ahmedabad is where Codelix is based — our office is in Vejalpur — so for Ahmedabad businesses we are a local team you can meet in person, not a remote vendor.",
    economy: "Ahmedabad's economy runs on textiles, pharmaceuticals, chemicals, engineering and a fast-growing startup scene around SG Highway and nearby GIFT City.",
    meet: "No. Our office is in Vejalpur, Ahmedabad, so we hold discovery workshops, design reviews and handover sessions in person with Ahmedabad clients, and work remotely in between.",
    industries: [
      {
        name: "Textiles & garments",
        website: "B2B catalogue sites and wholesale enquiry portals that show mills and traders your full fabric range online.",
        software: "Order-tracking and dealer apps that replace WhatsApp threads between your sales team, mills and buyers.",
        erp: "Textile ERP covering yarn, grey fabric, processing, job work and finished stock across every stage.",
        app: "Sales and order-booking apps for agents and buyers, with live stock and the full catalogue on the phone.",
      },
      {
        name: "Pharmaceuticals & chemicals",
        website: "Product-catalogue websites with compliance-friendly content and export enquiry forms for distributors.",
        software: "Batch-record, QA and distributor-management systems built for regulated manufacturing.",
        erp: "Pharma and chemical ERP with batch tracking, expiry management, QC and formula-based production.",
        app: "Field-force (MR) and distributor apps for orders, visits and stock levels.",
      },
      {
        name: "Engineering & manufacturing",
        website: "Industrial websites that present capabilities, certifications and product specs to procurement teams.",
        software: "Custom portals for quotations, dealer orders and service requests.",
        erp: "Manufacturing ERP for BOMs, work orders, job work, machine tracking and dispatch.",
        app: "Shop-floor and service-engineer apps for production updates, inspections and field service.",
      },
      {
        name: "Startups & SaaS",
        website: "Conversion-focused product websites and landing pages built to support fundraising and launches.",
        software: "MVPs and SaaS products built to ship fast and scale past the first customers.",
        erp: "Lightweight operations systems for growing teams that have outgrown spreadsheets.",
        app: "Consumer and B2B apps built cross-platform, ready for launch and for growth after it.",
      },
    ],
  },
  surat: {
    key: "surat",
    name: "Surat",
    region: "Gujarat",
    intro: "Surat is one of Gujarat's busiest trading cities, and its businesses move fast — diamond units, textile traders and builders who need technology that keeps up with them.",
    economy: "Surat is known worldwide for diamond cutting and polishing, and is one of India's largest centres for man-made textiles, alongside a booming real-estate market.",
    meet: "We work with Surat businesses mostly remotely — video calls, shared project boards and fortnightly demos — and travel to Surat from our Ahmedabad office for key workshops and the final handover when needed.",
    industries: [
      {
        name: "Diamonds & jewellery",
        website: "Premium jewellery and diamond showcase websites, with secure enquiry and B2B catalogue access for buyers.",
        software: "Stock and lot-tracking software for diamond units, with certificate and buyer records.",
        erp: "Diamond ERP for rough-to-polished tracking, lot and packet management, process-wise costing and job work.",
        app: "Catalogue and inventory apps for buyers and brokers, with secure stone and lot details.",
      },
      {
        name: "Textile trading",
        website: "Wholesale catalogue websites that let traders and retailers browse sarees, dress materials and fabrics online.",
        software: "Order-booking and agent apps that replace paper order books and phone orders.",
        erp: "Textile trading ERP for purchase, sales, broker commission, GST invoicing and outstanding tracking.",
        app: "Order-booking apps for agents and retailers that replace paper order books.",
      },
      {
        name: "Embroidery & processing units",
        website: "Websites that present your machines, capacity and design work to traders looking for job-work partners.",
        software: "Job-work tracking apps for design, machine and delivery status.",
        erp: "Job-work ERP covering challans, machine-wise production, wages and billing.",
        app: "Job-status apps so traders can track design, machine and delivery progress.",
      },
      {
        name: "Real estate & construction",
        website: "Project websites with floor plans, amenities and lead capture for new launches.",
        software: "Lead-management and channel-partner apps for sales teams.",
        erp: "Construction ERP for site material, contractor billing, bookings and payment schedules.",
        app: "Sales apps for site visits, bookings and channel partners.",
      },
    ],
  },
  rajkot: {
    key: "rajkot",
    name: "Rajkot",
    region: "Gujarat",
    intro: "Rajkot is the engineering heart of Saurashtra, home to thousands of SMEs that make parts the rest of India runs on — and most of them still manage production in registers and Excel.",
    economy: "Rajkot is known for engineering and auto components, castings and forgings, machine tools, diesel engines and pumps, bearings, and a large imitation-jewellery industry.",
    meet: "We work with Rajkot businesses mostly remotely — video calls, shared project boards and fortnightly demos — and travel to Rajkot from our Ahmedabad office for process-mapping workshops and go-live when needed.",
    industries: [
      {
        name: "Engineering & auto parts",
        website: "Industrial websites with product catalogues and specifications that win enquiries from OEMs and exporters.",
        software: "Quotation, dealer and service portals built for component manufacturers.",
        erp: "Engineering ERP for BOMs, work orders, job work, quality checks and dispatch to OEM customers.",
        app: "Dealer and field-sales apps with catalogue, orders and outstanding payments.",
      },
      {
        name: "Castings & forgings",
        website: "Capability websites that show foundry capacity, materials and certifications to buyers.",
        software: "Order and dispatch tracking software for foundries and forging units.",
        erp: "Foundry ERP for melting, moulding, rejection tracking, machining and weight-based costing.",
        app: "Production-update and dispatch-tracking apps for the shop floor.",
      },
      {
        name: "Pumps, motors & machine tools",
        website: "Product websites with model-wise specifications and dealer-locator pages.",
        software: "Dealer-ordering and warranty-registration apps for distribution networks.",
        erp: "ERP with serial-number tracking, assembly production and after-sales service.",
        app: "Warranty-registration and service-technician apps for dealer networks.",
      },
      {
        name: "Imitation jewellery",
        website: "Catalogue and B2B ordering websites for wholesale jewellery buyers across India.",
        software: "Order-booking apps for agents and wholesalers.",
        erp: "Jewellery ERP for design-wise stock, karigar job work and wholesale billing.",
        app: "Wholesale catalogue and ordering apps for buyers across India.",
      },
    ],
  },
  jamnagar: {
    key: "jamnagar",
    name: "Jamnagar",
    region: "Gujarat",
    intro: "Jamnagar is India's brass city and home to some of the world's largest refining capacity, with a dense network of manufacturers and suppliers built around both.",
    economy: "Jamnagar is known for brass parts manufacturing, the refinery and petrochemical complex and its supplier ecosystem, bandhani textiles, and port-based trade on the Gulf of Kutch.",
    meet: "We work with Jamnagar businesses mostly remotely — video calls, shared project boards and fortnightly demos — and travel to Jamnagar from our Ahmedabad office for process-mapping workshops and go-live when needed.",
    industries: [
      {
        name: "Brass parts manufacturing",
        website: "Export-ready websites with brass component catalogues, specifications and enquiry forms for overseas buyers.",
        software: "Export-order, quotation and buyer-portal software for brass parts units.",
        erp: "Brass parts ERP for raw-material weight tracking, job work across processes, scrap and export documentation.",
        app: "Buyer apps with product catalogue, order status and export documentation.",
      },
      {
        name: "Refinery & industrial suppliers",
        website: "Capability websites that present services, certifications and project experience to large industrial clients.",
        software: "Vendor, contract and manpower-management systems for industrial service providers.",
        erp: "ERP for project costing, equipment, manpower and contract billing.",
        app: "Field-workforce apps for attendance, site reports and contract work.",
      },
      {
        name: "Bandhani & textiles",
        website: "E-commerce stores that take Jamnagar bandhani to customers across India and abroad.",
        software: "Order and artisan-tracking apps for bandhani producers.",
        erp: "Textile ERP for artisan job work, dyeing stages, stock and online orders.",
        app: "Shopping apps that sell bandhani directly to customers.",
      },
      {
        name: "Port & logistics",
        website: "Logistics and shipping websites with service pages and quote-request forms.",
        software: "Shipment-tracking and documentation software for logistics firms.",
        erp: "Logistics ERP for bookings, fleet, billing and shipment documentation.",
        app: "Driver and shipment-tracking apps with live status and proof of delivery.",
      },
    ],
  },
  morbi: {
    key: "morbi",
    name: "Morbi",
    region: "Gujarat",
    intro: "Morbi is India's ceramic capital — the cluster produces the large majority of the country's ceramic tiles — and its manufacturers compete on speed, dealer networks and exports.",
    economy: "Morbi is known for ceramic wall and floor tiles, vitrified tiles and sanitaryware, along with wall clocks, paper mills and packaging.",
    meet: "We work with Morbi businesses mostly remotely — video calls, shared project boards and fortnightly demos — and travel to Morbi from our Ahmedabad office for process-mapping workshops and go-live when needed.",
    industries: [
      {
        name: "Ceramic & vitrified tiles",
        website: "Tile catalogue websites with size, series and finish filters, visualisers and dealer enquiry forms.",
        software: "Dealer-ordering apps and digital catalogues for tile manufacturers' sales networks.",
        erp: "Ceramic ERP for production by size and grade, shade and batch tracking, stock and dispatch.",
        app: "Dealer-ordering and digital catalogue apps with tile visualisation.",
      },
      {
        name: "Sanitaryware",
        website: "Product websites with model-wise catalogues and dealer-locator pages.",
        software: "Dealer, warranty and service-request apps.",
        erp: "Sanitaryware ERP for casting, firing, rejection tracking and finished-goods stock.",
        app: "Dealer, plumber-loyalty and service-request apps.",
      },
      {
        name: "Ceramic exports",
        website: "Export-focused websites for international buyers, with container-load catalogues and enquiry forms.",
        software: "Export order, sampling and buyer-portal software.",
        erp: "Export ERP for proforma invoices, container planning, shipping documents and payment tracking.",
        app: "Buyer apps for samples, order status and container tracking.",
      },
      {
        name: "Wall clocks, paper & packaging",
        website: "B2B catalogue websites for distributors and retailers.",
        software: "Order-booking apps for distributor networks.",
        erp: "ERP for production, stock, distributor billing and outstanding tracking.",
        app: "Distributor order-booking and salesman-tracking apps.",
      },
    ],
  },
  vadodara: {
    key: "vadodara",
    name: "Vadodara",
    region: "Gujarat",
    intro: "Vadodara is one of Gujarat's major industrial cities, with a deep base of chemical, engineering and power-equipment manufacturers spread across its GIDC estates.",
    economy: "Vadodara is known for chemicals and petrochemicals, heavy engineering and fabrication, electrical and power equipment such as transformers and switchgear, pharmaceuticals, and its large university and education sector.",
    meet: "We work with Vadodara businesses mostly remotely — video calls, shared project boards and fortnightly demos — and travel to Vadodara from our Ahmedabad office for process-mapping workshops and go-live when needed.",
    industries: [
      {
        name: "Chemicals & petrochemicals",
        website: "Product and capability websites with technical data sheets, certifications and export enquiry forms.",
        software: "Batch-record, compliance and distributor-management systems for chemical manufacturers.",
        erp: "Chemical ERP with formula-based production, batch tracking, QC, hazardous-material stock and GST invoicing.",
        app: "Field-sales and distributor apps for orders, visits and stock.",
      },
      {
        name: "Heavy engineering & fabrication",
        website: "Industrial websites that present project experience, capacity and certifications to EPC and procurement teams.",
        software: "Project-tracking and quotation portals for fabrication and engineering firms.",
        erp: "Project-based ERP for BOMs, job costing, fabrication stages, inspections and dispatch.",
        app: "Site-inspection and project-progress apps for engineers in the field.",
      },
      {
        name: "Electrical & power equipment",
        website: "Product websites with model-wise specifications for transformers, switchgear and cables.",
        software: "Dealer-ordering, warranty and service-request apps for equipment manufacturers.",
        erp: "ERP with serial-number tracking, testing records, assembly production and after-sales service.",
        app: "Warranty, service and dealer-ordering apps for equipment manufacturers.",
      },
      {
        name: "Pharmaceuticals",
        website: "Compliance-friendly product-catalogue websites for distributors and export buyers.",
        software: "QA, batch and distributor-management software built for regulated manufacturing.",
        erp: "Pharma ERP with batch and expiry tracking, QC, and formula-based production.",
        app: "Medical-representative and distributor apps for pharma companies.",
      },
    ],
  },
  gandhinagar: {
    key: "gandhinagar",
    name: "Gandhinagar",
    region: "Gujarat",
    intro: "Gandhinagar is a short drive from our Ahmedabad office, so for Gandhinagar businesses we are a nearby team you can meet in person — not a remote vendor.",
    economy: "Gandhinagar is Gujarat's capital and home to GIFT City, the state's financial and fintech hub, along with IT parks, leading education institutions, and industrial estates around Kalol and Chhatral.",
    meet: "Gandhinagar is close to our Ahmedabad office, so we hold discovery workshops, design reviews and handover sessions in person with Gandhinagar clients, and work remotely in between.",
    industries: [
      {
        name: "Fintech & GIFT City firms",
        website: "Credible, compliance-conscious websites for fintech, financial-services and GIFT City firms.",
        software: "Secure fintech platforms, dashboards and client portals with role-based access and audit trails.",
        erp: "Back-office systems for client onboarding, billing, compliance records and reporting.",
        app: "Secure fintech apps with KYC, payments and investment tracking.",
      },
      {
        name: "IT & technology companies",
        website: "Product and company websites that support hiring, fundraising and enterprise sales.",
        software: "SaaS products, MVPs and extra engineering capacity for growing tech teams.",
        erp: "Internal operations systems for projects, timesheets, billing and HR.",
        app: "Cross-platform apps and MVPs for product teams that need to ship fast.",
      },
      {
        name: "Education & institutions",
        website: "Websites for schools, colleges and institutes with admissions, courses and enquiry forms.",
        software: "Learning platforms, student portals and admission-management systems.",
        erp: "Education ERP for admissions, fees, attendance, exams and staff payroll.",
        app: "Student, parent and teacher apps for attendance, fees and homework.",
      },
      {
        name: "Manufacturing (Kalol, Chhatral & nearby)",
        website: "Industrial websites with product catalogues and specifications that win B2B enquiries.",
        software: "Quotation, dealer and order-tracking portals for manufacturers.",
        erp: "Manufacturing ERP for BOMs, work orders, inventory, job work and dispatch.",
        app: "Dealer and field-sales apps for orders and outstanding payments.",
      },
    ],
  },
};

export const locationSlug = (serviceKey, cityKey) =>
  `best-${LOCATION_SERVICES[serviceKey].slugPart}-in-${cityKey}`;

const PAGES = Object.keys(LOCATION_SERVICES).flatMap((s) =>
  Object.keys(LOCATION_CITIES).map((c) => ({ slug: locationSlug(s, c), service: s, city: c }))
);

export const LOCATION_SLUGS = PAGES.map((p) => p.slug);

export const locationPageBySlug = (slug) => {
  const page = PAGES.find((p) => p.slug === slug);
  if (!page) return null;
  return { slug, service: LOCATION_SERVICES[page.service], city: LOCATION_CITIES[page.city] };
};

/* SEO strings. Titles stay under 60 characters: the longest city/service
   pair ("Best Software Development Company in Jamnagar | Codelix") fits. */
export const locationSeo = ({ service, city }) => ({
  title: `Best ${service.label} Company in ${city.name} | Codelix`,
  description: `Codelix IT Solutions is ${service.article} ${service.noun} serving ${city.name}, ${city.region}. Fixed quotes, on-time delivery and full ownership of your ${service.short}.`,
  keywords: [
    `best ${service.noun} in ${city.name}`,
    `${service.noun} in ${city.name}`,
    `${service.lower} ${city.name}`,
    `${service.lower} company ${city.name}`,
    `top ${service.noun} in ${city.name}`,
    `${service.lower} services in ${city.name}`,
    ...{
      website: [`website design company in ${city.name}`, `web designer in ${city.name}`, `e-commerce website development ${city.name}`, `website developer near me ${city.name}`],
      software: [`software company in ${city.name}`, `IT company in ${city.name}`, `custom software development ${city.name}`, `mobile app development company in ${city.name}`],
      app: [`app developers in ${city.name}`, `Android app development ${city.name}`, `iOS app development ${city.name}`, `Flutter app development ${city.name}`],
      erp: [`ERP software in ${city.name}`, `custom ERP software ${city.name}`, `manufacturing ERP ${city.name}`, `ERP software company ${city.name}`],
    }[service.key],
    ...city.industries.map((i) => `${service.short} for ${i.name.toLowerCase()} ${city.name}`),
    `${service.noun} ${city.region}`,
    "Codelix IT Solutions",
  ].join(", "),
});
