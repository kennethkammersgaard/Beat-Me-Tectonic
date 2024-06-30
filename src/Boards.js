export const BOARDS = {
  easy: [
    {
      initial: [
        [0, 0, 0, 0],
        [3, 0, 0, 5],
        [0, 0, 3, 2],
        [5, 0, 0, 0],
        [0, 0, 0, 4],
      ],
      end: [
        [1, 2, 3, 4],
        [3, 4, 1, 5],
        [1, 2, 3, 2],
        [5, 4, 5, 1],
        [3, 1, 2, 4],
      ],
      areas: [
        ["A", "A", "B", "B"],
        ["A", "A", "B", "B"],
        ["C", "C", "D", "B"],
        ["C", "C", "D", "D"],
        ["C", "E", "D", "D"],
      ],
    },
    // Add more easy boards here
  ],
  medium: [
    {
      initial: [
        [0, 1, 0, 0, 2],
        [0, 0, 0, 0, 0],
        [0, 5, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 2, 0, 0],
      ],
      end: [
        // Add the end state for this board
      ],
      areas: [
        ["A", "A", "A", "A", "B"],
        ["A", "C", "C", "B", "B"],
        ["C", "C", "D", "B", "B"],
        ["C", "D", "D", "D", "F"],
        ["E", "E", "D", "F", "F"],
      ],
    },
    // Add more medium boards here
  ],
  hard: [
    // Add hard boards here
  ],
};
