import { WebGLRenderer } from "three";

export const createRenderer = (clearColor = 0xfdfdfd, shadowEnabled = true) => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setClearColor(clearColor);
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.shadowMap.enabled = shadowEnabled;
  return renderer;
};
