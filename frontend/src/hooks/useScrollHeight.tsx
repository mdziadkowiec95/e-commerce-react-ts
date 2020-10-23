import { RefObject, useEffect, useRef, useState } from 'react';

// This hook returns element scroll height based on active state
export const useScrollHeight = <T extends any>(isActive: boolean) => {
  const elRef = useRef<T>(null);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    if (elRef && elRef.current) {
      const el = elRef.current as HTMLElement;

      if (isActive) {
        setScrollHeight(el.scrollHeight);
      } else {
        setScrollHeight(0);
      }
    }
  }, [isActive, scrollHeight]);

  return [scrollHeight, elRef] as [number, RefObject<T>];
};
