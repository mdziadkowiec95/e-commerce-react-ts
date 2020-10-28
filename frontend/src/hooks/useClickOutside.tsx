import { RefObject, useRef } from 'react';
import { useEventListener } from './useEventListener';

export const useClickOutside = <T extends any>(
  callback: () => void,
  isTrueClickMode = false
): RefObject<T> => {
  const elRef = useRef<T>(null);

  const handler = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    if (
      elRef &&
      elRef.current &&
      !(elRef.current as HTMLElement).contains(target)
    ) {
      callback();
    }
  };

  useEventListener(
    !isTrueClickMode ? 'mousedown' : 'click',
    handler as EventListener
  );

  return elRef;
};
