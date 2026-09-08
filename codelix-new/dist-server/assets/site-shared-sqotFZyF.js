import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Y as audyteeLogo, Z as fourBitxLogo, _ as aanganOneLogo, $ as codelixLogo } from "./site-images-DRvRo0sp.js";
import { N as NAVBAR_SERVICES_HIERARCHY, F as FOOTER_INDUSTRY_KEYWORDS, a as FOOTER_ALL_SERVICES, b as FOOTER_PRODUCTS, C as CLIENT_LOGOS } from "./site-data-ES8yYkGU.js";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { Sparkles, Zap, Radio, MessageSquare, LineChart, Bot, Contact, ClipboardList, CalendarCheck, Wallet, UserCog, FolderLock, ShieldCheck, UserCheck, MessageCircle, KeyRound, Users, BarChart3, BookOpen, Workflow, GraduationCap, TrendingUp, FileText, BellRing, Receipt, ShieldAlert, Calculator, Package, Cog, ScanLine, Handshake, UsersRound, FolderCog, HardHat, Brain, QrCode, CreditCard, Megaphone, MessagesSquare, Wrench, ParkingSquare, BookUser, Briefcase, Info, Tag, Cpu, Newspaper, HelpCircle, Rocket, Mail, LayoutGrid, ChevronDown, Building2, Boxes, ChevronRight, Globe, Cloud, Database, ShoppingCart, Palette, Smartphone, Plane, Coffee, Activity, Landmark, Factory, Monitor, Server, PenTool, Lock } from "lucide-react";
const PRODUCTS = [
  {
    slug: "audytee",
    name: "Audytee",
    logo: audyteeLogo,
    badge: "Practice Management Software",
    tagline: "Your CA firm. Smarter. Faster. Done.",
    status: "Live",
    website: "https://audytee.com",
    email: "info@audytee.com",
    accent: "#8b6cf0",
    headline: "One platform to run your entire CA practice.",
    sub: "Clients, tasks, compliance, billing and AI — all in one place. Because Excel was never the answer.",
    stats: [
      { value: "20", label: "Modules" },
      { value: "6", label: "AI features" },
      { value: "90,000+", label: "CA firms in India" }
    ],
    problem: {
      label: "The Problem",
      heading: "Indian CA firms are drowning in chaos.",
      body: "Most firms juggle Excel, WhatsApp, scattered emails and manual reminders every single day — and still lose clients, miss deadlines, and undercharge.",
      points: [
        { icon: FileText, title: "Excel overload", body: "Client data, tasks and deadlines spread across 10 different sheets with no single source of truth." },
        { icon: MessageCircle, title: "WhatsApp chaos", body: "Document collection on personal WhatsApp means no audit trail, no archive, no accountability." },
        { icon: BellRing, title: "Missed deadlines", body: "No automated compliance tracking means penalties hit clients and damage the firm's reputation." },
        { icon: Receipt, title: "Billing delays", body: "Manual invoicing with zero follow-up automation means cash flow suffers every month." }
      ]
    },
    modules: [
      { n: "01", title: "Client Management", icon: Contact, body: "Full profiles — PAN, GST, TAN, complete history" },
      { n: "02", title: "Task Tracking", icon: ClipboardList, body: "Kanban board with recurring tasks and deadlines" },
      { n: "03", title: "Compliance Calendar", icon: CalendarCheck, body: "GST, ITR, TDS, ROC — all automated" },
      { n: "04", title: "AI Automation", icon: Bot, body: "Voice tasks, document reader, WhatsApp bot" },
      { n: "05", title: "Smart Billing", icon: Wallet, body: "GST invoices with auto payment reminders" },
      { n: "06", title: "Team Management", icon: UserCog, body: "AI workload balancer and geo attendance" },
      { n: "07", title: "Document Vault", icon: FolderLock, body: "Secure cloud document management system" },
      { n: "08", title: "Notice Management", icon: ShieldCheck, body: "Auto-fetch GST, IT and TDS notices" },
      { n: "09", title: "Client Portal", icon: UserCheck, body: "Secure client self-service portal" },
      { n: "10", title: "WhatsApp Bot", icon: MessageCircle, body: "Automated document collection" },
      { n: "11", title: "DSC Register", icon: KeyRound, body: "Expiry alerts and tracking" },
      { n: "12", title: "Password Manager", icon: KeyRound, body: "Secure client credential storage" },
      { n: "13", title: "Audit Management", icon: ClipboardList, body: "Planning and working papers" },
      { n: "14", title: "Leads CRM", icon: Users, body: "Track and convert new leads" },
      { n: "15", title: "Attendance & Leave", icon: UserCheck, body: "HR management with geo-tagging" },
      { n: "16", title: "Reports & Analytics", icon: BarChart3, body: "Revenue and productivity insights" },
      { n: "17", title: "Knowledge Base", icon: BookOpen, body: "SOPs, guides and templates" },
      { n: "18", title: "Workflow Automation", icon: Workflow, body: "Triggers, rules and actions" },
      { n: "19", title: "Articleship Module", icon: GraduationCap, body: "Article tracking and ICAI forms" },
      { n: "20", title: "Profitability Engine", icon: TrendingUp, body: "₹/hr per client and forecasts" }
    ],
    ai: {
      label: "AI Features — Never Existed Anywhere Else",
      heading: "Six unique AI capabilities, built for real CA problems.",
      body: "Not available on any other practice management platform in India.",
      items: [
        { icon: Sparkles, title: "Client Health Score", body: "AI scores every client on payment history, document speed and compliance record. Know instantly who is truly valuable to your firm." },
        { icon: Zap, title: "Ripple Effect Alerts", body: "Miss GSTR-1? AI calculates the full chain reaction — which filings are affected and the total penalty impact in rupees." },
        { icon: Radio, title: "Voice to Task", body: 'Say "GST for Mehta by 20th, assign Ravi" on mobile. AI creates the task, assigns it and sets the deadline — hands-free.' },
        { icon: MessageSquare, title: "WhatsApp Doc Bot", body: "Client sends a document on WhatsApp. AI automatically saves it to their folder. Zero human effort required." },
        { icon: LineChart, title: "Profitability Dashboard", body: "Revenue ÷ hours = ₹/hr per client. See exactly which clients make you money and which ones cost you." },
        { icon: Bot, title: "AI Notice Reader", body: "Auto-fetches GST, IT and TDS notices daily. Summarizes each notice and suggests the best reply action." }
      ]
    },
    howItWorks: [
      { title: "Sign up and set up your firm", body: "Create your firm profile, add team members and set departments in minutes." },
      { title: "Import your clients", body: "Add PAN, GST, TAN details. The AI onboarding wizard does the heavy lifting." },
      { title: "Compliance auto-populates", body: "All filing tasks are created automatically for every client based on their profile." },
      { title: "Team gets to work", body: "Assign, track and remind — all from one unified dashboard." },
      { title: "Bill, collect and grow", body: "Auto-generate invoices, follow up on payments and get AI profitability insights." }
    ],
    pricing: {
      note: "Simple, transparent pricing. No hidden charges. Cancel anytime. Annual billing gets you 2 months free.",
      tiers: [
        { name: "Starter", price: "₹499", period: "/month + GST", desc: "For solo CAs just starting out", features: ["Up to 30 clients", "Task management", "Compliance calendar", "Invoice and billing", "Email support · 5 GB storage"] },
        { name: "Professional", price: "₹1,999", period: "/month + GST", desc: "Best for growing CA practices", popular: true, features: ["Up to 150 clients", "Everything in Starter", "All AI features", "WhatsApp automation", "Team management", "Priority support"] },
        { name: "Business", price: "₹4,999", period: "/month + GST", desc: "For large CA and audit firms", features: ["Unlimited clients", "Everything in Professional", "Multi-branch support", "White label portal", "Tally integration", "Dedicated manager"] }
      ],
      enterprise: "Custom pricing available for large firms and multi-branch networks."
    },
    compare: {
      heading: "Why Audytee Wins",
      body: "Comparison against Turia, one of India's most popular CA software platforms.",
      cols: ["Audytee", "Turia"],
      rows: [
        { label: "Client management", vals: ["yes", "yes"] },
        { label: "Task tracking and recurring tasks", vals: ["yes", "yes"] },
        { label: "Compliance calendar (GST, ITR, TDS, ROC)", vals: ["yes", "yes"] },
        { label: "Invoice and billing", vals: ["yes", "yes"] },
        { label: "WhatsApp automation", vals: ["yes", "yes"] },
        { label: "Team management and workload balancer", vals: ["yes", "yes"] },
        { label: "Notice auto-fetch (GST, IT, TDS)", vals: ["yes", "partial"] },
        { label: "AI client health score", vals: ["yes", "no"] },
        { label: "AI ripple effect deadline alerts", vals: ["yes", "no"] },
        { label: "Voice to task (AI)", vals: ["yes", "no"] },
        { label: "AI profitability per client", vals: ["yes", "no"] },
        { label: "Articleship management module", vals: ["yes", "no"] },
        { label: "White label client portal", vals: ["yes", "no"] },
        { label: "Tally two-way sync", vals: ["yes", "no"] },
        { label: "Multi-branch enterprise support", vals: ["yes", "partial"] },
        { label: "Mobile app (iOS and Android)", vals: ["yes", "yes"] }
      ]
    },
    market: [
      { value: "90,000+", label: "Registered CA firms in India" },
      { value: "5,00,000+", label: "Practicing Chartered Accountants" },
      { value: "₹2,400 Cr", label: "Estimated addressable market" },
      { value: "0", label: "Modern AI-powered CA platforms before Audytee" }
    ],
    traction: {
      points: [
        "20 modules built and fully live",
        "4 beta CA firms onboarded in Ahmedabad",
        "AI document analyzer and voice task features active",
        "GST and IT notice auto-fetch working in production"
      ],
      roadmap: [
        { period: "Q3 2026", body: "100 firms — Ahmedabad launch with CA association partnerships" },
        { period: "Q4 2026", body: "500 firms — Pan-India launch with referral program" },
        { period: "Q1 2027", body: "2,000 firms — Mobile app v2, Tally sync, articleship module" },
        { period: "Q2 2027", body: "5,000 firms — Enterprise tier, white-label, Series A" }
      ]
    }
  },
  {
    slug: "4bitx",
    name: "4bitx",
    seoTitle: "4bitx — Custom ERP Software for Manufacturing | Codelix IT Solutions",
    seoDescription: "Custom ERP software for manufacturing companies — production, inventory, compliance and billing in one system. Built in Ahmedabad by Codelix IT Solutions.",
    logo: fourBitxLogo,
    badge: "Custom ERP for Every Industry",
    tagline: "Your Factory. Fully Connected. Fully Intelligent.",
    status: "Live",
    website: "https://4bitx.com",
    email: "hr@codelixitsolutions.com",
    accent: "#e6a23c",
    headline: "Not just accounting software. A complete Manufacturing Operating System.",
    sub: "Built for Indian SMEs. From the factory floor to your finance team — everything in one platform.",
    stats: [
      { value: "10+", label: "Modules" },
      { value: "₹5Cr–₹100Cr", label: "Target SME size" },
      { value: "4+", label: "Live clients" }
    ],
    problem: {
      label: "Why 4bitx Exists",
      heading: "Most Indian manufacturers are running blind.",
      body: "You're managing a crore-rupee business with tools that don't talk to each other — data silos, delays, wrong decisions, missed deliveries.",
      points: [
        { icon: Calculator, title: "Tally for accounts", body: "Your finance is isolated. No connection to production, inventory, or vendors." },
        { icon: MessageCircle, title: "WhatsApp for everything", body: "Vendor updates, customer queries, dispatch confirmations — all lost in chat threads." },
        { icon: FileText, title: "Excel for production", body: "Manual data entry, outdated reports, zero real-time visibility on the factory floor." },
        { icon: ClipboardList, title: "Paper registers for attendance", body: "No digital records. No shift tracking. No productivity data." }
      ]
    },
    positioning: {
      not: ["Just accounting software", "A cheap Tally alternative", "A generic Indian ERP", "Only for big enterprises"],
      is: ["A complete Manufacturing OS", "A Smart Factory ERP", "Built for Manufacturing SMEs", "Designed for ₹5Cr–₹100Cr businesses"]
    },
    industries: ["Manufacturing", "Construction", "Ceramic", "CNC & Engineering", "Brass & Metal", "Textile", "Packaging", "Fabrication"],
    modules: [
      { n: "01", title: "Accounting & Finance", icon: Calculator, body: "Complete financial control — like Tally, but smarter. Ledger, sales/purchase, receipts, credit/debit notes, bank reconciliation, cost centers, P&L, balance sheet, trial balance." },
      { n: "02", title: "GST & Compliance", icon: Receipt, body: "Automated GST — zero manual filing headaches. GSTIN auto-fetch, e-invoice (IRN+QR), e-way bill, ITC tracking, GST return tracking via GSP APIs." },
      { n: "03", title: "Inventory Management", icon: Package, body: "Know exactly what's where — across every godown. Multi-godown, barcode/QR tracking, batch tracking, stock alerts, real-time valuation." },
      { n: "04", title: "Manufacturing & Production", icon: Cog, body: "Full factory control — from planning to delivery. BOM, production planning, WIP tracking, quality control, rejection and scrap management." },
      { n: "05", title: "CNC Monitoring", icon: ScanLine, body: "Mobile photo → AI reads CNC screen → ERP updated. Automatically. Machine-wise, employee-wise, shift-wise production and downtime, tracked in real time.", unique: true },
      { n: "06", title: "Vendor Collaboration Portal", icon: Handshake, body: "Give vendors their own login. No more WhatsApp chaos. View material requirements, accept POs, upload invoices, track payment status." },
      { n: "07", title: "Customer Self-Service Portal", icon: UsersRound, body: "Let customers track their own orders. Reduce calls by 80%. Place orders, track dispatch, download invoices, view ledger." },
      { n: "08", title: "Document Management System", icon: FolderCog, body: "One place for every document your business has ever created. GST certificates, invoices, engineering drawings, QC reports, e-way bills." },
      { n: "09", title: "HR & Payroll", icon: HardHat, body: "From attendance to salary — fully digital. Attendance tracking, shift management, payroll processing, productivity tracking." },
      { n: "10", title: "Analytics & AI Intelligence", icon: Brain, body: "Ask your ERP why profit dropped. It will tell you. Real-time dashboard, profitability analytics, demand forecasting, AI business assistant." }
    ],
    ai: {
      label: "AI-Powered Intelligence",
      heading: "4bitx doesn't just store data. It thinks.",
      body: "",
      items: [
        { icon: Sparkles, title: "Demand Forecasting", body: "4bitx studies your historical sales patterns and predicts demand spikes before they happen — e.g. alerting you in March if hinge sales double every April." },
        { icon: ShieldAlert, title: "Delay Prediction", body: "Before your delivery date fails, 4bitx warns you — detecting machine overloads, raw material shortages, and downtime early." },
        { icon: TrendingUp, title: "Purchase Rate Intelligence", body: "4bitx compares current purchase prices with historical averages and alerts you when a vendor is overcharging, before you approve the PO." },
        { icon: Bot, title: "AI Business Assistant", body: 'Just ask: "Why did my profit drop this month?" 4bitx explains — higher raw material costs, more rejections, more downtime — in plain language.' }
      ]
    },
    howItWorks: [
      { title: "Discovery Call", body: "We understand your business, industry, and requirements. No sales pressure." },
      { title: "Custom Proposal", body: "We send you a tailored module selection, pricing, and timeline — specific to your factory." },
      { title: "ERP Setup & Configuration", body: "Our team configures 4bitx for your workflows, products, and team structure." },
      { title: "Data Migration", body: "We help migrate your existing data from Tally, Excel, or other systems." },
      { title: "Training", body: "Hands-on training for your team — owners, accountants, floor staff, and managers." },
      { title: "Go Live + Support", body: "We go live with you. Ongoing support, monitoring, and GST updates via AMC." }
    ],
    pricing: {
      note: "ERP should be an investment, not just an expense. Final pricing depends on modules selected, users, customization, and industry requirements.",
      components: [
        { name: "One-Time ERP Setup", range: "₹2.5 Lakh – ₹25 Lakh+", body: "Custom setup, module configuration, data migration, training" },
        { name: "Annual AMC", range: "15% – 20% of setup cost", body: "Support, GST updates, bug fixes, monitoring" },
        { name: "GST API Integration", range: "Billed separately", body: "E-Invoice & E-Way Bill API costs (GSP partner)" },
        { name: "Cloud Hosting", range: "Billed separately", body: "Server & infrastructure costs" },
        { name: "Major Customizations", range: "Billed separately", body: "Custom modules or third-party integrations" }
      ],
      enterprise: "Contact us for a custom quote tailored to your business."
    },
    traction: {
      points: [
        "Live with 4+ paying clients",
        "Deployed in Jamnagar Brass Cluster",
        "Built by Codelix IT Solutions — Ahmedabad",
        "100% Made in India",
        "Cloud-based — accessible from anywhere",
        "Mobile-ready for factory floor staff"
      ]
    },
    faq: [
      { q: "Is 4bitx a replacement for Tally?", a: "Not exactly. 4bitx is a full Manufacturing ERP that includes accounting — so you may not need Tally separately. However, if you prefer to keep Tally, 4bitx can integrate with it via XML API." },
      { q: "Do I need to buy all 10 modules?", a: "No. 4bitx is modular. You choose only the modules your business needs. You can always add more later." },
      { q: "Is 4bitx only for brass industries?", a: "No. 4bitx is built for all manufacturing, construction, and industrial SMEs. It currently serves brass, ceramic, CNC, and general manufacturing businesses." },
      { q: "Is my data secure in the cloud?", a: "Yes. 4bitx is hosted on secure cloud infrastructure with regular backups, data encryption, and role-based access control." },
      { q: "What happens after I purchase — is there ongoing support?", a: "Yes. All clients receive Annual AMC (15–20% of setup cost) which covers support, GST regulation updates, bug fixes, and system monitoring." },
      { q: "How long does implementation take?", a: "Typically 4–12 weeks depending on business complexity, number of modules, and data migration requirements." },
      { q: "Can my vendors and customers access 4bitx?", a: "Yes. 4bitx includes a dedicated Vendor Portal and Customer Portal — both with separate secure logins." }
    ]
  },
  {
    slug: "aanganone",
    name: "AanganOne",
    logo: aanganOneLogo,
    badge: "Society, Apartment & Community Management",
    tagline: "Smart Living for Modern Societies",
    status: "Live on Google Play · submitted to Apple App Store",
    website: "https://aanganone.com",
    email: "hr@codelixitsolutions.com",
    accent: "#4ecb9c",
    headline: "From visitor entry to maintenance billing — one app.",
    sub: "AanganOne replaces manual, paper-based society processes with a single, powerful mobile application for residents, admins, committee members, and security guards.",
    stats: [
      { value: "4", label: "User roles" },
      { value: "12", label: "Core features" },
      { value: "2", label: "Platforms — iOS & Android" }
    ],
    problem: {
      label: "Problem It Solves",
      heading: "Managing a residential society manually is chaotic.",
      body: "AanganOne brings all of this into one organized, digital platform.",
      points: [
        { icon: BookUser, title: "Untracked visitor entries", body: "Logged in physical registers, or not logged at all." },
        { icon: Wallet, title: "Informal billing", body: "Maintenance bills collected via WhatsApp or cash, with no clean record." },
        { icon: MessagesSquare, title: "Unresolved complaints", body: "Complaints go unresolved because there's no system tracking them." },
        { icon: Megaphone, title: "Missed notices", body: "Residents don't receive timely notices or emergency alerts." }
      ]
    },
    users: [
      { role: "Residents", body: "Raise complaints, approve visitors, pay maintenance, view notices" },
      { role: "Society Admins", body: "Manage billing, staff, notices, and overall society operations" },
      { role: "Committee Members", body: "Oversee decisions, approvals, and community announcements" },
      { role: "Security Guards", body: "Verify and log visitor entries via QR code" }
    ],
    features: [
      { group: "Security & Access", items: [
        { icon: QrCode, title: "Visitor Management", body: "Log, track, and approve visitor entries digitally" },
        { icon: QrCode, title: "QR Visitor Entry", body: "Contactless gate entry using QR codes" },
        { icon: ShieldCheck, title: "Gate Security", body: "Real-time guard dashboard for entry management" },
        { icon: ShieldAlert, title: "Emergency Alerts", body: "Instantly notify all residents during emergencies" }
      ] },
      { group: "Billing & Payments", items: [
        { icon: Receipt, title: "Maintenance Billing", body: "Auto-generate monthly maintenance invoices" },
        { icon: CreditCard, title: "Online Payments", body: "Residents pay directly through the app (UPI / Card / Net Banking)" }
      ] },
      { group: "Communication", items: [
        { icon: Megaphone, title: "Society Notices", body: "Official notices from admin to all residents" },
        { icon: Radio, title: "Announcements", body: "Broadcast important updates instantly" },
        { icon: MessagesSquare, title: "Community Updates", body: "General community-level posts and information" }
      ] },
      { group: "Management Tools", items: [
        { icon: Wrench, title: "Complaint Management", body: "Raise, track, and resolve complaints with status updates" },
        { icon: HardHat, title: "Staff Management", body: "Manage society staff — housekeeping, security, maintenance" },
        { icon: ParkingSquare, title: "Parking Management", body: "Assign and track parking slots for residents and guests" },
        { icon: BookUser, title: "Resident Directory", body: "Complete digital directory of all society residents" }
      ] }
    ],
    positioning: {
      body: "Positioned as a premium, modern alternative to traditional society management — comparable to MyGate, but built with a cleaner UI, faster workflows, and tailored to the Indian residential society ecosystem.",
      inspiration: "MyGate, NoBrokerHood"
    },
    differentiators: [
      "All-in-one: security + billing + communication in a single app",
      "QR-based visitor entry — no manual register needed",
      "Real-time emergency alerts",
      "Clean, modern UI — easy for guards, admins, and residents alike",
      "Built and maintained in India, for Indian societies"
    ],
    traction: {
      points: [
        "Live on Google Play Store",
        "Submitted to Apple App Store",
        "Active users and society onboarding in progress"
      ]
    }
  }
];
const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
const SERVICES_ICON = LayoutGrid;
const NAV_LINKS = [
  { label: "Work", href: "/work", icon: Briefcase },
  { label: "About", href: "/about", icon: Info },
  { label: "Team", href: "/team", icon: Users },
  { label: "Process", href: "/process", icon: Workflow },
  { label: "Pricing", href: "/pricing", icon: Tag },
  { label: "Technologies", href: "/technologies", icon: Cpu },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Careers", href: "/careers", icon: Rocket },
  { label: "Contact", href: "/contact", icon: Mail }
];
function V2MobileDrawer({ open, onClose }) {
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [industriesOpen, setIndustriesOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `v2-drawer-backdrop ${open ? "open" : ""}`, onClick: onClose, "aria-hidden": "true", "data-lenis-prevent": "true" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `v2-drawer ${open ? "open" : ""}`,
        "aria-hidden": !open,
        inert: !open,
        "data-lenis-prevent": "true",
        children: [
          /* @__PURE__ */ jsxs("button", { type: "button", className: "v2-drawer-close", "aria-label": "Close menu", onClick: onClose, children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "v2-drawer-scroll-area", children: [
            /* @__PURE__ */ jsxs("div", { className: "v2-drawer-links", children: [
              /* @__PURE__ */ jsxs("div", { className: "v2-drawer-accordion mobile-only-drawer-link", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: `v2-drawer-link-btn ${servicesOpen ? "open" : ""}`,
                    onClick: () => setServicesOpen(!servicesOpen),
                    "aria-expanded": servicesOpen,
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "v2-drawer-link-label", children: [
                        /* @__PURE__ */ jsx("span", { className: "v2-drawer-link-icon", children: /* @__PURE__ */ jsx(SERVICES_ICON, { size: 17, strokeWidth: 1.75 }) }),
                        "Services"
                      ] }),
                      /* @__PURE__ */ jsx(ChevronDown, { className: `v2-drawer-chevron ${servicesOpen ? "open" : ""}`, size: 20, strokeWidth: 2 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: `v2-drawer-sublinks ${servicesOpen ? "open" : ""}`, children: [
                  /* @__PURE__ */ jsx(Link, { to: "/services", onClick: onClose, className: "v2-drawer-sublink-all", children: "Overview (All Services)" }),
                  NAVBAR_SERVICES_HIERARCHY.map((category) => /* @__PURE__ */ jsxs("div", { className: "v2-drawer-sublink-category", children: [
                    /* @__PURE__ */ jsx(Link, { to: category.path, onClick: onClose, className: "v2-drawer-sublink-title", children: category.title }),
                    category.items.map((item) => /* @__PURE__ */ jsx(Link, { to: item.path, onClick: onClose, className: "v2-drawer-sublink-item", children: item.label }, item.label))
                  ] }, category.title))
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "v2-drawer-accordion mobile-only-drawer-link", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: `v2-drawer-link-btn ${industriesOpen ? "open" : ""}`,
                    onClick: () => setIndustriesOpen(!industriesOpen),
                    "aria-expanded": industriesOpen,
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "v2-drawer-link-label", children: [
                        /* @__PURE__ */ jsx("span", { className: "v2-drawer-link-icon", children: /* @__PURE__ */ jsx(Building2, { size: 17, strokeWidth: 1.75 }) }),
                        "Industries"
                      ] }),
                      /* @__PURE__ */ jsx(ChevronDown, { className: `v2-drawer-chevron ${industriesOpen ? "open" : ""}`, size: 20, strokeWidth: 2 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: `v2-drawer-sublinks ${industriesOpen ? "open" : ""}`, children: [
                  /* @__PURE__ */ jsx(Link, { to: "/industries", onClick: onClose, className: "v2-drawer-sublink-all", children: "Overview (All Industries)" }),
                  /* @__PURE__ */ jsx("div", { className: "v2-drawer-sublink-category", children: FOOTER_INDUSTRY_KEYWORDS.map((industry) => /* @__PURE__ */ jsx(Link, { to: industry.path, onClick: onClose, className: "v2-drawer-sublink-item", style: { paddingLeft: "16px" }, children: industry.label }, industry.label)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "v2-drawer-accordion mobile-only-drawer-link", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: `v2-drawer-link-btn ${productsOpen ? "open" : ""}`,
                    onClick: () => setProductsOpen(!productsOpen),
                    "aria-expanded": productsOpen,
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "v2-drawer-link-label", children: [
                        /* @__PURE__ */ jsx("span", { className: "v2-drawer-link-icon", children: /* @__PURE__ */ jsx(Boxes, { size: 17, strokeWidth: 1.75 }) }),
                        "Products"
                      ] }),
                      /* @__PURE__ */ jsx(ChevronDown, { className: `v2-drawer-chevron ${productsOpen ? "open" : ""}`, size: 20, strokeWidth: 2 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: `v2-drawer-sublinks ${productsOpen ? "open" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "v2-drawer-sublink-category", children: PRODUCTS.map((p) => /* @__PURE__ */ jsx(Link, { to: `/products/${p.slug}`, onClick: onClose, className: "v2-drawer-sublink-item", children: p.name }, p.slug)) }) })
              ] }),
              NAV_LINKS.map((l) => /* @__PURE__ */ jsxs(
                Link,
                {
                  to: l.href,
                  onClick: onClose,
                  className: l.label === "Work" || l.label === "About" ? "mobile-only-drawer-link" : "",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "v2-drawer-link-icon", children: /* @__PURE__ */ jsx(l.icon, { size: 17, strokeWidth: 1.75 }) }),
                    l.label
                  ]
                },
                l.label
              ))
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "v2-drawer-cta", children: [
              /* @__PURE__ */ jsxs(Link, { className: "v2-btn v2-btn--filled", to: "/contact", onClick: onClose, children: [
                /* @__PURE__ */ jsx("span", { children: "Book a consultation" }),
                /* @__PURE__ */ jsx("i", { className: "v2-btn-arrow", children: "→" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "v2-drawer-cta-socials", children: [
                /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/company/codelixit-solutions", target: "_blank", rel: "noopener noreferrer", children: "LinkedIn" }),
                /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/codelixitsolutions/", target: "_blank", rel: "noopener noreferrer", children: "Instagram" })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
const getCategoryIcon = (title) => {
  switch (title) {
    case "Web Development":
      return /* @__PURE__ */ jsx(Globe, { size: 18, strokeWidth: 1.75 });
    case "Application Development":
      return /* @__PURE__ */ jsx(Smartphone, { size: 18, strokeWidth: 1.75 });
    case "UI/UX & Product Design":
      return /* @__PURE__ */ jsx(Palette, { size: 18, strokeWidth: 1.75 });
    case "E-Commerce Solutions":
      return /* @__PURE__ */ jsx(ShoppingCart, { size: 18, strokeWidth: 1.75 });
    case "Enterprise Software Solutions":
      return /* @__PURE__ */ jsx(Database, { size: 18, strokeWidth: 1.75 });
    case "AI & Automation Solutions":
      return /* @__PURE__ */ jsx(Bot, { size: 18, strokeWidth: 1.75 });
    case "Data Analytics & Business Intelligence":
      return /* @__PURE__ */ jsx(LineChart, { size: 18, strokeWidth: 1.75 });
    case "Support & Managed Services":
      return /* @__PURE__ */ jsx(Cloud, { size: 18, strokeWidth: 1.75 });
    default:
      return /* @__PURE__ */ jsx(Globe, { size: 18, strokeWidth: 1.75 });
  }
};
const getIndustryIcon = (label) => {
  switch (label) {
    case "Manufacturing":
      return /* @__PURE__ */ jsx(Factory, { size: 18, strokeWidth: 1.75 });
    case "FinTech":
      return /* @__PURE__ */ jsx(Landmark, { size: 18, strokeWidth: 1.75 });
    case "AI & Data":
      return /* @__PURE__ */ jsx(Cpu, { size: 18, strokeWidth: 1.75 });
    case "Healthcare":
      return /* @__PURE__ */ jsx(Activity, { size: 18, strokeWidth: 1.75 });
    case "Food & Beverages":
      return /* @__PURE__ */ jsx(Coffee, { size: 18, strokeWidth: 1.75 });
    case "E-Commerce":
      return /* @__PURE__ */ jsx(ShoppingCart, { size: 18, strokeWidth: 1.75 });
    case "Real Estate & Construction":
      return /* @__PURE__ */ jsx(Building2, { size: 18, strokeWidth: 1.75 });
    case "Education":
      return /* @__PURE__ */ jsx(GraduationCap, { size: 18, strokeWidth: 1.75 });
    case "Startups":
      return /* @__PURE__ */ jsx(Rocket, { size: 18, strokeWidth: 1.75 });
    case "B2B SaaS":
      return /* @__PURE__ */ jsx(Cloud, { size: 18, strokeWidth: 1.75 });
    case "Travel & Hospitality":
      return /* @__PURE__ */ jsx(Plane, { size: 18, strokeWidth: 1.75 });
    default:
      return /* @__PURE__ */ jsx(Globe, { size: 18, strokeWidth: 1.75 });
  }
};
const getCategoryDescription = (title) => {
  switch (title) {
    case "Web Development":
      return "High-performance websites and web applications.";
    case "Application Development":
      return "Scalable SaaS products and mobile experiences.";
    case "UI/UX & Product Design":
      return "Research-driven design systems and interfaces.";
    case "E-Commerce Solutions":
      return "Marketplaces, payments, and digital storefronts.";
    case "Enterprise Software Solutions":
      return "ERP, CRM, APIs, and legacy modernizations.";
    case "AI & Automation Solutions":
      return "Generative AI, smart agents, and workflow automation.";
    case "Data Analytics & Business Intelligence":
      return "Predictive models, BI, and data engineering.";
    case "Support & Managed Services":
      return "Cloud migrations, infrastructure, and dedicated teams.";
    default:
      return "";
  }
};
function NavbarV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();
  const lockedRef = useRef(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 40);
      setNavHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    let scrollY = 0;
    if (mobileOpen) {
      if (lenis) lenis.stop();
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY;
      lockedRef.current = true;
    } else {
      if (lenis) lenis.start();
      const stored = document.body.dataset.scrollY;
      delete document.body.dataset.scrollY;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lockedRef.current) {
        lockedRef.current = false;
        if (stored) window.scrollTo(0, parseInt(stored));
      } else if (stored) {
        void document.body.offsetHeight;
        const toTop = () => {
          window.scrollTo(0, 0);
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        };
        toTop();
        requestAnimationFrame(toTop);
      }
    }
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("nav", { className: `v2-nav ${navScrolled ? "scrolled" : ""} ${navHidden ? "nav-hidden" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "v2-nav-inner", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "v2-nav-logo", "aria-label": "Codelix — home", children: /* @__PURE__ */ jsx("img", { src: codelixLogo, alt: "Codelix" }) }),
      /* @__PURE__ */ jsxs("div", { className: "v2-nav-links", children: [
        /* @__PURE__ */ jsxs("div", { className: "v2-nav-dropdown", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/services", children: [
            "Services ",
            /* @__PURE__ */ jsx("span", { className: "v2-nav-dropdown-chevron", children: "▾" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "v2-nav-dropdown-panel", "data-lenis-prevent": true, children: [
            /* @__PURE__ */ jsxs("div", { className: "v2-nav-dropdown-head", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "v2-nav-dropdown-head-label", children: "Our Services" }),
                /* @__PURE__ */ jsx("p", { className: "v2-nav-dropdown-head-lede", children: "Everything we build, in one place." })
              ] }),
              /* @__PURE__ */ jsx(Link, { to: "/services", className: "v2-nav-dropdown-head-all", children: "View all services →" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "v2-nav-mega-menu", children: NAVBAR_SERVICES_HIERARCHY.map((category) => /* @__PURE__ */ jsxs("div", { className: "v2-nav-mega-category", children: [
              /* @__PURE__ */ jsxs(Link, { to: category.path, className: "v2-nav-mega-title-wrapper", children: [
                /* @__PURE__ */ jsx("div", { className: "v2-nav-mega-icon-box", children: getCategoryIcon(category.title) }),
                /* @__PURE__ */ jsxs("div", { className: "v2-nav-mega-title-content", children: [
                  /* @__PURE__ */ jsxs("span", { className: "v2-nav-mega-title", children: [
                    category.title,
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "v2-nav-mega-arrow", children: "→" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "v2-nav-mega-desc", children: getCategoryDescription(category.title) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "v2-nav-mega-links", children: category.items.map((item) => /* @__PURE__ */ jsxs(Link, { to: item.path, className: "v2-nav-mega-link", children: [
                /* @__PURE__ */ jsxs("span", { className: "v2-nav-mega-link-left", children: [
                  /* @__PURE__ */ jsx("span", { className: "v2-nav-mega-link-dot" }),
                  item.label
                ] }),
                /* @__PURE__ */ jsx("span", { className: "v2-nav-mega-link-arrow", children: /* @__PURE__ */ jsx(ChevronRight, { size: 14, strokeWidth: 2 }) })
              ] }, item.label)) })
            ] }, category.title)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/work", children: "Work" }),
        /* @__PURE__ */ jsxs("div", { className: "v2-nav-dropdown", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/industries", children: [
            "Industries ",
            /* @__PURE__ */ jsx("span", { className: "v2-nav-dropdown-chevron", children: "▾" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "v2-nav-dropdown-panel", "data-lenis-prevent": true, children: /* @__PURE__ */ jsxs("div", { className: "v2-nav-industry-mega-menu", children: [
            /* @__PURE__ */ jsxs("div", { className: "v2-nav-mega-menu-left", children: [
              /* @__PURE__ */ jsx("div", { className: "v2-nav-mega-menu-left-bg-icon", children: /* @__PURE__ */ jsx(Building2, { size: 160, strokeWidth: 0.5 }) }),
              /* @__PURE__ */ jsx("h3", { className: "v2-nav-mega-menu-left-title", children: "Industry Expertise" }),
              /* @__PURE__ */ jsx("p", { className: "v2-nav-mega-menu-left-desc", children: "We engineer powerful, scalable software solutions perfectly tailored to the unique challenges of your industry." }),
              /* @__PURE__ */ jsxs(Link, { to: "/industries", className: "v2-nav-mega-menu-left-btn", children: [
                "Explore All Industries ",
                /* @__PURE__ */ jsx(ChevronRight, { size: 14, strokeWidth: 2.5 })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "v2-nav-mega-menu-right", children: FOOTER_INDUSTRY_KEYWORDS.map((industry) => /* @__PURE__ */ jsxs(Link, { to: industry.path, className: "v2-nav-industry-link", children: [
              /* @__PURE__ */ jsxs("span", { className: "v2-nav-industry-link-left", children: [
                /* @__PURE__ */ jsx("span", { className: "v2-nav-industry-link-icon-wrap", children: getIndustryIcon(industry.label) }),
                /* @__PURE__ */ jsx("span", { className: "v2-nav-industry-link-text", children: industry.label })
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "v2-nav-industry-link-arrow", size: 16, strokeWidth: 2 })
            ] }, industry.label)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "v2-nav-dropdown", children: [
          /* @__PURE__ */ jsxs(Link, { to: `/products/${PRODUCTS[0].slug}`, children: [
            "Products ",
            /* @__PURE__ */ jsx("span", { className: "v2-nav-dropdown-chevron", children: "▾" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "v2-nav-dropdown-panel", "data-lenis-prevent": true, children: /* @__PURE__ */ jsxs("div", { className: "v2-nav-products-mega-menu", children: [
            /* @__PURE__ */ jsxs("div", { className: "v2-nav-mega-menu-left", children: [
              /* @__PURE__ */ jsx("div", { className: "v2-nav-mega-menu-left-bg-icon", children: /* @__PURE__ */ jsx(Boxes, { size: 160, strokeWidth: 0.5 }) }),
              /* @__PURE__ */ jsx("h3", { className: "v2-nav-mega-menu-left-title", children: "Our Products" }),
              /* @__PURE__ */ jsx("p", { className: "v2-nav-mega-menu-left-desc", children: "Beyond client work — SaaS products we design, build, and run ourselves." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "v2-nav-products-right", children: PRODUCTS.map((p) => /* @__PURE__ */ jsxs(Link, { to: `/products/${p.slug}`, className: "v2-nav-product-link", children: [
              /* @__PURE__ */ jsxs("span", { className: "v2-nav-product-link-top", children: [
                /* @__PURE__ */ jsx("span", { className: "v2-nav-product-link-logo", children: /* @__PURE__ */ jsx("img", { src: p.logo, alt: "" }) }),
                /* @__PURE__ */ jsx("span", { className: "v2-nav-product-link-name", style: { color: p.accent }, children: p.name }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "v2-nav-industry-link-arrow", size: 16, strokeWidth: 2 })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "v2-nav-product-link-badge", children: p.badge }),
              /* @__PURE__ */ jsx("span", { className: "v2-nav-product-link-tagline", children: p.tagline })
            ] }, p.slug)) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/about", children: "About" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "v2-nav-actions", children: [
        /* @__PURE__ */ jsx(Link, { className: "v2-btn v2-btn--filled v2-nav-cta", to: "/contact", children: "Book a consultation" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: `v2-burger ${mobileOpen ? "open" : ""}`,
            "aria-label": mobileOpen ? "Close menu" : "Open menu",
            "aria-expanded": mobileOpen,
            onClick: () => setMobileOpen((o) => !o),
            children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("span", {})
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(V2MobileDrawer, { open: mobileOpen, onClose: () => setMobileOpen(false) })
  ] });
}
function RatingsStrip() {
  return /* @__PURE__ */ jsx("div", { className: "v2-ratings-container", children: /* @__PURE__ */ jsxs("div", { className: "v2-ratings-inner", children: [
    /* @__PURE__ */ jsxs("div", { className: "v2-rating-block", children: [
      /* @__PURE__ */ jsx("div", { className: "v2-rating-score", children: "4.9" }),
      /* @__PURE__ */ jsxs("div", { className: "v2-rating-logo google-logo", children: [
        /* @__PURE__ */ jsx("span", { style: { color: "#4285F4" }, children: "G" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#EA4335" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#FBBC05" }, children: "o" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#4285F4" }, children: "g" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#34A853" }, children: "l" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#EA4335" }, children: "e" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "v2-rating-divider" }),
    /* @__PURE__ */ jsxs("div", { className: "v2-rating-block", children: [
      /* @__PURE__ */ jsx("div", { className: "v2-rating-score", children: "5.0" }),
      /* @__PURE__ */ jsxs("div", { className: "v2-rating-logo clutch-logo", children: [
        "Clut",
        /* @__PURE__ */ jsx("span", { className: "clutch-c", children: "c" }),
        "h"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "v2-rating-divider" }),
    /* @__PURE__ */ jsxs("div", { className: "v2-rating-block", children: [
      /* @__PURE__ */ jsx("div", { className: "v2-rating-score", children: "5.0" }),
      /* @__PURE__ */ jsxs("div", { className: "v2-rating-logo goodfirms-logo", children: [
        /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "gf-icon", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17.653 2.112H6.346c-2.33 0-4.233 1.89-4.233 4.204v11.368c0 2.314 1.903 4.204 4.233 4.204h11.307c2.33 0 4.233-1.89 4.233-4.204V6.316c0-2.314-1.903-4.204-4.233-4.204zm-8.875 14.53H6.602V7.126h5.811v2.102H8.784v1.892h3.298v1.96H8.784v3.562zm6.208-5.698h-2.181v1.96h2.181v1.96h-2.181v1.602h2.528v2.102h-4.709V7.126h4.709v2.102h-2.528v1.717h2.181v-1.96z", fill: "currentColor" }) }),
        "GoodFirms"
      ] })
    ] })
  ] }) });
}
function FooterV2() {
  return /* @__PURE__ */ jsxs("footer", { className: "v2-footer", children: [
    /* @__PURE__ */ jsxs("div", { className: "v2-footer-tagline", children: [
      /* @__PURE__ */ jsxs("h2", { className: "v2-footer-wordmark-small", children: [
        "WE LIVE",
        /* @__PURE__ */ jsx("br", {}),
        "IN ",
        /* @__PURE__ */ jsx("span", { className: "v2-footer-wordmark-accent", children: "IT" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "v2-footer-tagline-body", children: "We design and build web, mobile, and AI systems for businesses that intend to still be running them in five years." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "v2-footer-keywords-row", children: [
      /* @__PURE__ */ jsx("p", { className: "v2-footer-keywords-label", children: "Services" }),
      /* @__PURE__ */ jsx("div", { className: "v2-footer-keywords-list", children: FOOTER_ALL_SERVICES.map((k, i) => /* @__PURE__ */ jsx(Link, { to: k.path, className: "v2-footer-keyword", children: k.label }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "v2-footer-keywords-row", children: [
      /* @__PURE__ */ jsx("p", { className: "v2-footer-keywords-label", children: "Industries" }),
      /* @__PURE__ */ jsx("div", { className: "v2-footer-keywords-list", children: FOOTER_INDUSTRY_KEYWORDS.map((k, i) => /* @__PURE__ */ jsx(Link, { to: k.path, className: "v2-footer-keyword", children: k.label }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "v2-footer-keywords-row", children: [
      /* @__PURE__ */ jsx("p", { className: "v2-footer-keywords-label", children: "Products" }),
      /* @__PURE__ */ jsx("div", { className: "v2-footer-keywords-list", children: FOOTER_PRODUCTS.map((k, i) => /* @__PURE__ */ jsx(Link, { to: k.path, className: "v2-footer-keyword", children: k.label }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "v2-footer-cards v2-footer-cards--four", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          className: "v2-footer-card",
          href: "https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.009586,72.5203036,17z/data=!3m1!4b1!4m6!3m5!1s0x395e856f394696fd:0x69f60cf69bf7dd43!8m2!3d23.0095811!4d72.5228785!16s%2Fg%2F11z61zmnv5?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D",
          target: "_blank",
          rel: "noopener noreferrer",
          children: [
            /* @__PURE__ */ jsx("h3", { children: "India (HQ)" }),
            /* @__PURE__ */ jsx("p", { className: "v2-footer-card-addr", children: "A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-card", children: [
        /* @__PURE__ */ jsx("h3", { children: "Phone" }),
        /* @__PURE__ */ jsx("a", { className: "v2-footer-card-strong", href: "tel:+919998263282", children: "+91 99982 63282" }),
        /* @__PURE__ */ jsx("a", { className: "v2-footer-card-strong", href: "tel:+917490909686", children: "+91 74909 09686" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-card", children: [
        /* @__PURE__ */ jsx("h3", { children: "Looking For Jobs" }),
        /* @__PURE__ */ jsx(Link, { className: "v2-footer-card-strong", to: "/careers", children: "View openings →" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-card", children: [
        /* @__PURE__ */ jsx("h3", { children: "HR" }),
        /* @__PURE__ */ jsx("a", { className: "v2-footer-card-strong", href: "mailto:hr@codelixitsolutions.com", children: "hr@codelixitsolutions.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-card", children: [
        /* @__PURE__ */ jsx("h3", { children: "General" }),
        /* @__PURE__ */ jsx("a", { className: "v2-footer-card-strong", href: "mailto:info@codelixitsolutions.com", children: "info@codelixitsolutions.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-card", children: [
        /* @__PURE__ */ jsx("h3", { children: "For Sales" }),
        /* @__PURE__ */ jsx("a", { className: "v2-footer-card-strong", href: "mailto:sales@codelixitsolutions.com", children: "sales@codelixitsolutions.com" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "v2-footer-social", children: [
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-social-links", children: [
        /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/company/codelixit-solutions", target: "_blank", rel: "noopener noreferrer", children: "LinkedIn" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/codelixitsolutions/", target: "_blank", rel: "noopener noreferrer", children: "Instagram" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/profile.php?id=61561748130641", target: "_blank", rel: "noopener noreferrer", children: "Facebook" }),
        /* @__PURE__ */ jsx("a", { href: "https://www.behance.net/kushalmungalp", target: "_blank", rel: "noopener noreferrer", children: "Behance" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-actions", children: [
        /* @__PURE__ */ jsx("div", { className: "v2-desktop-only", children: /* @__PURE__ */ jsx(RatingsStrip, {}) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "v2-footer-top",
            "aria-label": "Back to top",
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            children: "↑"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "v2-footer-social v2-mobile-only", style: { borderTop: "none", paddingTop: "20px", paddingBottom: "20px", justifyContent: "center", flexWrap: "wrap", gap: "10px", width: "100%" }, children: /* @__PURE__ */ jsx(RatingsStrip, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "v2-footer-bottom", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "v2-footer-bottom-brand", "aria-label": "Codelix — home", children: /* @__PURE__ */ jsx("img", { src: codelixLogo, alt: "Codelix" }) }),
      /* @__PURE__ */ jsx("span", { className: "v2-footer-bottom-copy", children: "© 2026 Codelix IT Solutions — All Copyright Reserved" }),
      /* @__PURE__ */ jsxs("div", { className: "v2-footer-legal", children: [
        /* @__PURE__ */ jsx(Link, { to: "/sitemap", children: "Sitemap" }),
        /* @__PURE__ */ jsx(Link, { to: "/refund-policy", children: "Refund Policy" }),
        /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", children: "Privacy" }),
        /* @__PURE__ */ jsx(Link, { to: "/terms-of-service", children: "Terms" })
      ] })
    ] })
  ] });
}
function TestimonialSpotlight({ testimonials, label = "Client Voices", heading, stats = [] }) {
  const [activeQuote, setActiveQuote] = useState(0);
  const [quotePaused, setQuotePaused] = useState(false);
  useEffect(() => {
    if (quotePaused || testimonials.length < 2) return;
    const t = setTimeout(() => {
      setActiveQuote((i) => (i + 1) % testimonials.length);
    }, 6e3);
    return () => clearTimeout(t);
  }, [activeQuote, quotePaused, testimonials.length]);
  if (!testimonials.length) return null;
  return /* @__PURE__ */ jsxs("section", { className: "v2-section v2-section--gallery", id: "testimonials", children: [
    /* @__PURE__ */ jsxs("div", { className: "v2-quote-head", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "v2-label", children: label }),
        /* @__PURE__ */ jsx("h2", { className: "v2-heading", children: heading })
      ] }),
      stats.length > 0 && /* @__PURE__ */ jsx("div", { className: "v2-quote-stats", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "v2-quote-stat", children: [
        /* @__PURE__ */ jsx("span", { className: "v2-quote-stat-num", children: s.num }),
        /* @__PURE__ */ jsx("span", { className: "v2-quote-stat-label", children: s.label })
      ] }, s.label)) })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "v2-quote-spotlight",
        onMouseEnter: () => setQuotePaused(true),
        onMouseLeave: () => setQuotePaused(false),
        children: [
          /* @__PURE__ */ jsx("span", { className: "v2-quote-spotlight-mark", "aria-hidden": "true", children: "“" }),
          /* @__PURE__ */ jsx("div", { className: "v2-quote-spotlight-stage", children: testimonials.map((t, i) => /* @__PURE__ */ jsxs(
            "blockquote",
            {
              className: `v2-quote-spotlight-item ${activeQuote === i ? "is-active" : ""}`,
              children: [
                /* @__PURE__ */ jsx("p", { children: t.quote }),
                /* @__PURE__ */ jsxs("footer", { children: [
                  /* @__PURE__ */ jsx("span", { className: "v2-quote-spotlight-name", children: t.name }),
                  /* @__PURE__ */ jsx("span", { className: "v2-quote-spotlight-role", children: t.position })
                ] })
              ]
            },
            `${t.name}-${i}`
          )) }),
          testimonials.length > 1 && /* @__PURE__ */ jsx("div", { className: "v2-quote-dots", children: testimonials.map((_, i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: `v2-quote-dot ${activeQuote === i ? "is-active" : ""}`,
              onClick: () => setActiveQuote(i),
              "aria-label": `Go to review ${i + 1}`
            },
            i
          )) })
        ]
      }
    ),
    testimonials.length > 1 && /* @__PURE__ */ jsx("div", { className: "v2-quote-marquee", children: /* @__PURE__ */ jsx("div", { className: "v2-quote-marquee-track", children: [...testimonials, ...testimonials].map((t, i) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: `v2-quote-marquee-item ${activeQuote === i % testimonials.length ? "is-active" : ""}`,
        onClick: () => setActiveQuote(i % testimonials.length),
        children: [
          /* @__PURE__ */ jsx("span", { className: "v2-quote-marquee-dot", "aria-hidden": "true" }),
          t.name,
          /* @__PURE__ */ jsxs("span", { className: "v2-quote-marquee-role", children: [
            "— ",
            t.position
          ] })
        ]
      },
      i
    )) }) })
  ] });
}
function CtaVisual() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "v2-cta-visual-svg",
      viewBox: "0 0 360 360",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("linearGradient", { id: "ctaOrbitA", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(124,155,255,0)" }),
            /* @__PURE__ */ jsx("stop", { offset: "45%", stopColor: "rgba(124,155,255,.9)" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(160,120,240,.15)" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: "ctaOrbitB", x1: "100%", y1: "0%", x2: "0%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(160,120,240,0)" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "rgba(160,120,240,.85)" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(124,155,255,.1)" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: "ctaOrbitC", x1: "0%", y1: "100%", x2: "100%", y2: "0%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(126,224,168,0)" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "rgba(126,224,168,.75)" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(124,155,255,.1)" })
          ] }),
          /* @__PURE__ */ jsxs("radialGradient", { id: "ctaCoreGlow", cx: "50%", cy: "50%", r: "50%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(255,255,255,.95)" }),
            /* @__PURE__ */ jsx("stop", { offset: "35%", stopColor: "rgba(124,155,255,.7)" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(124,155,255,0)" })
          ] }),
          /* @__PURE__ */ jsxs("radialGradient", { id: "ctaAmbientGlow", cx: "50%", cy: "50%", r: "50%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(124,155,255,.22)" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "rgba(124,155,255,0)" })
          ] }),
          /* @__PURE__ */ jsx("filter", { id: "ctaSoftBlur", x: "-100%", y: "-100%", width: "300%", height: "300%", children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "6" }) })
        ] }),
        /* @__PURE__ */ jsx("circle", { cx: "180", cy: "180", r: "168", fill: "url(#ctaAmbientGlow)" }),
        /* @__PURE__ */ jsx("circle", { cx: "52", cy: "90", r: "1.6", fill: "rgba(255,255,255,.35)" }),
        /* @__PURE__ */ jsx("circle", { cx: "308", cy: "120", r: "1.4", fill: "rgba(255,255,255,.3)" }),
        /* @__PURE__ */ jsx("circle", { cx: "66", cy: "270", r: "1.4", fill: "rgba(255,255,255,.3)" }),
        /* @__PURE__ */ jsx("circle", { cx: "300", cy: "280", r: "1.8", fill: "rgba(255,255,255,.35)" }),
        /* @__PURE__ */ jsx("circle", { cx: "180", cy: "24", r: "1.4", fill: "rgba(255,255,255,.3)" }),
        /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "180",
            cy: "180",
            rx: "150",
            ry: "58",
            stroke: "url(#ctaOrbitA)",
            strokeWidth: "1.4",
            transform: "rotate(-24 180 180)"
          }
        ),
        /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "180",
            cy: "180",
            rx: "150",
            ry: "58",
            stroke: "url(#ctaOrbitB)",
            strokeWidth: "1.4",
            transform: "rotate(48 180 180)"
          }
        ),
        /* @__PURE__ */ jsx(
          "ellipse",
          {
            cx: "180",
            cy: "180",
            rx: "150",
            ry: "58",
            stroke: "url(#ctaOrbitC)",
            strokeWidth: "1.2",
            strokeDasharray: "2 7",
            transform: "rotate(96 180 180)"
          }
        ),
        /* @__PURE__ */ jsx("circle", { cx: "180", cy: "180", r: "26", fill: "url(#ctaCoreGlow)", filter: "url(#ctaSoftBlur)", opacity: ".8" }),
        /* @__PURE__ */ jsx("circle", { cx: "180", cy: "180", r: "9", fill: "#fff" }),
        /* @__PURE__ */ jsx("circle", { cx: "180", cy: "180", r: "9", fill: "url(#ctaCoreGlow)" }),
        /* @__PURE__ */ jsxs("g", { transform: "rotate(-24 180 180)", children: [
          /* @__PURE__ */ jsx("circle", { cx: "330", cy: "180", r: "10", fill: "rgba(124,155,255,.5)", filter: "url(#ctaSoftBlur)" }),
          /* @__PURE__ */ jsx("circle", { cx: "330", cy: "180", r: "5", fill: "#fff" })
        ] }),
        /* @__PURE__ */ jsxs("g", { transform: "rotate(48 180 180)", children: [
          /* @__PURE__ */ jsx("circle", { cx: "30", cy: "180", r: "9", fill: "rgba(160,120,240,.5)", filter: "url(#ctaSoftBlur)" }),
          /* @__PURE__ */ jsx("circle", { cx: "30", cy: "180", r: "4.5", fill: "rgba(230,220,255,.95)" })
        ] }),
        /* @__PURE__ */ jsxs("g", { transform: "rotate(96 180 180)", children: [
          /* @__PURE__ */ jsx("circle", { cx: "180", cy: "122", r: "7", fill: "rgba(126,224,168,.5)", filter: "url(#ctaSoftBlur)" }),
          /* @__PURE__ */ jsx("circle", { cx: "180", cy: "122", r: "3.5", fill: "rgba(210,255,230,.95)" })
        ] })
      ]
    }
  );
}
const EVENT = "codelix:intro-handoff";
const KEY = "codelix_intro_seen";
let decided = null;
function introWillPlay() {
  if (typeof window === "undefined") return false;
  if (decided === null) {
    try {
      decided = sessionStorage.getItem(KEY) !== "1";
      if (decided) sessionStorage.setItem(KEY, "1");
    } catch {
      decided = true;
    }
  }
  return decided;
}
function handOffIntro() {
  window.dispatchEvent(new Event(EVENT));
}
function onIntroHandoff(fn) {
  window.addEventListener(EVENT, fn, { once: true });
  return () => window.removeEventListener(EVENT, fn);
}
let hasPlayed = false;
const TAGLINE = "We live in IT";
function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const auraARef = useRef(null);
  const auraBRef = useRef(null);
  const barRef = useRef(null);
  const barWrapRef = useRef(null);
  const shineRef = useRef(null);
  const letterRefs = useRef([]);
  const lenis = useLenis();
  useEffect(() => {
    if (hasPlayed || !introWillPlay()) return;
    hasPlayed = true;
    setMounted(true);
  }, []);
  useLayoutEffect(() => {
    const willPlay = introWillPlay();
    if (!mounted && willPlay) return;
    const preboot = document.getElementById("pl-preboot");
    if (preboot && preboot.parentNode) preboot.parentNode.removeChild(preboot);
  }, [mounted]);
  useEffect(() => {
    if (!mounted) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let handedOff = false;
    const releaseHero = () => {
      if (handedOff) return;
      handedOff = true;
      handOffIntro();
    };
    const cleanup = () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      releaseHero();
    };
    const finish = () => {
      cleanup();
      setMounted(false);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = gsap.to(rootRef.current, { opacity: 0, duration: 0.25, onComplete: finish });
      return () => {
        t.kill();
        cleanup();
      };
    }
    const sweep = { x: 140 };
    const applySweep = () => {
      const el = shineRef.current;
      if (!el) return;
      el.style.backgroundPosition = `${sweep.x}% 0`;
    };
    applySweep();
    const iris = { r: 0 };
    const applyIris = () => {
      const el = rootRef.current;
      if (!el) return;
      const g = `radial-gradient(circle at 50% 46%, transparent ${iris.r}vmax, #000 ${iris.r + 6}vmax)`;
      el.style.webkitMaskImage = g;
      el.style.maskImage = g;
    };
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      auraARef.current,
      { opacity: 0, scale: 0.8, xPercent: -6 },
      { opacity: 1, scale: 1.08, xPercent: 3, duration: 1.7, ease: "power2.out" },
      0
    ).fromTo(
      auraBRef.current,
      { opacity: 0, scale: 1.12, xPercent: 8 },
      { opacity: 1, scale: 0.92, xPercent: -5, duration: 1.7, ease: "power2.out" },
      0.05
    ).fromTo(
      logoRef.current,
      { yPercent: 42, opacity: 0, filter: "blur(10px)" },
      { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, ease: "expo.out" },
      0.08
    ).to(sweep, { x: -140, duration: 0.95, ease: "power2.inOut", onUpdate: applySweep }, 0.5).fromTo(
      letterRefs.current.filter(Boolean),
      { yPercent: 115, opacity: 0, filter: "blur(5px)" },
      { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, stagger: 0.028, ease: "power3.out" },
      0.5
    ).fromTo(barWrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.5).fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power1.inOut" }, 0.62).to(barRef.current, {
      boxShadow: "0 0 22px rgba(62,125,252,.95)",
      duration: 0.22,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    }, 1.52).to({}, { duration: 0.14 }).to([logoRef.current, taglineRef.current, barWrapRef.current], {
      opacity: 0,
      scale: 1.08,
      filter: "blur(7px)",
      duration: 0.4,
      ease: "power2.in"
    }, "exit").to([auraARef.current, auraBRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "exit").to(iris, {
      r: 150,
      duration: 1.05,
      ease: "expo.inOut",
      onUpdate: applyIris
    }, "exit+=0.22").add(releaseHero, "exit+=0.42");
    return () => {
      tl.kill();
      cleanup();
    };
  }, [mounted, lenis]);
  if (!mounted) return null;
  return /* @__PURE__ */ jsxs("div", { className: "pl-root", ref: rootRef, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("span", { className: "pl-aura pl-aura--a", ref: auraARef }),
    /* @__PURE__ */ jsx("span", { className: "pl-aura pl-aura--b", ref: auraBRef }),
    /* @__PURE__ */ jsxs("div", { className: "pl-stack", children: [
      /* @__PURE__ */ jsx("span", { className: "pl-logo-mask", children: /* @__PURE__ */ jsxs("span", { className: "pl-logo-holder", ref: logoRef, children: [
        /* @__PURE__ */ jsx("img", { className: "pl-logo", src: codelixLogo, alt: "" }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "pl-shine",
            ref: shineRef,
            style: {
              WebkitMaskImage: `url(${codelixLogo})`,
              maskImage: `url(${codelixLogo})`
            }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("span", { className: "pl-tagline-mask", ref: taglineRef, children: TAGLINE.split("").map((ch, i) => /* @__PURE__ */ jsx("span", { className: "pl-letter-mask", children: /* @__PURE__ */ jsx(
        "span",
        {
          className: `pl-letter${i >= TAGLINE.length - 2 ? " is-accent" : ""}`,
          ref: (el) => letterRefs.current[i] = el,
          children: ch === " " ? " " : ch
        }
      ) }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "pl-bar", ref: barWrapRef, children: /* @__PURE__ */ jsx("span", { className: "pl-bar-fill", ref: barRef }) })
    ] })
  ] });
}
function ClientStrip() {
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!trackRef.current) return;
    const tw = gsap.to(trackRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    const wrap = trackRef.current.parentElement;
    const slow = () => gsap.to(tw, { timeScale: 0.25, duration: 0.6, ease: "power2.out" });
    const norm = () => gsap.to(tw, { timeScale: 1, duration: 0.6, ease: "power2.out" });
    wrap.addEventListener("mouseenter", slow);
    wrap.addEventListener("mouseleave", norm);
    return () => {
      tw.kill();
      wrap.removeEventListener("mouseenter", slow);
      wrap.removeEventListener("mouseleave", norm);
    };
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "v2-section v2-client-strip", style: { paddingTop: 56, paddingBottom: 56, paddingLeft: 0, paddingRight: 0 }, children: [
    /* @__PURE__ */ jsx("p", { className: "v2-label", style: { textAlign: "center", marginBottom: 28 }, children: "Trusted by 40+ companies" }),
    /* @__PURE__ */ jsx("div", { className: "v2-strip", ref: stripRef, children: /* @__PURE__ */ jsx("div", { className: "v2-strip-track", ref: trackRef, children: CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, i) => /* @__PURE__ */ jsx("img", { src: logo, alt: "", loading: "lazy" }, i)) }) })
  ] });
}
function FaqSection({ faqs, className = "", label = "FAQ", heading = "Questions we're asked before every engagement." }) {
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => /* @__PURE__ */ new Set());
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const targetEl = entry.target;
          if (targetEl.classList.contains("v2-faq-item")) {
            const idx = Number(targetEl.dataset.faqIndex);
            setRevealedFaqs((prev) => prev.has(idx) ? prev : new Set(prev).add(idx));
          } else {
            targetEl.classList.add("is-in");
          }
          io.unobserve(targetEl);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const items = el.querySelectorAll(".v2-faq-item");
    items.forEach((item) => io.observe(item));
    el.querySelectorAll(".v2-faq-intro .v2-label, .v2-faq-intro .v2-heading, .v2-faq-intro .v2-lede").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [faqs]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".v2-faq-a").forEach((item, i) => {
      const inner = item.querySelector("p");
      if (inner) {
        gsap.to(item, {
          height: i === openFaq ? inner.offsetHeight : 0,
          duration: 0.55,
          ease: "power3.inOut"
        });
      }
    });
  }, [openFaq]);
  return /* @__PURE__ */ jsxs("section", { className: `v2-section ${className}`.trim(), id: "faq", ref, children: [
    /* @__PURE__ */ jsxs("div", { className: "v2-faq-intro", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "v2-label", children: label }),
        /* @__PURE__ */ jsx("h2", { className: "v2-heading", children: heading })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "v2-lede v2-faq-note", children: [
        "Don't see yours here? ",
        /* @__PURE__ */ jsx(Link, { to: "/contact", children: "Ask us directly →" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { children: faqs.map((f, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `v2-faq-item ${openFaq === i ? "open" : ""} ${revealedFaqs.has(i) ? "is-in" : ""}`,
        "data-faq-index": i,
        children: [
          /* @__PURE__ */ jsxs("button", { className: "v2-faq-q", onClick: () => setOpenFaq(openFaq === i ? -1 : i), children: [
            /* @__PURE__ */ jsxs("span", { className: "v2-faq-q-label", children: [
              /* @__PURE__ */ jsx("span", { className: "v2-faq-index", children: String(i + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsx("span", { className: "v2-faq-q-text", children: f.q })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "v2-faq-sign", children: [
              /* @__PURE__ */ jsx("span", {}),
              /* @__PURE__ */ jsx("span", {})
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "v2-faq-a", children: /* @__PURE__ */ jsx("p", { children: f.a }) })
        ]
      },
      f.q
    )) })
  ] });
}
const ease = (p) => p * p * p * (p * (p * 6 - 15) + 10);
function ScrollSentence({ words, tone, centered = false }) {
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const bgRefs = useRef([]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let running = false;
    let target = 0;
    let current = 0;
    let primed = false;
    let docTop = 0, blockHeight = 0, viewportH = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      docTop = r.top + window.scrollY;
      blockHeight = r.height;
      viewportH = window.innerHeight;
    };
    const readTarget = () => {
      const scrollable = blockHeight - viewportH;
      if (scrollable <= 0) return 0;
      const raw = (window.scrollY - docTop) / scrollable;
      const norm = Math.min(Math.max(raw / 0.92, 0), 0.9999);
      return norm * words.length;
    };
    const IN_END = 0.2;
    const OUT_START = 0.8;
    const paint = (t) => {
      words.forEach((_, i) => {
        const d = Math.min(Math.max(t - i, 0), 1);
        const wordEl = wordRefs.current[i];
        const bgEl = bgRefs.current[i];
        let scale, opacity, blur;
        if (d < IN_END) {
          const p = ease(d / IN_END);
          scale = 0.78 + p * 0.22;
          opacity = p;
          blur = 5 * (1 - p);
        } else if (d <= OUT_START) {
          scale = 1;
          opacity = 1;
          blur = 0;
        } else {
          const p = ease((d - OUT_START) / (1 - OUT_START));
          scale = 1 + p * 0.22;
          opacity = 1 - p;
          blur = 6 * p;
        }
        if (wordEl) {
          wordEl.style.opacity = opacity;
          wordEl.style.transform = centered ? `translate3d(-50%,-50%,0) scale(${scale})` : `translate3d(0,-50%,0) scale(${scale})`;
          wordEl.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
        if (bgEl) {
          const bp = ease(Math.min(d / IN_END, 1));
          bgEl.style.opacity = bp;
        }
      });
    };
    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 2e-4) {
        current = target;
        paint(current);
        running = false;
        raf = 0;
        return;
      }
      current += diff * 0.12;
      paint(current);
      raf = requestAnimationFrame(tick);
    };
    const handleScroll = () => {
      target = readTarget();
      if (!primed) {
        current = target;
        paint(current);
        primed = true;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onResize = () => {
      measure();
      handleScroll();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onResize).catch(() => {
      });
    }
    measure();
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      cancelAnimationFrame(raf);
    };
  }, [words.length, centered]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `v2-sentence v2-sentence--${tone} ${centered ? "v2-sentence--centered" : ""}`,
      ref,
      children: /* @__PURE__ */ jsxs("div", { className: "v2-sentence-sticky", children: [
        /* @__PURE__ */ jsx("div", { className: "v2-sentence-bgs", children: words.map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            ref: (el) => bgRefs.current[i] = el,
            className: "v2-sentence-bg"
          },
          i
        )) }),
        /* @__PURE__ */ jsx("div", { className: "v2-sentence-words", children: words.map((w, i) => /* @__PURE__ */ jsx(
          "span",
          {
            ref: (el) => wordRefs.current[i] = el,
            className: "v2-sentence-word",
            dangerouslySetInnerHTML: { __html: w }
          },
          i
        )) })
      ] })
    }
  );
}
function CtaSection({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const panel = el.querySelector(".v2-cta");
    if (panel) io.observe(panel);
    el.querySelectorAll(".v2-cta .v2-label, .v2-cta .v2-lede").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [children]);
  return /* @__PURE__ */ jsxs("section", { className: `v2-section v2-cta-shell ${className}`.trim(), ref, children: [
    /* @__PURE__ */ jsx("div", { className: "v2-cta", children }),
    /* @__PURE__ */ jsx("aside", { className: "v2-cta-visual", children: /* @__PURE__ */ jsx(CtaVisual, {}) })
  ] });
}
const WORDS_KEY = "__splitWords";
const OBSERVED = /* @__PURE__ */ new WeakMap();
function readWords(el) {
  if (el[WORDS_KEY]) return el[WORDS_KEY];
  const words = [];
  const walk = (node, accent) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent.split(/\s+/).filter(Boolean).forEach((text) => words.push({ text, accent }));
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return;
      const own = [...child.classList].filter((c) => c !== "line");
      walk(child, own.length ? own.join(" ") : accent);
    });
  };
  walk(el, null);
  el[WORDS_KEY] = words;
  return words;
}
function buildWordSpan(word, doc) {
  const span = doc.createElement("span");
  span.textContent = word.text;
  if (word.accent) span.className = word.accent;
  return span;
}
function splitTitleLines(el) {
  if (!el) return;
  const words = readWords(el);
  if (!words.length) return;
  const doc = el.ownerDocument;
  el.textContent = "";
  const probes = words.map((w, i) => {
    const span = buildWordSpan(w, doc);
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(doc.createTextNode(" "));
    return span;
  });
  const lines = [];
  let currentTop = null;
  probes.forEach((span, i) => {
    const top = span.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 1) {
      currentTop = top;
      lines.push([]);
    }
    lines[lines.length - 1].push(words[i]);
  });
  el.textContent = "";
  lines.forEach((line) => {
    const outer = doc.createElement("span");
    outer.className = "line";
    const inner = doc.createElement("span");
    let i = 0;
    while (i < line.length) {
      const { accent } = line[i];
      let end = i;
      while (end + 1 < line.length && line[end + 1].accent === accent) end++;
      const text = line.slice(i, end + 1).map((w) => w.text).join(" ");
      if (accent) {
        const span = doc.createElement("span");
        span.className = accent;
        span.textContent = text;
        inner.appendChild(span);
      } else {
        inner.appendChild(doc.createTextNode(text));
      }
      if (end < line.length - 1) inner.appendChild(doc.createTextNode(" "));
      i = end + 1;
    }
    outer.appendChild(inner);
    if (el.childNodes.length) el.appendChild(doc.createTextNode(" "));
    el.appendChild(outer);
  });
}
function splitTitleLinesIn(root, selector = ".sd2-hero-title") {
  if (!root || typeof window === "undefined") return () => {
  };
  const els = [...root.querySelectorAll(selector)];
  if (!els.length) return () => {
  };
  els.forEach(splitTitleLines);
  let lastWidth = window.innerWidth;
  let timer = 0;
  const onResize = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(timer);
    timer = setTimeout(() => els.forEach(splitTitleLines), 150);
  };
  window.addEventListener("resize", onResize, { passive: true });
  OBSERVED.set(root, onResize);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", onResize);
  };
}
const TECH_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: Monitor,
    tools: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
    colSpan: 2
  },
  {
    id: "backend",
    title: "Backend Core",
    icon: Server,
    tools: ["Node.js", "Python / Django", "Go", "Java Spring", "GraphQL"],
    colSpan: 1
  },
  {
    id: "database",
    title: "Data & Storage",
    icon: Database,
    tools: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
    colSpan: 1
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    tools: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Vercel"],
    colSpan: 2
  },
  {
    id: "design",
    title: "Design & UX",
    icon: PenTool,
    tools: ["Figma", "Adobe CC", "Prototyping", "Wireframing"],
    colSpan: 1.5
  },
  {
    id: "security",
    title: "Security & QA",
    icon: Lock,
    tools: ["Pen Testing", "Jest", "Cypress", "OAuth 2.0"],
    colSpan: 1.5
  }
];
const DEFAULT_METRICS = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "2x", label: "Faster Delivery" },
  { value: "Top 1%", label: "Engineering Talent" }
];
function TechStackShowcaseV2({
  title = "Our Technology Stack",
  description = "We use modern, battle-tested tools to build scalable and maintainable solutions.",
  categories = TECH_CATEGORIES,
  metrics = DEFAULT_METRICS
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e) => {
      for (const card of container.getElementsByClassName("tech-v2-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "tech-v2-section", children: [
    /* @__PURE__ */ jsxs("div", { className: "tech-v2-header", children: [
      /* @__PURE__ */ jsx("h2", { className: "tech-v2-title", children: title }),
      /* @__PURE__ */ jsx("p", { className: "tech-v2-description", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "tech-v2-grid", ref: containerRef, children: categories.map((cat) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `tech-v2-card tech-v2-card--span-${cat.colSpan === 1.5 ? "wide" : cat.colSpan === 2 ? "full" : "third"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "tech-v2-card-border" }),
          /* @__PURE__ */ jsxs("div", { className: "tech-v2-card-content", children: [
            /* @__PURE__ */ jsx("div", { className: "tech-v2-card-icon", children: /* @__PURE__ */ jsx(cat.icon, { size: 28, strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsx("h3", { className: "tech-v2-card-title", children: cat.title }),
            /* @__PURE__ */ jsx("div", { className: "tech-v2-tags", children: cat.tools.map((tool) => /* @__PURE__ */ jsx("span", { className: "tech-v2-tag", children: tool }, tool)) })
          ] })
        ]
      },
      cat.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "tech-v2-metrics", children: metrics.map((metric, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "tech-v2-metric", children: [
        /* @__PURE__ */ jsx("span", { className: "tech-v2-metric-val", children: metric.value }),
        /* @__PURE__ */ jsx("span", { className: "tech-v2-metric-lbl", children: metric.label })
      ] }),
      index < metrics.length - 1 && /* @__PURE__ */ jsx("div", { className: "tech-v2-metric-divider" })
    ] }, index)) })
  ] });
}
function ArticleSkeleton({ label = "Loading article" }) {
  return /* @__PURE__ */ jsxs("div", { className: "v2 artsk", "aria-busy": "true", children: [
    /* @__PURE__ */ jsx(NavbarV2, {}),
    /* @__PURE__ */ jsxs("span", { className: "artsk-sr", role: "status", "aria-live": "polite", children: [
      label,
      "…"
    ] }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("header", { className: "artsk-header", children: /* @__PURE__ */ jsxs("div", { className: "artsk-inner", children: [
        /* @__PURE__ */ jsxs("div", { className: "artsk-row", children: [
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: 48 } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: 10 } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: 42 } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "artsk-row", children: [
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: 88 } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: 116 } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: 74 } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "artsk-title", children: [
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: "82%" } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: "54%" } })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "artsk-body", children: [
        /* @__PURE__ */ jsx("span", { className: "artsk-bar artsk-hero" }),
        [0, 1, 2].map((block) => /* @__PURE__ */ jsxs("div", { className: "artsk-para", children: [
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: "100%" } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: "96%" } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: "99%" } }),
          /* @__PURE__ */ jsx("span", { className: "artsk-bar", style: { width: "61%" } })
        ] }, block))
      ] })
    ] })
  ] });
}
export {
  ArticleSkeleton as A,
  ClientStrip as C,
  FooterV2 as F,
  NavbarV2 as N,
  PageLoader as P,
  ScrollSentence as S,
  TestimonialSpotlight as T,
  PRODUCTS as a,
  FaqSection as b,
  CtaSection as c,
  TechStackShowcaseV2 as d,
  introWillPlay as i,
  onIntroHandoff as o,
  productBySlug as p,
  splitTitleLinesIn as s
};
