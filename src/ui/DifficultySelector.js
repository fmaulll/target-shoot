import { Container } from "pixi.js";
import { Button } from "../objects/Button";

export class DifficultySelector extends Container {
  constructor() {
    super();

    this.easyButton = new Button("EASY");
    this.mediumButton = new Button("MEDIUM");
    this.hardButton = new Button("HARD");

    this.easyButton.scale.set(0.6);
    this.mediumButton.scale.set(0.6);
    this.hardButton.scale.set(0.6);

    this.easyButton.x = 0;
    this.mediumButton.x = 180;
    this.hardButton.x = 360;

    this.addChild(this.easyButton, this.mediumButton, this.hardButton);
  }
  setOnDifficultyChanged(callback) {
    this.easyButton.setOnClick(() => {
      callback("easy");
    });

    this.mediumButton.setOnClick(() => {
      callback("medium");
    });

    this.hardButton.setOnClick(() => {
      callback("hard");
    });
  }
}
