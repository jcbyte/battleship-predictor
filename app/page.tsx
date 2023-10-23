"use client";

import { Box, Button, Checkbox, FormControlLabel, IconButton, Typography } from "@mui/material";

import { PropsWithChildren, useEffect, useState } from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import RefreshIcon from "@mui/icons-material/Refresh";
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

interface BoardShip extends Ship {
	sunk: boolean;
}

type Tile = GameTile | LabelTile;

const COLUMN_IDENTIFIERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const ROW_INDENTIFIERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const BOARD_SIZE = 10;
const TILE_COLOURS = {
	label: "#60278B",
	lowProbability: "#8B6027",
	highProbability: "#8B2E27",
	hit: "#528B27",
	sunk: "#278B2E",
	miss: "#278B60",
};
const STARTING_SHIPS: Ship[] = [{ length: 5 }, { length: 4 }, { length: 3 }, { length: 3 }, { length: 2 }];
const HIT_MULTIPLIER = 20;

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
			sunk: TILE_COLOURS["sunk"],
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
	const [autoUpdateProbabilities, setAutoUpdateProbabilities] = useState<boolean>(true);
	const [ships, setShips] = useState<BoardShip[]>(
		STARTING_SHIPS.map((ship) => {
			return { ...ship, sunk: false };
		})
	);

	function updateTileState(x: number, y: number, state: CellData["state"]) {
		var newBoard = [...board];
		newBoard[x][y].state = state;

		if (autoUpdateProbabilities) calculateProbabilities(newBoard);
		else setBoard(newBoard);
	}

	function calculateProbabilities(newBoard: CellData[][]) {
		var newMaxProbability = 3;

		for (var x = 0; x < BOARD_SIZE; x++) {
			for (var y = 0; y < BOARD_SIZE; y++) {
				var probability = 0;
				ships
					.filter((ship) => !ship.sunk)
					.forEach((ship) => {
						console.log(ship);
						// TODO
					});
			}
		}

		setBoard(newBoard);
		setMaxProbability(newMaxProbability);
	}

	useEffect(() => {
		calculateProbabilities(board);
	}, []);

	function toggleShip(shipIndex: number) {
		var newShips = [...ships];
		newShips[shipIndex].sunk = !newShips[shipIndex].sunk;
		setShips(newShips);
	}

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Typography variant="h2" fontWeight="bold">
					Battleship Predictor
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							padding: "5px",
							border: "1px solid black",
							borderRadius: "5px",
						}}
					>
						<Typography variant="h5">Ships</Typography>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							{ships.map((ship, i) => {
								return (
									<FormControlLabel
										key={i}
										control={
											<Checkbox
												checked={ship.sunk}
												onClick={() => {
													toggleShip(i);
												}}
											/>
										}
										label={
											<Typography
												sx={{ textDecoration: ship.sunk ? "line-through" : "none" }}
											>{`${ship.length} Ship`}</Typography>
										}
									/>
								);
							})}
						</Box>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
								return (
									<GridItem key={i} tile={item} updateTileState={updateTileState} maxProbability={maxProbability} />
								);
							})}
						</Box>
						<FormControlLabel
							control={
								<Checkbox
									checked={autoUpdateProbabilities}
									onChange={(event) => {
										setAutoUpdateProbabilities(event.target.checked);
									}}
								/>
							}
							label="Automatically refresh probabilities"
						/>
						<Button
							variant="outlined"
							endIcon={<RefreshIcon />}
							onClick={() => {
								calculateProbabilities(board);
							}}
						>
							Refresh
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
}
