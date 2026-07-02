import { Container, Text, TextStyle } from "pixi.js";
import { Button } from "../objects/Button";

export class ControlPanel extends Container {
  constructor() {
    super();

    const style = new TextStyle({
      fill: "white",
      fontSize: 28,
    });

    this.balanceText = new Text({
      text: "Balance : ",
      style,
    });

    this.balanceText.x = 40;
    this.balanceText.y = 30;

    this.addChild(this.balanceText);

    this.betText = new Text({
      text: "Bet : ",
      style,
    });

    this.betText.x = 40;
    this.betText.y = 80;

    this.addChild(this.betText);

    this.difficultyText = new Text({
      text: "Difficulty : ",
      style,
    });

    this.difficultyText.x = 40;
    this.difficultyText.y = 130;

    this.addChild(this.difficultyText);

    this.multiplierText = new Text({
      text: "Multiplier : ",
      style,
    });

    this.multiplierText.x = 40;
    this.multiplierText.y = 180;

    this.addChild(this.multiplierText);

    this.stateText = new Text({
      text: `State: `,
      style,
    });

    this.stateText.x = 40;
    this.stateText.y = 230;

    this.addChild(this.stateText);

    this.startButton = new Button("START");

    this.startButton.x = 1200;
    this.startButton.y = 60;

    this.addChild(this.startButton);
    this.startButton.setOnClick(() => {
      if (this.startCallback) {
        this.startCallback();
      }
    });
  }

  setOnStart(callback) {
    this.startCallback = callback;
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

  setDifficulty(difficulty) {
    this.difficultyText.text = `Difficulty : ${difficulty}`;
  }

  setState(state) {
    const names = {
      waiting: "Waiting",
      playing: "Playing",
      shooting: "Shooting",
      result: "Result",
    };

    this.stateText.text = `Status : ${names[state]}`;
  }
}
