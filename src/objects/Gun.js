import { Container, Sprite } from "pixi.js";
import { Screen } from "../utils/Screen";

export class Gun extends Container {

    constructor() {

        super();

        this.sprite = Sprite.from("gun");

        // Bottom-center of the gun
        this.sprite.anchor.set(0.5, 0.6);

        this.sprite.scale.set(0.5);

        this.addChild(this.sprite);

    }

    setResponsiveScale() {
        const baseScale = Screen.shortEdge / 900 * 0.5;
        const scale = Screen.isPortrait
            ? Screen.clamp(baseScale * 0.62, 0.18, 0.34)
            : Screen.clamp(baseScale, 0.34, 0.62);

        this.sprite.scale.set(scale);
    }

}