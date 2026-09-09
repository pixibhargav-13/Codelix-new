import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ReactLenis, useLenis } from 'lenis/react';
import { trackPageView } from "./lib/analytics";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BreadcrumbSchema from "./components/BreadcrumbSchema";
import { StructuredData } from "./components/StructuredData";
/* AuthProvider statically imports the Supabase client (~208KB). Wrapping the
   whole app in it put that in the entry graph, so every public page
   downloaded the admin auth client it never uses. Lazy + scoped to the
   /admin routes below instead. */
const AuthProvider = lazy(() =>
  import("./admin/AuthContext").then((m) => ({ default: m.AuthProvider }))
);
import RequireAuth from "./admin/RequireAuth";

gsap.registerPlugin(ScrollTrigger);

export { InitialDataContext } from "./lib/initialDataContext";
import { InitialDataContext } from "./lib/initialDataContext";

// ─── Admin panel (Supabase-backed blog + testimonials management) ────────────
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminBlogList = lazy(() => import("./admin/pages/AdminBlogList"));
const AdminBlogForm = lazy(() => import("./admin/pages/AdminBlogForm"));
const AdminCaseStudyList = lazy(() => import("./admin/pages/AdminCaseStudyList"));
const AdminCaseStudyForm = lazy(() => import("./admin/pages/AdminCaseStudyForm"));
const AdminTestimonialsList = lazy(() => import("./admin/pages/AdminTestimonialsList"));
const AdminEnquiriesList = lazy(() => import("./admin/pages/AdminEnquiriesList"));
const AdminTestimonialForm = lazy(() => import("./admin/pages/AdminTestimonialForm"));

// ─── Eagerly loaded (critical for first paint) ────────────────────────────────
/* The chatbot is a floating widget — nothing about first paint depends on
   it, but eagerly importing it put its parse+evaluate cost on the critical
   path of every page. Lazy, and only mounted once the browser is idle.

   BookingModal deliberately stays eager: it installs a global click listener
   that intercepts "Book a consultation" links, so deferring it would let
   early clicks fall through to /contact instead of opening the modal. */
const Chatbot = lazy(() => import("./MyComponents/Chatbot/Chatbot"));
import BookingModal from "./MyComponents/BookingModal/BookingModal";
// ─── 404 Not Found ─────────────────────────────────────────────────────────────
const NotFound = lazy(() => import("./MyComponents/NotFound/NotFound"));

// ─── Site pages ────────────────────────────────────────────────────────────────
/* Homepage is lazy like every other route. It was briefly a static import to
   kill a load waterfall, but that dragged the whole homepage into the shared
   entry bundle — 206KB to 748KB — so every OTHER page paid for it. The
   waterfall is solved in vite.config.js instead, by grouping the ~38 tiny
   image/icon modules into single chunks rather than inlining the page here. */
const Homepage = lazy(() => import("./MyComponents/HomepageV2/HomepageV2"));
const Services = lazy(() => import("./MyComponents/ServicesV2/ServicesV2"));
const WebDevelopment = lazy(() => import("./MyComponents/ServiceDetailV2/ServiceDetailV2"));
const AdditionalServiceDetail = lazy(() => import("./MyComponents/ServiceDetailV2/AdditionalServiceDetailV2"));
const UIUXDesign = lazy(() => import("./MyComponents/UIUXDesignV2/UIUXDesignV2"));
const DataAnalytics = lazy(() => import("./MyComponents/DataAnalyticsV2/DataAnalyticsV2"));
const SupportManagedServices = lazy(() => import("./MyComponents/SupportManagedServicesV2/SupportManagedServicesV2"));
const ApplicationDevelopment = lazy(() => import("./MyComponents/ApplicationDevelopmentV2/ApplicationDevelopmentV2"));
const ECommerceSolutions = lazy(() => import("./MyComponents/ECommerceSolutionsV2/ECommerceSolutionsV2"));
const CustomSoftwareDevelopment = lazy(() => import("./MyComponents/CustomSoftwareDevelopmentV2/CustomSoftwareDevelopmentV2"));
const AIDevelopment = lazy(() => import("./MyComponents/AIDevelopmentV2/AIDevelopmentV2"));
const About = lazy(() => import("./MyComponents/AboutV2/AboutV2"));
const Contact = lazy(() => import("./MyComponents/ContactV2/ContactV2"));
const Industries = lazy(() => import("./MyComponents/IndustriesV2/IndustriesV2"));
const IndustryDetail = lazy(() => import("./MyComponents/IndustriesV2/IndustryDetailV2"));
const ProductDetail = lazy(() => import("./MyComponents/ProductsV2/ProductDetailV2"));
const Process = lazy(() => import("./MyComponents/ProcessV2/ProcessV2"));
const Team = lazy(() => import("./MyComponents/TeamV2/TeamV2"));
const Work = lazy(() => import("./MyComponents/WorkV2/WorkV2"));
const TermsConditions = lazy(() => import("./MyComponents/TermsConditionsV2/TermsConditionsV2"));
const PrivacyPolicy = lazy(() => import("./MyComponents/PrivacyPolicyV2/PrivacyPolicyV2"));
const RefundPolicy = lazy(() => import("./MyComponents/RefundPolicyV2/RefundPolicyV2"));
const Faq = lazy(() => import("./MyComponents/FaqV2/FaqV2"));
const Technologies = lazy(() => import("./MyComponents/TechnologiesV2/TechnologiesV2"));
const Careers = lazy(() => import("./MyComponents/CareersV2/CareersV2"));
const Pricing = lazy(() => import("./MyComponents/PricingV2/PricingV2"));
const Sitemap = lazy(() => import("./MyComponents/SitemapV2/SitemapV2"));
const Blog = lazy(() => import("./MyComponents/BlogV2/BlogV2"));
const BlogDetail = lazy(() => import("./MyComponents/BlogDetailV2/BlogDetailV2"));
const CaseStudy = lazy(() => import("./MyComponents/CaseStudyV2/CaseStudyV2"));
const CaseStudyDetail = lazy(() => import("./MyComponents/CaseStudyDetailV2/CaseStudyDetailV2"));

