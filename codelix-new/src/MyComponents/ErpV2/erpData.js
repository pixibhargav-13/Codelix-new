/* Codelix ERP: the overview page (/products/codelix-erp) and one page per
   industry edition (/products/codelix-erp/<slug>).

   Where the content comes from, so nothing here is invented:
   - Construction: the Codelix construction ERP pitch deck (modules, screens,
     mobile app, who it's for, "₹1000+ Cr combined project value").
   - Manufacturing, ceramic and textile: the manufacturing ERP Codelix already
     publishes (the 4bitx product page in ProductsV2/productsData.js: its
     modules, AI features, rollout steps, FAQ and traction), plus the core the
     deck shows (approvals, audit, payroll, accounts, mobile app). The ceramic
     and textile pages describe how those same modules are set up for that
     industry's workflow, which is part of every rollout ("ERP setup and
     configuration").
   No prices on these pages: the quote follows a demo. */
import {
  Landmark, FolderKanban, ListTodo, ShoppingCart, Truck, Wallet, BookOpenCheck,
  CheckCircle2, ScanEye, Contact, Settings2, LayoutDashboard,
  FileSpreadsheet, MessageCircle, NotebookPen, Calculator, FileText, ClipboardList,
  Receipt, Package, Cog, ScanLine, Handshake, UsersRound, FolderCog, HardHat, Brain,
  Sparkles, ShieldAlert, TrendingUp, Bot, Factory, Shirt, Grid2x2, Layers,
  Boxes, Truck as Dispatch, PackageCheck, AlertTriangle,
} from "lucide-react";

import erpMark from "../Images/codelix-erp-mark.svg";
import shotTender from "../Images/erp/erp-tender.webp";
import shotProjects from "../Images/erp/erp-projects.webp";
import shotTaskopad from "../Images/erp/erp-taskopad.webp";
import shotProcurement from "../Images/erp/erp-procurement.webp";
import shotEquipment from "../Images/erp/erp-equipment.webp";
import shotPayroll from "../Images/erp/erp-payroll.webp";
import shotVyapar from "../Images/erp/erp-vyapar.webp";
import shotApprovals from "../Images/erp/erp-approvals.webp";
import shotAudit from "../Images/erp/erp-audit.webp";
import shotLibrary from "../Images/erp/erp-library.webp";
import shotSettings from "../Images/erp/erp-settings.webp";
import shotDashboard from "../Images/erp/erp-dashboard.webp";
import mobPunch from "../Images/erp/erp-mobile-punch.webp";
import mobBillScan from "../Images/erp/erp-mobile-bill-scan.webp";
import mobApprovals from "../Images/erp/erp-mobile-approvals.webp";
import mobPayslip from "../Images/erp/erp-mobile-payslip.webp";
import illusBill from "../Images/erp/erp-illustration-bill.webp";
import illus404 from "../Images/erp/erp-illustration-404.webp";
import illusModules from "../Images/erp/erp-illustration-modules.webp";

export const ERP_PATH = "/products/codelix-erp";
export const ERP_ACCENT = "#3e7dfc";
export { erpMark };

/* ── shared pieces ─────────────────────────────────────────────────── */

/* the phone app, from the deck; the same app ships with every edition */
const MOBILE = {
  heading: "At the site or on the floor? Your phone is enough.",
  body: "The mobile app runs on the same data as the web, live on both.",
  items: [
    { img: mobPunch, title: "Selfie attendance", body: "Staff punch in with a selfie, and GPS checks they're where they should be." },
    { img: mobBillScan, title: "Scan a bill", body: "Photograph a bill and the bill number, date and supplier fill in by themselves." },
    { img: mobApprovals, title: "Approve on the go", body: "Approve or reject purchase orders from your phone, wherever you are." },
    { img: mobPayslip, title: "Payslip on phone", body: "Every worker sees their own attendance and payslips." },
  ],
};

/* rollout steps, as published for the manufacturing ERP */
const HOW_IT_WORKS = [
  { title: "Discovery call", body: "We learn how your business runs today: sites or plants, teams, and where the numbers get lost. No sales pressure." },
  { title: "Live demo and proposal", body: "We show Codelix ERP with examples from your industry, then send the modules, timeline and quote that fit your business." },
  { title: "Setup and configuration", body: "Our team sets the ERP up for your workflows, products or projects, approval ladders and team structure." },
  { title: "Data migration", body: "We help move your existing data from Tally, Excel or other systems." },
  { title: "Training", body: "Hands-on training for owners, accountants, site or floor staff and managers." },
  { title: "Go live and support", body: "We go live with you, then stay on for support, GST updates and monitoring through an annual support plan (AMC)." },
];

/* no prices on these pages, by choice: what a quote depends on */
const PRICING = {
  heading: "What it costs depends on what you need.",
  body: "We don't sell one fixed package. After a free demo we send a written quote based on:",
  factors: [
    "The edition and the modules you choose",
    "How many users, sites or plants",
    "Customisation for the way you work",
    "Data migration from Tally, Excel or other software",
    "Training and go-live support",
    "The annual support plan (AMC)",
  ],
};

