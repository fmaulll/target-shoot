import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class Button extends Container {
  constructor(label) {
    super();

    this.background = new Graphics();

    this.background.roundRect(0, 0, 250, 70, 15);

    this.background.fill("#2ecc71");

    this.addChild(this.background);

    this.text = new Text({
      text: label,
      style: new TextStyle({
        fill: "white",
        fontSize: 30,
      }),
    });

    this.text.anchor.set(0.5);

    this.text.x = 125;
    this.text.y = 35;

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
}
