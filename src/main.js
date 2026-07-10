import { Application } from "pixi.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "./game/Game";
import { AssetManager } from "./managers/AssetManager";
import { Screen } from "./utils/Screen";
import { GameControlPanel } from "./ui/react/GameControlPanel";

const app = new Application();

await app.init({
  width: 1600,
  height: 900,
  background: "#1a1a1a",
});

const appRoot = document.getElementById("app");

appRoot.style.width = "100vw";
appRoot.style.height = "100vh";
appRoot.style.overflow = "hidden";

appRoot.innerHTML = `
  <style>
    #game-shell {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-rows: 3fr 1fr;
      background: #000;
    }

    #canvas-host {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    #hud-root {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }

    #controls-root {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 3;
    }

    @media (max-width: 900px) {
      #game-shell {
        grid-template-rows: 2.5fr 1.5fr;
      }
    }
  </style>
  <div id="game-shell">
    <div id="canvas-host">
      <div id="hud-root"></div>
    </div>
    <div id="controls-root"></div>
  </div>
`;

const canvasHost = document.getElementById("canvas-host");
const hudRootElement = document.getElementById("hud-root");
const controlsRootElement = document.getElementById("controls-root");

createRoot(controlsRootElement).render(
  React.createElement(GameControlPanel, { hudRootElement }),
);

canvasHost.appendChild(app.canvas);

app.canvas.style.position = "absolute";
app.canvas.style.left = "0px";
app.canvas.style.top = "0px";
app.canvas.style.zIndex = "0";

function getVirtualSize() {
  const hostRect = canvasHost.getBoundingClientRect();

  const width = Math.max(1, Math.round(hostRect.width));
  const height = Math.max(1, Math.round(hostRect.height));

  return { width, height };
}

function resize() {
  const virtualSize = getVirtualSize();

  Screen.setVirtualSize(virtualSize.width, virtualSize.height);

  app.renderer.resize(virtualSize.width, virtualSize.height);

  Screen.setViewport(virtualSize.width, virtualSize.height, 1);

  app.canvas.style.width = `${virtualSize.width}px`;
  app.canvas.style.height = `${virtualSize.height}px`;

  app.canvas.style.position = "absolute";
  app.canvas.style.left = "0px";
  app.canvas.style.top = "0px";
  app.canvas.style.zIndex = "0";
}

resize();

window.addEventListener("resize", resize);
await AssetManager.load();
const game = new Game(app);
game.start();
