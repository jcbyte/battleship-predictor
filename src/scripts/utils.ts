import { BOARD_SIZE } from "../static";

// Function to return a fresh blank board of some initial data
export function getNewBoard<T>(initial: T): T[][] {
	return [...Array(BOARD_SIZE)].map((item, x) => {
		return [...Array(BOARD_SIZE)].map(() => {
			return initial;
		});
	});
}

export function factorial(n: number): number {
	return n <= 1 ? 1 : n * factorial(n - 1);
}
