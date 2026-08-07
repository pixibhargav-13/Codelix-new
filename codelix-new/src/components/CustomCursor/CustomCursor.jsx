import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./CustomCursor.css";

const HOVER_SELECTOR =
  'a, button, [role="button"], input[type="submit"], input[type="button"], .clickable-logo, .logo-item-block, [data-cursor-hover]';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const location = useLocation();

  const isV2Route = location.pathname.includes("v2");
  const isAdminRoute = location.pathname.startsWith("/admin");
  const shouldHideCursor = isV2Route || isAdminRoute;

  useEffect(() => {
    if (shouldHideCursor) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = -100;
    let y = -100;
    let rafId = 0;
    let pending = false;

    const apply = () => {
      cursor.style.setProperty("--cursor-x", `${x}px`);
      cursor.style.setProperty("--cursor-y", `${y}px`);
      pending = false;
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(apply);
      }
    };

    const onDown = () => cursor.style.setProperty("--cursor-scale", "0.4");
    const onUp = () => cursor.style.setProperty("--cursor-scale", "1");

    const onClick = () => {
      cursor.classList.add("expand");
      cursor.style.setProperty("--cursor-scale", "1.6");
      setTimeout(() => {
        cursor.classList.remove("expand");
        cursor.style.setProperty("--cursor-scale", "1");
      }, 300);
    };

    const onOver = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        cursor.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        cursor.classList.remove("is-hover");
      }
    };

    const onLeaveWindow = () => cursor.classList.add("is-hidden");
    const onEnterWindow = () => cursor.classList.remove("is-hidden");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);

    document.body.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [shouldHideCursor]);

  if (shouldHideCursor) {
    return null;
  }

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};

export default CustomCursor;
