import { useState, useEffect } from 'react';

import { MOBILE_MAX_WIDTH, TABLET_MAX_WIDTH } from '~/components/shared';

export interface Dimension {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function getWindowDimensions(): Dimension {
  const dimensions: Dimension = {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= MOBILE_MAX_WIDTH,
    isTablet: window.innerWidth <= TABLET_MAX_WIDTH,
    isDesktop: window.innerWidth > TABLET_MAX_WIDTH,
  };
  return dimensions;
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
