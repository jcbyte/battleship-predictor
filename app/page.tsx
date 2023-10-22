"use client";

import { Box, IconButton, Typography } from "@mui/material";

import { PropsWithChildren, useState } from "react";

import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import WavesIcon from "@mui/icons-material/Waves";

interface CellData {
	shot: boolean;
	hit: boolean;
	probability: number;
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

export const GridItem = (props: PropsWithChildren<{ tile: Tile }>) => {
	var content = <></>;
	if (props.tile.type == "label") {
		content = <>{props.tile.text}</>;
	} else if (props.tile.type == "game") {
		content = (
			<>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<IconButton size="small">
						<DirectionsBoatIcon />
					</IconButton>
					<IconButton size="small">
						<WavesIcon />
					</IconButton>
				</Box>
			</>
		);
	}

	return (
		<Box
			sx={{
				backgroundColor: "#aa88aa",
				aspectRatio: "1",
			}}
		>
			{content}
		</Box>
	);
};

export default function Home() {
	const [board, setBoard] = useState<CellData[][]>(
		[...Array(BOARD_SIZE)].map(() => {
			return [...Array(BOARD_SIZE)].map(() => {
				return { shot: false, hit: false, probability: 0 } as CellData;
			});
		})
	);

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
						return <GridItem key={i} tile={item} />;
					})}
				</Box>
			</Box>
		</>
	);
}
