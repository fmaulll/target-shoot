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

    const topBound = Screen.clamp(Screen.height * 0.18, 90, 260);
    const bottomBound = Math.max(
      topBound + 80,
      panelTop - Screen.clamp(Screen.height * 0.16, 120, 240)
    );
    const targetYOffset = Screen.isPortrait ? Screen.clamp(Screen.height * 0.015, 14, 28) : 0;
    const targetY = (topBound + bottomBound) / 2 + targetYOffset;
    const targetScale = Screen.isPortrait
      ? Screen.clamp(Screen.shortEdge / 900 * 0.26, 0.18, 0.32)
      : Screen.clamp(Screen.shortEdge / 900 * 0.48, 0.38, 0.56);

    const spreadRatioByCount = {
      2: 0.72,
      3: 0.56,
      4: 0.46,
    };

    const spreadRatio = spreadRatioByCount[count] ?? Screen.clamp(0.78 - count * 0.08, 0.4, 0.72);
    const desiredSpread = availableWidth * spreadRatio;

    const estimatedTargetSize = 512 * targetScale;
    const minSpacing = estimatedTargetSize * (Screen.isPortrait ? 0.52 : 0.62);
    const maxSpacing = estimatedTargetSize * (Screen.isPortrait ? 0.92 : 1.02);

    const spacing =
      count > 1
        ? Screen.clamp(desiredSpread / (count - 1), minSpacing, maxSpacing)
        : 0;

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
