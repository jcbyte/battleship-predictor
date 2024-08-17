export type CellState = "unknown" | "hit" | "miss" | "sunk";

export interface CellData {
	state: CellState;
	probability: number;
}

export type GameTile = { type: "game" } & CellData;
export type LabelTile = { type: "label"; text: string };
export type Tile = GameTile | LabelTile;

export interface Ship {
	sunk: boolean;
	length: number;
}
