import { Breakpoint } from "common/types";
import { BoolFunction } from "common/types";

interface Device {
  isTouchDevice: BoolFunction;
}

// This namespace is to help with detecting some browser device details
export const Device: Device = {
  isTouchDevice: () => 'ontouchstart' in window
};

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

export const isMinBreakpoint = (bp: Breakpoint) => {
  const innerWidth = window.innerWidth;

  switch (bp) {
    case Breakpoint.Mobile:
      return innerWidth <= 768;
    case Breakpoint.Tablet:
      return innerWidth >= 769;
    case Breakpoint.Desktop:
      return innerWidth >= 1024;
    case Breakpoint.Widescreen:
      return innerWidth >= 1216;
    case Breakpoint.FullHD:
      return innerWidth >= 1408
    default:
      return false;
  }
}
