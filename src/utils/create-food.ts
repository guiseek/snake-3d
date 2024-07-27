import { BoxGeometry, Mesh, MeshLambertMaterial, Vector3Like } from "three";

let FOOD_INC = 0;

export const createFood = (
  size: number,
  color: number,
  position: Vector3Like
) => {
  const foodGeometry = new BoxGeometry(size, size, size);
  const foodMaterial = new MeshLambertMaterial({ color });
  const food = new Mesh(foodGeometry, foodMaterial);
  food.name = `FOOD_${FOOD_INC++}`;
  food.position.copy(position);
  food.castShadow = true;
  food.receiveShadow = true;
  return food;
};
