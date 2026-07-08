import { Container, Text, TextStyle, Graphics } from "pixi.js";
import { Button } from "../objects/Button";
import { Screen } from "../utils/Screen";

export class ControlPanel extends Container {
  constructor() {
    super();

    this.betPresetButtons = [];

    this.panel = new Container();

    this.statsLayer = new Container();

    this.balanceSection = new Container();

    this.cashoutSection = new Container();

    this.betSection = new Container();

    this.difficultySection = new Container();

    this.startSection = new Container();

  this.addChild(this.statsLayer);

  this.addChild(this.panel);

    this.panel.addChild(this.balanceSection);

    this.panel.addChild(this.cashoutSection);

    this.panel.addChild(this.betSection);

    this.panel.addChild(this.difficultySection);

    this.panel.addChild(this.startSection);

    const labelStyle = new TextStyle({
      fill: "#f2f2f2",
      fontSize: 18,
      fontWeight: "bold",
    });

    const valueStyle = new TextStyle({
      fill: "#ffffff",
      fontSize: 28,
      fontWeight: "bold",
    });

    const topLabelStyle = new TextStyle({
      fill: "#ffffff",
      fontSize: 24,
      fontWeight: "bold",
    });

    const topValueStyle = new TextStyle({
      fill: "#f0c542",
      fontSize: 30,
      fontWeight: "bold",
    });

    const greenValueStyle = new TextStyle({
      fill: "#7fe35d",
      fontSize: 30,
      fontWeight: "bold",
    });

    this.statsLayer.x = 24;
    this.statsLayer.y = 20;

    this.balanceLabel = new Text({
      text: "Balance :",
      style: topLabelStyle,
    });

    this.statsLayer.addChild(this.balanceLabel);

    this.balanceValue = new Text({
      text: "$1000.00",
      style: topValueStyle,
    });

    this.statsLayer.addChild(this.balanceValue);

    this.currentWinLabel = new Text({
      text: "Current Win :",
      style: topLabelStyle,
    });

    this.statsLayer.addChild(this.currentWinLabel);

    this.currentWinValue = new Text({
      text: "$0.00",
      style: greenValueStyle,
    });

    this.currentWinValue.visible = true;

    this.statsLayer.addChild(this.currentWinValue);

    this.multiplierLabel = new Text({
      text: "Multiplier :",
      style: topLabelStyle,
    });

    this.statsLayer.addChild(this.multiplierLabel);

    this.multiplierValue = new Text({
      text: "x1.01",
      style: greenValueStyle,
    });

    this.statsLayer.addChild(this.multiplierValue);

    this.panelBalanceLabel = new Text({
      text: "BALANCE",
      style: labelStyle,
    });

    this.balanceSection.addChild(this.panelBalanceLabel);

    this.panelBalanceValue = new Text({
      text: "$1000.00",
      style: valueStyle,
    });

    this.balanceSection.addChild(this.panelBalanceValue);

    this.minusBetButton = new Button({
      text: "-",
      width: 50,
      height: 50,
      fontSize: 26,
    });

    this.betSection.addChild(this.minusBetButton);

    this.betValueText = new Text({
      text: "10",
      style: valueStyle,
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

    this.difficultyLabel = new Text({
      text: "DIFFICULTY",
      style: labelStyle,
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

    this.startButton = new Button({
      text: "START",
      width: 180,
      height: 60,
      background: "#47b83a",
      fontSize: 26,
    });

    this.startSection.addChild(this.startButton);

    this.collectButton = new Button({
      text: "COLLECT",
      width: 180,
      height: 60,
      background: "#f1b81a",
      textColor: "#202020",
      fontSize: 24,
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

    const panelWidth = Screen.width - 32;
    const panelHeight = 176;

    this.panelWidth = panelWidth;

    this.panelHeight = panelHeight;

    const bg = new Graphics();

    bg.roundRect(0, 0, panelWidth, panelHeight, 18);

    bg.fill({
      color: 0x111417,
      alpha: 0.94,
    });

    bg.stroke({
      color: 0xd8a73c,
      width: 2,
      alpha: 0.9,
    });

    this.panel.addChildAt(bg, 0);

    this.panel.x = 16;
    this.panel.y = Screen.height - panelHeight - 14;

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

    this.balanceSection.y = 24;

    this.cashoutSection.y = 24;

    this.betSection.y = 20;

    this.difficultySection.y = 20;

    this.startSection.y = 24;

    this.balanceLabel.x = 64;
    this.balanceLabel.y = 6;

    this.balanceValue.x = 64;
    this.balanceValue.y = 34;

    this.currentWinLabel.x = 0;
    this.currentWinLabel.y = 0;

    this.currentWinValue.x = 0;
    this.currentWinValue.y = 30;

    this.multiplierLabel.x = 0;
    this.multiplierLabel.y = 62;

    this.multiplierValue.x = 128;
    this.multiplierValue.y = 62;

    this.minusBetButton.x = 0;
    this.minusBetButton.y = 44;

    this.betValueText.x = 90;
    this.betValueText.y = 67;

    this.plusBetButton.x = 140;
    this.plusBetButton.y = 44;

    this.difficultyLabel.x = 0;
    this.difficultyLabel.y = 0;

    this.difficultyButton.x = 0;
    this.difficultyButton.y = 38;

    this.startButton.x = 0;
    this.startButton.y = 0;

    this.collectButton.x = 0;
    this.collectButton.y = 0;

    this.balanceIcon = new Graphics();
    this.balanceIcon.circle(26, 26, 22);
    this.balanceIcon.fill({ color: 0x2a2a2a, alpha: 1 });
    this.balanceIcon.stroke({ color: 0xf0c542, width: 2, alpha: 1 });
    this.balanceSection.addChild(this.balanceIcon);

    this.balanceSymbol = new Text({
      text: "$",
      style: new TextStyle({
        fill: "#f0c542",
        fontSize: 26,
        fontWeight: "bold",
      }),
    });
    this.balanceSymbol.anchor.set(0.5);
    this.balanceSymbol.x = 26;
    this.balanceSymbol.y = 26;
    this.balanceSection.addChild(this.balanceSymbol);

    this.panelBalanceLabel.x = 60;
    this.panelBalanceLabel.y = 6;

    this.panelBalanceValue.x = 60;
    this.panelBalanceValue.y = 34;

    this.betLabel = new Text({
      text: "BET",
      style: labelStyle,
    });

    this.betSection.addChild(this.betLabel);

    this.betLabel.x = 84;
    this.betLabel.y = 0;

    this.betPresetGroup = new Container();
    this.betSection.addChild(this.betPresetGroup);

    this.betPresetGroup.y = 122;

    this.setBetPresets([10, 20, 50, 100, 200]);

    this.panelSeparators = new Graphics();
    this.panelSeparators.lineStyle = undefined;
    this.panelSeparators.rect(0, 0, 1, 1);

    const separator = (x) => {
      const line = new Graphics();
      line.roundRect(0, 0, 1, panelHeight - 34, 1);
      line.fill({ color: 0xffffff, alpha: 0.05 });
      line.x = x;
      line.y = 17;
      this.panel.addChild(line);
    };

    separator(sectionWidth);
    separator(sectionWidth * 2);
    separator(sectionWidth * 3);
    separator(sectionWidth * 4);
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

  setOnBetPreset(callback) {
    this.betPresetCallback = callback;
  }

  setBalance(balance) {
    const formatted = `$${Number(balance).toFixed(2)}`;

    this.balanceValue.text = formatted;

    this.panelBalanceValue.text = formatted;
  }

  setBet(bet) {
    this.setBetValue(bet);
  }

  setCurrentWin(amount) {
    this.currentWinValue.text = `$${amount.toFixed(2)}`;
  }

  setMultiplier(mult) {
    this.multiplierValue.text = `x${Number(mult).toFixed(2)}`;
  }

  setDifficulty(difficulty) {
    this.difficultyButton.setText(`${difficulty} ▼`);
  }

  setState(state) {
    this.state = state;
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
    this.betValueText.text = `${value}`;

    this.highlightBetPreset(value);
  }

  setBetPresets(values) {
    this.betPresetValues = values.slice();

    this.betPresetButtons.forEach((button) => {
      if (button.parent) {
        button.parent.removeChild(button);
      }
    });

    this.betPresetButtons = [];

    const chipGap = 10;

    values.forEach((value, index) => {
      const chip = new Button({
        text: `${value}`,
        width: 50,
        height: 30,
        radius: 8,
        background: index === 0 ? "#f0c542" : "#232528",
        textColor: index === 0 ? "#161616" : "#ffffff",
        fontSize: 18,
      });

      chip.betValue = value;
      chip.x = index * (50 + chipGap);
      chip.y = 0;

      chip.setOnClick(() => {
        if (this.betPresetCallback) {
          this.betPresetCallback(value);
        }
      });

      this.betPresetButtons.push(chip);
      this.betPresetGroup.addChild(chip);
    });

    this.highlightBetPreset(this.betValueText.text);
  }

  highlightBetPreset(value) {
    const normalizedValue = Number(value);

    this.betPresetButtons.forEach((button) => {
      const isActive = Number(button.betValue) === normalizedValue;

      button.alpha = isActive ? 1 : 0.65;
    });
  }
}
