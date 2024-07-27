import { Mesh, Scene, Vector3, Vector3Like } from "three";
import { Font } from "three/examples/jsm/Addons.js";
import { Keyboard, Swipe } from "./ports";
import { set, use } from "@websqnl/di";
import { Snake } from "./types";
import {
  create,
  addEvent,
  createCube,
  createFood,
  createText,
  createFloor,
  createStore,
  createCamera,
  createLights,
  createRenderer,
  createTextLoder,
  toggleFullscreen,
  generatePosition,
  createSwipeControl,
  checkSelfCollision,
  createKeyboardControl,
} from "./utils";
import "./style.scss";

set(
  {
    ref: Swipe,
    use: createSwipeControl,
  },
  {
    ref: Keyboard,
    use: createKeyboardControl,
  }
);

const store = createStore({
  record: 0,
  score: 0,
});

const config = {
  grid: 30,
  cube: 1,
  gap: 0.1,
  get step() {
    return this.cube + this.gap;
  },
  paused: false,
  gameOver: false,
};

const snake: Snake = {
  direction: new Vector3(1, 0, 0),
  segments: [],
  length: 5,
};

const initialize = () => {
  for (let i = 0; i < snake.length; i++) {
    const position = { x: -(i * config.step), y: 0, z: 0 };
    const color = colors[i % colors.length];
    const cube = createCube(config.cube, color, position);
    snake.segments.push(cube);
    scene.add(cube);
  }

  animate(0);
};

let font: Font;

const textLoader = createTextLoder("fonts/helvetiker_regular.json");
textLoader.then((value) => {
  font = value;
  initialize();
});

const writeText = (value: string, position: Vector3Like) => {
  const text = createText(value, font, 1, position, colors[4]);
  scene.add(text);
};

const swipe = use(Swipe);
const keyboard = use(Keyboard);

const controlValidator = (key: keyof Vector3Like) => {
  return () => snake.direction[key] === 0 && !config.paused;
};

const colors = [0x161b22, 0x0e4429, 0x006d32, 0x26a641, 0x39d353];

keyboard.on("pause", () => (config.paused = !config.paused));
swipe.on("up", () => snake.direction.set(0, 1, 0), controlValidator("y"));
swipe.on("down", () => snake.direction.set(0, -1, 0), controlValidator("y"));
swipe.on("right", () => snake.direction.set(1, 0, 0), controlValidator("x"));
swipe.on("left", () => snake.direction.set(-1, 0, 0), controlValidator("x"));
keyboard.on("up", () => snake.direction.set(0, 1, 0), controlValidator("y"));
keyboard.on("down", () => snake.direction.set(0, -1, 0), controlValidator("y"));
keyboard.on("right", () => snake.direction.set(1, 0, 0), controlValidator("x"));
keyboard.on("left", () => snake.direction.set(-1, 0, 0), controlValidator("x"));

const scene = new Scene();

const camera = createCamera({ x: 16, y: 36, z: 36 });

const renderer = createRenderer(0x0d1116, true);
app.appendChild(renderer.domElement);

const lights = createLights({
  ambient: { color: 0xffffff, intensity: 4 },
  directional: { color: 0xffffff, intensity: 1 },
});

scene.add(...Object.values(lights), createFloor());

for (let x = -config.grid / 2; x <= config.grid / 2; x++) {
  for (let y = -config.grid / 2; y <= config.grid / 2; y++) {
    scene.add(
      createCube(config.cube, 0x0d1116, {
        x: x * config.step,
        y: y * config.step,
        z: 0,
      })
    );
  }
}

