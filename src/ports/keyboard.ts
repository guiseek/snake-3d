import { Callback, ControlName, Predicate } from "../types";

export abstract class Keyboard {
  abstract on(
    direction: ControlName,
    fn: Callback,
    predicate?: Predicate
  ): {
    off: () => boolean;
  };
}
