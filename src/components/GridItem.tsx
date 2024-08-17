import { CellState, GameTile, Tile } from "../types";

const COLOURS = {
	lowProbabilityTile: "#bfdbfe", // blue-200
	highProbabilityTile: "#1e3a8a", // blue-900
	hitTile: "#dc2626", // red-600
	sunkTile: "#991b1b", // red-800
	missTile: "#4b5563", // gray-600
	maxProbabilityBorder: "#dc2626cc" /* red-600/80 */,
};

interface TileData {
	background: string;
	border?: string;
	title: string;
	buttons: { icon: any; convertState: CellState }[];
}

// Get the data for a game tile depending on its state
function getGameTileData(tile: GameTile): TileData {
	// unknown
	// - miss `IconRipple`
	// - hit `IconFocus` / `IconFocus2`

	// miss
	// - undo `IconArrowBackUp`

	// hit
	// - sunk `IconCaretDownFilled` / `IconArrowDown`
	// - undo `IconArrowBackUp`

	// sunk
	// - undo `IconArrowBackUp`

	// switch (tile.state) {
	// 	case "unknown":
	// 		// If it is unknown then create a gradient between low and high probability
	// 		return colourLerpHex(COLOURS.lowProbabilityTile, COLOURS.highProbabilityTile, tile.probability);
	// 	case "hit":
	// 		return COLOURS.hitTile;
	// 	case "miss":
	// 		return COLOURS.missTile;
	// 	case "sunk":
	// 		return COLOURS.sunkTile;
	// }

	return { background: "#000000", title: "hi", buttons: [] };
}

// Component to display the inner of a tile which is type game
function BoardGridItem({ gameTile }: { gameTile: GameTile }) {
	let tileData: TileData = getGameTileData(gameTile);

	return (
		<div
			className="h-full"
			style={{
				backgroundColor: tileData.background,
				border: tileData.border ?? "none",
			}}
		>
			{tileData.title}
		</div>
	);
}

// Component to display a board tile
export default function GridItem({ tile }: { tile: Tile }) {
	return (
		<div className="size-16 rounded overflow-hidden">
			{tile.type == "label" ? (
				<div className="bg-gray-700 flex items-center justify-center h-full text-xl">{tile.text}</div>
			) : (
				<BoardGridItem gameTile={tile} />
			)}
		</div>
	);
}
