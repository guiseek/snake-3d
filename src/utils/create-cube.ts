import { BoxGeometry, Mesh, MeshLambertMaterial, Vector3Like } from "three";

export function createCube(size: number, color: number, position: Vector3Like) {
  const geometry = new BoxGeometry(size, size, size);
  const material = new MeshLambertMaterial({ color: color });
  const cube = new Mesh(geometry, material);
  cube.position.copy(position);
  cube.receiveShadow = true;
  cube.castShadow = true;
  return cube;
}
