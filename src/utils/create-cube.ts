import { BoxGeometry, Mesh, MeshLambertMaterial, Vector3Like } from "three";

let CUBE_INC = 0;

export function createCube(size: number, color: number, position: Vector3Like) {
  const geometry = new BoxGeometry(size, size, size);
  const material = new MeshLambertMaterial({ color: color });
  const cube = new Mesh(geometry, material);
  cube.name = `CUBE_${CUBE_INC++}`;
  cube.position.copy(position);
  cube.receiveShadow = true;
  cube.castShadow = true;
  return cube;
}
