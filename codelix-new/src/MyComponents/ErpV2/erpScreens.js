/* Screens for the manufacturing, ceramic and textile editions, drawn in
   code by ErpMock.jsx. Construction has real screenshots from its pitch
   deck; these editions don't yet, so each gets screens of its own work
   (work orders, kiln batches, lots and job workers) instead of reusing the
   construction ones. All numbers and names are sample data, and the pages
   say so. */
import { Cog, Boxes, ScanLine, ShieldCheck, Layers, AlertTriangle, Truck, Handshake } from "lucide-react";

const BLUE = "#3e7dfc";
const PINK = "#e0457b";
const ORANGE = "#f08a24";
const PURPLE = "#8b5cf6";
const TEAL = "#14a3a3";

const week = (vals, labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]) =>
  vals.map(([v, label], i) => ({ l: labels[i], v, label, today: i === vals.length - 1 }));

/* ── manufacturing ─────────────────────────────────────────────────── */
export const MFG_SCREENS = {
  hero: {
    alt: "Factory dashboard in Codelix ERP with today's output, open work orders, rejection rate, machines running, output by day and a list of what needs attention",
    screen: {
      title: "Factory Dashboard",
      sub: "All plants · live from the shop floor",
      kpis: [
        { v: "4,820 pcs", l: "Output today", tone: "green" },
        { v: "18", l: "Open work orders" },
        { v: "1.8%", l: "Rejection", tone: "amber" },
        { v: "11 / 12", l: "Machines running", tone: "blue" },
      ],
      body: {
        type: "chart",
        heading: "Output this week (pcs)",
        bars: week([[4120, "4.1k"], [4460, "4.5k"], [3980, "4.0k"], [4710, "4.7k"], [4390, "4.4k"], [3650, "3.7k"], [4820, "4.8k"]]),
        alertsHeading: "Needs attention",
        alerts: [
          { tone: "red", ref: "WO-1045 ", text: "will miss its date: brass rod short by 240 kg" },
          { tone: "amber", ref: "CNC-07 ", text: "down 42 min this shift" },
          { tone: "amber", ref: "PO-2231 ", text: "rate 9% above the last purchase" },
          { tone: "green", ref: "WO-1047 ", text: "ready for dispatch" },
        ],
      },
    },
  },
  explorer: {
    heading: "Inside the manufacturing edition.",
    body: "Pick a screen to see how it works. Shown with sample data.",
    items: [
      {
        label: "Production", icon: Cog,
        title: "Every work order, from raw material to finished goods.",
        points: [
          { title: "BOM to work order", body: "Material is reserved from the bill of materials when the order is released." },
          { title: "WIP by stage", body: "See how many pieces sit at each stage, right now." },
          { title: "Delay warnings", body: "Short material or busy machines are flagged before the date slips." },
        ],
        simple: "You open one screen and know which orders are on time and which are not.",
        alt: "Work orders screen with one card per order showing its product, stage, pieces made and whether it is on track",
        screen: {
          title: "Work Orders", sub: "18 open across 2 plants", action: "New Work Order",
          kpis: [
            { v: "18", l: "Open" },
            { v: "₹42.6 L", l: "WIP value", tone: "blue" },
            { v: "3", l: "Due this week" },
            { v: "1", l: "Delayed", tone: "red" },
          ],
          body: {
            type: "cards",
            stages: ["Cutting", "CNC", "Turning", "Plating", "Packing"],
            cards: [
              { code: "WO-1042", initials: "BV", color: BLUE, title: "Brass ball valve 1/2\"", meta: "CNC line 2 · due 28 Oct", stage: 1, progLabel: "3,200 of 5,000 pcs", progress: 64, status: "On track", tone: "green", foot: "Material reserved", footR: "₹8.4 L" },
              { code: "WO-1045", initials: "HN", color: ORANGE, title: "Hex nipple 3/4\"", meta: "Turning bay · due 26 Oct", stage: 2, progLabel: "1,150 of 4,000 pcs", progress: 29, status: "Delayed", tone: "red", foot: "Short 240 kg rod", footR: "₹5.1 L", footTone: "red" },
              { code: "WO-1047", initials: "CF", color: PURPLE, title: "Union fitting 15 mm", meta: "Plating · due 30 Oct", stage: 4, progLabel: "2,700 of 3,000 pcs", progress: 90, status: "On track", tone: "green", foot: "QC passed", footR: "₹3.9 L" },
            ],
          },
        },
      },
      {
        label: "Inventory", icon: Boxes,
        title: "Stock in every godown, by batch, at today's value.",
        points: [
          { title: "Multi-godown", body: "Raw material, WIP and finished goods across every store." },
          { title: "Batch and barcode", body: "Each batch scanned in and out, so it can be traced." },
          { title: "Low-stock alerts", body: "Reorder before production stops, not after." },
        ],
        simple: "The stock on screen is the stock on the shelf.",
        alt: "Inventory screen listing items by godown and batch with quantity, value and low-stock flags",
        screen: {
          title: "Inventory", sub: "4 godowns · valued at last purchase rate",
          kpis: [
            { v: "₹1.86 Cr", l: "Stock value", tone: "blue" },
            { v: "642", l: "Items" },
            { v: "7", l: "Below reorder level", tone: "amber" },
            { v: "₹12.4 L", l: "Slow-moving", tone: "red" },
          ],
          body: {
            type: "table",
            cols: ["Item", "Godown", "Batch", "Qty", "Value", "Status"],
            align: ["", "", "", "r", "r"],
            rows: [
              ["Brass rod 12 mm", "Main store", "B-2210", "1,240 kg", "₹6,82,000", { chip: "OK", tone: "green" }],
              ["Brass rod 19 mm", "Main store", "B-2214", "180 kg", "₹99,000", { chip: "Reorder", tone: "amber" }],
              ["Ball valve body (WIP)", "Plant 2", "WIP-881", "2,300 pcs", "₹2,07,000", { chip: "In process", tone: "blue" }],
              ["Hex nipple 3/4\" (FG)", "Dispatch bay", "FG-1903", "6,800 pcs", "₹3,40,000", { chip: "OK", tone: "green" }],
              ["Nickel anode", "Plating store", "N-0412", "35 kg", "₹63,000", { chip: "Reorder", tone: "amber" }],
            ],
          },
        },
      },
      {
        label: "CNC monitoring", icon: ScanLine,
        title: "Photograph the CNC screen. The ERP does the rest.",
        points: [
          { title: "AI reads the screen", body: "Part count and cycle time read from a photo, no manual entry." },
          { title: "By machine and operator", body: "Output and downtime for each machine, operator and shift." },
          { title: "Downtime reasons", body: "Every stop logged with a reason, so it can be fixed." },
        ],
        simple: "You see which machine is working, which one is idle, and why.",
        alt: "CNC monitoring screen listing machines with operator, shift, parts made, downtime and status",
        screen: {
          title: "CNC Monitoring", sub: "Day shift · updated 4 min ago",
          kpis: [
            { v: "11 / 12", l: "Running", tone: "green" },
            { v: "86%", l: "Utilisation", tone: "blue" },
            { v: "1 h 12 m", l: "Downtime today", tone: "amber" },
            { v: "38 s", l: "Avg cycle time" },
          ],
          body: {
            type: "table",
            cols: ["Machine", "Operator", "Job", "Parts", "Downtime", "Status"],
            align: ["", "", "", "r", "r"],
            rows: [
              ["CNC-03", "R. Patel", "WO-1042", "640", "0 m", { chip: "Running", tone: "green" }],
              ["CNC-05", "S. Khan", "WO-1042", "612", "8 m", { chip: "Running", tone: "green" }],
              ["CNC-07", "M. Desai", "WO-1045", "214", "42 m", { chip: "Tool change", tone: "amber" }],
              ["CNC-09", "A. Joshi", "WO-1047", "588", "5 m", { chip: "Running", tone: "green" }],
              ["CNC-11", "—", "—", "0", "2 h", { chip: "Idle", tone: "red" }],
            ],
          },
        },
      },
      {
        label: "Quality", icon: ShieldCheck,
        title: "Rejection and scrap, counted where they happen.",
        points: [
          { title: "Inspection at each stage", body: "Checked, passed and rejected, with the reason." },
          { title: "Scrap back to stock", body: "Scrap brass is weighed and returned to inventory." },
          { title: "Cost of rejection", body: "Every rejected piece shows up in the product's cost." },
        ],
        simple: "You know exactly how much rejection is costing you, and where it starts.",
        alt: "Quality screen listing inspections with work order, pieces checked, rejected, rejection percentage and the main reason",
        screen: {
          title: "Quality Control", sub: "This week · 14 inspections",
          kpis: [
            { v: "21,480", l: "Pieces checked" },
            { v: "1.8%", l: "Rejected", tone: "amber" },
            { v: "312 kg", l: "Scrap returned", tone: "blue" },
            { v: "₹38,600", l: "Cost of rejection", tone: "red" },
          ],
          body: {
            type: "table",
            cols: ["Inspection", "Work order", "Checked", "Rejected", "Reason", "Result"],
            align: ["", "", "r", "r"],
            rows: [
              ["QC-3301", "WO-1042", "3,200", "38", "Thread depth", { chip: "Passed", tone: "green" }],
              ["QC-3302", "WO-1045", "1,150", "61", "Burr on face", { chip: "Rework", tone: "amber" }],
              ["QC-3303", "WO-1047", "2,700", "22", "Plating spots", { chip: "Passed", tone: "green" }],
              ["QC-3304", "WO-1039", "4,000", "190", "Wrong OD", { chip: "On hold", tone: "red" }],
            ],
          },
        },
      },
    ],
  },
};

