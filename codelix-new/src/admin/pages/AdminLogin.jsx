import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../useAuth";
import codelixLogo from "../../MyComponents/Images/codelix-logo.webp";
import "../admin.css";

export default function AdminLogin() {
  const { session, loading, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    const to = location.state?.from || "/admin/blog";
    return <Navigate to={to} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) setError(signInError.message);
  };

  return (
    <div className="adm-shell adm-login-wrap">
      <form className="adm-login-card" onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
          <img src={codelixLogo} alt="Codelix" style={{ height: "38px", marginBottom: "16px" }} />
          <h1>ADMIN PORTAL</h1>
        </div>
        {error && <p className="adm-error">{error}</p>}
        <div className="adm-field">
          <label htmlFor="adm-email">Email</label>
          <input id="adm-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        </div>
        <div className="adm-field">
          <label htmlFor="adm-password">Password</label>
          <input id="adm-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="adm-btn" type="submit" disabled={submitting} style={{ width: "100%" }}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
