import { Breakpoint } from "common/types";
import { BoolFunction } from "common/types";
import { mapValues } from "./objects";

interface MinBreakpoints {
  isTablet: BoolFunction;
  isDesktop: BoolFunction;
  isWidescreen: BoolFunction;
  isFullHD: BoolFunction;
}

interface Device {
  isTablet: BoolFunction;
  isDesktop: BoolFunction;
  isWidescreen: BoolFunction;
  isFullHD: BoolFunction;
  isMobile: BoolFunction;
  isMin: () => MinBreakpoints;
  isTouchDevice: BoolFunction;
}

export const isBreakpoint = (bp: Breakpoint) => {
  const innerWidth = window.innerWidth;

  switch (bp) {
    case Breakpoint.Mobile:
      return innerWidth <= 768;
    case Breakpoint.Tablet:
      return innerWidth >= 769 && innerWidth < 1024;
    case Breakpoint.Desktop:
      return innerWidth >= 1024 && innerWidth < 1216;
    case Breakpoint.Widescreen:
      return innerWidth >= 1216 && innerWidth < 1408;
    case Breakpoint.FullHD:
      return innerWidth >= 1408;
    default:
      return false;
  }
}

const minBreakpoints: { [k: string]: BoolFunction } = {
  isTablet: () => isBreakpoint(Breakpoint.Tablet),
  isDesktop: () => isBreakpoint(Breakpoint.Desktop),
  isWidescreen: () => isBreakpoint(Breakpoint.Widescreen),
  isFullHD: () => isBreakpoint(Breakpoint.FullHD),
}

const { isTablet, isDesktop, isWidescreen, isFullHD } = minBreakpoints;

// This namespace is to help with detecting some browser device details
export const Device: Device = {
  isMobile: () => isBreakpoint(Breakpoint.Mobile),
  isTablet,
  isDesktop,
  isWidescreen,
  isFullHD,
  // Apply a function to check breakpoints with minimal window width assumtion
  isMin: () => {
    return mapValues<BoolFunction, MinBreakpoints>(minBreakpoints, (_, index) => () => {
      const keys = Object.keys(minBreakpoints);
      return keys.slice(index, keys.length).some((key: string) => minBreakpoints[key]());
    });
  },
  isTouchDevice: () => 'ontouchstart' in window
};
