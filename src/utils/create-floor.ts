import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

let FLOOD_INC = 0;

export const createFloor = () => {
  const floorGeometry = new PlaneGeometry(40, 40);

  const floorMaterial = new MeshStandardMaterial({
    color: 0x0d1116,
    opacity: 0.1,
    transparent: false,
  });

  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.name = `FLOOR_${FLOOD_INC++}`;
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -24;
  floor.receiveShadow = true; // Ativar sombras no plano

  return floor;
};
