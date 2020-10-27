import { isBreakpoint, isMinBreakpoint } from 'common/helpers';
import { useCallback, useState } from 'react';
import { useEventListener } from './useEventListener';
import { Breakpoint } from 'common/types';

import debounce from 'lodash/debounce';

interface UseBreakpointsState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWidescreen: boolean;
  isFullHD: boolean;
  isMinScreen: {
    isTablet: boolean;
    isDesktop: boolean;
    isWidescreen: boolean;
    isFullHD: boolean;
  };
}

const getCurrentBreakpoints = (): UseBreakpointsState => ({
  isMobile: isBreakpoint(Breakpoint.Mobile),
  isTablet: isBreakpoint(Breakpoint.Tablet),
  isDesktop: isBreakpoint(Breakpoint.Desktop),
  isWidescreen: isBreakpoint(Breakpoint.Widescreen),
  isFullHD: isBreakpoint(Breakpoint.FullHD),
  isMinScreen: {
    isTablet: isMinBreakpoint(Breakpoint.Tablet),
    isDesktop: isMinBreakpoint(Breakpoint.Desktop),
    isWidescreen: isMinBreakpoint(Breakpoint.Widescreen),
    isFullHD: isMinBreakpoint(Breakpoint.FullHD),
  },
});

export const useBreakpoint = (debounceTime = 500): UseBreakpointsState => {
  const [breakpoints, setBreakpoints] = useState<UseBreakpointsState>(
    getCurrentBreakpoints()
  );

  const handler = useCallback(
    debounce(() => {
      setBreakpoints(getCurrentBreakpoints());
    }, debounceTime),
    [setBreakpoints]
  );

  useEventListener('resize', handler, false, window as any);

  return breakpoints;
};
