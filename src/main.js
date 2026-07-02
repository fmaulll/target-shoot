import { Application } from "pixi.js";
import { Game } from "./game/Game";
import { AssetManager } from "./managers/AssetManager";

const app = new Application();

await app.init({
  width: 1600,
  height: 900,
  background: "#1a1a1a",
});

document.body.appendChild(app.canvas);
function resize() {
  const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);

  app.canvas.style.width = `${1600 * scale}px`;
  app.canvas.style.height = `${900 * scale}px`;

  app.canvas.style.position = "absolute";

  app.canvas.style.left = `${(window.innerWidth - 1600 * scale) / 2}px`;

  app.canvas.style.top = `${(window.innerHeight - 900 * scale) / 2}px`;
}

resize();

window.addEventListener("resize", resize);
await AssetManager.load();
const game = new Game(app);
game.start();
