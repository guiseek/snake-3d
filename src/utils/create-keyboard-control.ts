import { Callback, Direction, Predicate } from "../types";
import { addEvent } from "./add-event";

export const createKeyboardControl = () => {
  const keys = {
    up: ["ArrowUp", "KeyW"],
    right: ["ArrowRight", "KeyD"],
    down: ["ArrowDown", "KeyS"],
    left: ["ArrowLeft", "KeyA"],
  };

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

  addEvent("keydown", (ev) => {
    if (keys.up.includes(ev.code)) {
      for (const fn of listeners.up) {
        handleDispatch(fn);
      }
    }
    if (keys.down.includes(ev.code)) {
      for (const fn of listeners.down) {
        handleDispatch(fn);
      }
    }
    if (keys.right.includes(ev.code)) {
      for (const fn of listeners.right) {
        handleDispatch(fn);
      }
    }
    if (keys.left.includes(ev.code)) {
      for (const fn of listeners.left) {
        handleDispatch(fn);
      }
    }
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
