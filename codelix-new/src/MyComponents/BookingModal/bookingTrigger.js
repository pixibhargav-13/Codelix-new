/* Which clicks open the booking modal instead of following the link: the
   navbar CTA, and any "Book…" link pointing at /contact. Shared by the
   modal itself and by the small gate in App.jsx that loads the modal on
   first use, so the two can never disagree about what counts. */
export function bookingAnchorFor(event) {
  const anchor = event.target.closest?.("a");
  if (!anchor || anchor.getAttribute("href") !== "/contact") return null;
  const isNavCta = anchor.classList.contains("v2-nav-cta");
  const isContactButton = anchor.textContent?.trim().toLowerCase().includes("book");
  return isNavCta || isContactButton ? anchor : null;
}

export const OPEN_BOOKING_EVENT = "open-booking-modal";
