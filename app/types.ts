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

export type Tile = GameTile | LabelTile;
