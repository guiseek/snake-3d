import { Mesh, Vector3 } from "three";

export interface Snake {
  direction: Vector3;
  segments: Mesh[];
  length: number;
}
