import { Container, Sprite } from "pixi.js";

export class Crosshair extends Container {

    constructor() {

        super();

        this.sprite = Sprite.from("crosshair");

        this.eventMode = "none";

        this.sprite.anchor.set(0.5);

        this.sprite.scale.set(0.025);

        this.addChild(this.sprite);

    }

}