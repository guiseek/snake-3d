import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export const createFloor = () => {
  const floorGeometry = new PlaneGeometry(40, 40);

  const floorMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    opacity: 0.1,
    transparent: false,
  });

  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -24;
  floor.receiveShadow = true; // Ativar sombras no plano

  return floor;
};
