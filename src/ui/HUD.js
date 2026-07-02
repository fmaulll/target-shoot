import { Container, Text, TextStyle } from "pixi.js";

export class HUD extends Container {
  constructor() {
    super();

    const style = new TextStyle({
      fill: "white",

      fontSize: 28,

      fontFamily: "Arial",
    });

    this.balanceText = new Text({
      text: "",

      style,
    });

    this.betText = new Text({
      text: "",

      style,
    });

    this.multiplierText = new Text({
      text: "",

      style,
    });

    this.balanceText.x = 30;
    this.balanceText.y = 30;

    this.betText.x = 30;
    this.betText.y = 70;

    this.multiplierText.x = 30;
    this.multiplierText.y = 110;

    this.addChild(this.balanceText, this.betText, this.multiplierText);
    this.updateHUD(1000, 10, 2);
  }

  updateHUD(balance = 0, bet = 0, multiplier = 0) {
    this.balanceText.text = `Balance : $${balance}`;

    this.betText.text = `Bet : $${bet}`;

    this.multiplierText.text = `Multiplier : x${multiplier}`;
  }
}
