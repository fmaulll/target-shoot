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
      width: 36,
      height: 36,
      radius: 18,
      background: "#2a2a2a",
      textColor: "#f0c542",
      fontSize: 20,
    });

    this.minusBetRing = new Graphics();
    this.minusBetRing.circle(18, 18, 18);
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
      width: 36,
      height: 36,
      radius: 18,
      background: "#2a2a2a",
      textColor: "#f0c542",
      fontSize: 20,
    });

    this.plusBetRing = new Graphics();
    this.plusBetRing.circle(18, 18, 18);
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

    this.panelBg = new Graphics();
    this.panel.addChildAt(this.panelBg, 0);

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

    const sectionWidth = (Screen.width - 26) / sections.length;

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

    this.separatorLines = [];

    for (let i = 0; i < 4; i++) {
      const line = new Graphics();
      this.separatorLines.push(line);
      this.panel.addChild(line);
    }

    this.applyResponsiveLayout();
  }

  applyResponsiveLayout() {
    const isMobile = Screen.isPortrait;
    const uiScale = Screen.uiScale;
    const panelPadding = Screen.horizontalPadding;

    const panelWidth = Screen.width - panelPadding * 2;
    const panelHeight = isMobile
      ? Math.round(Screen.clamp(Screen.height * 0.36, 300, 480))
      : Math.round(Screen.clamp(Screen.height * 0.22, 160, 250));

    this.panelWidth = panelWidth;
    this.panelHeight = panelHeight;

    this.panelBg.clear();
    this.panelBg.roundRect(0, 0, panelWidth, panelHeight, 18);
    this.panelBg.fill({
      color: 0x101214,
      alpha: 0.96,
    });
    this.panelBg.stroke({
      color: 0xd8a73c,
      width: 2,
      alpha: 0.9,
    });

    this.panel.x = panelPadding;
    this.panel.y = Screen.height - panelHeight - Math.round(Screen.clamp(Screen.height * 0.015, 8, 16));

    this.statsLayer.x = panelPadding;
    this.statsLayer.y = Math.round(Screen.clamp(Screen.height * 0.012, 8, 14));

    const topValueX = Math.round(Screen.clamp(88 * uiScale, 72, 116));
    const topRowGap = Math.round(Screen.clamp(26 * uiScale, 20, 32));

    this.balanceLabel.x = 0;
    this.balanceLabel.y = 0;
    this.balanceValue.x = topValueX;
    this.balanceValue.y = 0;

    this.currentWinLabel.x = 0;
    this.currentWinLabel.y = topRowGap;
    this.currentWinValue.x = topValueX;
    this.currentWinValue.y = topRowGap;

    this.multiplierLabel.x = 0;
    this.multiplierLabel.y = topRowGap * 2;
    this.multiplierValue.x = topValueX;
    this.multiplierValue.y = topRowGap * 2;

    let balanceWidth = 0;
    let cashoutWidth = 0;
    let betWidth = 0;
    let difficultyWidth = 0;
    let startWidth = 0;

    if (isMobile) {
      const horizontalPadding = Math.round(Screen.clamp(panelWidth * 0.02, 10, 18));
      const sectionGap = Math.round(Screen.clamp(panelWidth * 0.012, 8, 14));
      const secondRowWidth =
        (panelWidth - horizontalPadding * 2 - sectionGap * 3) / 4;

      betWidth = panelWidth - horizontalPadding * 2;
      balanceWidth = secondRowWidth;
      cashoutWidth = secondRowWidth;
      difficultyWidth = secondRowWidth;
      startWidth = secondRowWidth;

      this.betSection.x = horizontalPadding;
      this.betSection.y = Math.round(panelHeight * 0.05);

      this.balanceSection.x = horizontalPadding;
      this.cashoutSection.x = horizontalPadding + secondRowWidth + sectionGap;
      this.difficultySection.x = horizontalPadding + (secondRowWidth + sectionGap) * 2;
      this.startSection.x = horizontalPadding + (secondRowWidth + sectionGap) * 3;

      const secondRowY = Math.round(panelHeight * 0.5);

      this.balanceSection.y = secondRowY;
      this.cashoutSection.y = secondRowY;
      this.difficultySection.y = secondRowY;
      this.startSection.y = secondRowY;

      this.separatorLines.forEach((line) => {
        line.clear();
        line.visible = false;
      });
    } else {
      const sections = [
        this.balanceSection,
        this.cashoutSection,
        this.betSection,
        this.difficultySection,
        this.startSection,
      ];

      const sectionWidth = panelWidth / sections.length;
      const sectionInset = Math.round(Screen.clamp(panelWidth * 0.012, 12, 20));

      balanceWidth = sectionWidth;
      cashoutWidth = sectionWidth;
      betWidth = sectionWidth;
      difficultyWidth = sectionWidth;
      startWidth = sectionWidth;

      sections.forEach((section, index) => {
        section.x = index * sectionWidth + sectionInset;
      });

      this.balanceSection.y = Math.round(panelHeight * 0.12);
      this.cashoutSection.y = Math.round(panelHeight * 0.12);
      this.betSection.y = Math.round(panelHeight * 0.1);
      this.difficultySection.y = Math.round(panelHeight * 0.1);
      this.startSection.y = Math.round(panelHeight * 0.12);

      this.separatorLines.forEach((line, index) => {
        line.visible = true;
        line.clear();
        line.roundRect(0, 0, 1, panelHeight - Math.round(panelHeight * 0.22), 1);
        line.fill({ color: 0xffffff, alpha: 0.05 });
        line.x = sectionWidth * (index + 1);
        line.y = Math.round(panelHeight * 0.1);
      });
    }

    this.currentBetSectionWidth = betWidth;

    this.panelBalanceLabel.y = isMobile ? 2 : 4;
    this.panelBalanceValue.y = isMobile ? 26 : 28;
    this.currentBetPresetY = isMobile
      ? Math.round(Screen.clamp(panelHeight * 0.28, 102, 138))
      : Math.round(Screen.clamp(panelHeight * 0.7, 108, 126));
    this.betPresetGroup.y = this.currentBetPresetY;

    if (isMobile) {
      this.startButton.scale.set(Screen.clamp(0.8 + uiScale * 0.1, 0.84, 1));
      this.collectButton.scale.set(Screen.clamp(0.76 + uiScale * 0.1, 0.8, 1));
      this.difficultyButton.scale.set(Screen.clamp(0.82 + uiScale * 0.1, 0.86, 1));
      this.minusBetButton.scale.set(Screen.clamp(1.2 + uiScale * 0.12, 1.25, 1.38));
      this.plusBetButton.scale.set(Screen.clamp(1.2 + uiScale * 0.12, 1.25, 1.38));

      this.balanceLabel.style.fontSize = Math.round(Screen.clamp(12 * uiScale, 12, 16));
      this.currentWinLabel.style.fontSize = Math.round(Screen.clamp(12 * uiScale, 12, 16));
      this.multiplierLabel.style.fontSize = Math.round(Screen.clamp(12 * uiScale, 12, 16));

      this.balanceValue.style.fontSize = Math.round(Screen.clamp(21 * uiScale, 20, 30));
      this.currentWinValue.style.fontSize = Math.round(Screen.clamp(20 * uiScale, 18, 28));
      this.multiplierValue.style.fontSize = Math.round(Screen.clamp(20 * uiScale, 18, 28));

      this.panelBalanceLabel.style.fontSize = Math.round(Screen.clamp(15 * uiScale, 14, 20));
      this.panelBalanceValue.style.fontSize = Math.round(Screen.clamp(21 * uiScale, 20, 28));

      this.betLabel.style.fontSize = Math.round(Screen.clamp(18 * uiScale, 17, 26));
      this.difficultyLabel.style.fontSize = Math.round(Screen.clamp(13 * uiScale, 12, 18));

      this.betValueText.style.fontSize = Math.round(Screen.clamp(36 * uiScale, 34, 48));
      this.cashoutCurrentWinLabel.style.fontSize = Math.round(Screen.clamp(11 * uiScale, 10, 15));
      this.cashoutCurrentWinValue.style.fontSize = Math.round(Screen.clamp(17 * uiScale, 16, 24));

      this.startButton.text.style.fontSize = Math.round(Screen.clamp(23 * uiScale, 22, 30));
      this.collectButton.text.style.fontSize = Math.round(Screen.clamp(17 * uiScale, 16, 24));
      this.difficultyButton.text.style.fontSize = Math.round(Screen.clamp(16 * uiScale, 15, 22));
      this.minusBetButton.text.style.fontSize = Math.round(Screen.clamp(23 * uiScale, 22, 30));
      this.plusBetButton.text.style.fontSize = Math.round(Screen.clamp(23 * uiScale, 22, 30));

      this.betPresetButtons.forEach((chip) => {
        chip.scale.set(Screen.clamp(1 + (uiScale - 0.8) * 0.28, 1.02, 1.12));
      });
    } else {
      this.startButton.scale.set(1);
      this.collectButton.scale.set(1);
      this.difficultyButton.scale.set(1);
      this.minusBetButton.scale.set(1);
      this.plusBetButton.scale.set(1);

      this.balanceLabel.style.fontSize = Math.round(Screen.clamp(12 * uiScale, 11, 15));
      this.currentWinLabel.style.fontSize = Math.round(Screen.clamp(12 * uiScale, 11, 15));
      this.multiplierLabel.style.fontSize = Math.round(Screen.clamp(12 * uiScale, 11, 15));

      this.balanceValue.style.fontSize = Math.round(Screen.clamp(18 * uiScale, 16, 24));
      this.currentWinValue.style.fontSize = Math.round(Screen.clamp(18 * uiScale, 16, 24));
      this.multiplierValue.style.fontSize = Math.round(Screen.clamp(18 * uiScale, 16, 24));

      this.panelBalanceLabel.style.fontSize = Math.round(Screen.clamp(18 * uiScale, 15, 22));
      this.panelBalanceValue.style.fontSize = Math.round(Screen.clamp(28 * uiScale, 22, 34));

      this.betLabel.style.fontSize = Math.round(Screen.clamp(18 * uiScale, 15, 24));
      this.difficultyLabel.style.fontSize = Math.round(Screen.clamp(18 * uiScale, 15, 24));

      this.betValueText.style.fontSize = Math.round(Screen.clamp(28 * uiScale, 24, 36));
      this.cashoutCurrentWinLabel.style.fontSize = Math.round(Screen.clamp(14 * uiScale, 12, 18));
      this.cashoutCurrentWinValue.style.fontSize = Math.round(Screen.clamp(20 * uiScale, 16, 26));

      this.startButton.text.style.fontSize = Math.round(Screen.clamp(24 * uiScale, 20, 30));
      this.collectButton.text.style.fontSize = Math.round(Screen.clamp(22 * uiScale, 18, 28));
      this.difficultyButton.text.style.fontSize = Math.round(Screen.clamp(20 * uiScale, 17, 26));
      this.minusBetButton.text.style.fontSize = Math.round(Screen.clamp(20 * uiScale, 17, 26));
      this.plusBetButton.text.style.fontSize = Math.round(Screen.clamp(20 * uiScale, 17, 26));

      this.betPresetButtons.forEach((chip) => {
        chip.scale.set(1);
      });
    }

    this.centerSectionContent(this.balanceSection, balanceWidth, 0);
    this.centerSectionContent(this.cashoutSection, cashoutWidth, 1);
    this.centerSectionContent(this.betSection, betWidth, 2);
    this.centerSectionContent(this.difficultySection, difficultyWidth, 3);
    this.centerSectionContent(this.startSection, startWidth, 4);
  }

  centerSectionContent(section, sectionWidth, index) {
    const localCenter = sectionWidth / 2;
    const isMobile = Screen.isPortrait;

    if (section === this.balanceSection) {
      if (isMobile) {
        const badgeSize = Screen.clamp(sectionWidth * 0.3, 22, 36);
        const badgeScale = badgeSize / 36;

        this.balanceBadge.scale.set(badgeScale);
        this.balanceBadge.x = localCenter - badgeSize / 2;
        this.balanceBadge.y = Math.round(Screen.clamp(sectionWidth * 0.08, 6, 12));
        this.panelBalanceLabel.x = localCenter - this.panelBalanceLabel.width / 2;
        this.panelBalanceLabel.y = Math.round(badgeSize + 10);
        this.panelBalanceValue.x = localCenter - this.panelBalanceValue.width / 2;
        this.panelBalanceValue.y = this.panelBalanceLabel.y + this.panelBalanceLabel.height + 4;
      } else {
        this.balanceBadge.x = 4;
        this.balanceBadge.y = 22;
        this.balanceBadge.scale.set(1);
        this.panelBalanceLabel.x = 48;
        this.panelBalanceLabel.y = 4;
        this.panelBalanceValue.x = 48;
        this.panelBalanceValue.y = 28;
      }
      return;
    }

    if (section === this.cashoutSection) {
      this.collectButton.x = localCenter - this.collectButton.width / 2;
      this.collectButton.y = isMobile ? 8 : 10;
      this.cashoutCurrentWinLabel.x = localCenter;
      this.cashoutCurrentWinLabel.y = this.collectButton.y + this.collectButton.height + (isMobile ? 8 : 14);
      this.cashoutCurrentWinValue.x = localCenter;
      this.cashoutCurrentWinValue.y = this.cashoutCurrentWinLabel.y + this.cashoutCurrentWinLabel.height + 3;
      return;
    }

    if (section === this.betSection) {
      this.betLabel.x = localCenter - this.betLabel.width / 2;
      this.betLabel.y = 0;

      const sideGap = isMobile
        ? Screen.clamp(sectionWidth * 0.12, 42, 70)
        : Screen.clamp(sectionWidth * 0.12, 20, 28);

      this.minusBetButton.x = localCenter - sideGap - this.minusBetButton.width;
      this.minusBetButton.y = isMobile ? 56 : 46;
      this.betValueText.x = localCenter;
      this.betValueText.y = this.minusBetButton.y + this.minusBetButton.height / 2;
      this.plusBetButton.x = localCenter + sideGap;
      this.plusBetButton.y = isMobile ? 56 : 46;

      const chipGap = Screen.clamp(sectionWidth * 0.014, 8, 12);
      this.currentChipGap = chipGap;

      const chipWidths = this.betPresetButtons.map((chip) => chip.width);
      const totalChipsWidth =
        chipWidths.reduce((sum, width) => sum + width, 0) +
        (this.betPresetButtons.length - 1) * chipGap;
      let cursorX = Math.max(0, (sectionWidth - totalChipsWidth) / 2);

      this.betPresetButtons.forEach((chip, chipIndex) => {
        chip.x = cursorX;
        chip.y = 0;

        cursorX += chip.width + chipGap;
      });

      this.betPresetGroup.x = 0;
      this.betPresetGroup.y = this.currentBetPresetY;
      return;
    }

    if (section === this.difficultySection) {
      this.difficultyLabel.x = localCenter - this.difficultyLabel.width / 2;
      this.difficultyButton.x = localCenter - this.difficultyButton.width / 2;
      this.difficultyButton.y = isMobile ? 28 : 36;
      return;
    }

    if (section === this.startSection) {
      this.startButton.x = localCenter - this.startButton.width / 2;
      this.startButton.y = isMobile ? 22 : 2;
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
    const chipGap = this.currentChipGap || 10;
    const chipWidths = this.betPresetButtons.map((chip) => chip.width || chipWidth);
    const totalWidth =
      chipWidths.reduce((sum, width) => sum + width, 0) +
      (this.betPresetButtons.length - 1) * chipGap;
    const sectionWidth = this.currentBetSectionWidth || this.panelWidth / 5;
    const startX = Math.max(0, (sectionWidth - totalWidth) / 2);

    let cursorX = startX;

    this.betPresetButtons.forEach((chip, index) => {
      chip.x = cursorX;
      chip.y = 0;

      cursorX += (chip.width || chipWidth) + chipGap;
    });

    this.betPresetGroup.x = 0;
    this.betPresetGroup.y = this.currentBetPresetY || (Screen.isPortrait ? 92 : 118);
  }

  highlightBetPreset(value) {
    const normalizedValue = Number(value);

    this.betPresetButtons.forEach((button) => {
      const isActive = Number(button.betValue) === normalizedValue;

      button.alpha = isActive ? 1 : 0.65;
    });
  }
}
