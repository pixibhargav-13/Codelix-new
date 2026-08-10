import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodelixLoader from "./components/PageLoader";
import BreadcrumbSchema from "./components/BreadcrumbSchema";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { AuthProvider } from "./admin/AuthContext";
import RequireAuth from "./admin/RequireAuth";

gsap.registerPlugin(ScrollTrigger);

// ─── Admin panel (Supabase-backed blog + testimonials management) ────────────
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminBlogList = lazy(() => import("./admin/pages/AdminBlogList"));
const AdminBlogForm = lazy(() => import("./admin/pages/AdminBlogForm"));
const AdminCaseStudyList = lazy(() => import("./admin/pages/AdminCaseStudyList"));
const AdminCaseStudyForm = lazy(() => import("./admin/pages/AdminCaseStudyForm"));
const AdminTestimonialsList = lazy(() => import("./admin/pages/AdminTestimonialsList"));
const AdminTestimonialForm = lazy(() => import("./admin/pages/AdminTestimonialForm"));

// ─── Eagerly loaded (critical for first paint) ────────────────────────────────
import { Homepage } from "./MyComponents/Homepage/Homepage";
import Chatbot from "./MyComponents/Chatbot/Chatbot";
import BookingModal from "./MyComponents/BookingModal/BookingModal";

// ─── Lazily loaded pages (only downloaded when the user navigates to them) ────
const About = lazy(() => import("./MyComponents/About/About"));
const Services = lazy(() => import("./MyComponents/Services/Services"));
const WebDevelopment = lazy(() => import("./MyComponents/Services/WebDevelopment"));
const ApplicationDevelopment = lazy(() => import("./MyComponents/Services/ApplicationDevelopment"));
const UIUXDesign = lazy(() => import("./MyComponents/Services/UIUXDesign"));
const ECommerceSolutions = lazy(() => import("./MyComponents/Services/ECommerceSolutions"));
const CustomSoftwareDevelopment = lazy(() => import("./MyComponents/Services/CustomSoftwareDevelopment"));
const AIDevelopment = lazy(() => import("./MyComponents/Services/AIDevelopment"));
const Blog = lazy(() => import("./MyComponents/Blog/Blog"));
const BlogDetail = lazy(() => import("./MyComponents/BlogDetail/BlogDetail"));
const Work = lazy(() => import("./MyComponents/Work/Work"));
const ContactUs = lazy(() => import("./MyComponents/ContactUs/ContactUs"));
const TermsConditions = lazy(() => import("./MyComponents/TermsConditions/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./MyComponents/PrivacyPolicy/PrivacyPolicy"));

// ─── Case Studies (lazily loaded — heaviest pages) ────────────────────────────
const CaseStudy = lazy(() => import("./MyComponents/CaseStudy/CaseStudy"));
const NextGenCaseStudy = lazy(() => import("./MyComponents/CaseStudy/NextGenCaseStudy"));
const ERPCaseStudy = lazy(() => import("./MyComponents/CaseStudy/ERPCaseStudy"));
const PayrollCaseStudy = lazy(() => import("./MyComponents/CaseStudy/PayrollCaseStudy"));
const SmartBusinessCaseStudy = lazy(() => import("./MyComponents/CaseStudy/SmartBusinessCaseStudy"));
const BookCollectionsCaseStudy = lazy(() => import("./MyComponents/CaseStudy/BookCollectionsCaseStudy"));
const MakhanaStoreCaseStudy = lazy(() => import("./MyComponents/CaseStudy/MakhanaStoreCaseStudy"));
const FreightShippingCaseStudy = lazy(() => import("./MyComponents/CaseStudy/FreightShippingCaseStudy"));
const HRPortalCaseStudy = lazy(() => import("./MyComponents/CaseStudy/HRPortalCaseStudy"));
const EdTechCaseStudy = lazy(() => import("./MyComponents/CaseStudy/EdTechCaseStudy"));
const ModernCreativeAgencyCaseStudy = lazy(() => import("./MyComponents/CaseStudy/ModernCreativeAgencyCaseStudy"));
const ElegantCreativeAgencyCaseStudy = lazy(() => import("./MyComponents/CaseStudy/ElegantCreativeAgencyCaseStudy"));
const AIPoweredDesignCaseStudy = lazy(() => import("./MyComponents/CaseStudy/AIPoweredDesignCaseStudy"));
const CarMarketplaceCaseStudy = lazy(() => import("./MyComponents/CaseStudy/CarMarketplaceCaseStudy"));
const SchoolManagementCaseStudy = lazy(() => import("./MyComponents/CaseStudy/SchoolManagementCaseStudy"));
const SmartSocietyManagementCaseStudy = lazy(() => import("./MyComponents/CaseStudy/SmartSocietyManagementCaseStudy"));

// ─── 404 Not Found ─────────────────────────────────────────────────────────────
const NotFound = lazy(() => import("./MyComponents/NotFound/NotFound"));

