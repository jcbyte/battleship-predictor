import { colourLerp } from "../scripts/utils";
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
			return colourLerp(COLOURS.lowProbabilityTile, COLOURS.highProbabilityTile, tile.probability);
		case "hit":
			return COLOURS.hitTile;
		case "miss":
			return COLOURS.missTile;
		case "sunk":
			return COLOURS.sunkTile;
	}
}

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

// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
// import UndoIcon from "@mui/icons-material/Undo";
// import WavesIcon from "@mui/icons-material/Waves";

// 	} else if (tile.type == "game") {
// 		var text = { unknown: "Unknown", hit: "Hit", sunk: "Sunk", miss: "Miss" }[thisTile.data.state];
// 		boxContent = (
// 			<>
// 				<Box sx={{ display: "flex", flexDirection: "column", height: "90px" }}>
// 					<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
// 						<Typography>{text}</Typography>
// 					</Box>
// 					<Box sx={{ display: "flex", justifyContent: "center" }}>
// 						{thisTile.data.state == "unknown" ? (
// 							<>
// 								<IconButton
// 									size="small"
// 									onClick={() => {
// 										updateTileState(thisTile.data.x, thisTile.data.y, "hit");
// 									}}
// 								>
// 									<DirectionsBoatIcon />
// 								</IconButton>
// 								<IconButton
// 									size="small"
// 									onClick={() => {
// 										updateTileState(thisTile.data.x, thisTile.data.y, "miss");
// 									}}
// 								>
// 									<WavesIcon />
// 								</IconButton>
// 							</>
// 						) : (
// 							<>
// 								{thisTile.data.state == "miss" ? (
// 									<></>
// 								) : thisTile.data.state == "hit" ? (
// 									<IconButton
// 										size="small"
// 										onClick={() => {
// 											updateTileState(thisTile.data.x, thisTile.data.y, "sunk");
// 										}}
// 									>
// 										<ArrowDownwardIcon />
// 									</IconButton>
// 								) : (
// 									<IconButton
// 										size="small"
// 										onClick={() => {
// 											updateTileState(thisTile.data.x, thisTile.data.y, "hit");
// 										}}
// 									>
// 										<ArrowUpwardIcon />
// 									</IconButton>
// 								)}
// 								<IconButton
// 									size="small"
// 									onClick={() => {
// 										updateTileState(thisTile.data.x, thisTile.data.y, "unknown");
// 									}}
// 								>
// 									<UndoIcon />
// 								</IconButton>
// 							</>
// 						)}
// 					</Box>
// 				</Box>
// 			</>
// 		);
// 	}
