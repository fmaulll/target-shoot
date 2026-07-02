import { Container } from "pixi.js";
import { Target } from "../objects/Target";
import { Screen } from "../utils/Screen";

export class TargetManager extends Container {
  constructor() {
    super();

    this.targets = [];
  }

  createTargets(count) {
    this.removeChildren();

    this.targets = [];

    const spacing = 200;

    const startX = Screen.centerX - ((count - 1) * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const target = new Target(i);

      target.setOnClick((id) => {
        if (this.clickCallback) {
          this.clickCallback(id);
        }
      });

      target.x = startX + i * spacing;
      target.y = Screen.centerY;

      this.targets.push(target);
      this.addChild(target);
    }
  }

  setOnTargetSelected(callback) {
    this.clickCallback = callback;
  }
}
