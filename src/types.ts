export type CellState = "unknown" | "hit" | "miss" | "sunk";

export type GameTile = { type: "game" } & { state: CellState; probability: number };
export type LabelTile = { type: "label"; text: string };
export type Tile = GameTile | LabelTile;

export interface Ship {
	sunk: boolean;
	length: number;
}
