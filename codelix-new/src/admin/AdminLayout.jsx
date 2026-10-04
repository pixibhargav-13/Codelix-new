import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FileText, MessageSquareQuote, LogOut, Briefcase, Inbox, CalendarClock, UserRoundPlus } from "lucide-react";
import { useAuth } from "./useAuth";
import codelixLogo from "../MyComponents/Images/codelix-logo.webp";
import "./admin.css";

export default function AdminLayout() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const email = session?.user?.email || "";

  return (
    <div className="adm-shell adm-layout">
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <img src={codelixLogo} alt="Codelix" />
        </div>
        <nav>
          <NavLink to="/admin/enquiries" className={({ isActive }) => (isActive ? "active" : "")}>
            <Inbox size={16} strokeWidth={1.8} />
            <span>Contact Enquiries</span>
          </NavLink>
          <NavLink to="/admin/bookings" className={({ isActive }) => (isActive ? "active" : "")}>
            <CalendarClock size={16} strokeWidth={1.8} />
            <span>Bookings</span>
          </NavLink>
          <NavLink to="/admin/applications" className={({ isActive }) => (isActive ? "active" : "")}>
            <UserRoundPlus size={16} strokeWidth={1.8} />
            <span>Applications</span>
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => (isActive ? "active" : "")}>
            <FileText size={16} strokeWidth={1.8} />
            <span>Blog Posts</span>
          </NavLink>
          <NavLink to="/admin/case-studies" className={({ isActive }) => (isActive ? "active" : "")}>
            <Briefcase size={16} strokeWidth={1.8} />
            <span>Case Studies</span>
          </NavLink>
          <NavLink to="/admin/testimonials" className={({ isActive }) => (isActive ? "active" : "")}>
            <MessageSquareQuote size={16} strokeWidth={1.8} />
            <span>Testimonials</span>
          </NavLink>
        </nav>
        <div className="adm-sidebar-foot">
          <span className="adm-email">
            <span className="adm-avatar">{email[0]?.toUpperCase() || "?"}</span>
            {email}
          </span>
          <button className="adm-btn adm-btn--ghost" onClick={handleSignOut} style={{ width: "100%" }}>
            <LogOut size={15} strokeWidth={1.8} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
      <main className="adm-main">
        <Outlet />
      </main>
    </div>
  );
}
