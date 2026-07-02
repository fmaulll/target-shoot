export class GameData {
  constructor() {
    this.balance = 1000;

    this.bet = 10;

    this.currentWin = 0;
  }

  canPlay() {
    return this.balance >= this.bet;
  }

  placeBet() {
    this.balance -= this.bet;
  }

  calculateWin(multiplier) {
    this.currentWin = this.bet * multiplier;
  }

  collect() {
    this.balance += this.currentWin;

    this.currentWin = 0;
  }
}
