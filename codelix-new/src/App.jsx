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

export const InitialDataContext = React.createContext(null);

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
import Chatbot from "./MyComponents/Chatbot/Chatbot";
import BookingModal from "./MyComponents/BookingModal/BookingModal";

// ─── 404 Not Found ─────────────────────────────────────────────────────────────
const NotFound = lazy(() => import("./MyComponents/NotFound/NotFound"));

// ─── Site pages ────────────────────────────────────────────────────────────────
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

import { SEO } from "./components/SEO";

const RouteSEO = () => {
  const location = useLocation();
  const path = location.pathname;

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

  const seoData = {
    "/": { title: "AI-Driven Web, App & SaaS Development | Codelix IT Solutions", description: "Empower your business with AI-centric software solutions, world-class UI/UX design, and scalable web apps by Codelix IT Solutions." },
    "/services": { title: "Our Services | Web & App Development | Codelix IT Solutions", description: "Explore our comprehensive suite of IT services including Web Development, App Development, UI/UX Design, AI, and Custom Software." },
    "/services/web-development": { title: "Web Development Services | Codelix IT Solutions", description: "High-performance, scalable web development services tailored to your business needs." },
    "/services/application-development": { title: "Application Development | iOS & Android | Codelix IT Solutions", description: "Custom mobile application development for iOS and Android platforms." },
    "/services/ui-ux-design": { title: "UI/UX Design Services | Codelix IT Solutions", description: "User-centric UI/UX design services to elevate your digital products and user engagement." },
    "/services/e-commerce-solutions": { title: "E-Commerce Solutions | Codelix IT Solutions", description: "End-to-end e-commerce solutions to help you sell online efficiently and securely." },
    "/services/custom-software-development": { title: "Custom Software Development | Codelix IT Solutions", description: "Bespoke software development tailored precisely to your unique business operations." },
    "/services/ai-development": { title: "AI Development Services | Codelix IT Solutions", description: "Integrate powerful Artificial Intelligence into your products with our expert AI development." },
    "/services/data-analytics": { title: "Data Analytics Services | Codelix IT Solutions", description: "Turn your raw data into actionable insights with our comprehensive data analytics services." },
    "/services/support-managed-services": { title: "Support & Managed Services | Codelix IT Solutions", description: "Reliable IT support and managed services to keep your operations running smoothly." },
    "/about": { title: "About Us | Codelix IT Solutions", description: "Learn about Codelix IT Solutions, our mission, our team, and how we deliver world-class tech." },
    "/contact": { title: "Contact Us | Codelix IT Solutions", description: "Get in touch with Codelix IT Solutions to discuss your next big project." },
    "/industries": { title: "Industries We Serve | Codelix IT Solutions", description: "Discover the various industries we provide specialized IT solutions for." },
    "/process": { title: "Our Process | Codelix IT Solutions", description: "Discover our proven, transparent development process from ideation to launch." },
    "/team": { title: "Our Team | Codelix IT Solutions", description: "Meet the experts behind the code at Codelix IT Solutions." },
    "/work": { title: "Our Work & Case Studies | Codelix IT Solutions", description: "Browse our portfolio of shipped projects and detailed case studies." },
    "/faq": { title: "Frequently Asked Questions | Codelix IT Solutions", description: "Got questions? We have answers. Check out our FAQ." },
    "/technologies": { title: "Technologies We Use | Codelix IT Solutions", description: "Explore the modern tech stack we use to build scalable, secure applications." },
    "/careers": { title: "Careers | Codelix IT Solutions", description: "Join our team of talented engineers and designers at Codelix IT Solutions." },
    "/pricing": { title: "Pricing | Codelix IT Solutions", description: "Transparent, flexible pricing for our professional development services." },
    "/blog": { title: "Blog | Insights & Updates | Codelix IT Solutions", description: "Read the latest insights, tech trends, and company updates on the Codelix blog." },
    "/case-study": { title: "Case Studies | Codelix IT Solutions", description: "Deep dives into how we solved complex problems for our clients." },
  };

  const currentSEO = seoData[path] || { title: "Codelix IT Solutions | AI-Powered Web, App & SaaS Development", description: "Craft AI-powered web, app & SaaS solutions with world-class UI/UX design. Trusted by 25+ companies for professional development services." };

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
    <ReactLenis root options={{ lerp: 0.09, duration: 1.35, smoothWheel: true, wheelMultiplier: 0.85 }}>
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
