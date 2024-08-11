export interface CellData {
	state: "unknown" | "hit" | "miss" | "sunk";
	probability: number;
	x: number;
	y: number;
}

export interface GameTile {
	type: "game";
	data: CellData;
}

export interface LabelTile {
	type: "label";
	text: string;
}

export interface Ship {
	length: number;
}

export interface BoardShip extends Ship {
	sunk: boolean;
}

export interface Ship2 {
	sunk: boolean;
	length: number;
}

export type Tile = GameTile | LabelTile;

export interface CellData2 {
	state: "unknown" | "hit" | "miss" | "sunk";
	probability: number;
}

export type Tile2 = { type: "game" | "label" } & (({ type: "game" } & CellData2) | { type: "label"; text: string });