// for (let i = -config.grid / 2; i <= config.grid / 2; i++) {
//   scene.add(
//     createWall(config.cube, 0x161b22, {
//       x: i * config.step,
//       y: (config.grid / 2) * config.step,
//       z: 0,
//     }),
//     createWall(config.cube, 0x161b22, {
//       x: i * config.step,
//       y: -(config.grid / 2) * config.step,
//       z: 0,
//     }),
//     createWall(config.cube, 0x161b22, {
//       x: (config.grid / 2) * config.step,
//       y: i * config.step,
//       z: 0,
//     }),
//     createWall(config.cube, 0x161b22, {
//       x: -(config.grid / 2) * config.step,
//       y: i * config.step,
//       z: 0,
//     })
//   );
// }

const icon = create("img", { src: "get-fullscreen.svg" });
const btn = create(
  "button",
  {
    value: "get",
    onclick() {
      toggleFullscreen(document.documentElement);
      const state = btn.value === "get" ? "cancel" : "get";
      btn.value = state;
      icon.src = `${state}-fullscreen.svg`;
    },
  },
  icon
);
app.appendChild(btn);

const updateSize = (width: number, height: number) => {
  app.style.width = `${width}px`;
  app.style.height = `${height}px`;
  document.body.style.width = `${width}px`;
  document.body.style.height = `${height}px`;
  renderer.setSize(innerWidth, innerHeight);
};

const onResizeWindow = () => {
  updateSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};

addEvent("resize", onResizeWindow, window);

const food = createFood(
  config.cube,
  0xffffff,
  generatePosition(config.grid, config.step)
);
scene.add(food);

let textScore: Mesh;

const updateScore = (value: number) => {
  if (textScore) {
    scene.remove(textScore);
  }

  store.set("score", value);

  const position = { x: 0, y: config.grid / 2 + 4, z: 0 };
  textScore = createText(value, font, 2, position, colors[4]);
  scene.add(textScore);
};

updateScore(0);

let lastMoveTime = 0;
const moveInterval = 120;
let animation: number;

const animate = (time: number) => {
  if (config.gameOver) {
    cancelAnimationFrame(animation);
    return;
  }

  animation = requestAnimationFrame(animate);

  if (config.paused) return;

  if (time - lastMoveTime > moveInterval) {
    lastMoveTime = time;

    const newHeadPosition = new Vector3();

    newHeadPosition
      .copy(snake.segments[0].position)
      .add(snake.direction.clone().multiplyScalar(config.step));

    if (newHeadPosition.x > (config.grid / 2) * config.step) {
      newHeadPosition.x = -(config.grid / 2) * config.step;
    } else if (newHeadPosition.x < -(config.grid / 2) * config.step) {
      newHeadPosition.x = (config.grid / 2) * config.step;
    }

    if (newHeadPosition.y > (config.grid / 2) * config.step) {
      newHeadPosition.y = -(config.grid / 2) * config.step;
    } else if (newHeadPosition.y < -(config.grid / 2) * config.step) {
      newHeadPosition.y = (config.grid / 2) * config.step;
    }

    if (newHeadPosition.distanceTo(food.position) < config.step / 2) {
      const { position } = snake.segments[snake.segments.length - 1];
      const cube = createCube(config.cube, colors[4], position.clone());
      snake.segments.push(cube);
      scene.add(cube);

      updateScore(store.get("score") + 10);

      food.position.copy(generatePosition(config.grid, config.step));
    }

    if (checkSelfCollision(newHeadPosition, snake.segments, config.step)) {
      config.gameOver = true;
      const position = {
        x: newHeadPosition.x - 2,
        y: newHeadPosition.y + 3,
        z: 0,
      };
      writeText(`Game Over with ${store.get("score")}`, position);
    }

    for (let i = snake.segments.length - 1; i > 0; i--) {
      snake.segments[i].position.copy(snake.segments[i - 1].position);
    }

    snake.segments[0].position.copy(newHeadPosition);

    const offset = 24;
    const { x, y, z } = snake.segments[0].position;
    camera.position.set(x + offset, y + offset, z + offset);
    camera.lookAt(snake.segments[0].position);
  }

  renderer.render(scene, camera);
};
