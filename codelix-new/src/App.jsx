import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CodelixLoader from "./components/PageLoader";
import BreadcrumbSchema from "./components/BreadcrumbSchema";
import CustomCursor from "./components/CustomCursor/CustomCursor";

// ─── Eagerly loaded (critical for first paint) ────────────────────────────────
import { Homepage } from "./MyComponents/Homepage/Homepage";
import Chatbot from "./MyComponents/Chatbot/Chatbot";

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
const UIUXDesignV2 = lazy(() => import("./MyComponents/UIUXDesignV2/UIUXDesignV2"));
const AboutV2 = lazy(() => import("./MyComponents/AboutV2/AboutV2"));
const ContactV2 = lazy(() => import("./MyComponents/ContactV2/ContactV2"));
const IndustriesV2 = lazy(() => import("./MyComponents/IndustriesV2/IndustriesV2"));
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

// ─── Route-change loader: always shows on every navigation ───────────────────
// We keep a separate `showLoader` state that is set to true on every pathname
// change. CodelixLoader itself controls the exit timing internally (2.2s hold
// + 0.7s fade), so the page content renders beneath it until the loader exits.
const AppRoutes = () => {
  const location = useLocation();
  const [loaderKey, setLoaderKey] = React.useState(0);
  const [showLoader, setShowLoader] = React.useState(true);

  useEffect(() => {
    // On every route change: show a fresh loader
    setShowLoader(true);
    setLoaderKey((k) => k + 1);

    // MIN_DURATION (2200) + EXIT_DURATION (700) + small buffer
    const hideTimer = setTimeout(() => setShowLoader(false), 2950);
    return () => clearTimeout(hideTimer);
  }, [location.pathname]);

  return (
    <>
      {/* Loader overlays the page — always triggered on navigation */}
      {showLoader && <CodelixLoader key={loaderKey} />}

      {/* Suspense still handles the lazy-chunk loading state */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/preview-v2" element={<HomepageV2 />} />
          <Route path="/services-v2" element={<ServicesV2 />} />
          <Route path="/services-v2/web-development" element={<ServiceDetailV2 />} />
          <Route path="/services-v2/ui-ux-design" element={<UIUXDesignV2 />} />
          <Route path="/about-v2" element={<AboutV2 />} />
          <Route path="/contact-v2" element={<ContactV2 />} />
          <Route path="/industries-v2" element={<IndustriesV2 />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <ScrollToTop />
      <BreadcrumbSchema />
      <CustomCursor />
      <Chatbot />
      <AppRoutes />
    </Router>
  );
}

export default App;

