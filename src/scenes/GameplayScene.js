import { Sprite, Container } from "pixi.js";
import { Screen } from "../utils/Screen";
import { GameState } from "../game/GameState";
import { Scene } from "./Scene";
import { HtmlControlPanelAdapter } from "../ui/HtmlControlPanelAdapter";
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
    this.gunRestX = Screen.centerX;

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
    this.bg = Sprite.from("background");

    this.layoutScene();

    console.log("Target Count:", this.currentDifficulty.targets);
    this.addChild(this.bg);

    this.addChild(this.targetManager);

    this.gun = new Gun();

    this.addChild(this.gun);

    this.controlPanel = new HtmlControlPanelAdapter(this.state);

    this.controlPanel.setBalance(1000);

    this.controlPanel.setBet(10);

    this.controlPanel.setCurrentWin(0);

    this.controlPanel.setMultiplier(this.currentDifficulty.multiplierTable[0]);

    this.controlPanel.setDifficulty("EASY");

    // this.controlPanel.setMultiplier(this.currentDifficulty.multiplierTable[0]);

    this.addChild(this.controlPanel);

    this.onResize = () => {
      this.layoutScene();

      this.controlPanel.applyResponsiveLayout();

      this.targetManager.createTargets(
        this.currentDifficulty.targets,
        this.getPanelTop()
      );

      this.layoutScene();

      if (!this.selectedTarget) {
        this.gunTargetX = this.gunRestX;
      }
    };

    window.addEventListener("resize", this.onResize);

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

    this.targetManager.createTargets(
      this.currentDifficulty.targets,
      this.getPanelTop()
    );

    this.controlPanel.setOnStart(() => {
      if (this.state !== GameState.WAITING) {
        return;
      }

      if (!this.gameData.canPlay()) {
        alert("Not enough balance");

        return;
      }

      this.roundManager.streak = 0;

      this.gameData.placeBet();

      this.controlPanel.setBalance(this.gameData.balance);

      this.controlPanel.setCurrentWin(0);

      this.controlPanel.setMultiplier(
        this.currentDifficulty.multiplierTable[0]
      );

      this.roundManager.start(this.currentDifficulty);

      this.setGameState(GameState.PLAYING);

      this.controlPanel.hideCollectButton();
    });

    this.controlPanel.setOnCollect(() => {
      if (this.state === GameState.WAITING) {
        return;
      }

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

    this.layoutScene();

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

    this.controlPanel.setBetPresets(this.betValues.slice(0, 5));

    this.controlPanel.setOnBetPreset((bet) => {
      if (this.state !== GameState.WAITING) return;

      const index = this.betValues.indexOf(bet);

      if (index === -1) return;

      this.betIndex = index;

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

      this.targetManager.createTargets(
        this.currentDifficulty.targets,
        this.getPanelTop()
      );
    });

    this.controlPanel.setOnSetDifficulty((difficultyName) => {
      if (this.state !== GameState.WAITING) return;

      const difficultyMap = {
        EASY: 0,
        MEDIUM: 1,
        HARD: 2,
      };

      const nextIndex = difficultyMap[difficultyName];

      if (nextIndex === undefined) {
        return;
      }

      this.difficultyIndex = nextIndex;
      this.currentDifficulty = this.difficulties[this.difficultyIndex];

      this.controlPanel.setDifficulty(difficultyName);

      this.targetManager.createTargets(
        this.currentDifficulty.targets,
        this.getPanelTop()
      );
    });

    this.controlPanel.setOnSetBet((betValue) => {
      if (this.state !== GameState.WAITING) return;

      const normalizedBet = Math.max(0.01, Math.round(Number(betValue) * 100) / 100);

      this.gameData.bet = normalizedBet;
      this.betIndex = this.getClosestBetIndex(normalizedBet);

      this.controlPanel.setBetValue(normalizedBet);
    });
  }

  getClosestBetIndex(value) {
    let closestIndex = 0;
    let smallestDiff = Number.POSITIVE_INFINITY;

    this.betValues.forEach((bet, index) => {
      const diff = Math.abs(bet - value);

      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIndex = index;
      }
    });

    return closestIndex;
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

      this.controlPanel.setMultiplier(result.multiplier);

      this.controlPanel.showCollectButton();
    } else {
      this.controlPanel.setCurrentWin(0);

      this.controlPanel.setMultiplier(this.currentDifficulty.multiplierTable[0]);

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

    this.gun.setIdle();

    if (this.selectedTarget) {
      this.selectedTarget.setSelected(false);
      this.selectedTarget = null;
    }

    this.gunTargetX = this.gunRestX;

    if (continuePlaying) {
      this.roundManager.start(this.currentDifficulty);

      this.setGameState(GameState.PLAYING);
    } else {
      this.controlPanel.setCurrentWin(0);

      this.controlPanel.setMultiplier(this.currentDifficulty.multiplierTable[0]);

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
    
    this.gun.setShooting();
  }

  shoot(id) {
    // this.gun.setShooting();

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

  layoutScene() {
    if (this.bg) {
      const textureWidth = this.bg.texture?.orig?.width || this.bg.texture?.width || Screen.width;
      const textureHeight = this.bg.texture?.orig?.height || this.bg.texture?.height || Screen.height;
      const scale = Math.max(Screen.width / textureWidth, Screen.height / textureHeight);

      this.bg.anchor.set(0.5, 1);
      this.bg.scale.set(scale);
      this.bg.x = Screen.centerX;
      this.bg.y = Screen.height;
    }

    if (this.gun) {
      const rightOffset = Screen.clamp(Screen.width * 0.12, 90, 220);
      const bottomOffset = Screen.clamp(Screen.height * 0.05, 30, 60);
      const panelTop = this.getPanelTop();
      const maxGunY = panelTop - bottomOffset;

      this.gunRestX = Screen.centerX + rightOffset;
      this.gun.x = this.gunRestX;
      this.gun.y = Math.min(Screen.height - bottomOffset, maxGunY);
      this.gun.setResponsiveScale();
    }

    if (this.crosshair) {
      this.crosshair.setResponsiveScale();
    }

    if (!this.selectedTarget) {
      this.gunTargetX = this.gunRestX;
    }
  }

  getPanelTop() {
    if (!this.controlPanel || !this.controlPanel.panel) {
      return Screen.height;
    }

    return this.controlPanel.panel.y;
  }

  destroyScene() {
    if (this.onResize) {
      window.removeEventListener("resize", this.onResize);
    }

    if (this.controlPanel?.destroyAdapter) {
      this.controlPanel.destroyAdapter();
    }

    this.removeAllListeners();
  }
}
