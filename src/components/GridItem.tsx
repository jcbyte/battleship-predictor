import { colourLerpHex } from "../scripts/colorUtils";
import { Tile } from "../types";

const COLOURS = {
	labelTile: "#374151", // gray-700
	lowProbabilityTile: "#bfdbfe", // blue-200
	highProbabilityTile: "#1e3a8a", // blue-900
	hitTile: "#dc2626", // red-600
	sunkTile: "#991b1b", // red-800
	missTile: "#4b5563", // gray-600
	maxProbabilityBorder: "#dc2626cc" /* red-600/80 */,
};

// Get the background colour of the tile depending on its type and state
function getTileColour(tile: Tile): string {
	if (tile.type == "label") {
		return COLOURS.labelTile;
	}

	switch (tile.state) {
		case "unknown":
			// If it is unknown then create a gradient between low and high probability
			return colourLerpHex(COLOURS.lowProbabilityTile, COLOURS.highProbabilityTile, tile.probability);
		case "hit":
			return COLOURS.hitTile;
		case "miss":
			return COLOURS.missTile;
		case "sunk":
			return COLOURS.sunkTile;
	}
}

// TODO control buttons

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

// Component to display a board tile
export default function GridItem({ tile }: { tile: Tile }) {
	return (
		<div
			className="size-16 rounded"
			style={{
				backgroundColor: getTileColour(tile),
				border: tile.type == "game" && tile.probability == 1 ? `2px solid ${COLOURS.maxProbabilityBorder}` : "none",
			}}
		>
			{tile.type == "label" ? (
				<div className="flex items-center justify-center h-full text-xl">{tile.text}</div>
			) : (
				<>{tile.probability.toFixed(2)}</>
			)}
		</div>
	);
}

// ! FROM app.tsx
// 	function updateTileState(x: number, y: number, state: CellData["state"]) {
// 		var newBoard = [...board];
// 		newBoard[x][y].state = state;

// 		if (autoUpdateProbabilities) calculateProbabilities(newBoard);
// 		else setBoard(newBoard);
// 	}
