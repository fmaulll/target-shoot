import { Assets } from "pixi.js";

export class AssetManager {
  static async load() {
    Assets.add({
      alias: "target",
      src: "/images/Target.png",
    });

    Assets.add({
      alias: "background",
      src: "/images/Background.png",
    });

    Assets.add({
      alias: "gun",
      src: "/images/Gun.png",
    });

    Assets.add({
      alias: "crosshair",
      src: "/images/Crosshair.png",
    });

    await Assets.load(["background", "target", "gun", "crosshair"]);
  }
}
