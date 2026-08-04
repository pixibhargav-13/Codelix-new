import React, { useEffect, useState } from 'react';

export default function GoogleReviewButton({ className = "" }) {
  const [rating, setRating] = useState('5.0');
  const [reviewsCount, setReviewsCount] = useState('42');
  
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        fetchReviews();
        return;
      }
      const existingScript = document.getElementById('google-maps-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA66EhdGgfG0HSbt2q89cMVJJh5lITncyA&libraries=places';
        script.id = 'google-maps-script';
        script.async = true;
        script.defer = true;
        script.onload = fetchReviews;
        document.body.appendChild(script);
      } else {
        existingScript.addEventListener('load', fetchReviews);
      }
    };

    const fetchReviews = () => {
      if (!window.google || !window.google.maps) return;
      const dummyElement = document.createElement('div');
      const service = new window.google.maps.places.PlacesService(dummyElement);
      
      const request = {
        query: 'Codelix IT Solutions Pvt Ltd',
        fields: ['rating', 'user_ratings_total'],
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          const place = results[0];
          if (place.rating) {
             setRating(place.rating.toFixed(1));
          }
          if (place.user_ratings_total) {
             setReviewsCount(place.user_ratings_total.toString());
          }
        }
      });
    };

    loadGoogleMapsAPI();
  }, []);

  const starCount = Math.round(parseFloat(rating));
  const starsArray = [...Array(5)].map((_, i) => (i < starCount ? '★' : '☆')).join('');

  return (
    <a 
      href="https://www.google.com/search?sca_esv=dc96f26ba5476417&sxsrf=APpeQnvWQZ30fq1-6pmEMZOeVyf52VwbZg:1785870466702&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_-Ojl3QKpn5SeJBTlJRjkTDOHzCpkPjWoEXOyyXU_LD3fWIKUwATRmAZyGZXvNxgzHpy6zaCpey86_ogvf-1JuPZLqoLaGlStD5kIYLcqPzma8XIGQ%3D%3D&q=Codelix+IT+Solutions+Pvt+Ltd+Reviews&sa=X&ved=2ahUKEwj8jKH21YeWAxWYleEIHZtwILwQ0bkNegQIKxAH&biw=1396&bih=663&dpr=1.38#lrd=0x395e856f394696fd:0x69f60cf69bf7dd43,3,,,," 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`v2-footer-google-review ${className}`.trim()}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="v2-google-logo">
         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <div className="v2-google-review-text">
        <span className="v2-google-stars">{starsArray}</span>
        <span className="v2-google-rating">{rating} ({reviewsCount} reviews)</span>
      </div>
    </a>
  );
}
