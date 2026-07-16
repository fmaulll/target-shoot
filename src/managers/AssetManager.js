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
      alias: "gunIdleNoMovement",
      src: "/images/Gun_Idle_No_Movement.png",
    });
    Assets.add({
      alias: "gunIdleSheet",
      src: "/images/Gun_Idle.json",
    });

    Assets.add({
      alias: "crosshair",
      src: "/images/Crosshair.png",
    });

    await Assets.load([
      "background",
      "barrelSheet",
      "gun",
      "gunIdleSheet",
      "crosshair",
      "gunIdleNoMovement",
    ]);
  }
}
