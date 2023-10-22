"use client";

import { Box, IconButton, Typography } from "@mui/material";

import { PropsWithChildren, useEffect, useState } from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import UndoIcon from "@mui/icons-material/Undo";
import WavesIcon from "@mui/icons-material/Waves";

interface CellData {
	state: "unknown" | "hit" | "miss" | "sunk";
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

interface Ship {
	length: number;
}

type Tile = GameTile | LabelTile;

const COLUMN_IDENTIFIERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const ROW_INDENTIFIERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const BOARD_SIZE = 10;
const TILE_COLOURS = {
	label: "#dbcdf0",
	lowProbability: "#faedcb",
	highProbability: "#f2c6de",
	hit: "#c9e4de",
	miss: "#c6def1",
};
const SHIPS: Ship[] = [{ length: 5 }, { length: 4 }, { length: 3 }, { length: 3 }, { length: 2 }];

function colourLerp(a: string, b: string, t: number): string {
	function hexToRgb(hex: string): { r: number; g: number; b: number } {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as RegExpExecArray;
		return {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		};
	}

	function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
		function componentToHex(c: number): string {
			var hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		}

		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	var aRgb = hexToRgb(a);
	var bRgb = hexToRgb(b);
	var newRgb = {
		r: Math.round(aRgb.r + (bRgb.r - aRgb.r) * t),
		g: Math.round(aRgb.g + (bRgb.g - aRgb.g) * t),
		b: Math.round(aRgb.b + (bRgb.b - aRgb.b) * t),
	};

	return rgbToHex(newRgb);
}

export const GridItem = (
	props: PropsWithChildren<{ tile: Tile; updateTileState: Function; maxProbability: number }>
) => {
	var boxColour = "#ffffff";
	var boxContent = <></>;

	if (props.tile.type == "label") {
		boxColour = TILE_COLOURS["label"];
		boxContent = (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90px" }}>
				<Typography>{props.tile.text}</Typography>
			</Box>
		);
	} else if (props.tile.type == "game") {
		var tile: GameTile = props.tile as GameTile;
		boxColour = {
			unknown: colourLerp(
				TILE_COLOURS["lowProbability"],
				TILE_COLOURS["highProbability"],
				props.maxProbability > 0 ? tile.data.probability / props.maxProbability : 0
			),
			hit: TILE_COLOURS["hit"],
			sunk: TILE_COLOURS["hit"],
			miss: TILE_COLOURS["miss"],
		}[tile.data.state];
		var text = { unknown: "Unknown", hit: "Hit", sunk: "Sunk", miss: "Miss" }[tile.data.state];
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
							<>
								{tile.data.state == "hit" ? (
									<IconButton
										size="small"
										onClick={() => {
											props.updateTileState(tile.data.x, tile.data.y, "sunk");
										}}
									>
										<ArrowDownwardIcon />
									</IconButton>
								) : (
									<IconButton
										size="small"
										onClick={() => {
											props.updateTileState(tile.data.x, tile.data.y, "hit");
										}}
									>
										<ArrowUpwardIcon />
									</IconButton>
								)}
								<IconButton
									size="small"
									onClick={() => {
										props.updateTileState(tile.data.x, tile.data.y, "unknown");
									}}
								>
									<UndoIcon />
								</IconButton>
							</>
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
	const [maxProbability, setMaxProbability] = useState<number>(0);

	function updateTileState(x: number, y: number, state: CellData["state"]) {
		var newBoard = [...board];
		newBoard[x][y].state = state;

		calculateProbabilities(newBoard);
	}

	function calculateProbabilities(newBoard: CellData[][]) {
		newBoard[0][3].probability = 3;

		setBoard(newBoard);
		setMaxProbability(3);
	}

	useEffect(() => {
		calculateProbabilities(board);
	}, []);

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
								return { text: COLUMN_IDENTIFIERS[i], type: "label" } as LabelTile;
							}),
							,
							...board
								.map((row, i) => {
									return [
										{ text: ROW_INDENTIFIERS[i], type: "label" } as LabelTile,
										...row.map((item, i) => {
											return { data: item, type: "game" } as GameTile;
										}),
									];
								})
								.flat(1),
						] as Tile[]
					).map((item, i) => {
						return <GridItem key={i} tile={item} updateTileState={updateTileState} maxProbability={maxProbability} />;
					})}
				</Box>
			</Box>
		</>
	);
}
