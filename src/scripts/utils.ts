import { BOARD_SIZE } from "../static";

// Function to return a fresh blank board of some initial data
export function getNewBoard<T>(initial: T): T[][] {
	return [...Array(BOARD_SIZE)].map((item, x) => {
		return [...Array(BOARD_SIZE)].map(() => {
			return initial;
		});
	});
}
