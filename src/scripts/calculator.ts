import { BOARD_SIZE } from "../static";
import { CellState, Ship } from "../types";
import { factorial, getNewBoard } from "./utils";

// Function to return how the number of hits on a ship affects the heatmap
function hitsScaling(hits: number): number {
	// If 0 then there is still a valid ship so there should be 1
	if (hits == 0) {
		return 1;
	}

	// This function is to increase the value for hits and adjacent hits
	// If the hits calculations don't seem right this function should be edited
	return factorial(hits * 2);
}

// Function to check if a ship placement is valid, if so return the number of hits along it
function isShipValid(
	board: CellState[][],
	row: number,
	col: number,
	length: number,
	direction: "horizontal" | "vertical"
): { valid: false } | { valid: true; hits: number } {
	// If ship goes off the edge of the board it is not valid
	if (direction == "horizontal") {
		if (col + length > BOARD_SIZE) {
			return { valid: false };
		}
	} else {
		if (row + length > BOARD_SIZE) {
			return { valid: false };
		}
	}

	let hits: number = 0;

	// Go through each tile the ship is on
	for (let shipPart = 0; shipPart < length; shipPart++) {
		let shipPartState = direction == "horizontal" ? board[row][col + shipPart] : board[row + shipPart][col];
		// If any are invalid then the ship placement is invalid
		if (shipPartState == "miss" || shipPartState == "sunk") {
			return { valid: false };
		}
		// If any are hits then keep a record of this
		else if (shipPartState == "hit") {
			hits++;
		}
	}

	// If all tiles are valid then this ship placement is valid
	return { valid: true, hits: hits };
}

// Increase all values on heatmap underneath a ship by a specified amount
// This will only increase tiles marked as unknown as there are the only tiles affected by the heatmap
// There is no error checking as we assume this has already been done
function incrementShipHeatmap(
	board: CellState[][],
	heatmap: number[][],
	value: number,
	row: number,
	col: number,
	length: number,
	direction: "horizontal" | "vertical"
) {
	for (let shipPart = 0; shipPart < length; shipPart++) {
		// Calculate the tile position based on if the ship is horizontal or vertical
		let tilePosition: { row: number; col: number } =
			direction == "horizontal" ? { row: row, col: col + shipPart } : { row: row + shipPart, col: col };
		if (board[tilePosition.row][tilePosition.col] == "unknown") {
			heatmap[tilePosition.row][tilePosition.col] += value;
		}
	}
}

// Calculate the probability of a ship being at any location on the board
export function calculateProbabilities(board: CellState[][], ships: Ship[]): number[][] {
	// Get the list of all remaining un-sunk ships
	let remainingShips: Ship[] = ships.filter((ship: Ship) => !ship.sunk);
	// If every ship has been sunk all probabilities are 0
	if (remainingShips.length === 0) {
		return getNewBoard(0);
	}

	// We consider each possible horizontal and vertical placement for every ship that has not been sunk.
	// For each potential placement, we check if the cells are valid (i.e., not marked as "miss" or "sunk").
	// If the placement is valid, the values for all the corresponding cells that ship would cover are incremented.
	// The increment is based on the number of hits the possible placement has so we can target known locations.
	// After calculating all the values, they are normalized by dividing by the highest score.

	let heatmap: number[][] = getNewBoard(0);

	// Iterate over each remaining ship
	remainingShips.forEach((ship: Ship) => {
		// Iterate over tile on the board
		for (let row = 0; row < BOARD_SIZE; row++) {
			for (let col = 0; col < BOARD_SIZE; col++) {
				// If the ship would fit horizontally then increment each of the possible tiles
				let horizontal = isShipValid(board, row, col, ship.length, "horizontal");
				if (horizontal.valid) {
					incrementShipHeatmap(board, heatmap, hitsScaling(horizontal.hits), row, col, ship.length, "horizontal");
				}

				// If the ship would fit vertically then increment each of the possible tiles
				let vertical = isShipValid(board, row, col, ship.length, "vertical");
				if (vertical.valid) {
					incrementShipHeatmap(board, heatmap, hitsScaling(vertical.hits), row, col, ship.length, "vertical");
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
