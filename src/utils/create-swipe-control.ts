import { Callback, Direction, Predicate } from "../types";
import { addEvent } from "./add-event";

export const createSwipeControl = () => {
  const listeners = {
    up: new Set<Callback>(),
    right: new Set<Callback>(),
    down: new Set<Callback>(),
    left: new Set<Callback>(),
  };

  const handleDispatch = (fn: Callback) => {
    if (fn.predicate) {
      if (fn.predicate()) fn();
    } else {
      fn();
    }
  };

  let touchStartX = 0;
  let touchStartY = 0;

  addEvent("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  });

  addEvent("touchmove", (event) => {
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 0) {
        for (const fn of listeners.right) {
          handleDispatch(fn);
        }
      } else if (diffX < 0) {
        for (const fn of listeners.left) {
          handleDispatch(fn);
        }
      }
    } else {
      // Vertical swipe
      if (diffY > 0) {
        for (const fn of listeners.down) {
          handleDispatch(fn);
        }
      } else if (diffY < 0) {
        for (const fn of listeners.up) {
          handleDispatch(fn);
        }
      }
    }

    touchStartX = touchEndX;
    touchStartY = touchEndY;
  });

  const on = <D extends Direction>(
    direction: D,
    fn: Callback,
    predicate?: Predicate
  ) => {
    fn.predicate = predicate;
    listeners[direction].add(fn);
    return { off: () => listeners[direction].delete(fn) };
  };

  return { on };
};
