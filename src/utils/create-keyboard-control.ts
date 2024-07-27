import { Callback, ControlName, Predicate } from "../types";
import { addEvent } from "./add-event";

export const createKeyboardControl = () => {
  const controls = {
    up: ["ArrowUp", "KeyW"],
    right: ["ArrowRight", "KeyD"],
    down: ["ArrowDown", "KeyS"],
    left: ["ArrowLeft", "KeyA"],
    pause: ["KeyP"],
  };

  const listeners = {
    up: new Set<Callback>(),
    right: new Set<Callback>(),
    down: new Set<Callback>(),
    left: new Set<Callback>(),
    pause: new Set<Callback>(),
  };

  const handleDispatch = (callback: Callback) => {
    if (callback.predicate) {
      if (callback.predicate()) callback();
    } else callback();
  };

  addEvent("keydown", (ev) => {
    if (controls.up.includes(ev.code)) {
      for (const fn of listeners.up) {
        handleDispatch(fn);
      }
    }
    if (controls.down.includes(ev.code)) {
      for (const fn of listeners.down) {
        handleDispatch(fn);
      }
    }
    if (controls.right.includes(ev.code)) {
      for (const fn of listeners.right) {
        handleDispatch(fn);
      }
    }
    if (controls.left.includes(ev.code)) {
      for (const fn of listeners.left) {
        handleDispatch(fn);
      }
    }
    if (controls.pause.includes(ev.code)) {
      for (const fn of listeners.pause) {
        handleDispatch(fn);
      }
    }
  });

  const on = (
    control: ControlName,
    callback: Callback,
    predicate?: Predicate
  ) => {
    callback.predicate = predicate;
    listeners[control].add(callback);
    return { off: () => listeners[control].delete(callback) };
  };

  return { on };
};
