import { Scene, Vector3 } from "three";
import { Snake } from "./types";
import {
  create,
  addEvent,
  createLights,
  createRenderer,
  toggleFullscreen,
  createFloor,
  createCube,
  generatePosition,
  createCamera,
  createKeyboardControl,
  createSwipeControl,
  createWall,
  createFood,
} from "./utils";
import "./style.scss";

const colors = [0x161b22, 0x0e4429, 0x006d32, 0x26a641, 0x39d353];

const scene = new Scene();

const camera = createCamera({ x: 6, y: 6, z: 6 });

const renderer = createRenderer(0xffffff, true);
app.appendChild(renderer.domElement);

const lights = createLights({
  ambient: { color: 0xffffff, intensity: 4 },
  directional: { color: 0xffffff, intensity: 1 },
});

scene.add(...Object.values(lights), createFloor());

const size = {
  grid: 30,
  cube: 1,
  gap: 0.1,
  get step() {
    return this.cube + this.gap;
  },
};

const snake: Snake = {
  direction: new Vector3(1, 0, 0),
  segments: [],
  length: 5,
};

for (let i = 0; i < snake.length; i++) {
  const position = { x: -(i * size.step), y: 0, z: 0 };
  const color = colors[i % colors.length];
  const cube = createCube(size.cube, color, position);
  snake.segments.push(cube);
  scene.add(cube);
}

for (let i = -size.grid / 2; i <= size.grid / 2; i++) {
  scene.add(
    createWall(size.cube, 0x161b22, {
      x: i * size.step,
      y: (size.grid / 2) * size.step,
      z: 0,
    }),
    createWall(size.cube, 0x161b22, {
      x: i * size.step,
      y: -(size.grid / 2) * size.step,
      z: 0,
    }),
    createWall(size.cube, 0x161b22, {
      x: (size.grid / 2) * size.step,
      y: i * size.step,
      z: 0,
    }),
    createWall(size.cube, 0x161b22, {
      x: -(size.grid / 2) * size.step,
      y: i * size.step,
      z: 0,
    })
  );
}

const swipe = createSwipeControl();

swipe.on(
  "up",
  () => snake.direction.set(0, 1, 0),
  () => snake.direction.y === 0
);

swipe.on(
  "down",
  () => snake.direction.set(0, -1, 0),
  () => snake.direction.y === 0
);

swipe.on(
  "right",
  () => snake.direction.set(1, 0, 0),
  () => snake.direction.x === 0
);

swipe.on(
  "left",
  () => snake.direction.set(-1, 0, 0),
  () => snake.direction.x === 0
);

const keyboard = createKeyboardControl();

keyboard.on(
  "up",
  () => snake.direction.set(0, 1, 0),
  () => snake.direction.y === 0
);

keyboard.on(
  "down",
  () => snake.direction.set(0, -1, 0),
  () => snake.direction.y === 0
);

keyboard.on(
  "right",
  () => snake.direction.set(1, 0, 0),
  () => snake.direction.x === 0
);

keyboard.on(
  "left",
  () => snake.direction.set(-1, 0, 0),
  () => snake.direction.x === 0
);

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

const onResizeWindow = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
};

addEvent("resize", onResizeWindow, window);

const food = createFood(
  size.cube,
  0xff0000,
  generatePosition(size.grid, size.step)
);
scene.add(food);

let lastMoveTime = 0;
const moveInterval = 180;

// Game loop
const animate = (time: number) => {
  requestAnimationFrame(animate);

  if (time - lastMoveTime > moveInterval) {
    lastMoveTime = time;

    const newHeadPosition = new Vector3();
    newHeadPosition
      .copy(snake.segments[0].position)
      .add(snake.direction.clone().multiplyScalar(size.step));

    if (newHeadPosition.x > (size.grid / 2) * size.step) {
      newHeadPosition.x = -(size.grid / 2) * size.step;
    } else if (newHeadPosition.x < -(size.grid / 2) * size.step) {
      newHeadPosition.x = (size.grid / 2) * size.step;
    }

    if (newHeadPosition.y > (size.grid / 2) * size.step) {
      newHeadPosition.y = -(size.grid / 2) * size.step;
    } else if (newHeadPosition.y < -(size.grid / 2) * size.step) {
      newHeadPosition.y = (size.grid / 2) * size.step;
    }

    // Check collision with food
    if (newHeadPosition.distanceTo(food.position) < size.step / 2) {
      const { position } = snake.segments[snake.segments.length - 1];
      const cube = createCube(size.cube, colors[4], position.clone());
      snake.segments.push(cube);
      scene.add(cube);

      food.position.copy(generatePosition(size.grid, size.step));
    }

    for (let i = snake.segments.length - 1; i > 0; i--) {
      snake.segments[i].position.copy(snake.segments[i - 1].position);
    }

    snake.segments[0].position.copy(newHeadPosition);

    const offset = 20;
    const { x, y, z } = snake.segments[0].position;
    camera.position.set(x + offset, y + offset, z + offset);
    camera.lookAt(snake.segments[0].position);
  }

  renderer.render(scene, camera);
};

animate(0);
