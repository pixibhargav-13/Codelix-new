import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            } else {
              entry.target.classList.remove('visible');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      const animateElements = document.querySelectorAll('.scroll-animate');
      
      // Make elements visible immediately if they're already in view
      const checkInitialVisibility = () => {
        animateElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('visible');
          }
        });
      };

      // Start observing all elements
      animateElements.forEach((element) => observer.observe(element));
      
      // Check initial visibility after a short delay
      setTimeout(checkInitialVisibility, 100);

      return () => {
        animateElements.forEach((element) => observer.unobserve(element));
      };
    }, 300); // Increased delay to ensure DOM is fully ready

    return () => clearTimeout(timer);
  }, []);
};
