import { Sprite, Container } from "pixi.js";
import { Screen } from "../utils/Screen";
import { GameState } from "../game/GameState";
import { Scene } from "./Scene";
import { ControlPanel } from "../ui/ControlPanel";
// import { DifficultySelector } from "../ui/DifficultySelector";
import { Difficulty } from "../game/Difficulty";
import { Gun } from "../objects/Gun";
import { Crosshair } from "../objects/Crosshair";
import { TargetManager } from "../managers/TargetManager";
import { RoundManager } from "../managers/RoundManager";
import { GameData } from "../game/GameData";
import { BetManager } from "../game/BetManager";

export class GameplayScene extends Scene {
  constructor() {
    super();
    this.betValues = [10, 20, 50, 100, 200, 500, 1000];

    this.betIndex = 0;
    this.state = GameState.WAITING;

    this.targetManager = new TargetManager();

    this.mouse = {
      x: 0,
      y: 0,
    };

    this.selectedTarget = null;

    this.gunTargetX = Screen.centerX;

    this.hasShot = false;

    this.roundManager = new RoundManager();

    this.gameData = new GameData();

    this.betManager = new BetManager();

    // -------------------------
    // DIFFICULTY SETTINGS
    // -------------------------

    this.difficulties = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];

    this.difficultyIndex = 0;

    this.currentDifficulty = this.difficulties[0];
  }

  init() {
    const bg = Sprite.from("background");

    bg.width = Screen.width;
    bg.height = Screen.height;

    console.log("Target Count:", this.currentDifficulty.targets);
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

    // this.controlPanel.setMultiplier(this.currentDifficulty.multiplierTable[0]);

    this.addChild(this.controlPanel);

    // this.difficultySelector = new DifficultySelector();

    // this.difficultySelector.x = 40;

    // this.difficultySelector.y = 240;

    // this.addChild(this.difficultySelector);

    // this.difficultySelector.setOnDifficultyChanged((difficulty) => {
    //   switch (difficulty) {
    //     case "easy":
    //       this.currentDifficulty = Difficulty.EASY;

    //       this.controlPanel.setDifficulty("EASY");

    //       break;

    //     case "medium":
    //       this.currentDifficulty = Difficulty.MEDIUM;

    //       this.controlPanel.setDifficulty("MEDIUM");

    //       break;

    //     case "hard":
    //       this.currentDifficulty = Difficulty.HARD;

    //       this.controlPanel.setDifficulty("HARD");

    //       break;
    //   }

    //   this.targetManager.createTargets(this.currentDifficulty.targets);

    //   this.setGameState(GameState.WAITING);
    // });

    this.targetManager.createTargets(this.currentDifficulty.targets);

    this.controlPanel.setOnStart(() => {
      if (!this.gameData.canPlay()) {
        alert("Not enough balance");

        return;
      }

      this.gameData.placeBet();

      this.controlPanel.setBalance(this.gameData.balance);

      this.roundManager.start(this.currentDifficulty);

      this.setGameState(GameState.PLAYING);

      this.controlPanel.hideStartButton();
    });

    this.controlPanel.setOnCollect(() => {
      this.gameData.collect();

      this.controlPanel.setBalance(this.gameData.balance);

      this.controlPanel.setCurrentWin(0);

      this.controlPanel.hideCollectButton();

      this.controlPanel.showStartButton();

      this.setGameState(GameState.WAITING);
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

    this.controlPanel.setBalance(this.gameData.balance);

    this.controlPanel.setBet(this.gameData.bet);
    this.controlPanel.setOnIncreaseBet(() => {
      if (this.state !== GameState.WAITING) return;

      if (this.betIndex < this.betValues.length - 1) {
        this.betIndex++;
      }

      const bet = this.betValues[this.betIndex];

      this.gameData.bet = bet;

      this.controlPanel.setBetValue(bet);
    });
    this.controlPanel.setOnDecreaseBet(() => {
      if (this.state !== GameState.WAITING) return;

      if (this.betIndex > 0) {
        this.betIndex--;
      }

      const bet = this.betValues[this.betIndex];

      this.gameData.bet = bet;

      this.controlPanel.setBetValue(bet);
    });

    this.controlPanel.setOnDifficulty(() => {
      if (this.state !== GameState.WAITING) return;

      this.difficultyIndex++;

      if (this.difficultyIndex >= this.difficulties.length) {
        this.difficultyIndex = 0;
      }

      this.currentDifficulty = this.difficulties[this.difficultyIndex];

      const names = ["EASY", "MEDIUM", "HARD"];

      this.controlPanel.setDifficulty(names[this.difficultyIndex]);

      this.targetCount = this.currentDifficulty.targets;

      this.targetManager.createTargets(this.currentDifficulty.targets);
    });
  }

  showResult(id) {
    const result = this.roundManager.shoot(id);

    // this.controlPanel.setMultiplier(result.multiplier);

    this.selectedTarget.hit();

    this.setGameState(GameState.RESULT);

    if (result.win) {
      this.roundManager.start(this.currentDifficulty);

      this.gameData.calculateWin(result.multiplier);

      this.controlPanel.setCurrentWin(this.gameData.currentWin);

      this.controlPanel.showCollectButton();
    } else {
      this.controlPanel.hideCollectButton();
    }

    console.log(result);

    setTimeout(() => {
      if (result.win) {
        this.resetRound(true);
      } else {
        this.resetRound(false);
      }
    }, 1000);
  }

  resetRound(continuePlaying) {
    this.hasShot = false;

    if (this.selectedTarget) {
      this.selectedTarget.setSelected(false);
      this.selectedTarget = null;
    }

    this.gunTargetX = Screen.centerX;

    if (continuePlaying) {
      this.roundManager.start(this.currentDifficulty);

      this.setGameState(GameState.PLAYING);
    } else {
      this.controlPanel.showStartButton();

      this.setGameState(GameState.WAITING);
    }
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

  shoot(id) {
    this.gun.y += 20;

    setTimeout(() => {
      this.gun.y -= 20;

      this.showResult(id);
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

      this.shoot(this.selectedTarget.id);
    }

    this.targetManager.targets.forEach((target) => {
      target.update();
    });

    this.crosshair.x += (this.mouse.x - this.crosshair.x) * 0.35;
    this.crosshair.y += (this.mouse.y - this.crosshair.y) * 0.35;
  }

  destroyScene() {}
}
