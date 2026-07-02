import { LocalResultProvider } from "../game/LocalResultProvider";

export class RoundManager {

    constructor() {

        this.provider = new LocalResultProvider();

        this.streak = 0;

        this.difficulty = null;

    }

    start(difficulty) {

        this.difficulty = difficulty;

    }

    shoot(targetId) {

        const result = this.provider.getResult(

            this.difficulty,

            this.streak,

            targetId

        );

        if(result.win){

            this.streak++;

        }else{

            this.streak = 0;

        }

        result.streak = this.streak;

        result.multiplier = this.getMultiplier();

        return result;

    }

    getMultiplier(){

        const index = Math.min(

            this.streak - 1,

            this.difficulty.multiplierTable.length - 1

        );

        return this.difficulty.multiplierTable[index];

    }

}