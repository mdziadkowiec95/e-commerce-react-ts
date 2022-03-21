import { KeyboardCode, KeyboardKey } from "../common/types/events";

export const KeyboardEvents = {
  isEscape: (e: KeyboardEvent) => e.key === KeyboardKey.ESCAPE || e.keyCode === KeyboardCode.ESCAPE
}