/* ── ceramic ───────────────────────────────────────────────────────── */
const KILN_STAGES = ["Body prep", "Pressing", "Glazing", "Firing", "Sorting"];

export const CERAMIC_SCREENS = {
  hero: {
    alt: "Ceramic plant dashboard in Codelix ERP with boxes packed today, batches in the kiln, breakage, premium grade share, boxes by day and a list of what needs attention",
    screen: {
      title: "Plant Dashboard",
      sub: "Tiles plant · live from the floor",
      kpis: [
        { v: "12,480", l: "Boxes packed today", tone: "green" },
        { v: "3", l: "Batches in the kiln", tone: "blue" },
        { v: "2.3%", l: "Breakage", tone: "amber" },
        { v: "86%", l: "Premium grade" },
      ],
      body: {
        type: "chart",
        heading: "Boxes packed this week",
        bars: week([[11200, "11.2k"], [11850, "11.9k"], [10400, "10.4k"], [12100, "12.1k"], [11600, "11.6k"], [9800, "9.8k"], [12480, "12.5k"]]),
        alertsHeading: "Needs attention",
        alerts: [
          { tone: "red", ref: "BT-2614 ", text: "4.1% breakage at sorting" },
          { tone: "amber", ref: "Glaze stock ", text: "enough for 2 days" },
          { tone: "green", ref: "SO-884 ", text: "1,800 boxes ready to load" },
          { tone: "amber", ref: "Dealer ", text: "Shiv Tiles is past its credit limit" },
        ],
      },
    },
  },
  explorer: {
    heading: "Inside the ceramic edition.",
    body: "Pick a screen to see how it works. Shown with sample data.",
    items: [
      {
        label: "Production stages", icon: Cog,
        title: "Every batch, from body preparation to sorting.",
        points: [
          { title: "Your stages", body: "Set up the stages your plant actually runs." },
          { title: "WIP at each stage", body: "Square metres and boxes at every step, right now." },
          { title: "Kiln at a glance", body: "Which batch is firing, and when it comes out." },
        ],
        simple: "You see where every batch is without walking the plant.",
        alt: "Production screen with one card per batch showing its tile size, the stage it has reached from body preparation to sorting, and its progress",
        screen: {
          title: "Batches", sub: "9 batches in production", action: "New Batch",
          kpis: [
            { v: "9", l: "In production" },
            { v: "3", l: "In the kiln", tone: "blue" },
            { v: "18,600 m²", l: "WIP" },
            { v: "1", l: "High breakage", tone: "red" },
          ],
          body: {
            type: "cards",
            stages: KILN_STAGES,
            cards: [
              { code: "BT-2611", initials: "GV", color: BLUE, title: "600×600 Glossy GVT", meta: "Line 1 · Kiln 2", stage: 3, progLabel: "4,200 of 5,600 m²", progress: 75, status: "Firing", tone: "blue", foot: "Breakage 1.6%", footR: "Premium 91%", footTone: "green" },
              { code: "BT-2612", initials: "WT", color: TEAL, title: "300×450 Wall tile", meta: "Line 3 · Glazing", stage: 2, progLabel: "2,100 of 6,000 m²", progress: 35, status: "On track", tone: "green", foot: "Breakage 0.9%", footR: "—" },
              { code: "BT-2614", initials: "PG", color: PINK, title: "600×1200 Matt PGVT", meta: "Line 2 · Sorting", stage: 4, progLabel: "5,300 of 5,500 m²", progress: 96, status: "Check", tone: "red", foot: "Breakage 4.1%", footR: "Premium 78%", footTone: "red" },
            ],
          },
        },
      },
      {
        label: "Stock by grade", icon: Layers,
        title: "Every design, size, batch and grade, in the right godown.",
        points: [
          { title: "Batch-wise", body: "Each lot kept together, so shades never mix in one order." },
          { title: "By grade", body: "Premium, standard and commercial counted separately." },
          { title: "Barcode on every box", body: "Scan in from sorting, scan out at loading." },
        ],
        simple: "When a dealer asks for 500 boxes of one shade, you know if you have them.",
        alt: "Stock screen listing tile designs by size and batch with boxes in premium, standard and commercial grade and the godown",
        screen: {
          title: "Stock by Grade", sub: "3 godowns · boxes",
          kpis: [
            { v: "1,84,200", l: "Boxes in stock" },
            { v: "₹3.4 Cr", l: "Stock value", tone: "blue" },
            { v: "212", l: "Batches" },
            { v: "14", l: "Ageing over 90 days", tone: "amber" },
          ],
          body: {
            type: "table",
            cols: ["Design", "Size", "Batch", "Premium", "Standard", "Commercial", "Godown"],
            align: ["", "", "", "r", "r", "r"],
            rows: [
              ["Statuario Glossy", "600×600", "BT-2598", "4,820", "610", "140", "Godown A"],
              ["Carrara Matt", "600×1200", "BT-2603", "2,960", "420", "95", "Godown A"],
              ["Wooden Strip Oak", "200×1200", "BT-2590", "3,410", "380", "210", "Godown B"],
              ["Kitchen Highlighter", "300×450", "BT-2607", "6,200", "540", "60", "Godown C"],
              ["Rustic Grey", "600×600", "BT-2571", "1,150", "890", "430", "Godown B"],
            ],
          },
        },
      },
      {
        label: "Breakage", icon: AlertTriangle,
        title: "Breakage at every stage, in your cost per box.",
        points: [
          { title: "Counted at each stage", body: "Pressing, glazing, firing and sorting each record their losses." },
          { title: "By line and batch", body: "Find the line or batch where breakage starts." },
          { title: "Real cost per box", body: "Losses roll into the cost of the boxes you sell." },
        ],
        simple: "Breakage stops being a guess and becomes a number you can bring down.",
        alt: "Breakage screen listing stages and batches with input, pieces broken and breakage percentage",
        screen: {
          title: "Breakage & Rejection", sub: "This week · all lines",
          kpis: [
            { v: "2.3%", l: "Overall breakage", tone: "amber" },
            { v: "Sorting", l: "Highest stage", tone: "red" },
            { v: "1,940", l: "Boxes lost" },
            { v: "₹4.1 L", l: "Cost of breakage", tone: "red" },
          ],
          body: {
            type: "table",
            cols: ["Stage", "Batch", "Input (m²)", "Broken (m²)", "Breakage", "Trend"],
            align: ["", "", "r", "r", "r"],
            rows: [
              ["Pressing", "BT-2611", "5,820", "64", "1.1%", { chip: "Normal", tone: "green" }],
              ["Glazing", "BT-2612", "6,240", "56", "0.9%", { chip: "Normal", tone: "green" }],
              ["Firing", "BT-2611", "5,690", "97", "1.7%", { chip: "Watch", tone: "amber" }],
              ["Sorting", "BT-2614", "5,520", "226", "4.1%", { chip: "High", tone: "red" }],
            ],
          },
        },
      },
      {
        label: "Dispatch", icon: Truck,
        title: "From dealer order to loaded truck, with the e-way bill.",
        points: [
          { title: "Pick from the right batch", body: "Loading slips name the batch and grade." },
          { title: "E-invoice and e-way bill", body: "Made from the same order, not typed again." },
          { title: "Dealer ledger", body: "Credit limits checked before the truck leaves." },
        ],
        simple: "One order becomes the loading slip, the invoice and the e-way bill.",
        alt: "Dispatch screen listing dealer orders with boxes, vehicle number, e-way bill and loading status",
        screen: {
          title: "Dispatch", sub: "Today · 11 orders",
          kpis: [
            { v: "11", l: "Orders today" },
            { v: "8,640", l: "Boxes to load", tone: "blue" },
            { v: "7", l: "E-way bills made", tone: "green" },
            { v: "1", l: "On credit hold", tone: "red" },
          ],
          body: {
            type: "table",
            cols: ["Order", "Dealer", "Boxes", "Vehicle", "E-way bill", "Status"],
            align: ["", "", "r"],
            rows: [
              ["SO-884", "Om Ceramics, Rajkot", "1,800", "GJ03 AX 4412", "7814 2290 1153", { chip: "Loading", tone: "blue" }],
              ["SO-886", "Kaveri Tiles, Pune", "1,240", "MH12 KL 0981", "7814 2290 1188", { chip: "Dispatched", tone: "green" }],
              ["SO-887", "Shiv Tiles, Indore", "960", "—", "—", { chip: "Credit hold", tone: "red" }],
              ["SO-889", "Ganga Traders, Jaipur", "2,100", "RJ14 GB 7720", "Generating", { chip: "Ready", tone: "amber" }],
            ],
          },
        },
      },
    ],
  },
};

