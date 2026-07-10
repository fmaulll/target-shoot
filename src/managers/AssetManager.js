import { Assets } from "pixi.js";

export class AssetManager {
  static async load() {
    Assets.add({
      alias: "barrelSheet",
      src: "/images/Barrel.json",
    });

    Assets.add({
      alias: "background",
      src: "/images/Background-Cowboy.png",
    });

    Assets.add({
      alias: "gun",
      src: "/images/Gun.png",
    });

    Assets.add({
      alias: "crosshair",
      src: "/images/Crosshair.png",
    });

    await Assets.load(["background", "barrelSheet", "gun", "crosshair"]);
  }
}
