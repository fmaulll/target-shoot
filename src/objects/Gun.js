import { AnimatedSprite, Assets, Container, Sprite } from "pixi.js";
import { Screen } from "../utils/Screen";

export class Gun extends Container {
    constructor() {
        super();

        const idleTextures = this.buildIdleTextures();

        // this.idleSprite = new AnimatedSprite(idleTextures.length > 0 ? idleTextures : [Sprite.from("gun").texture]);
        this.idleSprite = Sprite.from("gunIdleNoMovement");
        this.shootSprite = Sprite.from("gun");

        // Bottom-center of the gun
        this.idleSprite.anchor.set(0.5, 0.6);
        this.shootSprite.anchor.set(0.5, 0.6);

        // this.idleSprite.animationSpeed = 0.08;
        this.idleOffsetX = 0;

        this.shootTextureSize = this.getTextureSize(this.shootSprite.texture);
        // this.idleTextureSize = this.getTextureSize(this.idleSprite.textures[0] ?? this.idleSprite.texture);

        // Keep both modes visually consistent even when source dimensions differ.
        // const idleMatchByHeight = this.shootTextureSize.height / this.idleTextureSize.height;
        // this.idleScaleMultiplier = Screen.clamp(idleMatchByHeight, 1, 3);

        this.addChild(this.idleSprite);
        this.addChild(this.shootSprite);

        this.setIdle();
        this.setResponsiveScale();
    }

    buildIdleTextures() {
        const idleSheet = Assets.get("gunIdleSheet");

        if (!idleSheet || !idleSheet.textures) {
            return [];
        }

        return Object.keys(idleSheet.textures)
            .sort((a, b) => this.extractFrameNumber(a) - this.extractFrameNumber(b))
            .map((name) => idleSheet.textures[name]);
    }

    extractFrameNumber(name) {
        const match = name.match(/(\d+)/);

        return match ? Number(match[1]) : 0;
    }

    getTextureSize(texture) {
        const width = texture?.orig?.width ?? texture?.width ?? 1;
        const height = texture?.orig?.height ?? texture?.height ?? 1;

        return {
            width: Math.max(1, width),
            height: Math.max(1, height),
        };
    }

    setIdle() {
        this.idleSprite.visible = true;
        this.shootSprite.visible = false;

        this.idleSprite.x = this.idleOffsetX;
        this.shootSprite.x = 0;

        // if (!this.idleSprite.playing) {
        //     this.idleSprite.play();
        // }
    }

    setShooting() {
        this.idleSprite.visible = false;
        this.shootSprite.visible = true;

        this.shootSprite.x = 0;

        if (this.idleSprite.playing) {
            this.idleSprite.stop();
        }
    }

    setResponsiveScale() {
        const baseScale = Screen.shortEdge / 900 * 0.5;
        const scale = Screen.isPortrait
            ? Screen.clamp(baseScale * 0.62, 0.18, 0.34)
            : Screen.clamp(baseScale, 0.34, 0.62);

        const shootScale = scale;
        const idleScale = scale * this.idleScaleMultiplier;

        this.shootSprite.scale.set(scale);
        this.idleSprite.scale.set(scale);

        this.idleOffsetX = Screen.clamp(Screen.width * 0.02, 16, 34);

        if (this.idleSprite.visible) {
            this.idleSprite.x = this.idleOffsetX;
        }
    }
}
