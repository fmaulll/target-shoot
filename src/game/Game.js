import { GameplayScene } from "../scenes/GameplayScene";

export class Game {
  constructor(app) {
    this.app = app;
  }

  start() {
    const gameplay = new GameplayScene();

    gameplay.init();

    this.app.stage.addChild(gameplay);

    this.app.ticker.add(() => {
      gameplay.update();
    });
  }
}
