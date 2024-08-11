import { Ship } from "./types";

export const COLUMN_IDENTIFIERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const ROW_IDENTIFIERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export const BOARD_SIZE = 10;

export const TILE_COLOURS = {
	label: "#60278B",
	lowProbability: "#8B6027",
	highProbability: "#8B2E27",
	maxProbability: "#8b2745",
	hit: "#528B27",
	sunk: "#278B2E",
	miss: "#278B60",
};
export const STARTING_SHIPS: Ship[] = [{ length: 5 }, { length: 4 }, { length: 3 }, { length: 3 }, { length: 2 }];

export const HIT_MULTIPLIER = 20;
