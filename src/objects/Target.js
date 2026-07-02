import { Container, Sprite } from "pixi.js";

export class Target extends Container {
  constructor(id) {
    super();
    this.id = id;

    this.sprite = Sprite.from("target");
    this.sprite.anchor.set(0.5);
    this.sprite.scale = 0.2;

    this.addChild(this.sprite);

    this.eventMode = "static";

    this.on("pointerover", () => {
      if (!this.enabled) {
        this.cursor = "default";
      } else {
        this.cursor = "pointer";
      }
      // this.scale.set(1.1);
    });

    this.on("pointerout", () => {
      // this.scale.set(1);
    });
    this.on("pointerdown", () => {
      if (!this.enabled) return;

      if (this.clickCallback) {
        this.clickCallback(this.id);
      }
    });

    this.enabled = false;

    this.selected = false;
  }
  setEnabled(value) {
    this.enabled = value;
  }

  setSelected(value) {
    this.selected = value;

    if (value) {
      this.sprite.tint = 0xffdd55;
    } else {
      this.sprite.tint = 0xffffff;
    }
  }

  setOnClick(callback) {
    this.clickCallback = callback;
  }
}
