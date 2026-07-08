import { Container } from "pixi.js";
import { Target } from "../objects/Target";
import { Screen } from "../utils/Screen";

export class TargetManager extends Container {
  constructor() {
    super();

    this.targets = [];
  }

  createTargets(count, panelTop = Screen.height) {
    this.removeChildren();

    this.targets = [];

    const horizontalPadding = Screen.clamp(Screen.width * 0.08, 40, 120);
    const availableWidth = Math.max(220, Screen.width - horizontalPadding * 2);
    const spacing =
      count > 1
        ? Screen.clamp(availableWidth / (count - 1), 120, 320)
        : 0;

    const topBound = Screen.clamp(Screen.height * 0.18, 90, 260);
    const bottomBound = Math.max(
      topBound + 80,
      panelTop - Screen.clamp(Screen.height * 0.16, 120, 240)
    );
    const targetY = (topBound + bottomBound) / 2;
    const targetScale = Screen.clamp(Screen.shortEdge / 900 * 0.2, 0.14, 0.25);

    const startX = Screen.centerX - ((count - 1) * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const target = new Target(i);

      target.setOnClick((id) => {
        if (this.clickCallback) {
          this.clickCallback(id);
        }
      });

      target.setBaseScale(targetScale);

      target.x = startX + i * spacing;
      target.y = targetY;

      this.targets.push(target);
      this.addChild(target);
    }
  }

  setOnTargetSelected(callback) {
    this.clickCallback = callback;
  }
}
