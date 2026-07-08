export class LocalResultProvider {
  getResult(difficulty, streak, selectedTarget) {
    const probabilities = {
      // EASY (2 Targets): Starts safe, slowly transitions to a 40% coin-flip floor.
      2: [
        95, 95, 95, 95, 92, 92, 88, 85, 81, 78, 74, 70, 66, 62, 58, 55, 52, 49,
        46, 44, 42, 41, 40, 40, 40, 40, 40, 40, 40, 40,
      ],

      // MEDIUM (3 Targets): Steeper drop, forcing players into a risky 25% zone by mid-game.
      3: [
        80, 75, 70, 65, 60, 55, 50, 46, 42, 38, 35, 32, 29, 27, 25, 25, 25, 25,
        24, 24, 23, 23, 22, 22, 21, 21, 20, 20, 20, 20,
      ],

      // HARD (4 Targets): Heavy early drops. Only extreme risk-takers survive past step 10 into the 10% floor.
      4: [
        65, 58, 51, 45, 39, 34, 30, 26, 22, 19, 17, 15, 13, 12, 11, 10, 10, 10,
        10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5,
      ],
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
