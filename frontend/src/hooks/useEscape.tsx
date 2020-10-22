import { KeyboardEvents } from '../helpers/keyboardEvents';
import { useEventListener } from './useEventListener';

export const useEscape = (callback: () => void) => {
  const handler = (e: KeyboardEvent) => {
    if (KeyboardEvents.isEscape(e)) {
      callback();
    }
  };

  useEventListener('keyup', handler as EventListener);
};
