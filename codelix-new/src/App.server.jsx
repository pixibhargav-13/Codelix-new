import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BreadcrumbSchema from "./components/BreadcrumbSchema";
import { StructuredData } from "./components/StructuredData";
import { AuthProvider } from "./admin/AuthContext";
import RequireAuth from "./admin/RequireAuth";

gsap.registerPlugin(ScrollTrigger);

export { InitialDataContext } from "./lib/initialDataContext";
import { InitialDataContext } from "./lib/initialDataContext";

// ─── Admin panel (Supabase-backed blog + testimonials management) ────────────
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminBlogList from "./admin/pages/AdminBlogList";
import AdminBlogForm from "./admin/pages/AdminBlogForm";
import AdminCaseStudyList from "./admin/pages/AdminCaseStudyList";
import AdminCaseStudyForm from "./admin/pages/AdminCaseStudyForm";
import AdminTestimonialsList from "./admin/pages/AdminTestimonialsList";
import AdminTestimonialForm from "./admin/pages/AdminTestimonialForm";

// ─── Eagerly loaded (critical for first paint) ────────────────────────────────
import BookingModal from "./MyComponents/BookingModal/BookingModal";

// ─── 404 Not Found ─────────────────────────────────────────────────────────────
import NotFound from "./MyComponents/NotFound/NotFound";

// ─── Site pages ────────────────────────────────────────────────────────────────
import Homepage from "./MyComponents/HomepageV2/HomepageV2";
import Services from "./MyComponents/ServicesV2/ServicesV2";
import WebDevelopment from "./MyComponents/ServiceDetailV2/ServiceDetailV2";
import AdditionalServiceDetail from "./MyComponents/ServiceDetailV2/AdditionalServiceDetailV2";
import UIUXDesign from "./MyComponents/UIUXDesignV2/UIUXDesignV2";
import DataAnalytics from "./MyComponents/DataAnalyticsV2/DataAnalyticsV2";
import SupportManagedServices from "./MyComponents/SupportManagedServicesV2/SupportManagedServicesV2";
import ApplicationDevelopment from "./MyComponents/ApplicationDevelopmentV2/ApplicationDevelopmentV2";
import ECommerceSolutions from "./MyComponents/ECommerceSolutionsV2/ECommerceSolutionsV2";
import CustomSoftwareDevelopment from "./MyComponents/CustomSoftwareDevelopmentV2/CustomSoftwareDevelopmentV2";
import AIDevelopment from "./MyComponents/AIDevelopmentV2/AIDevelopmentV2";
import About from "./MyComponents/AboutV2/AboutV2";
import Contact from "./MyComponents/ContactV2/ContactV2";
import Industries from "./MyComponents/IndustriesV2/IndustriesV2";
import IndustryDetail from "./MyComponents/IndustriesV2/IndustryDetailV2";
import ProductDetail from "./MyComponents/ProductsV2/ProductDetailV2";
import Process from "./MyComponents/ProcessV2/ProcessV2";
import Team from "./MyComponents/TeamV2/TeamV2";
import Work from "./MyComponents/WorkV2/WorkV2";
import TermsConditions from "./MyComponents/TermsConditionsV2/TermsConditionsV2";
import PrivacyPolicy from "./MyComponents/PrivacyPolicyV2/PrivacyPolicyV2";
import RefundPolicy from "./MyComponents/RefundPolicyV2/RefundPolicyV2";
import Faq from "./MyComponents/FaqV2/FaqV2";
import Technologies from "./MyComponents/TechnologiesV2/TechnologiesV2";
import Careers from "./MyComponents/CareersV2/CareersV2";
import Pricing from "./MyComponents/PricingV2/PricingV2";
import Sitemap from "./MyComponents/SitemapV2/SitemapV2";
import Blog from "./MyComponents/BlogV2/BlogV2";
import BlogDetail from "./MyComponents/BlogDetailV2/BlogDetailV2";
import CaseStudy from "./MyComponents/CaseStudyV2/CaseStudyV2";
import CaseStudyDetail from "./MyComponents/CaseStudyDetailV2/CaseStudyDetailV2";

// ─── Scroll to top on route change ───────────────────────────────────────────
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

// ─── Chatbot is a public-site widget — hide it on the admin panel ────────────
/* Rendered by the client only, once the browser is idle (see App.jsx), so
   it is not prerendered. Its stylesheet ships with its lazy chunk, so a
   prerendered copy painted unstyled — a dark box with a white icon in the
   top-left corner — until hydration removed it. */
const ChatbotGate = () => null;

// ─── Sync Lenis with GSAP ScrollTrigger for extra smooth animations ────────────
const LenisGsapSync = () => {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    /* GSAP's ticker is the only loop driving Lenis (autoRaf is off on
       ReactLenis), so Lenis and ScrollTrigger update in the same frame. The
       callback is kept so cleanup removes this exact function. */
    const tick = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);
  return null;
};

import { SEO } from "./components/SEO";

import { seoData } from "./lib/seoData";

const RouteSEO = () => {
  const location = useLocation();
  /* keep in step with App.jsx — seoData is keyed without a trailing slash
     and the lookup is an exact match */
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

  /* An unknown path renders NotFound, which sets its own noindex tags;
     the generic defaults here would contradict them with index, follow. */
  const currentSEO = seoData[path];
  if (!currentSEO) return null;

  return <SEO title={currentSEO.title} ogTitle={currentSEO.ogTitle} description={currentSEO.description} robots={currentSEO.robots} image={currentSEO.image} />;
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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/admin/blog" replace />} />
            <Route path="blog" element={<AdminBlogList />} />
            <Route path="blog/new" element={<AdminBlogForm />} />
            <Route path="blog/:id" element={<AdminBlogForm />} />
            <Route path="case-studies" element={<AdminCaseStudyList />} />
            <Route path="case-studies/new" element={<AdminCaseStudyForm />} />
            <Route path="case-studies/:id" element={<AdminCaseStudyForm />} />
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
  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.35, smoothWheel: true, wheelMultiplier: 0.85, autoRaf: false }}>
      <InitialDataContext.Provider value={initialData}>
        <AuthProvider>
          <LenisGsapSync />
          <ScrollToTop />
          <BreadcrumbSchema />
          <StructuredData type="Organization" />
          <ChatbotGate />
          <BookingModal />
          <AppRoutes />
        </AuthProvider>
      </InitialDataContext.Provider>
    </ReactLenis>
  );
}

export default App;
