import { Container, Sprite } from "pixi.js";
import { Screen } from "../utils/Screen";

export class Crosshair extends Container {

    constructor() {

        super();

        this.sprite = Sprite.from("crosshair");

        this.eventMode = "none";

        this.sprite.anchor.set(0.5);

        this.sprite.scale.set(0.025);

        this.addChild(this.sprite);

    }

    setResponsiveScale() {
        const scale = Screen.clamp(Screen.shortEdge / 900 * 0.025, 0.018, 0.035);

        this.sprite.scale.set(scale);
    }

}