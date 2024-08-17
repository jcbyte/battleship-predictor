import { colourLerpHex } from "../scripts/colorUtils";
import { CellState, GameTile, Tile } from "../types";

import { IconArrowBackUp, IconCaretDownFilled, IconFocus, IconRipple } from "@tabler/icons-react";

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
	let tileData: TileData = { background: "#000000", title: "Error", buttons: [] };

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

	// ? Could this be a map instead of function with switch case?

	switch (tile.state) {
		case "unknown":
			tileData.title = "Unknown";
			// If it is unknown then create a gradient between low and high probability
			tileData.background = colourLerpHex(COLOURS.lowProbabilityTile, COLOURS.highProbabilityTile, tile.probability);
			if (tile.probability == 1) tileData.border = `2px solid ${COLOURS.maxProbabilityBorder}`;
			tileData.buttons = [
				{ icon: IconRipple, convertState: "miss" },
				{ icon: IconFocus, convertState: "hit" },
			];
			break;

		case "miss":
			tileData.title = "Miss";
			tileData.background = COLOURS.missTile;
			tileData.buttons = [{ icon: IconArrowBackUp, convertState: "unknown" }];
			break;

		case "hit":
			tileData.title = "Hit";
			tileData.background = COLOURS.hitTile;
			tileData.buttons = [
				{ icon: IconCaretDownFilled, convertState: "sunk" },
				{ icon: IconArrowBackUp, convertState: "unknown" },
			];
			break;

		case "sunk":
			tileData.title = "Sunk";
			tileData.background = COLOURS.sunkTile;
			tileData.buttons = [{ icon: IconArrowBackUp, convertState: "miss" }];

			break;
	}

	return tileData;
}

// Component to display the inner of a tile which is type game
function BoardGridItem({ gameTile }: { gameTile: GameTile }) {
	let tileData: TileData = getGameTileData(gameTile);

	return (
		<div
			className="h-full flex flex-col items-center justify-center gap-2"
			style={{
				backgroundColor: tileData.background,
				border: tileData.border ?? "none",
			}}
		>
			<div className="text-md">{tileData.title}</div>
			<div className="flex gap-1">
				{tileData.buttons.map((buttonData) => {
					// TODO give these icon buttons labels
					return (
						<div
							className="iconButton"
							onClick={() => {
								console.log("ujhs");
							}}
						>
							<buttonData.icon />
						</div>
					);
				})}
			</div>
		</div>
	);
}

// Component to display a board tile
export default function GridItem({ tile }: { tile: Tile }) {
	return (
		<div className="size-20 rounded overflow-hidden">
			{tile.type == "label" ? (
				<div className="bg-gray-700 flex items-center justify-center h-full text-xl">{tile.text}</div>
			) : (
				<BoardGridItem gameTile={tile} />
			)}
		</div>
	);
}
