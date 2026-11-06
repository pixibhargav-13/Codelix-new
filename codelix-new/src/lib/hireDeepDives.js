/* Technology-specific sections for the hire pages that rank in striking
   distance (positions 8–26 for "hire <tech> developers india", Search Console
   Aug–Nov 2026). Before this, about 210 of the ~900 words on each hire page
   were about the technology; the rest was shared with all 21 pages.

   Each page gets three blocks, rendered by Shared/DeepDive like every other
   deep-dive section: the comparison buyers make before hiring, the questions
   worth asking any developer in that stack, and what the first two weeks
   involve. The content is technical knowledge about the stack, plus company
   facts the site already states (proposal in 48 hours, a first small task
   in week one); no new numbers or claims about Codelix. */

const BLOG = "/blog/";
const hire = (slug, label) => ({ label: label || `Hire ${slug} developers`, href: `/hire-developers/${slug}` });

export const HIRE_DEEP_DIVES = {
  "/hire-developers/react-native": [
    {
      id: "rn-compare",
      label: "React Native vs Flutter vs Native",
      question: "React Native, Flutter or native: which should you hire for?",
      answer: "Hire React Native developers when your team or website already uses React and JavaScript: the mobile app can share logic, types and even people with the web app. Pick Flutter for a new app where an identical custom UI on every phone matters most, and native Kotlin and Swift only for heavy device, graphics or AR work.",
      table: {
        highlight: 1,
        cols: ["", "React Native", "Flutter", "Native (Kotlin + Swift)"],
        rows: [
          ["Language", "JavaScript / TypeScript", "Dart", "Kotlin and Swift"],
          ["Codebases for Android + iOS", "One", "One", "Two"],
          ["How the UI is drawn", "Native platform components", "Its own rendering engine", "Native platform components"],
          ["Shares code with a React website", "Yes: logic, types, API clients", "No", "No"],
          ["Update JavaScript without a store release", "Yes, with Expo EAS Update", "No", "No"],
          ["Best for", "Teams already on React", "New apps with a custom UI", "Heavy device, AR, graphics"],
        ],
      },
      more: [
        { label: "Flutter vs React Native, in detail", href: `${BLOG}flutter-vs-react-native` },
        hire("flutter", "Hire Flutter developers"),
        { label: "App development cost in India", href: `${BLOG}app-development-cost-in-india` },
      ],
    },
    {
      id: "rn-vetting",
      label: "Before You Hire",
      question: "What should you ask a React Native developer before hiring?",
      answer: "Ask about what breaks in production, not syntax: the New Architecture and native modules, how they release to both stores, and how they find a slow screen. Someone who has shipped real apps answers these with stories, not definitions.",
      points: [
        { title: "The New Architecture", body: "Have they moved an app to the New Architecture (Fabric and TurboModules), and what broke? It has been the default since React Native 0.76, so libraries that weren't ready show up here." },
        { title: "Expo or bare workflow", body: "When would they use Expo and when a bare project? A current answer mentions development builds and config plugins, not \"Expo can't run native code\"." },
        { title: "Finding a slow screen", body: "How do they track down a janky list or a slow start-up? Listen for the React Native DevTools profiler, Hermes, and list tuning with FlatList or FlashList." },
        { title: "Shipping to both stores", body: "Have they handled iOS signing, an App Store review rejection and a staged rollout on Google Play themselves?" },
        { title: "Native code when needed", body: "Can they write a small native module in Kotlin or Swift when no library covers what you need?" },
      ],
    },
    {
      id: "rn-first-weeks",
      label: "The First Two Weeks",
      question: "What happens in the first two weeks with a React Native developer?",
      answer: "Week one is setup and one small, real change shipped through your review process. In week two the developer writes a short health note on the app and moves onto your backlog, with both store builds working.",
      points: [
        { title: "Days 1–2: both builds running", body: "Clone your repository and get the Android and iOS builds working locally and in CI, noting anything that only builds on one person's machine." },
        { title: "Days 3–5: a first small fix", body: "One real ticket from your backlog, reviewed and merged your way, so you see how the developer works before larger tasks." },
        { title: "Week 2: a health note", body: "Outdated packages, New Architecture readiness, crash reports and the slowest screens, written up with what to fix first." },
        { title: "Week 2 on: your backlog", body: "Regular tickets, each delivered as a build you can install and test on your own phone." },
      ],
    },
  ],

  "/hire-developers/angular": [
    {
      id: "ng-compare",
      label: "Angular vs React vs Vue",
      question: "Angular, React or Vue: when is Angular the right hire?",
      answer: "Hire Angular developers when you have, or want, one large structured application that many developers work on: Angular ships routing, forms, HTTP, dependency injection and testing in one opinionated framework. React suits teams that want to choose their own libraries, and Vue smaller apps that need to move quickly.",
      table: {
        highlight: 1,
        cols: ["", "Angular", "React", "Vue"],
        rows: [
          ["What it is", "A full framework", "A UI library", "A progressive framework"],
          ["Language", "TypeScript by default", "JavaScript or TypeScript", "JavaScript or TypeScript"],
          ["Comes built in", "Router, forms, HTTP client, DI, testing", "Rendering; router and state are add-ons", "Rendering, official router and Pinia"],
          ["Structure for big teams", "Enforced by the framework", "Set by your own conventions", "Set by your own conventions"],
          ["Typical fit", "Enterprise portals and admin systems", "SaaS front-ends, varied products", "Smaller apps, gradual adoption"],
        ],
      },
      more: [hire("react", "Hire React developers"), hire("vuejs", "Hire Vue.js developers")],
    },
    {
      id: "ng-vetting",
      label: "Before You Hire",
      question: "What should you ask an Angular developer before hiring?",
      answer: "Ask about the parts of Angular that changed recently and the parts that cause most bugs: signals and change detection, standalone components, RxJS subscriptions and upgrades across major versions.",
      points: [
        { title: "Signals and change detection", body: "How do they use signals alongside RxJS, and when do they switch a component to OnPush? Signals arrived in Angular 16, so the answer separates current from dated experience." },
        { title: "Standalone components", body: "Have they moved a module-based app to standalone components? They have been the default for new projects since Angular 17." },
        { title: "RxJS in practice", body: "Can they explain switchMap against mergeMap with a real case such as search-as-you-type? Many Angular bugs are subscriptions that never end." },
        { title: "State management", body: "When do they reach for NgRx, and when is a service with signals enough?" },
        { title: "Upgrades", body: "Have they run ng update across several major versions, or migrated an AngularJS app?" },
      ],
    },
    {
      id: "ng-first-weeks",
      label: "The First Two Weeks",
      question: "What happens in the first two weeks with an Angular developer?",
      answer: "The first days go on getting the app and its tests running against your backend; by the end of week one there is a small change merged, and week two brings a note on versions and dependencies before regular backlog work.",
      points: [
        { title: "Days 1–2: app and tests running", body: "The application, its unit tests and end-to-end tests running locally and in CI against your backend or a mock of it." },
        { title: "Days 3–5: one real ticket", body: "A small feature or fix in one module, often a form, a table or a validation rule, through your review process." },
        { title: "Week 2: a version note", body: "Which Angular version you're on, how far behind the libraries are, and whether ng update can move you forward safely." },
        { title: "Week 2 on: module by module", body: "Work from your backlog with each change demoed on your staging environment." },
      ],
    },
  ],

  "/hire-developers/nodejs": [
    {
      id: "node-compare",
      label: "Node.js vs Laravel vs Python",
      question: "Node.js, Laravel or Python: which backend should you hire for?",
      answer: "Hire Node.js developers when the backend is mostly APIs, integrations and real-time features, or when your frontend team already writes JavaScript. Laravel ships admin-heavy business apps faster because more comes built in, and Python is the pick when the backend does heavy data processing or AI.",
      table: {
        highlight: 1,
        cols: ["", "Node.js", "Laravel (PHP)", "Python (Django / FastAPI)"],
        rows: [
          ["Strongest at", "APIs, real-time, integrations", "Admin-heavy business apps", "Data- and AI-backed services"],
          ["How it handles many requests", "Event loop, non-blocking I/O", "A process per request (PHP-FPM)", "Async in FastAPI; Django mostly synchronous"],
          ["Real-time (WebSockets)", "A natural fit (Socket.IO, ws)", "Through Reverb or Pusher", "Through Django Channels or FastAPI"],
          ["Same language as a React frontend", "Yes", "No", "No"],
          ["Admin panel and auth", "Libraries or NestJS modules", "Built in, plus Filament or Nova", "Built in with Django"],
        ],
      },
      more: [hire("laravel", "Hire Laravel developers"), hire("python", "Hire Python developers"), { label: "Laravel vs Node.js for business web apps", href: `${BLOG}laravel-vs-node-js-for-business-web-apps` }],
    },
    {
      id: "node-vetting",
      label: "Before You Hire",
      question: "What should you ask a Node.js developer before hiring?",
      answer: "Ask how they keep a Node.js service healthy under load and in production: what blocks the event loop, how errors and shutdowns are handled, how the database is accessed, and how a slow request gets traced.",
      points: [
        { title: "The event loop", body: "What blocks it, and how would they find out? A good answer mentions CPU-heavy work moved to worker threads or a queue, and profiling with --inspect or clinic.js." },
        { title: "Errors and shutdown", body: "How do they handle unhandled promise rejections, and how does the service shut down cleanly during a deploy?" },
        { title: "Database access", body: "How do they avoid N+1 queries and run migrations safely with Prisma, Sequelize or TypeORM?" },
        { title: "Security basics", body: "How do they validate input (zod or class-validator), keep secrets out of the code, and rate-limit a public API?" },
        { title: "Observability", body: "What do they log, and how would they trace one slow request across several services?" },
      ],
    },
    {
      id: "node-first-weeks",
      label: "The First Two Weeks",
      question: "What happens in the first two weeks with a Node.js developer?",
      answer: "The service, its database and queues run locally in the first days, a first endpoint or fix ships with tests and docs by the end of week one, and week two starts with a short written note on risks.",
      points: [
        { title: "Days 1–2: running locally", body: "The service, its database and queues running in Docker, with seed data shaped like production." },
        { title: "Days 3–5: one endpoint or fix", body: "A real ticket shipped with tests and updated Swagger/OpenAPI docs." },
        { title: "Week 2: a risk note", body: "Node.js version, an npm audit, error handling, slow queries and missing tests, ranked by risk." },
        { title: "Week 2 on: your backlog", body: "Endpoints and integrations from your backlog, each documented before it is marked done." },
      ],
    },
  ],

  "/hire-developers/python": [
    {
      id: "py-compare",
      label: "Django vs FastAPI vs Flask",
      question: "Django, FastAPI or Flask: what kind of Python developer do you need?",
      answer: "Hire a Django developer for a full web application with an admin, authentication and a database; a FastAPI developer for fast, typed APIs behind a mobile app, an AI feature or a data service. Flask suits small services that need little structure.",
      table: {
        cols: ["", "Django", "FastAPI", "Flask"],
        rows: [
          ["Best for", "Full web apps with an admin", "APIs, AI and data services", "Small services and prototypes"],
          ["Comes built in", "ORM, admin, auth, forms, migrations", "Validation (Pydantic), OpenAPI docs", "Routing; the rest from extensions"],
          ["Async", "Partial: async views, mostly sync ORM", "Async-first", "Limited"],
          ["API documentation", "Via Django REST Framework", "Generated automatically", "Via extensions"],
          ["Usually paired with", "DRF, Celery, PostgreSQL", "Pydantic, SQLAlchemy, Uvicorn", "SQLAlchemy, Gunicorn"],
        ],
      },
      more: [hire("ai", "Hire AI developers"), { label: "Data engineering services", href: "/services/data-engineering" }],
    },
    {
      id: "py-vetting",
      label: "Before You Hire",
      question: "What should you ask a Python developer before hiring?",
      answer: "Ask about the problems that appear once Python code runs every day: slow ORM queries, async code that quietly blocks, background jobs that fail halfway, and environments that drift from what was tested.",
      points: [
        { title: "The Django ORM", body: "How do they find and fix N+1 queries with select_related and prefetch_related, and run migrations without downtime?" },
        { title: "Async that helps", body: "When does async in FastAPI actually help, and what happens if a blocking library is called inside an async endpoint?" },
        { title: "Background jobs", body: "How do they run long jobs with Celery and Redis, set retries, and recover a task that failed halfway?" },
        { title: "Pinned environments", body: "How do they pin dependencies (pip-tools, Poetry or uv) so the server runs exactly what was tested?" },
        { title: "Data that doesn't fit", body: "For a pandas job, what do they do with a file too large for memory?" },
      ],
    },
    {
      id: "py-first-weeks",
      label: "The First Two Weeks",
      question: "What happens in the first two weeks with a Python developer?",
      answer: "The environment is pinned and tests run in CI within the first days, one real change ships by the end of week one, and week two starts with a note on versions, packages and jobs that could fail silently.",
      points: [
        { title: "Days 1–2: environment pinned", body: "Virtual environment, dependencies and a local database matching production, with the test suite running in CI." },
        { title: "Days 3–5: a first change", body: "One real ticket, such as an endpoint, a report or an automation step, shipped with tests." },
        { title: "Week 2: a risk note", body: "Python and framework versions, unpinned packages, slow queries and jobs without retries." },
        { title: "Week 2 on: your backlog", body: "Backlog work, with scheduled jobs and scripts logged so a failure is seen the same day." },
      ],
    },
  ],

  "/hire-developers/full-stack": [
    {
      id: "fs-compare",
      label: "Full-Stack vs Specialists",
      question: "One full-stack developer, or separate frontend and backend developers?",
      answer: "Hire a full-stack developer when one person can own a feature end to end: an MVP, an internal tool or a small product team. Separate frontend and backend specialists pay off once the product has a large interface, a complex backend, or enough work to keep someone busy on each side.",
      table: {
        highlight: 1,
        cols: ["", "Full-stack developer", "Frontend + backend pair", "A full team"],
        rows: [
          ["Best for", "MVPs, internal tools, small products", "Growing products with steady work on both sides", "Several products or a large platform"],
          ["Hand-offs", "None: one person owns the feature", "Between two people, over the API", "Managed by a lead"],
          ["Depth", "Broad across the stack", "Deep in each half", "Deep, plus QA and DevOps"],
          ["Monthly cost", "One developer", "Two developers", "Several, plus a lead"],
          ["Time to move on", "When the backlog outgrows one person", "When you need QA, DevOps or design", "—"],
        ],
      },
      more: [hire("mern", "Hire MERN stack developers"), hire("react", "Hire React developers"), hire("nodejs", "Hire Node.js developers")],
    },
    {
      id: "fs-vetting",
      label: "Before You Hire",
      question: "What should you ask a full-stack developer before hiring?",
      answer: "Ask where they are strongest, because everyone is deeper on one side, then check the joins: data modelling, keeping the API and the UI in step, deploying on their own, and testing across both layers.",
      points: [
        { title: "Their stronger half", body: "Which side do they go deeper on? The answer tells you where their work will need the most review." },
        { title: "Data modelling", body: "Can they design the tables and indexes for a feature before building the screen for it?" },
        { title: "Keeping API and UI in step", body: "How do they stop the frontend and backend drifting apart: OpenAPI, shared TypeScript types or tRPC?" },
        { title: "Deploying alone", body: "Can they set up CI, environment variables and a staging deploy without help?" },
        { title: "Testing both layers", body: "What do they test at the API, and what in the browser with Playwright or Cypress?" },
      ],
    },
    {
      id: "fs-first-weeks",
      label: "The First Two Weeks",
      question: "What happens in the first two weeks with a full-stack developer?",
      answer: "The whole stack runs locally and on staging in the first days, one small feature ships end to end by the end of week one, and week two starts with a short map of the system and its risky parts.",
      points: [
        { title: "Days 1–2: the whole stack running", body: "Database, backend and frontend running locally and on a staging environment." },
        { title: "Days 3–5: one feature end to end", body: "A small feature from database table to finished screen, so you see their work on both sides." },
        { title: "Week 2: a map of the system", body: "How the parts connect, where tests are missing and what is risky to change, in one short note." },
        { title: "Week 2 on: whole features", body: "Backlog features, each with its migration, API change and screen in one pull request." },
      ],
    },
  ],

  "/hire-developers/flutter": [
    {
      id: "fl-compare",
      label: "Flutter vs React Native vs Native",
      question: "Flutter, React Native or native: when should you hire Flutter developers?",
      answer: "Hire Flutter developers for a new app that has to look and behave the same on Android and iOS from one codebase, especially with a custom design. React Native fits better if your team already works in React, and native Kotlin and Swift only for heavy device, graphics or AR work.",
      table: {
        highlight: 1,
        cols: ["", "Flutter", "React Native", "Native (Kotlin + Swift)"],
        rows: [
          ["Language", "Dart", "JavaScript / TypeScript", "Kotlin and Swift"],
          ["How the UI is drawn", "Its own widgets and rendering engine", "Native platform components", "Native platform components"],
          ["Same look on every phone", "Yes, identical", "Close; follows each platform", "Designed per platform"],
          ["Web and desktop from the same code", "Yes", "Web through React Native Web", "No"],
          ["Best for", "New apps with a custom UI", "Teams already on React", "Heavy device, AR, graphics"],
        ],
      },
      more: [
        { label: "Flutter vs React Native, in detail", href: `${BLOG}flutter-vs-react-native` },
        hire("react-native", "Hire React Native developers"),
        { label: "App development cost in India", href: `${BLOG}app-development-cost-in-india` },
      ],
    },
    {
      id: "fl-vetting",
      label: "Before You Hire",
      question: "What should you ask a Flutter developer before hiring?",
      answer: "Ask for the reasons behind their choices and about the parts outside Dart: why a state-management approach, how they reach native code, how they find dropped frames, and what they have learned from store reviews.",
      points: [
        { title: "State management", body: "Why would they pick Riverpod, Bloc or Provider for your app? Any of the three can work; a clear reason is what matters." },
        { title: "Platform channels", body: "Have they written a platform channel to call Kotlin or Swift code that no plugin covered?" },
        { title: "Dropped frames", body: "How do they find jank with the DevTools performance view and keep long lists smooth?" },
        { title: "Store releases", body: "Have they dealt with iOS signing, an App Store rejection and Google Play's yearly target-API deadline?" },
        { title: "Offline data", body: "How do they sync data written offline once the connection comes back, and resolve conflicts?" },
      ],
    },
    {
      id: "fl-first-weeks",
      label: "The First Two Weeks",
      question: "What happens in the first two weeks with a Flutter developer?",
      answer: "Both builds work locally and in CI in the first days, a first change arrives as a test build you can install by the end of week one, and week two starts with a check of Flutter versions, packages and store deadlines.",
      points: [
        { title: "Days 1–2: both builds working", body: "The Flutter version pinned for the project, and the Android and iOS builds running locally and in CI." },
        { title: "Days 3–5: a first ticket", body: "One real change from your backlog, delivered as a test build on your phone." },
        { title: "Week 2: a package check", body: "Flutter and Dart versions, outdated or abandoned packages, and the next Google Play target-API date." },
        { title: "Week 2 on: your backlog", body: "Features and fixes, with a test build after each one." },
      ],
    },
  ],
};