/* the core the deck shows, used across editions */
const CORE_SCREENS = [
  { img: shotDashboard, title: "Dashboard", body: "Sales, expenses, profit and payments for the whole company on one screen." },
  { img: shotApprovals, title: "Approvals", body: "One inbox for everything that needs a yes, with an approval ladder you set." },
  { img: shotPayroll, title: "Payroll", body: "Attendance flows into salary; lock the month and export." },
  { img: shotVyapar, title: "Accounts and GST", body: "Sales, purchases, expenses, cash and bank, with GSTR-1 and GSTR-3B reports." },
];

/* the manufacturing modules Codelix publishes, reused (and re-worded per
   industry below) by manufacturing, ceramic and textile */
const MFG_AI = {
  label: "AI that works with your data",
  heading: "It doesn't just store data. It explains it.",
  items: [
    { icon: Sparkles, title: "Demand forecasting", body: "Studies your past sales and warns you of a demand spike before it arrives." },
    { icon: ShieldAlert, title: "Delay prediction", body: "Flags machine overloads, raw-material shortages and downtime before a delivery date slips." },
    { icon: TrendingUp, title: "Purchase rate intelligence", body: "Compares a new purchase price with your history and warns you when a vendor is overcharging, before you approve the PO." },
    { icon: Bot, title: "AI business assistant", body: "Ask \"why did profit drop this month?\" and get the answer in plain language: higher raw-material cost, more rejections or more downtime." },
  ],
};

const MFG_TRACTION = [
  "The manufacturing edition is live with paying clients",
  "Running in brass, ceramic, CNC and general manufacturing businesses",
  "Deployed in Jamnagar's brass cluster",
  "Built by Codelix IT Solutions in Ahmedabad, 100% made in India",
  "Cloud-based, so it works from the office, the plant or home",
  "Mobile-ready for floor staff",
];

const faqTally = { q: "Does it replace Tally?", a: "It can. Codelix ERP includes full accounting and GST, so many businesses don't need Tally separately. If you'd rather keep Tally for your accountant, it can connect to Tally through its XML interface." };
const faqModular = { q: "Do we have to take every module?", a: "No. Codelix ERP is modular: you start with the modules your business needs and add more later." };
const faqSecure = { q: "Is our data safe in the cloud?", a: "Yes. It runs on secure cloud infrastructure with regular backups, encryption and role-based access, so each person only sees what their role allows." };
const faqSupport = { q: "What support do we get after going live?", a: "Every client gets an annual support plan (AMC) covering support, GST rule updates, bug fixes and system monitoring." };
const faqTime = { q: "How long does it take to go live?", a: "Typically 4 to 12 weeks, depending on how many modules you take, how complex your workflow is and how much data we migrate." };
const faqCustom = { q: "Can it be changed to fit how we work?", a: "Yes. Every rollout is set up for your workflow, and if you need something the ERP doesn't do yet, we build it." };
const faqStart = { q: "How do we get started?", a: "Book a free demo. We'll show you Codelix ERP with examples from your industry, then send a written quote for the modules you need." };

/* ── overview ──────────────────────────────────────────────────────── */
export const ERP_OVERVIEW = {
  slug: "",
  path: ERP_PATH,
  name: "Codelix ERP",
  title: "Codelix ERP",
  badge: "ERP for every industry",
  seoTitle: "Codelix ERP: ERP for Construction & Manufacturing",
  seoDescription: "One ERP for Indian construction companies and manufacturers: projects, production, inventory, purchase, payroll, accounts and GST, on web and mobile, set up for your industry.",
  keywords: "Codelix ERP, ERP software India, construction ERP, manufacturing ERP, ceramic ERP, textile ERP, ERP for SMEs, ERP software Ahmedabad, ERP software Gujarat, ERP with GST, ERP mobile app",
  tagline: "One ERP for your whole business, set up for how your industry actually works. On the web in the office, and on the phone at the site or on the floor.",
  facts: [["Editions", "Construction, Manufacturing, Ceramic, Textile"], ["Works on", "Web and mobile app"], ["Built by", "Codelix IT Solutions"]],
  stats: [
    { value: "4", label: "Industry editions" },
    { value: "₹1000+ Cr", label: "Combined project value of our construction clients" },
    { value: "Web + Mobile", label: "Same data, live on both" },
  ],
  problem: {
    label: "Why Codelix ERP",
    heading: "Excel, WhatsApp and paper registers don't add up.",
    body: "Most growing companies run on Tally for accounts, Excel for everything else, WhatsApp for updates and paper registers at the site or the factory. None of it talks to each other, so the owner never sees one true number.",
    points: [
      { icon: FileSpreadsheet, title: "Excel sheets", body: "Every site, plant or department keeps its own file, and no two of them agree." },
      { icon: MessageCircle, title: "WhatsApp groups", body: "Bills, photos, rates and approvals get lost somewhere in the chat." },
      { icon: NotebookPen, title: "Paper registers", body: "Attendance, stock and material counted by hand, with no record of who changed what." },
      { icon: Calculator, title: "Accounts on their own", body: "Your books sit apart from the work, so billing, stock and GST never quite match." },
    ],
  },
  industriesSection: {
    label: "Editions",
    heading: "Pick the edition for your industry.",
    body: "Each edition starts from the same core and adds the modules your industry needs, set up around how you work.",
  },
  core: {
    label: "The core",
    heading: "What every edition is built on.",
    body: "The same core runs underneath construction, manufacturing, ceramic and textile.",
    items: [
      { n: "01", title: "Dashboard", icon: LayoutDashboard, body: "The whole company, or one site or plant, on one screen." },
      { n: "02", title: "Approvals", icon: CheckCircle2, body: "Nothing moves without a yes, with an approval ladder you set." },
      { n: "03", title: "Audit log", icon: ScanEye, body: "Every change on record: who, what and when." },
      { n: "04", title: "Accounts and GST", icon: BookOpenCheck, body: "Sales, purchases, expenses, cash and bank, with GSTR-1 and GSTR-3B." },
      { n: "05", title: "Payroll", icon: Wallet, body: "Attendance to salary in one click." },
      { n: "06", title: "Purchase", icon: ShoppingCart, body: "Compare supplier rates, raise purchase orders." },
      { n: "07", title: "Tasks", icon: ListTodo, body: "Who does what, and by when." },
      { n: "08", title: "Library", icon: Contact, body: "All staff, clients and vendors in one address book." },
      { n: "09", title: "Roles and companies", icon: Settings2, body: "Each role sees its own menus; run several companies from one login." },
    ],
    custom: "Need something different? We build it around how you work.",
  },
  coreScreens: CORE_SCREENS,
  mobile: MOBILE,
  howItWorks: HOW_IT_WORKS,
  pricing: PRICING,
  faq: [
    { q: "Which industries is Codelix ERP for?", a: "There are editions for construction (government tender contractors and private builders), manufacturing, ceramic and textile. Each starts from the same core and adds the modules that industry needs." },
    faqTally, faqModular, faqCustom,
    { q: "Does it work on mobile?", a: "Yes. There's a web app for the office and a mobile app for the site or the factory floor, on the same data, live on both." },
    faqSecure, faqTime, faqSupport,
  ],
};

