import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    
    if (hash) {
      const id = hash.replace('#', '');
      
      // We use a small timeout to ensure the element has been rendered to the page
      // before we try to scroll to it.
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100); // A 100ms delay is usually enough.

      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [location]); // This effect runs whenever the URL changes
};

export default useScrollToHash;
