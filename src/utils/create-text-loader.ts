import { FontLoader } from "three/examples/jsm/Addons.js";

const loader = new FontLoader();

export const createTextLoder = async (url: string) => {
  return loader.loadAsync(url);
};
