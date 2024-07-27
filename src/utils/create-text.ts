import { Mesh, MeshBasicMaterial, Vector3Like } from "three";
import { Font, TextGeometry } from "three/examples/jsm/Addons.js";

let TEXT_INC = 0;

export const createText = (
  value: string | number,
  font: Font,
  size: number,
  position: Vector3Like,
  color = 0x161b22,
) => {
  const geometry = new TextGeometry(String(value), {
    font,
    size,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  const material = new MeshBasicMaterial({ color });
  const text = new Mesh(geometry, material);
  text.name = `TEXT_${TEXT_INC++}`;
  text.position.copy(position);
  return text;
};
