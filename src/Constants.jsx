import { BOARDS } from "./Boards";

export const INITIAL_BOARD = BOARDS.easy[0].initial;
export const AREAS = BOARDS.easy[0].areas;
export const END_BOARD = BOARDS.easy[0].end;

export const INITIAL_BOARD_ALMOST_FINISHED = BOARDS.easy[1].initial;

export const INITIAL_BOARD_2 = BOARDS.medium[0].initial;
export const AREAS_2 = BOARDS.medium[0].areas;

const BOARD_HEIGHT = BOARDS.easy[0].initial.length;
const BOARD_WIDTH = BOARDS.easy[0].initial[0].length;

export { BOARD_HEIGHT, BOARD_WIDTH };


