"use client";

import { Box, IconButton, Typography } from "@mui/material";

import { PropsWithChildren, useState } from "react";

import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import UndoIcon from "@mui/icons-material/Undo";
import WavesIcon from "@mui/icons-material/Waves";

interface CellData {
	state: "unknown" | "hit" | "miss";
	probability: number;
	x: number;
	y: number;
}

interface GameTile {
	type: "game";
	data: CellData;
}

interface LabelTile {
	type: "label";
	text: string;
}

type Tile = GameTile | LabelTile;

const BOARD_SIZE = 10;
const TILE_COLOURS = {
	label: "#dbcdf0",
	lowProbability: "#faedcb",
	highProbability: "#f2c6de",
	hit: "#c9e4de",
	miss: "#c6def1",
};

export const GridItem = (props: PropsWithChildren<{ tile: Tile; updateTileState: Function }>) => {
	var boxColour = "#ffffff";
	var boxContent = <></>;

	if (props.tile.type == "label") {
		boxColour = TILE_COLOURS["label"];
		boxContent = <>{props.tile.text}</>;
	} else if (props.tile.type == "game") {
		var tile: GameTile = props.tile as GameTile;
		boxColour = { unknown: TILE_COLOURS["highProbability"], hit: TILE_COLOURS["hit"], miss: TILE_COLOURS["miss"] }[
			tile.data.state
		];
		var text = { unknown: "Unknown", hit: "Hit", miss: "Miss" }[tile.data.state];
		boxContent = (
			<>
				<Box sx={{ display: "flex", flexDirection: "column", height: "90px" }}>
					<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Typography>{text}</Typography>
					</Box>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						{tile.data.state == "unknown" ? (
							<>
								<IconButton
									size="small"
									onClick={() => {
										props.updateTileState(tile.data.x, tile.data.y, "hit");
									}}
								>
									<DirectionsBoatIcon />
								</IconButton>
								<IconButton
									size="small"
									onClick={() => {
										props.updateTileState(tile.data.x, tile.data.y, "miss");
									}}
								>
									<WavesIcon />
								</IconButton>
							</>
						) : (
							<IconButton
								size="small"
								onClick={() => {
									props.updateTileState(tile.data.x, tile.data.y, "unknown");
								}}
							>
								<UndoIcon />
							</IconButton>
						)}
					</Box>
				</Box>
			</>
		);
	}

	return (
		<Box
			sx={{
				backgroundColor: boxColour,
				aspectRatio: "1",
			}}
		>
			{boxContent}
		</Box>
	);
};

export default function Home() {
	const [board, setBoard] = useState<CellData[][]>(
		[...Array(BOARD_SIZE)].map((item, x) => {
			return [...Array(BOARD_SIZE)].map((item, y) => {
				return { state: "unknown", probability: 0, x: x, y: y } as CellData;
			});
		})
	);

	function updateTileState(x: number, y: number, state: CellData["state"]) {
		var newBoard = [...board];
		newBoard[x][y].state = state;
		setBoard(newBoard);
	}

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Typography variant="h2" fontWeight="bold">
					Battleship Predictor
				</Typography>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: `repeat(${BOARD_SIZE + 1}, 1fr)`,
						gridGap: "1px",
						margin: "10px",
						width: "1000px",
						padding: "0px",
						backgroundColor: "#000",
						borderRadius: "10px",
						overflow: "hidden",
					}}
				>
					{(
						[
							{ text: "", type: "label" } as LabelTile,
							...[...Array<LabelTile>(BOARD_SIZE)].map((item, i) => {
								return { text: "A", type: "label" } as LabelTile;
							}),
							,
							...board
								.map((row, i) => {
									return [
										{ text: "B", type: "label" } as LabelTile,
										...row.map((item, i) => {
											return { data: item, type: "game" } as GameTile;
										}),
									];
								})
								.flat(1),
						] as Tile[]
					).map((item, i) => {
						return <GridItem key={i} tile={item} updateTileState={updateTileState} />;
					})}
				</Box>
			</Box>
		</>
	);
}