// ─── Scroll to top on route change ───────────────────────────────────────────
const ScrollToTop = () => {
  const location = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    /* Lenis keeps its own scroll position and drives the page from it, so a
       bare window.scrollTo gets animated straight back to where Lenis thinks
       it is. Tell Lenis instead when it's running. This only started to matter
       once the nav and footer became client-side <Link>s — before that every
       internal click was a full reload, which reset scroll for free. */
    /* Swapping the route changes the document height, and the browser
       reapplies the old offset when that layout lands — flush it first so the
       scroll below is the last word. */
    void document.body.offsetHeight;
    const toTop = () => {
      /* Both, deliberately, and in this order. window.scrollTo is what
         actually moves the document and works even when Lenis's rAF loop
         isn't running (a backgrounded tab freezes it). Lenis is then told the
         same destination so its internal position agrees and it doesn't ease
         the page back to where it thought it was. They can't fight: both are
         aimed at 0. force: true because Lenis ignores scrollTo while it
         considers itself stopped or locked. */
      window.scrollTo(0, 0);
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    };
    toTop();
    /* re-assert once the new route has laid out, in case anything shifted */
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, lenis]);
  return null;
};

/* Client-side navigation doesn't produce GA4 page views by itself — the tag
   in index.html fires one on first load and nothing after. Without this every
   visit looks like a single-page session, which makes the whole funnel
   unreadable. Skips the very first route so it doesn't double-count the
   page view the tag has already sent. */
const AnalyticsRouteTracker = () => {
  const location = useLocation();
  const firstRoute = useRef(true);

  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    /* let the new route's <SEO> update document.title first, so the page view
       is filed under the right page name rather than the previous one */
    const t = setTimeout(() => trackPageView(location.pathname + location.search), 60);
    return () => clearTimeout(t);
  }, [location.pathname, location.search]);

  return null;
};

// ─── Chatbot is a public-site widget — hide it on the admin panel ────────────
const ChatbotGate = () => {
  const location = useLocation();
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const mount = () => setIdle(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    /* Safari has no requestIdleCallback */
    const t = setTimeout(mount, 1500);
    return () => clearTimeout(t);
  }, []);

  if (location.pathname.startsWith("/admin")) return null;
  if (!idle) return null;

  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
};

// ─── Sync Lenis with GSAP ScrollTrigger for extra smooth animations ────────────
const LenisGsapSync = () => {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [lenis]);
  return null;
};

import { SEO } from "./components/SEO";

import { seoData, defaultSEO } from "./lib/seoData";

