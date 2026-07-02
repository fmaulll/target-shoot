import { ResultProvider } from "./ResultProvider";

export class LocalResultProvider {
  getResult(difficulty, streak, selectedTarget) {
    const probabilities = {
      2: [95, 90, 85, 75, 60, 45, 35],

      3: [80, 70, 60, 50, 40, 30],

      4: [65, 50, 35, 25],
    };

    const table = probabilities[difficulty.targets];

    const chance = table[Math.min(streak, table.length - 1)];

    const roll = Math.random() * 100;

    const win = roll <= chance;

    let winningTarget;

    if (win) {
      winningTarget = selectedTarget;
    } else {
      do {
        winningTarget = Math.floor(Math.random() * difficulty.targets);
      } while (winningTarget === selectedTarget);
    }

    return {
      win,

      winningTarget,
    };
  }
}
