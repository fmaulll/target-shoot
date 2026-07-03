export class BetManager {

    constructor() {

        this.values = [
            10,
            20,
            50,
            100,
            200,
            500,
            1000
        ];

        this.index = 0;

    }

    getValue() {

        return this.values[this.index];

    }

    increase() {

        if (this.index < this.values.length - 1) {

            this.index++;

        }

        return this.getValue();

    }

    decrease() {

        if (this.index > 0) {

            this.index--;

        }

        return this.getValue();

    }

}