import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3Like } from "three";

export const createWall = (
  size: number,
  color: number,
  position: Vector3Like
) => {
  const wallMaterial = new MeshBasicMaterial({ color });
  const wall = new Mesh(new BoxGeometry(size, size, size), wallMaterial);
  wall.position.copy(position);
  wall.receiveShadow = true;
  wall.castShadow = true;
  return wall;
};
