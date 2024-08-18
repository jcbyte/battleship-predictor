import { IconArrowBackUp, IconCaretDownFilled, IconFocus2, IconRipple } from "@tabler/icons-react";
import { colourLerpHex } from "../scripts/colorUtils";
import { CellState } from "../types";
import IconButton from "./generic/IconButton";
import GridItem from "./GridItem";

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

// The data for a game tile depending on its state, the this can either give a value or a function which takes the probability and then returns
const GAME_TILE_DATA: Record<
	CellState,
	{ [K in keyof TileData]: TileData[K] | ((probability: number) => TileData[K]) }
> = {
	unknown: {
		title: "Unknown",
		// Create a gradient between low and high probability
		background: (probability) => {
			return colourLerpHex("#bfdbfe", /* blue-200 */ "#1e3a8a", /* blue-900 */ probability);
		},
		// Show a border around the highest probability tiles
		border: (probability) => {
			return probability === 1 ? `2px solid #dc2626cc` /* red-600/80 */ : undefined;
		},
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

// Component to display the inner of a board tile
export default function BoardTile({
	state,
	probability,
	setState,
}: {
	state: CellState;
	probability: number;
	setState: (state: CellState) => void;
}) {
	// Get the tile data for this tile
	let tileData: TileData = {
		// If any parameters are lost then these will be used
		title: "Error",
		background: "#ff00ff",
		buttons: [],
		// Get the data from the map defined above
		...Object.fromEntries(
			Object.entries(GAME_TILE_DATA[state]).map(([key, value]) => {
				// If the entry is a function then call it and turn it into a real value
				return [key, typeof value === "function" ? value(probability) : value];
			})
		),
	};

	return (
		<GridItem>
			<div
				className="h-full flex flex-col items-center justify-center gap-2"
				style={{
					backgroundColor: tileData.background,
					border: tileData.border ?? "none",
				}}
			>
				<div className="text-md">{tileData.title}</div>
				<div className="flex gap-1">
					{tileData.buttons.map((buttonData: ButtonData, i: number) => {
						return (
							<IconButton
								key={i}
								icon={buttonData.icon}
								label={buttonData.label}
								onClick={() => {
									setState(buttonData.convertTo);
								}}
							/>
						);
					})}
				</div>
			</div>
		</GridItem>
	);
}
