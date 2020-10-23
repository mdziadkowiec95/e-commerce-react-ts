import { RefObject, useRef } from 'react';
import { useEventListener } from './useEventListener';

export const useClickOutside = <T extends any>(
  callback: () => void
): RefObject<T> => {
  const elRef = useRef<T>(null);

  const handler = (e: MouseEvent): void => {
    if (
      elRef &&
      elRef.current &&
      !(elRef.current as HTMLElement).contains(e.target as HTMLElement)
    ) {
      callback();
    }
  };

  useEventListener('click', handler as EventListener);

  return elRef;
};
