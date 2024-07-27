import { Callback, Direction, Predicate } from "../types";

export abstract class Swipe {
  abstract on<D extends Direction>(
    direction: D,
    fn: Callback,
    predicate?: Predicate
  ): {
    off: () => boolean;
  };
}
