import { Sprite, Container } from "pixi.js";
import { Screen } from "../utils/Screen";
import { Target } from "../objects/Target";
import { GameState } from "../game/GameState";
import { Scene } from "./Scene";
import { ControlPanel } from "../ui/ControlPanel";
import { DifficultySelector } from "../ui/DifficultySelector";
import { Difficulty } from "../game/Difficulty";
import { Gun } from "../objects/Gun";
import { Crosshair } from "../objects/Crosshair";
import { TargetManager } from "../managers/TargetManager";

export class GameplayScene extends Scene {
  constructor() {
    super();

    this.state = GameState.WAITING;

    this.targetCount = 2;

    this.targetManager = new TargetManager();

    this.mouse = {
      x: 0,
      y: 0,
    };

    this.selectedTarget = null;

    this.gunTargetX = Screen.centerX;

    this.hasShot = false;
  }

  init() {
    const bg = Sprite.from("background");

    bg.width = Screen.width;
    bg.height = Screen.height;

    console.log("Target Count:", this.targetCount);
    this.addChild(bg);

    this.addChild(this.targetManager);

    this.gun = new Gun();

    this.gun.x = Screen.centerX + 200;

    this.gun.y = Screen.height - 50;

    this.addChild(this.gun);

    this.controlPanel = new ControlPanel(this.state);

    this.controlPanel.setBalance(1000);

    this.controlPanel.setBet(10);

    this.controlPanel.setDifficulty("EASY");

    this.controlPanel.setMultiplier(2);

    this.addChild(this.controlPanel);

    this.difficultySelector = new DifficultySelector();

    this.difficultySelector.x = 40;

    this.difficultySelector.y = 240;

    this.addChild(this.difficultySelector);

    this.difficultySelector.setOnDifficultyChanged((difficulty) => {
      switch (difficulty) {
        case "easy":
          this.targetCount = Difficulty.EASY.targets;
          this.controlPanel.setDifficulty("EASY");

          break;

        case "medium":
          this.targetCount = Difficulty.MEDIUM.targets;
          this.controlPanel.setDifficulty("MEDIUM");

          break;

        case "hard":
          this.targetCount = Difficulty.HARD.targets;
          this.controlPanel.setDifficulty("HARD");

          break;
      }

      this.targetManager.createTargets(this.targetCount);

      this.setGameState(GameState.WAITING);
    });

    this.targetManager.createTargets(this.targetCount);

    this.controlPanel.setOnStart(() => {
      this.setGameState(GameState.PLAYING);
    });

    this.setGameState(GameState.WAITING);

    this.eventMode = "static";

    this.on("pointermove", (event) => {
      this.mouse = event.global;
    });

    this.crosshair = new Crosshair();

    this.addChild(this.crosshair);

    this.targetManager.setOnTargetSelected((id) => {
      this.selectTarget(id);
    });
  }

  showResult() {
    this.selectedTarget.hit();

    this.setGameState(GameState.RESULT);

    setTimeout(() => {
      this.resetRound();
    }, 1000);
  }

  resetRound() {
    this.hasShot = false;

    if (this.selectedTarget) {
      this.selectedTarget.setSelected(false);

      this.selectedTarget = null;
    }

    this.gunTargetX = Screen.centerX;

    this.setGameState(GameState.WAITING);
  }

  setGameState(state) {
    this.state = state;

    this.controlPanel.setState(state);

    switch (state) {
      case GameState.WAITING:
        this.targetManager.targets.forEach((target) => {
          target.setEnabled(false);
        });

        break;

      case GameState.PLAYING:
        this.targetManager.targets.forEach((target) => {
          target.setEnabled(true);
        });

        break;

      case GameState.RESULT:
        this.targetManager.targets.forEach((target) => {
          target.setEnabled(false);
        });

        break;

      case GameState.SHOOTING:
        this.targetManager.targets.forEach((target) => {
          target.setEnabled(false);
        });

        break;
    }
  }

  selectTarget(id) {
    if (this.selectedTarget) this.selectedTarget.setSelected(false);

    this.selectedTarget = this.targetManager.targets[id];

    this.gunTargetX = this.selectedTarget.x;

    this.selectedTarget.setSelected(true);

    this.hasShot = false;

    this.setGameState(GameState.SHOOTING);
  }

  shoot() {
    this.gun.y += 20;

    setTimeout(() => {
      this.gun.y -= 20;

      this.showResult();
    }, 100);
  }

  update() {
    // const targetX = Math.max(150, Math.min(this.mouse.x, Screen.width - 150));

    this.gun.x += (this.gunTargetX - this.gun.x) * 0.15;
    const diff = this.gunTargetX - this.gun.x;

    this.gun.rotation = diff * 0.0015;

    if (
      this.state === GameState.SHOOTING &&
      !this.hasShot &&
      Math.abs(this.gun.x - this.gunTargetX) < 3
    ) {
      this.hasShot = true;

      this.shoot();
    }

    this.targetManager.targets.forEach((target) => {
      target.update();
    });

    this.crosshair.x += (this.mouse.x - this.crosshair.x) * 0.35;
    this.crosshair.y += (this.mouse.y - this.crosshair.y) * 0.35;
  }

  destroyScene() {}
}
