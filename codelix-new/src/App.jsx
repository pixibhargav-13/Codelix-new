import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import {Homepage}  from "./MyComponents/Homepage/Homepage";
import About  from "./MyComponents/About/About";
import  Services  from "./MyComponents/Services/Services";
import Blog  from "./MyComponents/Blog/Blog";
import Work from "./MyComponents/Work/Work";
import { Navbar } from "./MyComponents/Navbar/Navbar";
import { ContactUs } from "./MyComponents/ContactUs/ContactUs";
import TermsConditions from "./MyComponents/TermsConditions/TermsConditions";
import PrivacyPolicy from "./MyComponents/PrivacyPolicy/PrivacyPolicy";

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
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms-of-service" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
