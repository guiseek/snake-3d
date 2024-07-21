import { PerspectiveCamera, Vector3Like } from "three";

export const createCamera = ({ x, y, z }: Vector3Like) => {
  const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(x, y, z);
  return camera
};
