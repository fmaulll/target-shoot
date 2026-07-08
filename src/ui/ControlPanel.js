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
      fontSize: 12,
      fontWeight: "bold",
    });

    const topValueStyle = new TextStyle({
      fill: "#f0c542",
      fontSize: 18,
      fontWeight: "bold",
    });

    const greenValueStyle = new TextStyle({
      fill: "#7fe35d",
      fontSize: 18,
      fontWeight: "bold",
    });

    this.statsLayer.x = 18;
    this.statsLayer.y = 10;

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

    this.balanceLabel.x = 0;
    this.balanceLabel.y = 0;

    this.balanceValue.x = 88;
    this.balanceValue.y = 0;

    this.currentWinLabel.x = 0;
    this.currentWinLabel.y = 26;

    this.currentWinValue.x = 88;
    this.currentWinValue.y = 26;

    this.multiplierLabel.x = 0;
    this.multiplierLabel.y = 52;

    this.multiplierValue.x = 88;
    this.multiplierValue.y = 52;

    this.balanceBadge = new Container();
    this.balanceSection.addChild(this.balanceBadge);

    this.balanceIcon = new Graphics();
    this.balanceIcon.circle(18, 18, 18);
    this.balanceIcon.fill({ color: 0x2a2a2a, alpha: 1 });
    this.balanceIcon.stroke({ color: 0xf0c542, width: 2, alpha: 1 });
    this.balanceBadge.addChild(this.balanceIcon);

    this.balanceSymbol = new Text({
      text: "$",
      style: new TextStyle({
        fill: "#f0c542",
        fontSize: 22,
        fontWeight: "bold",
      }),
    });
    this.balanceSymbol.anchor.set(0.5);
    this.balanceSymbol.x = 18;
    this.balanceSymbol.y = 18;
    this.balanceBadge.addChild(this.balanceSymbol);

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
      width: 48,
      height: 48,
      radius: 24,
      background: "#2a2a2a",
      textColor: "#f0c542",
      fontSize: 24,
    });

    this.minusBetRing = new Graphics();
    this.minusBetRing.circle(24, 24, 24);
    this.minusBetRing.stroke({ color: 0xf0c542, width: 2, alpha: 1 });
    this.minusBetButton.addChild(this.minusBetRing);
    this.minusBetButton.text.style.fontWeight = "bold";

    this.betSection.addChild(this.minusBetButton);

    this.betValueText = new Text({
      text: "10",
      style: valueStyle,
    });

    this.betValueText.anchor.set(0.5);

    this.betSection.addChild(this.betValueText);

    this.plusBetButton = new Button({
      text: "+",
      width: 48,
      height: 48,
      radius: 24,
      background: "#2a2a2a",
      textColor: "#f0c542",
      fontSize: 24,
    });

    this.plusBetRing = new Graphics();
    this.plusBetRing.circle(24, 24, 24);
    this.plusBetRing.stroke({ color: 0xf0c542, width: 2, alpha: 1 });
    this.plusBetButton.addChild(this.plusBetRing);
    this.plusBetButton.text.style.fontWeight = "bold";

    this.betSection.addChild(this.plusBetButton);

    this.difficultyLabel = new Text({
      text: "DIFFICULTY",
      style: labelStyle,
    });

    this.difficultySection.addChild(this.difficultyLabel);

    this.difficultyButton = new Button({
      text: "EASY ▼",
      width: 172,
      height: 48,
      fontSize: 20,
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
      width: 190,
      height: 60,
      background: "#47b83a",
      fontSize: 24,
    });

    this.startSection.addChild(this.startButton);

    this.collectButton = new Button({
      text: "COLLECT",
      width: 166,
      height: 58,
      background: "#f1b81a",
      textColor: "#202020",
      fontSize: 22,
    });

    this.collectButton.visible = true;

    this.cashoutSection.addChild(this.collectButton);

    this.cashoutCurrentWinLabel = new Text({
      text: "CURRENT WIN",
      style: new TextStyle({
        fill: "#f2f2f2",
        fontSize: 14,
        fontWeight: "bold",
      }),
    });

    this.cashoutCurrentWinLabel.anchor.set(0.5);
    this.cashoutSection.addChild(this.cashoutCurrentWinLabel);

    this.cashoutCurrentWinValue = new Text({
      text: "$0.00",
      style: new TextStyle({
        fill: "#7fe35d",
        fontSize: 20,
        fontWeight: "bold",
      }),
    });

    this.cashoutCurrentWinValue.anchor.set(0.5);
    this.cashoutSection.addChild(this.cashoutCurrentWinValue);

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

    this.setCollectEnabled(false);

    const panelWidth = Screen.width - 26;
    const panelHeight = 168;

    this.panelWidth = panelWidth;

    this.panelHeight = panelHeight;

    const bg = new Graphics();

    bg.roundRect(0, 0, panelWidth, panelHeight, 18);

    bg.fill({
      color: 0x101214,
      alpha: 0.96,
    });

    bg.stroke({
      color: 0xd8a73c,
      width: 2,
      alpha: 0.9,
    });

    this.panel.addChildAt(bg, 0);

    this.panel.x = 13;
    this.panel.y = Screen.height - panelHeight - 12;

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
      section.x = index * sectionWidth + 18;
    });

    this.balanceSection.y = 20;
    this.cashoutSection.y = 20;
    this.betSection.y = 18;
    this.difficultySection.y = 18;
    this.startSection.y = 20;

    this.balanceLabel.x = 0;
    this.balanceLabel.y = 0;
    this.balanceValue.x = 88;
    this.balanceValue.y = 0;

    this.currentWinLabel.x = 0;
    this.currentWinLabel.y = 26;
    this.currentWinValue.x = 88;
    this.currentWinValue.y = 26;

    this.multiplierLabel.x = 0;
    this.multiplierLabel.y = 52;
    this.multiplierValue.x = 88;
    this.multiplierValue.y = 52;

    this.minusBetButton.x = 0;
    this.minusBetButton.y = 40;
    this.betValueText.x = 90;
    this.betValueText.y = 62;
    this.plusBetButton.x = 136;
    this.plusBetButton.y = 40;

    this.difficultyLabel.x = 0;
    this.difficultyLabel.y = 0;
    this.difficultyButton.x = 0;
    this.difficultyButton.y = 36;

    this.startButton.x = 0;
    this.startButton.y = 0;
    this.collectButton.x = 0;
    this.collectButton.y = 0;

    this.panelBalanceLabel.x = 56;
    this.panelBalanceLabel.y = 4;

    this.panelBalanceValue.x = 56;
    this.panelBalanceValue.y = 28;

    this.betLabel = new Text({
      text: "BET",
      style: labelStyle,
    });

    this.betSection.addChild(this.betLabel);

    this.betLabel.x = 86;
    this.betLabel.y = 0;

    this.betPresetGroup = new Container();
    this.betSection.addChild(this.betPresetGroup);

    this.betPresetGroup.y = 118;

    this.setBetPresets([10, 20, 50, 100, 200]);

    this.panelSeparators = new Graphics();
    this.panelSeparators.lineStyle = undefined;
    this.panelSeparators.rect(0, 0, 1, 1);

    const separator = (x) => {
      const line = new Graphics();
      line.roundRect(0, 0, 1, panelHeight - 36, 1);
      line.fill({ color: 0xffffff, alpha: 0.05 });
      line.x = x;
      line.y = 16;
      this.panel.addChild(line);
    };

    separator(sectionWidth);
    separator(sectionWidth * 2);
    separator(sectionWidth * 3);
    separator(sectionWidth * 4);

    this.centerSectionContent(this.balanceSection, sectionWidth, 0);
    this.centerSectionContent(this.cashoutSection, sectionWidth, 1);
    this.centerSectionContent(this.betSection, sectionWidth, 2);
    this.centerSectionContent(this.difficultySection, sectionWidth, 3);
    this.centerSectionContent(this.startSection, sectionWidth, 4);
  }

  centerSectionContent(section, sectionWidth, index) {
    const localCenter = sectionWidth / 2;

    if (section === this.balanceSection) {
      this.balanceBadge.x = 4;
      this.balanceBadge.y = 22;
      this.panelBalanceLabel.x = 48;
      this.panelBalanceValue.x = 48;
      return;
    }

    if (section === this.cashoutSection) {
      this.collectButton.x = localCenter - this.collectButton.width / 2;
      this.collectButton.y = 10;
      this.cashoutCurrentWinLabel.x = localCenter;
      this.cashoutCurrentWinLabel.y = 82;
      this.cashoutCurrentWinValue.x = localCenter;
      this.cashoutCurrentWinValue.y = 108;
      return;
    }

    if (section === this.betSection) {
      this.betLabel.x = localCenter - this.betLabel.width / 2;
      this.betLabel.y = 0;

      this.minusBetButton.x = localCenter - 92;
      this.minusBetButton.y = 40;
      this.betValueText.x = localCenter;
      this.betValueText.y = 62;
      this.plusBetButton.x = localCenter + 44;
      this.plusBetButton.y = 40;

      const chipGap = 10;
      const chipWidth = 50;
      const totalChipsWidth = this.betPresetButtons.length * chipWidth + (this.betPresetButtons.length - 1) * chipGap;
      const startX = Math.max(0, (sectionWidth - totalChipsWidth) / 2);

      this.betPresetButtons.forEach((chip, chipIndex) => {
        chip.x = startX + chipIndex * (chipWidth + chipGap);
        chip.y = 0;
      });

      this.betPresetGroup.x = 0;
      return;
    }

    if (section === this.difficultySection) {
      this.difficultyLabel.x = localCenter - this.difficultyLabel.width / 2;
      this.difficultyButton.x = localCenter - this.difficultyButton.width / 2;
      this.difficultyButton.y = 36;
      return;
    }

    if (section === this.startSection) {
      this.startButton.x = localCenter - this.startButton.width / 2;
      this.startButton.y = 2;
    }
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
    this.cashoutCurrentWinValue.text = `$${amount.toFixed(2)}`;
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
    this.setCollectEnabled(true);
  }

  setOnCollect(callback) {
    this.collectCallback = callback;
  }

  hideCollectButton() {
    this.setCollectEnabled(false);
  }

  setCollectEnabled(enabled) {
    this.collectButton.eventMode = enabled ? "static" : "none";
    this.collectButton.cursor = enabled ? "pointer" : "default";
    this.collectButton.alpha = enabled ? 1 : 0.55;
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
        background: index === 0 ? "#f0c542" : "#1f2326",
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

    this.recenterBetPresetRow();
  }

  recenterBetPresetRow() {
    if (!this.betPresetButtons.length) return;

    const chipWidth = 50;
    const chipGap = 10;
    const totalWidth = this.betPresetButtons.length * chipWidth + (this.betPresetButtons.length - 1) * chipGap;
    const localCenter = this.panelWidth / 5;
    const startX = Math.max(0, (localCenter - totalWidth) / 2);

    this.betPresetButtons.forEach((chip, index) => {
      chip.x = startX + index * (chipWidth + chipGap);
      chip.y = 0;
    });

    this.betPresetGroup.x = 0;
    this.betPresetGroup.y = 118;
  }

  highlightBetPreset(value) {
    const normalizedValue = Number(value);

    this.betPresetButtons.forEach((button) => {
      const isActive = Number(button.betValue) === normalizedValue;

      button.alpha = isActive ? 1 : 0.65;
    });
  }
}
