import { BOARD_SIZE } from "../static";
import { CellState, Ship } from "../types";
import { getNewBoard } from "./utils";

// ? Can probably split parts of this into separate functions to avoid code duplication
// ? Should we do horizontal and vertical in there own loops so we don't need edge detection

const INVALID_SHIP_STATES: CellState[] = ["miss", "sunk"];

function isHorizontalShipValid(board: CellState[][], row: number, col: number, length: number): boolean {
	// If ship goes off the edge of the board it is not valid
	if (col + length > BOARD_SIZE) {
		return false;
	}

	// If any tiles the ship is on would cause it to be invalid return
	for (let shipPart = 0; shipPart < length; shipPart++) {
		let shipPartState = board[row][col + shipPart];
		if (INVALID_SHIP_STATES.includes(shipPartState)) {
			return false;
		}
	}

	// If all tiles are valid then this ship placement is valid
	return true;
}

function isVerticalShipValid(board: CellState[][], row: number, col: number, length: number): boolean {
	// If ship goes off the edge of the board it is not valid
	if (row + length > BOARD_SIZE) {
		return false;
	}

	// If any tiles the ship is on would cause it to be invalid return
	for (let shipPart = 0; shipPart < length; shipPart++) {
		let shipPartState = board[row + shipPart][col];
		if (INVALID_SHIP_STATES.includes(shipPartState)) {
			return false;
		}
	}

	// If all tiles are valid then this ship placement is valid
	return true;
}

// Calculate the probability of a ship being at any location on the board
export function calculateProbabilities(board: CellState[][], ships: Ship[]): number[][] {
	// Get the list of all remaining un-sunk ships
	let remainingShips: Ship[] = ships.filter((ship: Ship) => !ship.sunk);
	// If every ship has been sunk all probabilities are 0
	if (remainingShips.length === 0) {
		return getNewBoard(0);
	}

	// TODO Target mode (once there has been a hit)

	// We consider each possible horizontal and vertical placement for every ship that has not been sunk.
	// For each potential placement, we check if the cells are valid (i.e., not marked as "miss" or "sunk").
	// If the placement is valid, the values for all the corresponding cells that ship would cover are incremented.
	// After calculating all the values, they are normalized by dividing by the highest score.

	let heatmap: number[][] = getNewBoard(0);

	// Iterate over each remaining ship
	remainingShips.forEach((ship: Ship) => {
		// Iterate over tile on the board
		for (let row = 0; row < BOARD_SIZE; row++) {
			for (let col = 0; col < BOARD_SIZE; col++) {
				// If the ship would fit horizontally then increment each of the possible tiles
				if (isHorizontalShipValid(board, row, col, ship.length)) {
					for (let shipPart = 0; shipPart < ship.length; shipPart++) {
						heatmap[row][col + shipPart]++;
					}
				}

				// If the ship would fit vertically then increment each of the possible tiles
				if (isVerticalShipValid(board, row, col, ship.length)) {
					for (let shipPart = 0; shipPart < ship.length; shipPart++) {
						heatmap[row + shipPart][col]++;
					}
				}
			}
		}
	});

	// Find the highest score in the heatmap
	let highestScore: number = heatmap.reduce(
		(max, row) =>
			Math.max(
				row.reduce((max, current) => Math.max(current, max), 0),
				max
			),
		0
	);

	// Calculate the decimal probabilities from the heatmap
	let probabilities: number[][] = [...Array(BOARD_SIZE)].map((_, row) => {
		return [...Array(BOARD_SIZE)].map((_, col) => {
			return heatmap[row][col] / highestScore;
		});
	});

	return probabilities;
}
