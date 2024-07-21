import { Vector3 } from "three";

export const generatePosition = (gridSize: number, stepSize: number) => {
  const position = new Vector3();
  position.x = Math.floor(Math.random() * gridSize - gridSize / 2) * stepSize;
  position.y = Math.floor(Math.random() * gridSize - gridSize / 2) * stepSize;
  position.z = 0;
  return position;
};
