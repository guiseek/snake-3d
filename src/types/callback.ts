import { Predicate } from "./predicate";

export interface Callback {
  (): void;
  predicate?: Predicate;
}
