import { Container, Sprite } from "pixi.js";

export class Gun extends Container {

    constructor() {

        super();

        this.sprite = Sprite.from("gun");

        // Bottom-center of the gun
        this.sprite.anchor.set(0.5, 0.6);

        this.sprite.scale.set(0.5);

        this.addChild(this.sprite);

    }

}