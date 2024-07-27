import { Mesh, Vector3 } from "three";

export const checkSelfCollision = (
  head: Vector3,
  segments: Mesh[],
  step: number
): boolean => {
  for (let i = 1; i < segments.length; i++) {
    if (head.distanceTo(segments[i].position) < step / 2) {
      return true;
    }
  }
  return false;
};
