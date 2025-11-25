import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Homepage}  from "./MyComponents/Homepage/Homepage";
import About  from "./MyComponents/About/About";
import  Services  from "./MyComponents/Services/Services";
import Blog  from "./MyComponents/Blog/Blog";
import Ourwork from "./MyComponents/OurWork/Ourwork";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Ourwork />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
