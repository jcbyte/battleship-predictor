export interface CellData {
	state: "unknown" | "hit" | "miss" | "sunk";
	probability: number;
}

export type Tile = { type: "game" | "label" } & (({ type: "game" } & CellData) | { type: "label"; text: string });

export interface Ship {
	sunk: boolean;
	length: number;
}
