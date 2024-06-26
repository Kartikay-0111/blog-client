import { useState, useEffect } from 'react';

const useScreenSize = (maxWidth) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < maxWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < maxWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [maxWidth]);

  return isSmallScreen;
};

export default useScreenSize;
