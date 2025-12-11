import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import {Homepage}  from "./MyComponents/Homepage/Homepage";
import About  from "./MyComponents/About/About";
import  Services  from "./MyComponents/Services/Services";
import WebDevelopment from "./MyComponents/Services/WebDevelopment";
import ApplicationDevelopment from "./MyComponents/Services/ApplicationDevelopment";
import UIUXDesign from "./MyComponents/Services/UIUXDesign";
import ECommerceSolutions from "./MyComponents/Services/ECommerceSolutions";
import CustomSoftwareDevelopment from "./MyComponents/Services/CustomSoftwareDevelopment";
import AIDevelopment from "./MyComponents/Services/AIDevelopment";
import Blog  from "./MyComponents/Blog/Blog";
import Work from "./MyComponents/Work/Work";
import { Navbar } from "./MyComponents/Navbar/Navbar";
import { ContactUs } from "./MyComponents/ContactUs/ContactUs";
import TermsConditions from "./MyComponents/TermsConditions/TermsConditions";
import PrivacyPolicy from "./MyComponents/PrivacyPolicy/PrivacyPolicy";
import CaseStudy from "./MyComponents/CaseStudy/CaseStudy";
import NextGenCaseStudy from "./MyComponents/CaseStudy/NextGenCaseStudy";
import ERPCaseStudy from "./MyComponents/CaseStudy/ERPCaseStudy";
import PayrollCaseStudy from "./MyComponents/CaseStudy/PayrollCaseStudy";
import SmartBusinessCaseStudy from "./MyComponents/CaseStudy/SmartBusinessCaseStudy";

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
      </Routes>
    </Router>
  );
}

export default App;