// ─── Design preview (temporary, for review only) ──────────────────────────────
const HomepageV2 = lazy(() => import("./MyComponents/HomepageV2/HomepageV2"));
const ServicesV2 = lazy(() => import("./MyComponents/ServicesV2/ServicesV2"));
const ServiceDetailV2 = lazy(() => import("./MyComponents/ServiceDetailV2/ServiceDetailV2"));
const AdditionalServiceDetailV2 = lazy(() => import("./MyComponents/ServiceDetailV2/AdditionalServiceDetailV2"));
const UIUXDesignV2 = lazy(() => import("./MyComponents/UIUXDesignV2/UIUXDesignV2"));
const DataAnalyticsV2 = lazy(() => import("./MyComponents/DataAnalyticsV2/DataAnalyticsV2"));
const SupportManagedServicesV2 = lazy(() => import("./MyComponents/SupportManagedServicesV2/SupportManagedServicesV2"));
const ApplicationDevelopmentV2 = lazy(() => import("./MyComponents/ApplicationDevelopmentV2/ApplicationDevelopmentV2"));
const ECommerceSolutionsV2 = lazy(() => import("./MyComponents/ECommerceSolutionsV2/ECommerceSolutionsV2"));
const CustomSoftwareDevelopmentV2 = lazy(() => import("./MyComponents/CustomSoftwareDevelopmentV2/CustomSoftwareDevelopmentV2"));
const AIDevelopmentV2 = lazy(() => import("./MyComponents/AIDevelopmentV2/AIDevelopmentV2"));
const AboutV2 = lazy(() => import("./MyComponents/AboutV2/AboutV2"));
const ContactV2 = lazy(() => import("./MyComponents/ContactV2/ContactV2"));
const IndustriesV2 = lazy(() => import("./MyComponents/IndustriesV2/IndustriesV2"));
const IndustryDetailV2 = lazy(() => import("./MyComponents/IndustriesV2/IndustryDetailV2"));
const ProductDetailV2 = lazy(() => import("./MyComponents/ProductsV2/ProductDetailV2"));
const ProcessV2 = lazy(() => import("./MyComponents/ProcessV2/ProcessV2"));
const TeamV2 = lazy(() => import("./MyComponents/TeamV2/TeamV2"));
const WorkV2 = lazy(() => import("./MyComponents/WorkV2/WorkV2"));
const TermsConditionsV2 = lazy(() => import("./MyComponents/TermsConditionsV2/TermsConditionsV2"));
const PrivacyPolicyV2 = lazy(() => import("./MyComponents/PrivacyPolicyV2/PrivacyPolicyV2"));
const RefundPolicyV2 = lazy(() => import("./MyComponents/RefundPolicyV2/RefundPolicyV2"));
const FaqV2 = lazy(() => import("./MyComponents/FaqV2/FaqV2"));
const TechnologiesV2 = lazy(() => import("./MyComponents/TechnologiesV2/TechnologiesV2"));
const CareersV2 = lazy(() => import("./MyComponents/CareersV2/CareersV2"));
const PricingV2 = lazy(() => import("./MyComponents/PricingV2/PricingV2"));
const SitemapV2 = lazy(() => import("./MyComponents/SitemapV2/SitemapV2"));
const BlogV2 = lazy(() => import("./MyComponents/BlogV2/BlogV2"));
const BlogDetailV2 = lazy(() => import("./MyComponents/BlogDetailV2/BlogDetailV2"));
const CaseStudyV2 = lazy(() => import("./MyComponents/CaseStudyV2/CaseStudyV2"));
const CaseStudyDetailV2 = lazy(() => import("./MyComponents/CaseStudyDetailV2/CaseStudyDetailV2"));

// ─── Scroll to top on route change ───────────────────────────────────────────
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

// ─── Chatbot is a public-site widget — hide it on the admin panel ────────────
const ChatbotGate = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  return <Chatbot />;
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

