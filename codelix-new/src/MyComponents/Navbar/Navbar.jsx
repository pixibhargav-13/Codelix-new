import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // install: npm i lucide-react
import codelixlogo from "..//Images/codelix-logo.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ["Home", "Work", "Services", "About", "Blog"];

  return (
    <nav className="relative z-50 px-6 lg:px-16 py-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={codelixlogo} alt="Codelix" className="h-10" />
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={"#" + link.toLowerCase()}
              className="text-white hover:text-blue-400 text-sm transition"
            >
              {link}
            </a>
          ))}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded font-medium flex items-center gap-2 transition">
            Contact Us →
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={"#" + link.toLowerCase()}
                className="text-white py-2 border-b border-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded font-medium mt-2 transition">
              Contact Us →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};