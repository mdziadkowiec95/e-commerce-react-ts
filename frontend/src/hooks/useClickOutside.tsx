import { useRef } from 'react';
import { useEventListener } from './useEventListener';

export const useClickOutside = (callback: () => void) => {
  const elRef = useRef<HTMLElement>(null);

  const handler = (e: MouseEvent): void => {
    if (
      elRef &&
      elRef.current &&
      !elRef.current.contains(e.target as HTMLElement)
    ) {
      callback();
    }
  };

  useEventListener('click', handler as EventListener);

  return elRef;
};
