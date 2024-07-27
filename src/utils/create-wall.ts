import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3Like } from "three";

let WALL_INC = 0;

export const createWall = (
  size: number,
  color: number,
  position: Vector3Like
) => {
  const wallMaterial = new MeshBasicMaterial({ color });
  const wall = new Mesh(new BoxGeometry(size, size, size), wallMaterial);
  wall.name = `WALL_${WALL_INC++}`;
  wall.position.copy(position);
  wall.receiveShadow = true;
  wall.castShadow = true;
  return wall;
};
