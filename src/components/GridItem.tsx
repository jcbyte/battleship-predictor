import { CellState, GameTile, Tile } from "../types";

import { IconArrowBackUp, IconCaretDownFilled, IconFocus2, IconRipple } from "@tabler/icons-react";
import IconButton from "./generic/IconButton";

interface ButtonData {
	icon: React.ReactNode;
	label: string;
	convertTo: CellState;
}

interface TileData {
	background: string;
	border?: string;
	title: string;
	buttons: ButtonData[];
}

// TODO live function in map for unknowns
// tileData.background = colourLerpHex(COLOURS.lowProbabilityTile, COLOURS.highProbabilityTile, tile.probability);
// if (tile.probability == 1) tileData.border = `2px solid ${COLOURS.maxProbabilityBorder}`;
// lowProbabilityTile: "#bfdbfe", // blue-200
// highProbabilityTile: "#1e3a8a", // blue-900
// maxProbabilityBorder: "#dc2626cc", // red-600/80

// The data for a game tile depending on its state
const GAME_TILE_DATA: Record<CellState, TileData> = {
	unknown: {
		title: "Unknown",
		background: "#000000",
		buttons: [
			{ icon: <IconRipple />, label: "Miss", convertTo: "miss" },
			{ icon: <IconFocus2 />, label: "Hit", convertTo: "hit" },
		],
	},
	miss: {
		title: "Miss",
		background: "#4b5563", // gray-600
		buttons: [{ icon: <IconArrowBackUp />, label: "Undo", convertTo: "unknown" }],
	},
	hit: {
		title: "Hit",
		background: "#dc2626", // red-600
		buttons: [
			{ icon: <IconCaretDownFilled />, label: "Sunk", convertTo: "sunk" },
			{ icon: <IconArrowBackUp />, label: "Undo", convertTo: "unknown" },
		],
	},
	sunk: {
		title: "Sunk",
		background: "#991b1b", // red-800
		buttons: [{ icon: <IconArrowBackUp />, label: "Undo", convertTo: "hit" }],
	},
};

// Component to display the inner of a tile which is type game
function BoardGridItem({ gameTile, setTileState }: { gameTile: GameTile; setTileState: (state: CellState) => void }) {
	let tileData: TileData = GAME_TILE_DATA[gameTile.state];

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
				{tileData.buttons.map((buttonData, i) => {
					return (
						<IconButton
							key={i}
							icon={buttonData.icon}
							label={buttonData.label}
							onClick={() => {
								setTileState(buttonData.convertTo);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

// Component to display a board tile
export default function GridItem({
	tile,
	setTileState = () => {},
}: {
	tile: Tile;
	setTileState?: (state: CellState) => void;
}) {
	return (
		<div className="size-20 rounded overflow-hidden">
			{tile.type == "label" ? (
				<div className="bg-gray-700 flex items-center justify-center h-full text-xl">{tile.text}</div>
			) : (
				<BoardGridItem gameTile={tile} setTileState={setTileState} />
			)}
		</div>
	);
}
