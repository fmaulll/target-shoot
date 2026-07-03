import { Container, Text, TextStyle, Graphics } from "pixi.js";
import { Button } from "../objects/Button";
import { Screen } from "../utils/Screen";

export class ControlPanel extends Container {
  constructor() {
    super();

    this.panel = new Container();

    this.balanceSection = new Container();

    this.cashoutSection = new Container();

    this.betSection = new Container();

    this.difficultySection = new Container();

    this.startSection = new Container();

    this.panel.addChild(this.balanceSection);

    this.panel.addChild(this.cashoutSection);

    this.panel.addChild(this.betSection);

    this.panel.addChild(this.difficultySection);

    this.panel.addChild(this.startSection);

    this.addChild(this.panel);

    const style = new TextStyle({
      fill: "white",
      fontSize: 28,
    });

    this.balanceLabel = new Text({
      text: "BALANCE",
      style: new TextStyle({
        fill: "#AAAAAA",
        fontSize: 18,
        fontWeight: "bold",
      }),
    });

    this.balanceSection.addChild(this.balanceLabel);

    this.balanceValue = new Text({
      text: "$1000",
      style,
    });

    this.balanceSection.addChild(this.balanceValue);

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

    this.betSection.addChild(this.minusBetButton);

    this.betValueText = new Text({
      text: "10",

      style,
    });

    this.betValueText.anchor.set(0.5);

    this.betSection.addChild(this.betValueText);

    this.plusBetButton = new Button({
      text: "+",
      width: 50,
      height: 50,
      fontSize: 26,
    });

    this.betSection.addChild(this.plusBetButton);

    this.betSection.addChild(this.betText);

    this.difficultyLabel = new Text({
      text: "DIFFICULTY",
      style: new TextStyle({
        fill: "#AAAAAA",
        fontSize: 18,
        fontWeight: "bold",
      }),
    });

    this.difficultySection.addChild(this.difficultyLabel);

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

    this.difficultySection.addChild(this.difficultyButton);

    // this.multiplierText = new Text({
    //   text: "Multiplier : ",
    //   style,
    // });

    // this.panel.addChild(this.multiplierText);

    this.cashoutLabel = new Text({
      text: "CASH OUT",
      style: new TextStyle({
        fill: "#AAAAAA",
        fontSize: 18,
        fontWeight: "bold",
      }),
    });

    // this.cashoutSection.addChild(this.cashoutLabel);

    this.currentWinValue = new Text({
      text: "$0.00",
      style,
    });

    this.currentWinValue.visible = false;

    this.cashoutSection.addChild(this.currentWinValue);

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

    this.startSection.addChild(this.startButton);

    this.collectButton = new Button({
      text: "CASHOUT",
      // width: 180,
      // height: 60,
      background: "#f1c40f",
      textColor: "#222222",
      fontSize: 24,
      fontWeight: "bold",
    });

    this.collectButton.visible = false;

    this.cashoutSection.addChild(this.collectButton);

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

    const panelWidth = Screen.width * 0.9;

    this.panelWidth = panelWidth;

    const bg = new Graphics();

    bg.roundRect(0, 0, panelWidth, 160, 20);

    bg.fill({
      color: 0x000000,
      alpha: 0.65,
    });

    this.panel.addChildAt(bg, 0);

    this.panel.x = (Screen.width - panelWidth) / 2;
    this.panel.y = Screen.height - 180;

    let y = 20;

    // =====================
    // SECTION POSITIONS
    // =====================

    const sections = [
      this.balanceSection,
      this.cashoutSection,
      this.betSection,
      this.difficultySection,
      this.startSection,
    ];

    const sectionWidth = this.panelWidth / sections.length;

    sections.forEach((section, index) => {
      section.x = index * sectionWidth + 20;
    });

    this.balanceSection.y = 25;

    this.cashoutSection.y = 25;

    this.betSection.y = 20;

    this.difficultySection.y = 20;

    this.startSection.y = 25;

    this.balanceLabel.x = 0;
    this.balanceLabel.y = 0;

    this.balanceValue.x = 0;
    this.balanceValue.y = 28;

    this.cashoutLabel.x = 0;
    this.cashoutLabel.y = 0;

    this.collectButton.x = 0;
    this.collectButton.y = 28;

    this.currentWinValue.x = 20;
    this.currentWinValue.y = 95;

    this.betText.x = 0;
    this.betText.y = 0;

    this.minusBetButton.x = 0;
    this.minusBetButton.y = 40;

    this.betValueText.x = 90;
    this.betValueText.y = 65;

    this.plusBetButton.x = 140;
    this.plusBetButton.y = 40;

    this.difficultyLabel.x = 0;
    this.difficultyLabel.y = 0;

    this.difficultyButton.x = 0;
    this.difficultyButton.y = 35;

    this.startButton.x = 0;
    this.startButton.y = 0;

    this.collectButton.x = 0;
    this.collectButton.y = 0;
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
    this.balanceValue.text = `$${balance}`;
  }

  setBet(bet) {
    this.betText.text = `Bet : $${bet}`;
  }

  // setMultiplier(mult) {
  //   this.multiplierText.text = `Multiplier : x${mult}`;
  // }

  setCurrentWin(amount) {
    this.currentWinValue.text = `$${amount.toFixed(2)}`;
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

    this.currentWinValue.visible = true;
  }

  setOnCollect(callback) {
    this.collectCallback = callback;
  }

  hideCollectButton() {
    this.collectButton.visible = false;

    this.currentWinValue.visible = false;
  }

  setBetValue(value) {
    this.betValueText.text = value;
  }
}
