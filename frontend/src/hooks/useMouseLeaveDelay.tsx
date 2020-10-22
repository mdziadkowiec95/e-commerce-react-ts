import { MouseEvent, useState } from 'react';

type Timeout = ReturnType<typeof setTimeout>;

// This hook helps when after 'mouseneter' event you'd like to triger some action on 'mouseleave' with some delay
// Example -> hiding dropdown with 2 seconds delay when user is leaving it
export const useMouseLeaveDelay = (delay = 2000) => {
  const [timerId, setTimerId] = useState<Timeout>();

  const createMouseEnterHandler = (
    callback: (e: MouseEvent<HTMLElement>) => void
  ) => (e: MouseEvent<HTMLElement>) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    callback(e);
  };

  const createMouseLeaveHandler = (
    callback: (e: MouseEvent<HTMLElement>) => void
  ) => (e: MouseEvent<HTMLElement>) => {
    const timer = setTimeout(() => {
      callback(e);
    }, delay);

    setTimerId(timer);
  };

  return {
    createMouseEnterHandler,
    createMouseLeaveHandler,
  };
};
