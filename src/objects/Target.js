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

    this.hitScale = 1;
  }

  hit() {
    this.sprite.tint = 0xff4444;

    this.hitScale = 1.3;

    setTimeout(() => {
      this.sprite.tint = 0xffffff;
    }, 150);
  }

  setEnabled(value) {
    this.enabled = value;
  }

  setSelected(value) {
    this.selected = value;

    this.sprite.tint = value ? 0xffdd55 : 0xffffff;
  }

  setOnClick(callback) {
    this.clickCallback = callback;
  }

  update() {
    this.hitScale += (1 - this.hitScale) * 0.15;

    this.scale.set(this.hitScale);
  }
}
