import React, { useEffect, useRef, useState } from "react";
import "./PageLoader.css";

/**
 * CodelixLoader
 * ─────────────
 * Guaranteed minimum-duration branded loader.
 *
 * Problem this solves:
 *   React Suspense unmounts the fallback the moment the lazy chunk resolves.
 *   When chunks are cached (2nd+ visit to a page) that can be <10ms,
 *   making the loader flash and disappear immediately.
 *
 * Solution:
 *   We ignore Suspense's unmount signal until MIN_DURATION has passed,
 *   then trigger our own smooth exit animation before actually letting go.
 *
 * Timeline:
 *   0ms       – overlay mounts, logo begins animating in
 *   ~700ms    – both SVG paths fully visible
 *   ~900ms    – wordmark faded in
 *   1800ms    – is-leaving class added  →  overlay fades out (0.7s)
 *   ~2500ms   – display:none, page fully revealed
 */

const MIN_DURATION = 1200; // ms before exit animation begins (matches reference ~1800ms)
const EXIT_DURATION = 300; // ms for the fade-out transition (matches reference 0.6s)

const CodelixLoader = () => {
  const loaderRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    let exitTimer;
    let removeTimer;

    // 1. After MIN_DURATION, start the exit animation
    exitTimer = setTimeout(() => {
      if (loader) loader.classList.add("is-leaving");

      // 2. After exit animation finishes, unmount
      removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, EXIT_DURATION + 50); // tiny buffer

    }, MIN_DURATION);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="cl-loader" ref={loaderRef} aria-hidden="true">
      <div className="cl-loader__inner">

        {/* Codelix SVG logo — two paths stagger in */}
        <div className="cl-loader__logo">
          <svg
            className="cl-loader__svg"
            viewBox="0 0 83 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              className="cl-loader__path cl-loader__path--1"
              d="M56.2984 94.691V81.8411H39.8218H23.4206C23.4206 81.8411 20.5636 81.7253 19.5049 81.5591C18.372 81.3813 17.4687 81.2206 16.7253 80.6291C15.982 80.0376 15.9354 78.8792 15.9354 78.8792L15.6608 77.0032V74.0552V49.9354V26.0831C15.6608 26.0831 15.6193 24.0087 15.6608 22.8518C15.7024 21.6949 15.6608 20.5341 15.6608 19.3951C15.6608 18.2813 15.4726 17.1484 16.3485 16.4357C17.2243 15.7231 17.704 15.8633 19.2074 15.8633H23.3453H56.2984V2.76785L21.0883 2.63786C21.0883 2.63786 16.4989 2.5066 13.5648 2.80762C11.8005 2.98861 10.8079 3.24091 9.2011 4.06557C7.32791 5.02695 6.34644 5.85268 5.06317 7.52217C3.94321 8.9792 3.40799 9.80612 2.95657 11.7303C2.06844 15.516 2.58042 22.8518 2.58042 22.8518V50.5805V67.6386V76.2052V80.4885V82.7428L2.65565 83.9452L2.73089 84.4712L2.80612 84.8469C2.80612 84.8469 3.33363 87.1242 4.23559 88.6042C5.28889 90.3325 6.04124 91.1591 7.62117 92.3615C8.677 93.1649 9.38854 93.4718 10.6306 93.9395C11.6839 94.3361 13.3391 94.5405 13.3391 94.5405L18.3798 94.691L23.4206 94.691H35.1573H56.2984Z"
              fill="#3E7DFC"
            />
            <path
              className="cl-loader__path cl-loader__path--2"
              d="M25.3125 75.1996H38.4468V35.9652H61.808H65.0109C65.0109 35.9652 66.0508 35.925 66.648 36.1804C67.1483 36.3944 67.4105 36.5989 67.7868 37.0078C68.6241 37.9175 68.7567 40.0914 68.7567 40.0914V43.4384V68.9161V94.3938C68.7567 94.3938 68.7567 97.1014 68.6409 98.6808C68.5418 100.033 68.4163 100.408 67.6445 100.937C67.0542 101.342 66.298 101.238 65.8651 101.238H64.5839H63.1604H25.3125V114.701H68.7567C68.7567 114.701 72.4283 114.761 74.5661 113.9C76.1784 113.251 77.1347 112.787 78.3548 111.498C79.5749 110.209 80.0874 109.226 80.6281 107.495C81.0041 106.29 81.1332 104.292 81.1332 104.292V95.2171V34.0968C81.1332 32.3893 80.8832 31.2917 80.1003 29.4866C80.1003 29.4866 79.653 28.6571 79.0487 27.7358C78.6351 27.1053 77.6907 25.912 77.1856 25.4789L77.1825 25.4761C75.8693 24.3501 75.6096 24.1273 74.0609 23.4208L74.0245 23.4042C73.3939 23.1165 73.0235 22.9475 72.3421 22.7929C71.6454 22.6348 70.5248 22.6201 70.5248 22.6201H65.7257H25.3125V75.1996Z"
              fill="#3E7DFC"
            />
          </svg>
        </div>

        {/* CODELIX wordmark */}
        {/*<p className="cl-loader__wordmark">CODELIX</p>*/}
      </div>
    </div>
  );
};

export default CodelixLoader;
