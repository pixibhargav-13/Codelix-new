import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Homepage}  from "./MyComponents/Homepage/Homepage";
import About  from "./MyComponents/About/About";
import  Services  from "./MyComponents/Services/Services";
import Blog  from "./MyComponents/Blog/Blog";
import Work from "./MyComponents/Work/Work";
import { Navbar } from "./MyComponents/Navbar/Navbar";
import { ContactUs } from "./MyComponents/ContactUs/ContactUs";

function App() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/about" element={<About />} />
    <Route path="/work" element={<Work />} />
    <Route path="/services" element={<Services />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/contact" element={<ContactUs/>} />
  </Routes>
</Router>

  );
}

export default App;
