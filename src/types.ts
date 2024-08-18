export type CellState = "unknown" | "hit" | "miss" | "sunk";

export interface Ship {
	sunk: boolean;
	length: number;
}
