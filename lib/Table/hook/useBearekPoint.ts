import { useLayoutEffect, useState } from 'react';

export function useBreakpoint() {
  const [widthScreen, setWidthScreen] = useState(500);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setWidthScreen(window.innerWidth);
      }, 200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    widthScreen,
  };
}
