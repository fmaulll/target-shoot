import { GAME_WIDTH, GAME_HEIGHT } from "./GameConfig";

export class Screen {

    static get width() {
        return GAME_WIDTH;
    }

    static get height() {
        return GAME_HEIGHT;
    }

    static get centerX() {
        return GAME_WIDTH / 2;
    }

    static get centerY() {
        return GAME_HEIGHT / 2;
    }

}