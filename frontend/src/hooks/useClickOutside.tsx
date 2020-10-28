import { RefObject, useRef } from 'react';
import { useEventListener } from './useEventListener';

export const useClickOutside = <T extends any>(
  callback: () => void
): RefObject<T> => {
  const elRef = useRef<T>(null);

  const handler = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    if (
      elRef &&
      elRef.current &&
      !(elRef.current as HTMLElement).contains(target) &&
      document.contains(target)
    ) {
      callback();
    }
  };

  useEventListener('click', handler as EventListener);

  return elRef;
};
