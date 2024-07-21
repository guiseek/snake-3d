import { AmbientLight, DirectionalLight } from "three";

interface LightParams {
  color: number;
  intensity?: number;
}

interface LightOptions {
  ambient: LightParams;
  directional: LightParams;
}

export const createLights = (options: LightOptions) => {
  const ambient = new AmbientLight(
    options.ambient.color,
    options.ambient.intensity
  );

  const directional = new DirectionalLight(
    options.directional.color,
    options.directional.intensity
  );

  directional.position.set(5, 10, 7).normalize();
  directional.castShadow = true;
  directional.shadow.mapSize.width = 2048; // Aumentar o tamanho do mapa de sombras
  directional.shadow.mapSize.height = 2048; // Aumentar o tamanho do mapa de sombras
  directional.shadow.camera.near = 0.5;
  directional.shadow.camera.far = 50;
  directional.shadow.camera.left = -20; // Aumentar área de projeção das sombras
  directional.shadow.camera.right = 20;
  directional.shadow.camera.top = 20;
  directional.shadow.camera.bottom = -20;

  return { ambient, directional };
};