// ─── Route-change loader: always shows on every navigation ───────────────────
// We keep a separate `showLoader` state that is set to true on every pathname
// change. CodelixLoader itself controls the exit timing internally (2.2s hold
// + 0.7s fade), so the page content renders beneath it until the loader exits.
const AppRoutes = () => {
  const location = useLocation();
  const [loaderKey, setLoaderKey] = React.useState(0);
  const [showLoader, setShowLoader] = React.useState(true);

  // v2 pages skip the loader entirely — every v2 route has "v2" somewhere
  // in its path (/preview-v2, /about-v2, /services-v2/..., etc.), which
  // reliably tells it apart from every v1 route (none of which do).
  const isV2Route = location.pathname.includes("v2");
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // v2 and admin routes never show the loader, so there's nothing to schedule
    if (isV2Route || isAdminRoute) return;

    // On every route change: show a fresh loader
    setShowLoader(true);
    setLoaderKey((k) => k + 1);

    // MIN_DURATION (2200) + EXIT_DURATION (700) + small buffer
    const hideTimer = setTimeout(() => setShowLoader(false), 2950);
    return () => clearTimeout(hideTimer);
  }, [location.pathname, isV2Route, isAdminRoute]);

  return (
    <>
      {/* Loader overlays the page — triggered on navigation, skipped on v2 and admin pages */}
      {showLoader && !isV2Route && !isAdminRoute && <CodelixLoader key={loaderKey} />}

      {/* Suspense still handles the lazy-chunk loading state.
          For V2 pages, we provide a dark background fallback so it doesn't flash white. */}
      <Suspense fallback={isV2Route ? <div className="v2" style={{ width: '100vw', height: '100vh', backgroundColor: '#050507' }} /> : null}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/preview-v2" element={<HomepageV2 />} />
          <Route path="/services-v2" element={<ServicesV2 />} />
          <Route path="/services-v2/web-development" element={<ServiceDetailV2 />} />
          <Route path="/services-v2/application-development" element={<ApplicationDevelopmentV2 />} />
          <Route path="/services-v2/ui-ux-design" element={<UIUXDesignV2 />} />
          <Route path="/services-v2/e-commerce-solutions" element={<ECommerceSolutionsV2 />} />
          <Route path="/services-v2/custom-software-development" element={<CustomSoftwareDevelopmentV2 />} />
          <Route path="/services-v2/ai-development" element={<AIDevelopmentV2 />} />
          <Route path="/services-v2/data-analytics" element={<DataAnalyticsV2 />} />
          <Route path="/services-v2/support-managed-services" element={<SupportManagedServicesV2 />} />
          {/* 18 additional service pages (footer-only, see footerData.js
              FOOTER_MORE_SERVICES) — one generic template driven by slug,
              same pattern as CaseStudyDetailV2. React Router ranks the
              literal paths above by specificity, so this dynamic catch
              only matches slugs that aren't one of the core 8 services. */}
          <Route path="/services-v2/:slug" element={<AdditionalServiceDetailV2 />} />
          <Route path="/about-v2" element={<AboutV2 />} />
          <Route path="/contact-v2" element={<ContactV2 />} />
          <Route path="/industries-v2" element={<IndustriesV2 />} />
          <Route path="/industries-v2/:slug" element={<IndustryDetailV2 />} />
          <Route path="/products-v2/:slug" element={<ProductDetailV2 />} />
          <Route path="/process-v2" element={<ProcessV2 />} />
          <Route path="/team-v2" element={<TeamV2 />} />
          <Route path="/work-v2" element={<WorkV2 />} />
          <Route path="/terms-of-service-v2" element={<TermsConditionsV2 />} />
          <Route path="/privacy-policy-v2" element={<PrivacyPolicyV2 />} />
          <Route path="/refund-policy-v2" element={<RefundPolicyV2 />} />
          <Route path="/faq-v2" element={<FaqV2 />} />
          <Route path="/technologies-v2" element={<TechnologiesV2 />} />
          <Route path="/careers-v2" element={<CareersV2 />} />
          <Route path="/pricing-v2" element={<PricingV2 />} />
          <Route path="/sitemap-v2" element={<SitemapV2 />} />
          <Route path="/blog-v2" element={<BlogV2 />} />
          <Route path="/blog-v2/:slug" element={<BlogDetailV2 />} />
          <Route path="/case-study-v2" element={<CaseStudyV2 />} />
          <Route path="/case-study-v2/:slug" element={<CaseStudyDetailV2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/application-development" element={<ApplicationDevelopment />} />
          <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
          <Route path="/services/e-commerce-solutions" element={<ECommerceSolutions />} />
          <Route path="/services/custom-software-development" element={<CustomSoftwareDevelopment />} />
          <Route path="/services/ai-development" element={<AIDevelopment />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms-of-service" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/nextgen-case-study" element={<NextGenCaseStudy />} />
          <Route path="/erp-case-study" element={<ERPCaseStudy />} />
          <Route path="/payroll-case-study" element={<PayrollCaseStudy />} />
          <Route path="/smart-business-case-study" element={<SmartBusinessCaseStudy />} />
          <Route path="/book-collections-case-study" element={<BookCollectionsCaseStudy />} />
          <Route path="/makhana-store-case-study" element={<MakhanaStoreCaseStudy />} />
          <Route path="/freight-shipping-case-study" element={<FreightShippingCaseStudy />} />
          <Route path="/hr-portal-case-study" element={<HRPortalCaseStudy />} />
          <Route path="/edtech-case-study" element={<EdTechCaseStudy />} />
          <Route path="/modern-creative-agency-case-study" element={<ModernCreativeAgencyCaseStudy />} />
          <Route path="/elegant-creative-agency-case-study" element={<ElegantCreativeAgencyCaseStudy />} />
          <Route path="/ai-powered-design-case-study" element={<AIPoweredDesignCaseStudy />} />
          <Route path="/car-marketplace-case-study" element={<CarMarketplaceCaseStudy />} />
          <Route path="/school-management-case-study" element={<SchoolManagementCaseStudy />} />
          <Route path="/smart-society-management-case-study" element={<SmartSocietyManagementCaseStudy />} />

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
function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <Router>
        <AuthProvider>
          <LenisGsapSync />
          <ScrollToTop />
          <BreadcrumbSchema />
          <CustomCursor />
          <ChatbotGate />
          <BookingModal />
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ReactLenis>
  );
}

export default App;

