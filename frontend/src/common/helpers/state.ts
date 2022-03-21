import { Dispatch, SetStateAction } from "react";

// A helper function to force double toggle. This is to help with re-asigning the css class to re-trigger CSS animation
export const forceDoubleToggle = (
  fn: Dispatch<SetStateAction<boolean>>,
  currentState: boolean
) => {
  fn(!currentState);
  fn(currentState);
};