export const Difficulty = {

    EASY: {
        targets: 2,
        multiplierTable: [
            1.01,
            1.03,
            1.06,
            1.10,
            1.15,
            1.21,
            1.28,
            1.36,
            1.45,
            1.55
        ]
    },

    MEDIUM: {
        targets: 3,
        multiplierTable: [
            1.08,
            1.21,
            1.37,
            1.56,
            1.79,
            2.06,
            2.38,
            2.75,
            3.18,
            3.68
        ]
    },

    HARD: {
        targets: 4,
        multiplierTable: [
            1.18,
            1.46,
            1.83,
            2.31,
            2.93,
            3.73,
            4.76,
            6.09,
            7.80,
            10.00
        ]
    }

};