import { Container, Text, TextStyle, Graphics } from "pixi.js";
import { Button } from "../objects/Button";
import { Screen } from "../utils/Screen";

export class ControlPanel extends Container {
  constructor() {
    super();

    this.panel = new Container();

    this.addChild(this.panel);

    const style = new TextStyle({
      fill: "white",
      fontSize: 28,
    });

    this.balanceText = new Text({
      text: "Balance : ",
      style,
    });

    this.panel.addChild(this.balanceText);

    this.betText = new Text({
      text: "Bet : ",
      style,
    });

    this.minusBetButton = new Button({
      text: "-",
      width: 50,
      height: 50,
      fontSize: 26,
    });

    this.panel.addChild(this.minusBetButton);

    this.betValueText = new Text({
      text: "10",

      style,
    });

    this.betValueText.anchor.set(0.5);

    this.panel.addChild(this.betValueText);

    this.plusBetButton = new Button({
      text: "+",
      width: 50,
      height: 50,
      fontSize: 26,
    });

    this.panel.addChild(this.plusBetButton);

    this.panel.addChild(this.betText);

    this.difficultyLabel = new Text({
      text: "DIFFICULTY",
      style: new TextStyle({
        fill: "#AAAAAA",
        fontSize: 18,
        fontWeight: "bold",
      }),
    });

    this.panel.addChild(this.difficultyLabel);

    this.difficultyButton = new Button({
      text: "EASY ▼",
      width: 180,
      height: 50,
      fontSize: 22,
      background: "#3b3b3b",
    });

    this.difficultyButton.setOnClick(() => {
      if (this.difficultyCallback) {
        this.difficultyCallback();
      }
    });

    this.panel.addChild(this.difficultyButton);

    this.multiplierText = new Text({
      text: "Multiplier : ",
      style,
    });

    this.panel.addChild(this.multiplierText);

    this.currentWinText = new Text({
      text: "Current Win : $0.00",
      style,
    });

    this.panel.addChild(this.currentWinText);

    this.stateText = new Text({
      text: `State: `,
      style,
    });

    // this.panel.addChild(this.stateText);

    this.startButton = new Button({
      text: "START",
      width: 180,
      height: 60,
      background: "#2ecc71",
      fontSize: 26,
    });

    this.panel.addChild(this.startButton);

    this.collectButton = new Button({
      text: "COLLECT",
      width: 180,
      height: 60,
      background: "#f1c40f",
      textColor: "#222222",
      fontSize: 24,
    });

    this.collectButton.visible = false;

    this.panel.addChild(this.collectButton);

    this.startButton.setOnClick(() => {
      if (this.startCallback) {
        this.startCallback();
      }
    });

    this.minusBetButton.setOnClick(() => {
      if (this.decreaseBetCallback) {
        this.decreaseBetCallback();
      }
    });

    this.plusBetButton.setOnClick(() => {
      if (this.increaseBetCallback) {
        this.increaseBetCallback();
      }
    });

    this.collectButton.setOnClick(() => {
      if (this.collectCallback) {
        this.collectCallback();
      }
    });

    const bg = new Graphics();

    bg.roundRect(0, 0, 1200, 160, 20);

    bg.fill({
      color: 0x000000,
      alpha: 0.65,
    });

    this.panel.addChildAt(bg, 0);

    this.panel.x = Screen.centerX - 600;
    this.panel.y = 430;

    let y = 20;

    // ---------------------------
    // BALANCE
    // ---------------------------

    this.balanceText.x = 30;
    this.balanceText.y = 25;

    // ---------------------------
    // CURRENT WIN
    // ---------------------------

    this.currentWinText.x = 30;
    this.currentWinText.y = 75;

    // ---------------------------
    // MULTIPLIER
    // ---------------------------

    this.multiplierText.x = 260;
    this.multiplierText.y = 50;

    // ---------------------------
    // BET
    // ---------------------------

    this.betText.x = 470;
    this.betText.y = 20;

    this.minusBetButton.x = 470;
    this.minusBetButton.y = 65;

    this.betValueText.x = 575;
    this.betValueText.y = 88;

    this.plusBetButton.x = 650;
    this.plusBetButton.y = 65;

    // ---------------------------
    // DIFFICULTY
    // ---------------------------

    this.difficultyLabel.x = 760;
    this.difficultyLabel.y = 18;

    this.difficultyButton.x = 760;
    this.difficultyButton.y = 55;

    // ---------------------------
    // BUTTONS
    // ---------------------------

    this.startButton.x = 980;
    this.startButton.y = 30;

    this.collectButton.x = 980;
    this.collectButton.y = 30;
  }

  setOnStart(callback) {
    this.startCallback = callback;
  }

  setOnDifficulty(callback) {
    this.difficultyCallback = callback;
  }

  setOnIncreaseBet(callback) {
    this.increaseBetCallback = callback;
  }

  setOnDecreaseBet(callback) {
    this.decreaseBetCallback = callback;
  }

  setBalance(balance) {
    this.balanceText.text = `Balance : $${balance}`;
  }

  setBet(bet) {
    this.betText.text = `Bet : $${bet}`;
  }

  setMultiplier(mult) {
    this.multiplierText.text = `Multiplier : x${mult}`;
  }

  setCurrentWin(amount) {
    this.currentWinText.text = `Current Win : $${amount.toFixed(2)}`;
  }

  setDifficulty(difficulty) {
    this.difficultyButton.setText(`${difficulty} ▼`);
  }

  setState(state) {
    const names = {
      waiting: "Waiting",
      playing: "Playing",
      shooting: "Shooting",
      result: "Result",
    };

    this.stateText.text = `Status : ${names[state]}`;
    this.stateText.visible = false;
  }

  hideStartButton() {
    this.startButton.visible = false;
  }

  showStartButton() {
    this.startButton.visible = true;
  }

  showCollectButton() {
    this.collectButton.visible = true;
  }

  setOnCollect(callback) {
    this.collectCallback = callback;
  }

  hideCollectButton() {
    this.collectButton.visible = false;
  }

  setBetValue(value) {
    this.betValueText.text = value;
  }
}
