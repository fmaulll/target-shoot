import { GAME_WIDTH, GAME_HEIGHT } from "./GameConfig";

export class Screen {
    static _virtualWidth = GAME_WIDTH;

    static _virtualHeight = GAME_HEIGHT;

    static _viewportWidth = GAME_WIDTH;

    static _viewportHeight = GAME_HEIGHT;

    static _scale = 1;

    static setViewport(viewportWidth, viewportHeight, scale = 1) {
        this._viewportWidth = viewportWidth;
        this._viewportHeight = viewportHeight;
        this._scale = scale;
    }

    static setVirtualSize(width, height) {
        this._virtualWidth = width;
        this._virtualHeight = height;
    }

    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    static get viewportWidth() {
        return this._viewportWidth;
    }

    static get viewportHeight() {
        return this._viewportHeight;
    }

    static get scale() {
        return this._scale;
    }

    static get isMobile() {
        return this._virtualHeight > this._virtualWidth;
    }

    static get isPortrait() {
        return this._virtualHeight > this._virtualWidth;
    }

    static get shortEdge() {
        return Math.min(this._virtualWidth, this._virtualHeight);
    }

    static get longEdge() {
        return Math.max(this._virtualWidth, this._virtualHeight);
    }

    static get aspectRatio() {
        return this._virtualWidth / this._virtualHeight;
    }

    static get uiScale() {
        return this.clamp(this.shortEdge / 900, 0.72, 1.2);
    }

    static get horizontalPadding() {
        return Math.round(this.clamp(this._virtualWidth * 0.015, 8, 28));
    }

    static get width() {
        return this._virtualWidth;
    }

    static get height() {
        return this._virtualHeight;
    }

    static get centerX() {
        return this._virtualWidth / 2;
    }

    static get centerY() {
        return this._virtualHeight / 2;
    }

}