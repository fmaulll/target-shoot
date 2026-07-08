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
        const scale = Screen.clamp(Screen.shortEdge / 900 * 0.5, 0.34, 0.62);

        this.sprite.scale.set(scale);
    }

}