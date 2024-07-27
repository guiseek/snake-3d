import { Callback, Direction, Predicate } from "../types";
import { addEvent } from "./add-event";

export const createSwipeControl = () => {
  const listeners = {
    up: new Set<Callback>(),
    right: new Set<Callback>(),
    down: new Set<Callback>(),
    left: new Set<Callback>(),
  };

  const handleDispatch = (callback: Callback) => {
    if (callback.predicate) {
      if (callback.predicate()) {
        callback();
      }
    } else callback();
  };

  let touchStartX = 0;
  let touchStartY = 0;

  addEvent("touchstart", ({ touches }) => {
    touchStartX = touches[0].clientX;
    touchStartY = touches[0].clientY;
  });

  addEvent("touchmove", ({ touches }) => {
    const touchEndX = touches[0].clientX;
    const touchEndY = touches[0].clientY;

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

  const on = (
    direction: Direction,
    callback: Callback,
    predicate?: Predicate
  ) => {
    callback.predicate = predicate;
    listeners[direction].add(callback);
    return { off: () => listeners[direction].delete(callback) };
  };

  return { on };
};
