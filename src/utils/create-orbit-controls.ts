import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Camera } from "three";

const defaultDistance = { min: 0, max: 0 }

export const createOrbitControls = (
  camera: Camera,
  domElement: HTMLCanvasElement,
  distance = defaultDistance,
  autoRotate = false,
) => {
  const controls = new OrbitControls(camera, domElement);
  controls.autoRotate = autoRotate;
  if (distance.min) controls.minDistance = distance.min
  if (distance.max) controls.maxDistance = distance.max
  return controls;
};
