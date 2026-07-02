import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class Button extends Container {
  constructor(options) {
    super();

    const {
      text = "Button",
      width = 220,
      height = 60,
      radius = 12,
      background = "#2ecc71",
      fontSize = 28,
      textColor = "white",
    } = options;

    this.background = new Graphics();

    this.background.roundRect(0, 0, width, height, radius);

    this.background.fill(background);

    this.addChild(this.background);

    this.text = new Text({
      text,
      style: new TextStyle({
        fill: textColor,
        fontSize,
      }),
    });

    this.text.anchor.set(0.5);

    this.text.x = width / 2;
    this.text.y = height / 2;

    this.addChild(this.text);

    this.eventMode = "static";

    this.cursor = "pointer";

    // this.on("pointerover", () => {
    //   this.scale.set(1.05);
    // });

    // this.on("pointerout", () => {
    //   this.scale.set(1);
    // });
  }
  setOnClick(callback) {
    this.on("pointerdown", callback);
  }
  setText(text) {
    this.text.text = text;

    this.text.x = this.background.width / 2;

    this.text.y = this.background.height / 2;
  }
}
