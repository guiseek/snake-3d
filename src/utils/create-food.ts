import { BoxGeometry, Mesh, MeshLambertMaterial, Vector3Like } from "three";

export const createFood = (
  size: number,
  color: number,
  position: Vector3Like
) => {
  const foodGeometry = new BoxGeometry(size, size, size);
  const foodMaterial = new MeshLambertMaterial({ color });
  const food = new Mesh(foodGeometry, foodMaterial);
  food.position.copy(position);
  food.castShadow = true;
  food.receiveShadow = true;
  return food;
};
