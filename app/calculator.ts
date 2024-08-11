import { BOARD_SIZE, HIT_MULTIPLIER } from "./static";
import { CellData2, Ship2 } from "./types";

// Calculate the "probabilities" of a ship being in this location
export function calculateProbabilities(board: CellData2[][], ships: Ship2[]) {
	// The value represents 1 for each possible tile in a possible boats position and
	// a `HIT_MULTIPLIER` for each hit tile in a possible boats position
	// ...
	// ---------------
	// | | | |C| | | |
	// ---------------
	// | |C|C|X|C|C| |
	// ---------------
	// | | | |C| | | |
	// ---------------
	// ...
	// If we are checking the tile at X each of the C values will be checked and added to value respectively.
	// This means that even if we know there is not a boat in-between an X and a C the C will still be
	// checked - This may cause issues so i am documenting it here.
	let values: number[][] = [...Array(BOARD_SIZE)].map(() => {
		return [...Array(BOARD_SIZE)].map(() => {
			return 0;
		});
	});
	let maxValue: number = 0;

	// Calculate the value of every tile on the board
	for (let x = 0; x < BOARD_SIZE; x++) {
		for (let y = 0; y < BOARD_SIZE; y++) {
			let thisValue = 0;
			// The value only matters if the tile is in unknown state
			if (board[x][y].state == "unknown") {
				// For each un-sunk ship check every possible location involving this tile
				ships
					.filter((ship) => !ship.sunk)
					.forEach((ship) => {
						// Add all possible connecting tile
						let possibleCells: CellData2[] = [];
						for (let i = -ship.length; i < ship.length; i++) {
							// Do not include itself
							if (i == 0) continue;

							let newX = x - i;
							if (newX >= 0 && newX < BOARD_SIZE) possibleCells.push(board[newX][y]);
							let newY = y - i;
							if (newY >= 0 && newY < BOARD_SIZE) possibleCells.push(board[x][newY]);
						}

						// Calculate the value of this tile from the possible boat tiles
						thisValue = possibleCells
							.map((tile) => {
								if (tile.state == "unknown") return 1;
								if (tile.state == "hit") return HIT_MULTIPLIER;
								return 0;
							})
							.reduce((partialSum, a) => partialSum + a);
					});

				if (thisValue > maxValue) maxValue = thisValue;
				values[x][y] = thisValue;
			}
		}
	}

	// Create new board with updated probabilities
	let newBoard: CellData2[][] = [...Array(BOARD_SIZE)].map((item, x) => {
		return [...Array(BOARD_SIZE)].map((item, y) => {
			return { ...board[x][y], probability: values[x][y] / maxValue };
		});
	});

	return maxValue;
}
