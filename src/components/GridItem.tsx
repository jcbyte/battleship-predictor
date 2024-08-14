import { colourLerp } from "../scripts/utils";
import { TILE_COLOURS } from "../static";
import { Tile } from "../types";

export default function GridItem({ tile }: { tile: Tile }) {
	return (
		<div
			className="size-16 rounded"
			style={{
				backgroundColor:
					tile.type == "label"
						? TILE_COLOURS["label"]
						: colourLerp(TILE_COLOURS.lowProbability, TILE_COLOURS.highProbability, tile.probability),
				border: tile.type == "game" && tile.probability == 1 ? "2px solid #dc2626cc" /* red-600/80 */ : "none",
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

// import { Box, IconButton, Typography } from "@mui/material";
// import { TILE_COLOURS } from "./static";
// import { GameTile, Tile } from "./types";
// import { colourLerp } from "./utils";

// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
// import UndoIcon from "@mui/icons-material/Undo";
// import WavesIcon from "@mui/icons-material/Waves";

// export default function GridItem({
// 	tile,
// 	updateTileState,
// 	maxProbability,
// }: {
// 	tile: Tile;
// 	updateTileState: Function;
// 	maxProbability: number;
// }) {
// 	var boxColour = "#ffffff";
// 	var boxContent = <></>;

// 	if (tile.type == "label") {
// 		boxColour = TILE_COLOURS["label"];
// 		boxContent = (
// 			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90px" }}>
// 				<Typography>{tile.text}</Typography>
// 			</Box>
// 		);
// 	} else if (tile.type == "game") {
// 		var thisTile: GameTile = tile as GameTile;
// 		boxColour =
// 			maxProbability > 0 && thisTile.data.probability == maxProbability
// 				? TILE_COLOURS["maxProbability"]
// 				: {
// 						unknown: colourLerp(
// 							TILE_COLOURS["lowProbability"],
// 							TILE_COLOURS["highProbability"],
// 							maxProbability > 0 ? thisTile.data.probability / maxProbability : 0
// 						),
// 						hit: TILE_COLOURS["hit"],
// 						sunk: TILE_COLOURS["sunk"],
// 						miss: TILE_COLOURS["miss"],
// 				  }[thisTile.data.state];
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

// 	return (
// 		<Box
// 			sx={{
// 				backgroundColor: boxColour,
// 				aspectRatio: "1",
// 			}}
// 		>
// 			{boxContent}
// 		</Box>
// 	);
// }
