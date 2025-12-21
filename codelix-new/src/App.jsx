import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./MyComponents/Navbar/Navbar";

// Lazy load components
const Homepage = lazy(() => import("./MyComponents/Homepage/Homepage"));
const About = lazy(() => import("./MyComponents/About/About"));
const Services = lazy(() => import("./MyComponents/Services/Services"));
const WebDevelopment = lazy(() => import("./MyComponents/Services/WebDevelopment"));
const ApplicationDevelopment = lazy(() => import("./MyComponents/Services/ApplicationDevelopment"));
const UIUXDesign = lazy(() => import("./MyComponents/Services/UIUXDesign"));
const ECommerceSolutions = lazy(() => import("./MyComponents/Services/ECommerceSolutions"));
const CustomSoftwareDevelopment = lazy(() => import("./MyComponents/Services/CustomSoftwareDevelopment"));
const AIDevelopment = lazy(() => import("./MyComponents/Services/AIDevelopment"));
const Blog = lazy(() => import("./MyComponents/Blog/Blog"));
const Work = lazy(() => import("./MyComponents/Work/Work"));
const ContactUs = lazy(() => import("./MyComponents/ContactUs/ContactUs"));
const TermsConditions = lazy(() => import("./MyComponents/TermsConditions/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./MyComponents/PrivacyPolicy/PrivacyPolicy"));
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

// Loading component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Scroll to top on every route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