/* ── editions ──────────────────────────────────────────────────────── */
export const ERP_INDUSTRIES = [
  {
    slug: "construction",
    icon: HardHat,
    name: "Construction",
    title: "Construction ERP",
    badge: "Codelix ERP for construction companies",
    card: "For government tender contractors and private builders: tenders and EMD, every site's BOQ and billing, equipment, payroll and GST.",
    highlights: ["Tenders and EMD", "Project BOQ and billing", "Equipment, owned or rented", "Selfie attendance at site"],
    seoTitle: "Construction ERP for Contractors & Builders | Codelix",
    seoDescription: "Construction ERP for government tender contractors and private builders: tenders and EMD, project BOQ and billing, purchase, equipment, payroll, GST accounts and approvals, on web and mobile.",
    keywords: "construction ERP, construction ERP software India, ERP for construction company, ERP for contractors, government tender management software, EMD tracking software, construction project management software, BOQ billing software, construction accounting software GST, site attendance app, equipment management software construction",
    tagline: "Private builder or government tender contractor, this is for you. One software for tenders, projects, accounts and GST, purchase, payroll and approvals: on the web in the office, and on the phone at the site.",
    facts: [["For", "Govt. tender contractors and private builders"], ["Works on", "Web and mobile app"], ["Built by", "Codelix IT Solutions"]],
    stats: [
      { value: "12", label: "Modules in one app" },
      { value: "₹1000+ Cr", label: "Combined project value of our clients" },
      { value: "Web + Mobile", label: "Same data, live on both" },
    ],
    problem: {
      label: "The problem",
      heading: "Hisaab not found.",
      body: "In most construction offices the numbers live in three places: Excel sheets, WhatsApp groups and paper registers. So when the owner asks where a bill is, nobody knows for sure. Let's fix that.",
      illustrations: [
        { img: illusBill, alt: "A site manager surrounded by loose bills, asking where the bill is" },
        { img: illus404, alt: "A browser error page saying the company needs an upgrade" },
      ],
      points: [
        { icon: FileSpreadsheet, title: "Excel sheets", body: "Every site keeps its own sheet, and the totals never match the office." },
        { icon: MessageCircle, title: "WhatsApp groups", body: "Bills, site photos and approvals are buried somewhere in the chat." },
        { icon: NotebookPen, title: "Paper registers", body: "Attendance and material counted by hand, with nothing to check them against." },
      ],
    },
    modules: {
      label: "Everything in one place",
      heading: "12 modules. One app.",
      body: "Build today, scale tomorrow.",
      illustration: { img: illusModules, alt: "A poster with tear-off strips for the 12 modules: tender, projects, Taskopad, procurement, equipment, payroll, Vyapar, approvals, audit, library, settings and dashboard" },
      items: [
        { n: "01", title: "Govt. Tender", icon: Landmark, body: "Tenders, deadlines and EMD." },
        { n: "02", title: "Projects", icon: FolderKanban, body: "Each site's progress, bills and BOQ." },
        { n: "03", title: "Taskopad", icon: ListTodo, body: "Who does what, and by when." },
        { n: "04", title: "Procurement", icon: ShoppingCart, body: "Compare rates, raise orders." },
        { n: "05", title: "Equipment", icon: Truck, body: "Machines, owned or rented." },
        { n: "06", title: "Payroll", icon: Wallet, body: "Attendance to salary, one click." },
        { n: "07", title: "Vyapar", icon: BookOpenCheck, body: "Accounts, bills and GST reports." },
        { n: "08", title: "Approvals", icon: CheckCircle2, body: "Nothing moves without a yes." },
        { n: "09", title: "Audit", icon: ScanEye, body: "Every change, on record." },
        { n: "10", title: "Library", icon: Contact, body: "All staff, clients and vendors." },
        { n: "11", title: "Settings", icon: Settings2, body: "Roles, approvals, companies." },
        { n: "12", title: "Dashboard", icon: LayoutDashboard, body: "Whole company, one screen." },
      ],
      custom: "Need something different? We'll build it around how you work.",
    },
    spotlights: [
      {
        label: "Govt. Tender", img: shotTender, alt: "Tender dashboard with success rate, contract value won, money blocked in EMD and tenders due",
        title: "From filing a tender to winning it, every step tracked.",
        points: [
          { title: "Every step of a tender", body: "Sorting, research, applied, calendar, EMD register, status tracker and documents." },
          { title: "Where each tender stands", body: "How many are shortlisted, under review, won or lost, and what they're worth." },
          { title: "No missed deadlines", body: "Tenders due in the next 14 days, and the ones already overdue, shown upfront." },
          { title: "EMD money tracked", body: "See how much is blocked in EMD and security deposits, and what's still to recover." },
        ],
        simple: "Your whole tender desk in one place, from shortlisting a tender to winning it, with every EMD rupee tracked.",
      },
      {
        label: "Projects", img: shotProjects, alt: "Projects screen with portfolio value, money to collect and one card per site marked healthy or at risk",
        title: "Every site's full account, live.",
        points: [
          { title: "Whole portfolio in numbers", body: "Total projects, their value, money still to collect and how many are at risk." },
          { title: "One card per site", body: "Client, location, progress, billed amount and what's still due." },
          { title: "Filter in one click", body: "Ongoing, not started, on hold or completed." },
          { title: "Early warning", body: "Each project is marked Healthy or At Risk, so trouble shows early." },
        ],
        simple: "Open any project to see its BOQ, targets, materials, staff, attendance, files and every activity.",
      },
      {
        label: "Taskopad", img: shotTaskopad, alt: "Task board listing each task's owner, due date, priority and status",
        title: "Who has which job, and by when.",
        points: [
          { title: "List, board or calendar", body: "The same tasks, the way you like to see them." },
          { title: "Every task is clear", body: "Who does it, by when, how urgent, and whether it's overdue." },
          { title: "Add a task in seconds", body: "Assign it to anyone with a due date and a priority." },
          { title: "Know what's stuck", body: "Pending, in progress, stuck, awaiting approval or completed." },
        ],
        simple: "A to-do board for the whole company. Everyone knows their work, and you know what's stuck.",
      },
      {
        label: "Procurement", img: shotProcurement, alt: "Quote comparison table with supplier rates side by side and the cheapest highlighted",
        title: "Supplier rates compared in two minutes.",
        points: [
          { title: "Cheapest, highlighted", body: "All quotes side by side, with the lowest total marked." },
          { title: "Item by item", body: "Cement, steel and every other line checked against your budget." },
          { title: "Decide in one click", body: "Give each line to the best supplier, or the whole order to the cheapest." },
          { title: "Colour-coded prices", body: "Green is lowest; yellow and orange cost more, with over-budget warnings." },
        ],
        simple: "Ask several suppliers for rates, compare them line by line, then raise the purchase order. AI can review the quotes too.",
      },
      {
        label: "Equipment", img: shotEquipment, alt: "Equipment register listing machines with their code, status and assignment",
        title: "JCB, tractor, mixer: every machine accounted for.",
        points: [
          { title: "Every machine and tool", body: "Tippers, backhoe loaders, mixers, vibrators and scaffolding, each with a code." },
          { title: "Repairs tracked", body: "See what's damaged and what's in the workshop." },
          { title: "Fleet health", body: "Assigned, in repair or damaged, and the total value of your equipment register." },
          { title: "Who has it", body: "Hand equipment to a project or a person, and see what's free." },
        ],
        simple: "Rented machines are tracked too: tractors, JCBs and breakers, by the hour or by the trip, with the vendor's name.",
      },
      {
        label: "Payroll", img: shotPayroll, alt: "Payroll run showing days worked, earnings, deductions and net salary per person",
        title: "From attendance to salary, automatically.",
        points: [
          { title: "Nothing slips through", body: "Pending leave and expense claims are flagged before you pay." },
          { title: "Salary for each person", body: "Days worked, earnings, deductions and net salary." },
          { title: "Lock and export", body: "Lock the month, then download Excel or CSV." },
          { title: "Totals at a glance", body: "Net payout, gross pay, deductions, overtime and fines." },
        ],
        simple: "Attendance from the selfie punch flows straight into salary. No counting days by hand.",
      },
      {
        label: "Vyapar", img: shotVyapar, alt: "Accounts screen with amounts to receive and to pay, party by party",
        title: "What to receive, what to pay, and GST.",
        points: [
          { title: "Your full accounts book", body: "Parties, items, sales, purchases, expenses, cash and bank, and reports." },
          { title: "Reports ready", body: "Sale report, daybook, party statement, plus GSTR-1 and GSTR-3B." },
          { title: "Add a bill in one click", body: "Enter a sale or a purchase from any screen." },
          { title: "Who owes whom", body: "Money to receive and to pay, party by party." },
        ],
        simple: "Your accounts book lives next to your sites, so every bill, payment and GST figure matches the work done.",
      },
      {
        label: "Approvals", img: shotApprovals, alt: "Approvals inbox listing items waiting for a decision with their amounts",
        title: "Every expense waits for your yes.",
        points: [
          { title: "Waiting on me", body: "Only the items that need your decision." },
          { title: "One inbox for all", body: "Tender submissions, leave, site expenses, payments and purchase orders." },
          { title: "Approval ladder", body: "Set who approves what: level 1, level 2 and so on." },
          { title: "Amount upfront", body: "See the money involved before you approve." },
        ],
        simple: "Approve or reject from the mobile app too, wherever you are.",
      },
      {
        label: "Audit", img: shotAudit, alt: "Audit log listing who created, updated or deleted which record and when",
        title: "A CCTV camera for your software.",
        points: [
          { title: "Every action counted", body: "Every event is logged without anyone typing a thing." },
          { title: "Who did it", body: "The person's name and role." },
          { title: "Proof on paper", body: "Export the log or download it as a PDF." },
          { title: "What changed", body: "Created, updated, deleted or logged in, and on which record." },
        ],
        simple: "Every change anyone makes is recorded automatically. Nobody can quietly edit a figure.",
      },
      {
        label: "Library", img: shotLibrary, alt: "Contact library listing staff, workers, clients and vendors with star ratings",
        title: "Staff, workers, clients, vendors: all in one place.",
        points: [
          { title: "Everyone in one place", body: "Staff, workers, clients and vendors." },
          { title: "Contact details", body: "Name, email and phone for every person." },
          { title: "Find anyone fast", body: "Search by name, phone or email." },
          { title: "Rate vendors and workers", body: "Star ratings help you pick reliable people next time." },
        ],
        simple: "One address book for the whole company, shared by projects, payroll and accounts.",
      },
      {
        label: "Settings", img: shotSettings, alt: "Settings screen with roles and access, approval ladders and the team chart",
        title: "You decide who sees what.",
        points: [
          { title: "Your rules", body: "Roles and access, approval ladders and companies." },
          { title: "Team chart", body: "Your team, from the owner down to site staff." },
          { title: "Add people", body: "Add a member and give them a role." },
          { title: "Each role sees its own menus", body: "A site engineer doesn't see the accounts; the owner sees everything." },
        ],
        simple: "Run more than one company from one login. Each has its own books, staff and approvals.",
      },
      {
        label: "Dashboard", img: shotDashboard, alt: "Company dashboard with monthly sales, expense and margin charts",
        title: "The whole company on one screen.",
        points: [
          { title: "Sales every month", body: "A bar for each month shows how much you billed." },
          { title: "Money in vs money out", body: "Green is money received, pink is money paid out." },
          { title: "All sites or just one", body: "Switch between the whole company and a single project in one click." },
          { title: "Your real profit", body: "Total sales minus total expense, worked out for you." },
        ],
        simple: "The owner's home screen: sales, expenses, profit and payments for the whole company, or for one site.",
      },
    ],
    mobile: { ...MOBILE, heading: "At the site? Your phone is enough." },
    audiences: {
      label: "Who it's for",
      heading: "Private builder or government tender contractor.",
      items: [
        { role: "Government tender contractors", points: ["Track every tender from shortlist to award", "Know where your EMD money is", "Project BOQ, targets and billing"] },
        { role: "Private builders", points: ["Every site's progress and spend", "Supplier rates compared before you buy", "Sales, purchases and GST in one book"] },
        { role: "Doing both", points: ["Separate companies under one login", "Each company keeps its own books", "Switch company in one click"] },
      ],
      note: "On the computer and on the mobile. Same data, live, on both.",
    },
    trust: { value: "₹1000+ Cr", body: "Combined project value of the construction clients who trust Codelix, across India." },
    howItWorks: HOW_IT_WORKS,
    pricing: PRICING,
    faq: [
      { q: "Is it only for government tender contractors?", a: "No. It's built for government tender contractors, private builders and companies doing both. If you do both, each company runs separately under one login with its own books, staff and approvals." },
      { q: "Does it work at the site on a phone?", a: "Yes. Workers punch in with a selfie and GPS, site staff scan bills with the camera, managers approve purchase orders, and everyone sees their own payslip, all on the mobile app with the same data as the office." },
      { q: "Can it track rented machines?", a: "Yes. Rented tractors, JCBs and breakers are tracked by the hour or by the trip with the vendor's name, alongside the machines you own." },
      { q: "Does it handle GST?", a: "Yes. The Vyapar accounts module keeps sales, purchases, expenses, cash and bank, and produces GSTR-1 and GSTR-3B reports, so your GST figures match the work done." },
      { q: "Can we track EMD and security deposits?", a: "Yes. The tender module keeps an EMD register, so you can see how much money is blocked in EMD and security deposits and what is still to be recovered." },
      faqCustom, faqStart,
    ],
  },

  {
    slug: "manufacturing",
    icon: Factory,
    name: "Manufacturing",
    title: "Manufacturing ERP",
    badge: "Codelix ERP for manufacturers",
    card: "For SME factories: BOM and production planning, inventory across godowns, quality and scrap, GST e-invoice and e-way bill, vendor and customer portals.",
    highlights: ["BOM and production planning", "Multi-godown inventory", "CNC monitoring", "Vendor and customer portals"],
    seoTitle: "Manufacturing ERP Software for SMEs | Codelix",
    seoDescription: "Manufacturing ERP for Indian SMEs: BOM and production planning, WIP, inventory across godowns, quality and scrap, GST e-invoice and e-way bill, vendor and customer portals, payroll and accounts.",
    keywords: "manufacturing ERP software, ERP for manufacturing SMEs India, factory ERP, production planning software, BOM software, WIP tracking, inventory management ERP, GST e-invoice ERP, e-way bill ERP, CNC monitoring software, manufacturing ERP Gujarat",
    tagline: "Your factory, fully connected. From the factory floor to your finance team, everything in one system, built for Indian SMEs.",
    facts: [["For", "Manufacturing SMEs, ₹5 Cr to ₹100 Cr"], ["Works on", "Web and mobile app"], ["Built by", "Codelix IT Solutions"]],
    stats: [
      { value: "10", label: "Modules" },
      { value: "₹5 Cr–₹100 Cr", label: "Businesses it's built for" },
      { value: "Web + Mobile", label: "Same data, live on both" },
    ],
    problem: {
      label: "The problem",
      heading: "Most manufacturers are running blind.",
      body: "You're running a crore-rupee business on tools that don't talk to each other: data silos, delays, wrong decisions and missed deliveries.",
      points: [
        { icon: Calculator, title: "Tally for accounts", body: "Finance sits on its own, with no link to production, inventory or vendors." },
        { icon: MessageCircle, title: "WhatsApp for everything", body: "Vendor updates, customer queries and dispatch confirmations, lost in chat threads." },
        { icon: FileText, title: "Excel for production", body: "Manual entry, outdated reports and no real-time view of the factory floor." },
        { icon: ClipboardList, title: "Paper registers for attendance", body: "No digital records, no shift tracking, no productivity data." },
      ],
    },
    modules: {
      label: "The platform",
      heading: "10 modules. One connected factory.",
      items: [
        { n: "01", title: "Accounting and finance", icon: Calculator, body: "Ledger, sales and purchase, receipts, credit and debit notes, bank reconciliation, cost centres, P&L, balance sheet and trial balance." },
        { n: "02", title: "GST and compliance", icon: Receipt, body: "GSTIN auto-fetch, e-invoice (IRN and QR), e-way bill, ITC tracking and GST return tracking." },
        { n: "03", title: "Inventory", icon: Package, body: "Multi-godown stock, barcode and QR, batch tracking, stock alerts and real-time valuation." },
        { n: "04", title: "Manufacturing and production", icon: Cog, body: "BOM, production planning, WIP tracking, quality control, and rejection and scrap management." },
        { n: "05", title: "CNC monitoring", icon: ScanLine, body: "Photograph the CNC screen; AI reads it and updates the ERP: production and downtime by machine, operator and shift.", unique: true },
        { n: "06", title: "Vendor portal", icon: Handshake, body: "Vendors get their own login to see material requirements, accept POs, upload invoices and track payments." },
        { n: "07", title: "Customer portal", icon: UsersRound, body: "Customers place orders, track dispatch, download invoices and see their ledger, without calling you." },
        { n: "08", title: "Documents", icon: FolderCog, body: "GST certificates, invoices, drawings, QC reports and e-way bills in one place." },
        { n: "09", title: "HR and payroll", icon: HardHat, body: "Attendance, shifts, payroll and productivity tracking." },
        { n: "10", title: "Analytics and AI", icon: Brain, body: "Real-time dashboard, profitability analytics, demand forecasting and an AI business assistant." },
      ],
      custom: "Need a module we haven't listed? We build it around your process.",
    },
    ai: MFG_AI,
    coreScreens: CORE_SCREENS,
    mobile: { ...MOBILE, heading: "On the factory floor? Your phone is enough." },
    traction: MFG_TRACTION,
    howItWorks: HOW_IT_WORKS,
    pricing: PRICING,
    faq: [
      faqTally, faqModular,
      { q: "Is it only for brass units?", a: "No. It's built for manufacturing and industrial SMEs, and already runs in brass, ceramic, CNC and general manufacturing businesses." },
      { q: "Can our vendors and customers use it?", a: "Yes. There's a vendor portal and a customer portal, each with its own secure login." },
      faqSecure, faqTime, faqSupport,
    ],
  },

  {
    slug: "ceramic",
    icon: Grid2x2,
    name: "Ceramic",
    title: "Ceramic ERP",
    badge: "Codelix ERP for ceramic manufacturers",
    card: "For tile and sanitaryware units: production stages from body preparation to the kiln, batch-wise stock, breakage and rejection, dispatch with e-way bill.",
    highlights: ["Production stages to the kiln", "Batch-wise stock by grade", "Breakage and rejection", "Dealer portal and dispatch"],
    seoTitle: "Ceramic ERP for Tile & Sanitaryware Makers | Codelix",
    seoDescription: "ERP for ceramic tile and sanitaryware manufacturers: production stages from body preparation to firing, batch-wise stock, breakage and rejection, dispatch with GST e-invoice and e-way bill, dealer portal, payroll and accounts.",
    keywords: "ceramic ERP, ceramic ERP software, tiles ERP software, ERP for tile manufacturers, sanitaryware ERP, ceramic industry software India, ERP for ceramic units Morbi, batch tracking software ceramic, ceramic production management software, ceramic dispatch e-way bill software",
    tagline: "Tiles and sanitaryware, from raw material to dispatch, in one system. Every batch, every breakage and every rupee accounted for.",
    facts: [["For", "Tile and sanitaryware manufacturers"], ["Works on", "Web and mobile app"], ["Built by", "Codelix IT Solutions"]],
    stats: [
      { value: "10", label: "Modules" },
      { value: "Batch-wise", label: "Stock kept by lot and grade" },
      { value: "Web + Mobile", label: "Same data, live on both" },
    ],
    problem: {
      label: "The problem",
      heading: "Boxes leave the kiln. The numbers don't follow.",
      body: "A ceramic unit makes thousands of boxes a day across sizes, grades and batches. When stock lives in registers and dispatch lives on WhatsApp, nobody knows the true stock, or the true cost per box.",
      points: [
        { icon: Layers, title: "Stock by grade in registers", body: "Which batch, which grade, which godown: written by hand and never quite right." },
        { icon: AlertTriangle, title: "Breakage that isn't counted", body: "Rejection and breakage at every stage, so the real cost per box stays a guess." },
        { icon: Dispatch, title: "Dispatch done separately", body: "Invoices, e-way bills and loading slips made one by one, outside your books." },
        { icon: MessageCircle, title: "Dealers chasing on the phone", body: "Every order status, invoice copy and ledger question is a call to your office." },
      ],
    },
    modules: {
      label: "Set up for ceramic",
      heading: "The manufacturing modules, set up for your plant.",
      body: "Ceramic units run on the same 10 modules as our manufacturing edition, configured around how a ceramic plant actually works.",
      items: [
        { n: "01", title: "Production stages", icon: Cog, body: "BOM and production planning set up for your stages, such as body preparation, pressing, glazing, firing and sorting, with WIP tracked stage by stage." },
        { n: "02", title: "Batch-wise inventory", icon: Boxes, body: "Batch tracking across godowns, so each lot's size and grade stay together, with barcode and QR." },
        { n: "03", title: "Quality, breakage and rejection", icon: AlertTriangle, body: "Quality control with rejection and scrap management, so breakage shows up in your cost instead of disappearing." },
        { n: "04", title: "Dispatch, e-invoice and e-way bill", icon: PackageCheck, body: "E-invoice (IRN and QR) and e-way bills generated from the same order, not made separately." },
        { n: "05", title: "Dealer portal", icon: UsersRound, body: "Dealers place orders, track dispatch, download invoices and check their ledger themselves." },
        { n: "06", title: "Vendor portal", icon: Handshake, body: "Raw-material and packing suppliers see your requirements, accept POs, upload invoices and track payments." },
        { n: "07", title: "Accounting and GST", icon: Calculator, body: "Full books, bank reconciliation, ITC tracking and GST returns, linked to production and dispatch." },
        { n: "08", title: "HR, shifts and payroll", icon: HardHat, body: "Shift attendance, payroll and productivity for plant staff." },
        { n: "09", title: "Documents", icon: FolderCog, body: "QC reports, test certificates, invoices and e-way bills in one place." },
        { n: "10", title: "Analytics and AI", icon: Brain, body: "Profitability by product, demand forecasting and purchase-rate alerts." },
      ],
      custom: "Different stages, grades or packing? We set it up the way your plant runs.",
    },
    ai: MFG_AI,
    coreScreens: CORE_SCREENS,
    mobile: { ...MOBILE, heading: "On the plant floor? Your phone is enough." },
    traction: MFG_TRACTION,
    howItWorks: HOW_IT_WORKS,
    pricing: PRICING,
    faq: [
      { q: "Can it keep stock by batch and grade?", a: "Yes. Batch tracking keeps each lot together across godowns, so you can see stock by size, grade and batch, and sell or dispatch from the right lot." },
      { q: "Can it track breakage and rejection?", a: "Yes. Quality control comes with rejection and scrap management, so breakage at each stage is recorded and shows up in your cost per box." },
      { q: "Can we set up our own production stages?", a: "Yes. During setup we configure production planning and WIP tracking for your plant's stages, whatever they are called in your unit." },
      { q: "Can dealers check their own orders and ledger?", a: "Yes. The dealer (customer) portal lets them place orders, track dispatch, download invoices and see their ledger without calling your office." },
      { q: "Does it make e-invoices and e-way bills?", a: "Yes. E-invoice with IRN and QR, and e-way bills, are generated from the same order and dispatch." },
      faqTally, faqStart,
    ],
  },

  {
    slug: "textile",
    icon: Shirt,
    name: "Textile",
    title: "Textile ERP",
    badge: "Codelix ERP for textile businesses",
    card: "For mills, processors and garment units: lot-wise yarn and fabric stock, production stages, job workers on a vendor portal, quality, e-invoice and e-way bill.",
    highlights: ["Lot-wise yarn and fabric stock", "Production stages and WIP", "Job workers on a portal", "Buyer portal and dispatch"],
    seoTitle: "Textile ERP for Mills & Garment Units | Codelix",
    seoDescription: "ERP for textile businesses: lot-wise yarn and fabric stock, production stages and WIP, job workers on a vendor portal, quality and rejection, GST e-invoice and e-way bill, buyer portal, payroll and accounts.",
    keywords: "textile ERP, textile ERP software, ERP for textile industry India, garment ERP software, ERP for textile mills, fabric inventory software, yarn stock management software, job work software textile, textile ERP Surat, textile ERP Ahmedabad",
    tagline: "From yarn to finished goods, every lot, every job worker and every rupee in one system.",
    facts: [["For", "Mills, processors and garment units"], ["Works on", "Web and mobile app"], ["Built by", "Codelix IT Solutions"]],
    stats: [
      { value: "10", label: "Modules" },
      { value: "Lot-wise", label: "Yarn and fabric stock" },
      { value: "Web + Mobile", label: "Same data, live on both" },
    ],
    problem: {
      label: "The problem",
      heading: "Lots of lots. Not enough answers.",
      body: "Yarn, grey fabric and finished goods move between godowns, machines and job workers every day. When that lives in registers and WhatsApp, the true stock, and the true cost of a metre or a piece, stays a guess.",
      points: [
        { icon: Layers, title: "Lots tracked by hand", body: "Which lot is where, in which godown and at which stage, kept in registers." },
        { icon: Handshake, title: "Job work on WhatsApp", body: "Rates, material and invoices for job workers spread across chats." },
        { icon: AlertTriangle, title: "Rejection that isn't counted", body: "Defects and rework aren't recorded, so the cost per metre or piece is unknown." },
        { icon: Calculator, title: "Accounts on their own", body: "Your books sit apart from production and dispatch, so GST and stock never match." },
      ],
    },
    modules: {
      label: "Set up for textile",
      heading: "The manufacturing modules, set up for textile.",
      body: "Textile businesses run on the same 10 modules as our manufacturing edition, configured around how yarn, fabric and garments actually move.",
      items: [
        { n: "01", title: "Production stages", icon: Cog, body: "Production planning set up for your stages, such as weaving, processing, dyeing or printing and stitching, with WIP tracked at each one." },
        { n: "02", title: "Lot-wise inventory", icon: Boxes, body: "Yarn, grey fabric and finished goods by lot and batch across godowns, with barcode and QR." },
        { n: "03", title: "Job workers on the vendor portal", icon: Handshake, body: "Job workers and suppliers get their own login to see requirements, accept POs, upload invoices and track payments." },
        { n: "04", title: "Quality and rejection", icon: AlertTriangle, body: "Quality control with rejection and scrap management, so defects show up in your cost." },
        { n: "05", title: "Dispatch, e-invoice and e-way bill", icon: PackageCheck, body: "E-invoice (IRN and QR) and e-way bills generated from the same order." },
        { n: "06", title: "Buyer portal", icon: UsersRound, body: "Buyers and agents place orders, track dispatch, download invoices and see their ledger." },
        { n: "07", title: "Accounting and GST", icon: Calculator, body: "Full books, bank reconciliation, ITC tracking and GST returns, linked to stock and dispatch." },
        { n: "08", title: "HR, shifts and payroll", icon: HardHat, body: "Shift attendance, payroll and productivity for mill and unit staff." },
        { n: "09", title: "Documents", icon: FolderCog, body: "Invoices, e-way bills, QC reports and certificates in one place." },
        { n: "10", title: "Analytics and AI", icon: Brain, body: "Profitability by product or order, demand forecasting and purchase-rate alerts." },
      ],
      custom: "Different stages, units or job-work flow? We set it up the way your business runs.",
    },
    ai: MFG_AI,
    coreScreens: CORE_SCREENS,
    mobile: { ...MOBILE, heading: "In the mill or the unit? Your phone is enough." },
    howItWorks: HOW_IT_WORKS,
    pricing: PRICING,
    faq: [
      { q: "Can it keep yarn and fabric stock by lot?", a: "Yes. Batch tracking keeps each lot of yarn, grey fabric and finished goods separate across godowns, with barcode and QR." },
      { q: "Can job workers use it?", a: "Yes. Job workers can be added as vendors with their own portal login, where they see your requirements, accept POs, upload invoices and track their payments." },
      { q: "Can we set up our own production stages?", a: "Yes. During setup we configure production planning and WIP tracking for your stages, whether you weave, process, print, stitch or do all of them." },
      { q: "Does it make e-invoices and e-way bills?", a: "Yes. E-invoice with IRN and QR, and e-way bills, are generated from the same order and dispatch." },
      faqTally, faqModular, faqStart,
    ],
  },
];

export const erpIndustryBySlug = (slug) => ERP_INDUSTRIES.find((i) => i.slug === slug);

/* the products-menu card: Codelix ERP with its editions inside */
export const ERP_MENU = {
  slug: "codelix-erp",
  name: "Codelix ERP",
  logo: erpMark,
  accent: ERP_ACCENT,
  badge: "ERP for every industry",
  tagline: "One ERP, set up for your industry.",
  /* the homepage product card shows two */
  stats: [
    { value: "4", label: "Industry editions" },
    { value: "Web + Mobile", label: "Same data, live on both" },
  ],
  editions: ERP_INDUSTRIES.map((i) => ({ name: i.name, path: `${ERP_PATH}/${i.slug}` })),
};
