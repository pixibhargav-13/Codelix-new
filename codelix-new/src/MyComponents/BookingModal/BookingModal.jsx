import React, { useState, useEffect } from "react";
import { trackLead } from "../../lib/analytics";
import { X, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useLenis } from 'lenis/react';
import "./BookingModal.css";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES } from "../HomepageV2/footerData";

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Date & Time, 2: Form, 3: Success
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  
  const lenis = useLenis();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    customService: "",
    message: "",
  });

  useEffect(() => {
    // Listen for custom event or clicks on specific links
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({ name: "", email: "", phone: "", company: "", service: "", customService: "", message: "" });
    };

    const handleGlobalClick = (e) => {
      // Find closest anchor tag
      const anchor = e.target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href === "/contact") {
          const isNavCta = anchor.classList.contains("v2-nav-cta");
          const isContactButton = anchor.textContent?.trim().toLowerCase().includes("book");

          if (isNavCta || isContactButton) {
            e.preventDefault();
            handleOpen();
          }
        }
      }
    };

    window.addEventListener("open-booking-modal", handleOpen);
    document.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      window.removeEventListener("open-booking-modal", handleOpen);
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("booking-modal-open");
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("booking-modal-open");
      if (lenis) lenis.start();
    }
    
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("booking-modal-open");
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);

  if (!isOpen) return null;

  // Calendar logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renderCalendar = () => {
    const days = [];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Headers
    const headers = weekDays.map((day) => (
      <div key={day} className="booking-cal-header">{day}</div>
    ));

    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="booking-cal-cell empty"></div>);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      const isSunday = date.getDay() === 0; // 0 is Sunday
      const isPast = date < today;
      const isSelected = selectedDate?.getTime() === date.getTime();
      
      const disabled = isSunday || isPast;

      days.push(
        <button
          key={d}
          type="button"
          className={`booking-cal-cell day ${disabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`}
          disabled={disabled}
          onClick={() => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
        >
          {d}
        </button>
      );
    }

    return (
      <div className="booking-calendar">
        <div className="booking-cal-controls">
          <button type="button" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
          <span>
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button type="button" onClick={handleNextMonth}><ChevronRight size={20} /></button>
        </div>
        <div className="booking-cal-grid">
          {headers}
          {days}
        </div>
      </div>
    );
  };

  /* This used to be a 600ms setTimeout and nothing else: the visitor saw
     "Booking Confirmed" and was told a calendar invitation had been sent,
     while their name, email, phone and chosen slot were discarded when the
     tab closed. Every consultation booked this way was lost, and the person
     was left waiting for a call. It now posts to the same endpoint the
     contact and careers forms use. */
  const handleBook = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "booking",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service === "Other" ? formData.customService : formData.service,
          message: formData.message,
          bookingDate: formatDate(selectedDate),
          bookingTime: selectedTime,
          _hp: e.target._hp?.value || "",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "We could not confirm that booking. Please try again.");
        return;
      }

      /* a booking only counts as a lead once the server has it */
      trackLead("consultation_booking", { booking_time: selectedTime || undefined });
      setStep(3);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return "";
    return d.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="booking-modal-overlay" data-lenis-prevent="true">
      <div className="booking-modal-backdrop" onClick={() => setIsOpen(false)}></div>
      <div className="booking-modal-content">
        <button className="booking-modal-close" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        <div className="booking-modal-inner">
          {/* STEP 1: DATE & TIME */}
          {step === 1 && (
            <div className="booking-step fade-in">
              <div className="booking-header">
                <h2>Book a Consultation</h2>
                <p>Select a date and time for a 1-hour discovery call.</p>
              </div>
              
              <div className="booking-split">
                <div className="booking-left">
                  {renderCalendar()}
                </div>
                <div className="booking-right">
                  <h3>
                    {selectedDate ? formatDate(selectedDate) : "Select a date"}
                    {selectedDate && <span style={{ display: 'block', fontSize: '0.85rem', color: '#a0a09b', marginTop: '0.4rem', fontWeight: 400 }}>Times are shown in IST</span>}
                  </h3>
                  {selectedDate ? (
                    <div className="booking-times">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`booking-time-btn ${selectedTime === time ? "selected" : ""}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="booking-times-empty">
                      <CalendarIcon size={32} opacity={0.2} />
                      <p>Please select a date on the calendar to see available times.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="booking-footer">
                <button 
                  className="v2-btn v2-btn--filled" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(2)}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FORM */}
          {step === 2 && (
            <div className="booking-step fade-in">
              <div className="booking-header">
                <button className="booking-back-btn" onClick={() => setStep(1)}>
                  <ChevronLeft size={20} /> Back
                </button>
                <h2>Your Details</h2>
                <div className="booking-selection-summary">
                  <span><CalendarIcon size={16} /> {formatDate(selectedDate)}</span>
                  <span><Clock size={16} /> {selectedTime}</span>
                </div>
              </div>

              <form className="booking-form" onSubmit={handleBook}>
                {/* honeypot: hidden from people, bots fill it and the server
                    silently discards the submission */}
                <input type="text" name="_hp" tabIndex={-1} autoComplete="off"
                  aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
                <div className="booking-input-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="booking-input-group">
                  <label>Work Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="rahul@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="booking-input-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="booking-input-group">
                  <label>Company</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="booking-input-group">
                  <label>Service *</label>
                  <select 
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                    required
                  >
                    <option value="" disabled>Select a service</option>
                    {FOOTER_ALL_SERVICES.map(s => (
                      <option key={s.label} value={s.label}>{s.label}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.service === "Other" && (
                  <div className="booking-input-group">
                    <label>Please specify the service *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g., Custom Development"
                      value={formData.customService}
                      onChange={e => setFormData({...formData, customService: e.target.value})}
                    />
                  </div>
                )}

                <div className="booking-input-group">
                  <label>What would you like to discuss?</label>
                  <textarea 
                    rows={4} 
                    placeholder="Briefly describe your project or challenge..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="booking-footer" style={{ marginTop: 32 }}>
                  <button type="submit" disabled={sending} className="v2-btn v2-btn--filled" style={{ width: '100%', justifyContent: 'center' }}>
                    {sending ? "Confirming…" : "Confirm Booking"}
                  </button>
                {error && <p className="booking-error" role="alert">{error}</p>}
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="booking-step booking-success fade-in">
              <div className="booking-success-icon">
                <CheckCircle2 size={64} />
              </div>
              <h2>Booking Confirmed</h2>
              <p>You're all set for <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.</p>
              <p className="booking-success-sub">A calendar invitation has been sent to {formData.email || "your email"}.</p>
              <button className="booking-done-btn" onClick={() => setIsOpen(false)}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
