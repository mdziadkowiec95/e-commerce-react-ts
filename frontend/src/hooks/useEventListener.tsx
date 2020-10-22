import { useEffect } from 'react';

export const useEventListener = (
  type: string,
  handler: EventListener,
  options: boolean = false,
  target: Node = document
) => {
  useEffect(() => {
    target.addEventListener(type, handler, options);

    return () => {
      target.removeEventListener(type, handler);
    };
  }, [type, handler, options, target]);
};