/* ── textile ───────────────────────────────────────────────────────── */
const TEXTILE_STAGES = ["Yarn", "Weaving", "Processing", "Printing", "Finished"];

export const TEXTILE_SCREENS = {
  hero: {
    alt: "Textile dashboard in Codelix ERP with metres woven today, active lots, fabric at job workers, rejection, metres by day and a list of what needs attention",
    screen: {
      title: "Mill Dashboard",
      sub: "Weaving and processing · live",
      kpis: [
        { v: "18,450 m", l: "Woven today", tone: "green" },
        { v: "36", l: "Active lots" },
        { v: "18,200 m", l: "At job workers", tone: "blue" },
        { v: "1.4%", l: "Rejection", tone: "amber" },
      ],
      body: {
        type: "chart",
        heading: "Metres woven this week",
        bars: week([[16900, "16.9k"], [17600, "17.6k"], [15800, "15.8k"], [18100, "18.1k"], [17300, "17.3k"], [14200, "14.2k"], [18450, "18.5k"]]),
        alertsHeading: "Needs attention",
        alerts: [
          { tone: "red", ref: "LOT-2411 ", text: "at the printer 6 days past due" },
          { tone: "amber", ref: "Cotton 40s ", text: "yarn enough for 3 days" },
          { tone: "green", ref: "Order B-552 ", text: "packed, 4,800 m ready" },
          { tone: "amber", ref: "Job work bill ", text: "₹1.2 L waiting for approval" },
        ],
      },
    },
  },
  explorer: {
    heading: "Inside the textile edition.",
    body: "Pick a screen to see how it works. Shown with sample data.",
    items: [
      {
        label: "Lots", icon: Layers,
        title: "Every lot, from yarn to finished fabric.",
        points: [
          { title: "Your stages", body: "Weaving, processing, dyeing, printing or stitching, as you run them." },
          { title: "Metres at every stage", body: "Input, output and loss for each lot." },
          { title: "In-house or job work", body: "See which lot is in your unit and which is outside." },
        ],
        simple: "Ask where a lot is, and the answer is one click away.",
        alt: "Lots screen with one card per lot showing the fabric, the stage it has reached from yarn to finished, and metres done",
        screen: {
          title: "Lots", sub: "36 active lots", action: "New Lot",
          kpis: [
            { v: "36", l: "Active lots" },
            { v: "1,24,500 m", l: "Fabric in process", tone: "blue" },
            { v: "9", l: "At job workers" },
            { v: "2", l: "Past due", tone: "red" },
          ],
          body: {
            type: "cards",
            stages: TEXTILE_STAGES,
            cards: [
              { code: "LOT-2408", initials: "CP", color: BLUE, title: "Cotton poplin 58\"", meta: "In house · Processing", stage: 2, progLabel: "8,400 of 12,000 m", progress: 70, status: "On track", tone: "green", foot: "Loss 1.1%", footR: "Order B-548" },
              { code: "LOT-2411", initials: "RP", color: PINK, title: "Rayon print 44\"", meta: "Job worker · Sai Prints", stage: 3, progLabel: "3,100 of 9,500 m", progress: 33, status: "Past due", tone: "red", foot: "6 days late", footR: "Order B-552", footTone: "red" },
              { code: "LOT-2413", initials: "GS", color: ORANGE, title: "Grey sheeting 90\"", meta: "Looms 12–20 · Weaving", stage: 1, progLabel: "6,900 of 15,000 m", progress: 46, status: "On track", tone: "green", foot: "Loss 0.6%", footR: "Stock" },
            ],
          },
        },
      },
      {
        label: "Job work", icon: Handshake,
        title: "Fabric sent out, fabric back, and what you owe.",
        points: [
          { title: "Challan out and in", body: "Every metre sent to a job worker and every metre returned." },
          { title: "Pending at each worker", body: "See what is still outside, and for how long." },
          { title: "Rates and bills", body: "Job work bills checked against agreed rates before payment." },
        ],
        simple: "No more counting on the phone how much fabric is at which job worker.",
        alt: "Job work screen listing job workers with their process, lot, metres sent, received and pending, and status",
        screen: {
          title: "Job Work", sub: "9 job workers · this month",
          kpis: [
            { v: "18,200 m", l: "Pending outside", tone: "blue" },
            { v: "₹6.8 L", l: "Job work this month" },
            { v: "₹1.2 L", l: "Bills to approve", tone: "amber" },
            { v: "2", l: "Past due", tone: "red" },
          ],
          body: {
            type: "table",
            cols: ["Job worker", "Process", "Lot", "Sent (m)", "Back (m)", "Pending", "Status"],
            align: ["", "", "", "r", "r", "r"],
            rows: [
              ["Sai Prints", "Printing", "LOT-2411", "9,500", "3,100", "6,400", { chip: "Past due", tone: "red" }],
              ["Shree Dyeing Works", "Dyeing", "LOT-2409", "7,200", "6,950", "250", { chip: "Closing", tone: "green" }],
              ["Patel Finishers", "Finishing", "LOT-2402", "5,800", "2,400", "3,400", { chip: "On time", tone: "blue" }],
              ["Kiran Stitching", "Stitching", "LOT-2398", "4,000 pcs", "1,800 pcs", "2,200 pcs", { chip: "On time", tone: "blue" }],
            ],
          },
        },
      },
      {
        label: "Stock", icon: Boxes,
        title: "Yarn, grey and finished fabric, lot by lot.",
        points: [
          { title: "Every form of stock", body: "Yarn in kg, fabric in metres, garments in pieces." },
          { title: "Lot and godown", body: "Each lot kept separate, wherever it sits." },
          { title: "Reorder alerts", body: "Know before a yarn count runs out." },
        ],
        simple: "One stock list for yarn, fabric and garments, always up to date.",
        alt: "Stock screen listing yarn and fabric items by lot and godown with quantity and status",
        screen: {
          title: "Stock", sub: "3 godowns · yarn, grey and finished",
          kpis: [
            { v: "₹2.2 Cr", l: "Stock value", tone: "blue" },
            { v: "38,400 kg", l: "Yarn" },
            { v: "86,000 m", l: "Finished fabric", tone: "green" },
            { v: "4", l: "Below reorder", tone: "amber" },
          ],
          body: {
            type: "table",
            cols: ["Item", "Lot", "Godown", "Qty", "Value", "Status"],
            align: ["", "", "", "r", "r"],
            rows: [
              ["Cotton yarn 40s", "Y-1182", "Yarn store", "2,150 kg", "₹6,02,000", { chip: "Reorder", tone: "amber" }],
              ["Viscose yarn 30s", "Y-1190", "Yarn store", "8,400 kg", "₹19,32,000", { chip: "OK", tone: "green" }],
              ["Grey sheeting 90\"", "LOT-2401", "Grey godown", "22,600 m", "₹18,08,000", { chip: "OK", tone: "green" }],
              ["Cotton poplin 58\" (dyed)", "LOT-2396", "FG godown", "14,200 m", "₹15,62,000", { chip: "Reserved", tone: "blue" }],
            ],
          },
        },
      },
      {
        label: "Buyer orders", icon: Truck,
        title: "Buyer orders, from booking to dispatch.",
        points: [
          { title: "Order to lot", body: "Each buyer order linked to the lots that fill it." },
          { title: "Dispatch with e-way bill", body: "Invoice and e-way bill made from the same order." },
          { title: "Buyer portal", body: "Buyers and agents see their own orders and ledger." },
        ],
        simple: "You and your buyer see the same order status, without a phone call.",
        alt: "Buyer orders screen listing orders with buyer, fabric, metres ordered and ready, due date and status",
        screen: {
          title: "Buyer Orders", sub: "14 open orders",
          kpis: [
            { v: "14", l: "Open orders" },
            { v: "₹48.6 L", l: "Order value", tone: "blue" },
            { v: "4,800 m", l: "Ready to dispatch", tone: "green" },
            { v: "1", l: "At risk", tone: "red" },
          ],
          body: {
            type: "table",
            cols: ["Order", "Buyer", "Fabric", "Ordered", "Ready", "Status"],
            align: ["", "", "", "r", "r"],
            rows: [
              ["B-548", "Aarav Garments, Tiruppur", "Cotton poplin", "12,000 m", "8,400 m", { chip: "In process", tone: "blue" }],
              ["B-552", "Meera Fashions, Delhi", "Rayon print", "9,500 m", "3,100 m", { chip: "At risk", tone: "red" }],
              ["B-553", "Om Textiles, Surat", "Grey sheeting", "4,800 m", "4,800 m", { chip: "Ready", tone: "green" }],
              ["B-555", "Nova Exports, Mumbai", "Cotton twill", "6,000 m", "0 m", { chip: "Planned", tone: "amber" }],
            ],
          },
        },
      },
    ],
  },
};
