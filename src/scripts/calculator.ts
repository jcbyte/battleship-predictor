import { BOARD_SIZE } from "../static";
import { CellState, Ship } from "../types";
import { getNewBoard } from "./utils";

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
				// Check if the ship would fit horizontally
				if (col + ship.length <= BOARD_SIZE) {
					let shipValid: boolean = true;
					// If any tiles the ship is on would cause it to be invalid mark it
					for (let shipPart = 0; shipPart < ship.length; shipPart++) {
						let shipPartState = board[row][col + shipPart];
						if (shipPartState === "miss" || shipPartState === "sunk") {
							shipValid = false;
							break;
						}
					}
					// If no mark was made then the ship can be placed so increment each of the possible tiles
					if (shipValid) {
						for (let shipPart = 0; shipPart < ship.length; shipPart++) {
							heatmap[row][col + shipPart]++;
						}
					}
				}

				// Check if the ship would fit vertically
				if (row + ship.length <= BOARD_SIZE) {
					let shipValid: boolean = true;
					// If any tiles the ship is on would cause it to be invalid mark it
					for (let shipPart = 0; shipPart < ship.length; shipPart++) {
						let shipPartState = board[row + shipPart][col];
						if (shipPartState === "miss" || shipPartState === "sunk") {
							shipValid = false;
							break;
						}
					}
					// If no mark was made then the ship can be placed so increment each of the possible tiles
					if (shipValid) {
						for (let shipPart = 0; shipPart < ship.length; shipPart++) {
							heatmap[row + shipPart][col]++;
						}
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