const RouteSEO = () => {
  const location = useLocation();
  /* seoData is keyed without a trailing slash, and the lookup below is an
     exact match — so "/pricing/" missed every key and the page fell back to
     the generic default title after hydration, overwriting the correct
     prerendered one. Normalise before matching. */
  const path =
    location.pathname.length > 1
      ? location.pathname.replace(/\/+$/, "")
      : location.pathname;

  // Let dynamic pages handle their own SEO overrides
  if (path.startsWith("/blog/") || path.startsWith("/case-study/") || path.startsWith("/services/") || path.startsWith("/industries/") || path.startsWith("/products/") || path.startsWith("/admin")) {
    if (path !== "/services" && 
        path !== "/services/web-development" && 
        path !== "/services/application-development" && 
        path !== "/services/ui-ux-design" && 
        path !== "/services/e-commerce-solutions" && 
        path !== "/services/custom-software-development" && 
        path !== "/services/ai-development" && 
        path !== "/services/data-analytics" && 
        path !== "/services/support-managed-services" && 
        path !== "/industries" && 
        path !== "/blog" && 
        path !== "/case-study") {
      return null;
    }
  }

  const currentSEO = seoData[path] || defaultSEO;

  return <SEO title={currentSEO.title} description={currentSEO.description} />;
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <RouteSEO />
      {/* dark background fallback while a route's chunk loads, so it
          doesn't flash white between the dark site pages */}
      <Suspense fallback={isAdminRoute ? null : <div className="v2" style={{ width: '100vw', height: '100vh', backgroundColor: '#050507' }} />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/application-development" element={<ApplicationDevelopment />} />
          <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
          <Route path="/services/e-commerce-solutions" element={<ECommerceSolutions />} />
          <Route path="/services/custom-software-development" element={<CustomSoftwareDevelopment />} />
          <Route path="/services/ai-development" element={<AIDevelopment />} />
          <Route path="/services/data-analytics" element={<DataAnalytics />} />
          <Route path="/services/support-managed-services" element={<SupportManagedServices />} />
          {/* 18 additional service pages (footer-only, see footerData.js
              FOOTER_MORE_SERVICES) — one generic template driven by slug,
              same pattern as CaseStudyDetail. React Router ranks the
              literal paths above by specificity, so this dynamic catch
              only matches slugs that aren't one of the core 8 services. */}
          <Route path="/services/:slug" element={<AdditionalServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/process" element={<Process />} />
          <Route path="/team" element={<Team />} />
          <Route path="/work" element={<Work />} />
          <Route path="/terms-of-service" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetail />} />

          {/* ─── Admin panel ─── */}
          {/* AuthProvider is mounted here rather than around the whole app so
              the Supabase auth client only downloads for /admin. Nested
              children render through AdminLayout's Outlet, so they sit inside
              this provider too. */}
          <Route
            path="/admin/login"
            element={
              <AuthProvider>
                <AdminLogin />
              </AuthProvider>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthProvider>
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              </AuthProvider>
            }
          >
            <Route index element={<Navigate to="/admin/blog" replace />} />
            <Route path="blog" element={<AdminBlogList />} />
            <Route path="blog/new" element={<AdminBlogForm />} />
            <Route path="blog/:id" element={<AdminBlogForm />} />
            <Route path="case-studies" element={<AdminCaseStudyList />} />
            <Route path="case-studies/new" element={<AdminCaseStudyForm />} />
            <Route path="case-studies/:id" element={<AdminCaseStudyForm />} />
            <Route path="enquiries" element={<AdminEnquiriesList type="contact" />} />
            <Route path="bookings" element={<AdminEnquiriesList type="booking" />} />
            <Route path="applications" element={<AdminEnquiriesList type="careers" />} />
            <Route path="testimonials" element={<AdminTestimonialsList />} />
            <Route path="testimonials/new" element={<AdminTestimonialForm />} />
            <Route path="testimonials/:id" element={<AdminTestimonialForm />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
function App({ initialData }) {
  /* wheelMultiplier is back to 1: at 0.85 every wheel tick moved the page 15%
     less than any other site, which reads as heaviness rather than polish.
     lerp is raised from 0.09 so the page follows the wheel closely instead of
     trailing it — Lenis uses lerp whenever it is set, so duration now applies
     only to programmatic scrollTo calls. */
  return (
    <ReactLenis root options={{ lerp: 0.14, duration: 1, smoothWheel: true, wheelMultiplier: 1 }}>
      <InitialDataContext.Provider value={initialData}>
        <LenisGsapSync />
        <ScrollToTop />
        <AnalyticsRouteTracker />
        <BreadcrumbSchema />
        <StructuredData type="Organization" />
        <ChatbotGate />
        <BookingModal />
        <AppRoutes />
      </InitialDataContext.Provider>
    </ReactLenis>
  );
}

export default App;
