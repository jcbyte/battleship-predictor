"use client";

import { useState } from "react";
import { BOARD_SIZE, STARTING_SHIPS2 } from "./static";
import { CellData2, Ship2 } from "./types";

export default function Page() {
	const [board, setBoard] = useState<CellData2[][]>(
		[...Array(BOARD_SIZE)].map(() => {
			return [...Array(BOARD_SIZE)].map(() => {
				return { state: "unknown", probability: 0 } as CellData2;
			});
		})
	);
	const [ships, setShips] = useState<Ship2[]>(
		STARTING_SHIPS2.map((length) => {
			return { length: length, sunk: false };
		})
	);

	const [autoUpdateProbabilities, setAutoUpdateProbabilities] = useState<boolean>(true);

	return <></>;
}

// export default function Home() {
// 	const [maxProbability, setMaxProbability] = useState<number>(0);

// 	function updateTileState(x: number, y: number, state: CellData["state"]) {
// 		var newBoard = [...board];
// 		newBoard[x][y].state = state;

// 		if (autoUpdateProbabilities) calculateProbabilities(newBoard);
// 		else setBoard(newBoard);
// 	}

// 	function calculateProbabilities(newBoard: CellData[][]) {
// 		var newMaxProbability = 0;

// 		function stateToSpace(state: CellData["state"]): number {
// 			if (state == "unknown") return 1;
// 			if (state == "hit") return HIT_MULTIPLIER;
// 			return 0;
// 		}

// 		for (var x = 0; x < BOARD_SIZE; x++) {
// 			for (var y = 0; y < BOARD_SIZE; y++) {
// 				var probability = 0;
// 				if (board[x][y].state == "unknown") {
// 					ships
// 						.filter((ship) => !ship.sunk)
// 						.forEach((ship) => {
// 							var horizontal = [];
// 							var vertical = [];

// 							for (var i = -ship.length + 1; i < ship.length; i++) {
// 								var newX = x + i;
// 								if (newX < 0 || newX >= BOARD_SIZE) horizontal.push(0);
// 								else horizontal.push(stateToSpace(board[newX][y].state));

// 								var newY = y + i;
// 								if (newY < 0 || newY >= BOARD_SIZE) vertical.push(0);
// 								else vertical.push(stateToSpace(board[x][newY].state));
// 							}

// 							for (var i = 0; i < ship.length; i++) {
// 								var thisProbabilityHorizontal = 1;
// 								var thisProbabilityVertical = 1;
// 								for (var j = i; j < i + ship.length; j++) {
// 									thisProbabilityHorizontal *= horizontal[j];
// 									thisProbabilityVertical *= vertical[j];
// 								}

// 								probability += thisProbabilityHorizontal + thisProbabilityVertical;
// 							}
// 						});
// 				}
// 				if (probability > newMaxProbability) newMaxProbability = probability;
// 				newBoard[x][y].probability = probability;
// 			}
// 		}

// 		setBoard(newBoard);
// 		setMaxProbability(newMaxProbability);
// 	}

// 	useEffect(() => {
// 		calculateProbabilities(board);
// 	}, []);

// 	useEffect(() => {
// 		if (autoUpdateProbabilities) calculateProbabilities(board);
// 	}, [ships]);

// 	function toggleShip(shipIndex: number) {
// 		var newShips = [...ships];
// 		newShips[shipIndex].sunk = !newShips[shipIndex].sunk;
// 		setShips(newShips);
// 	}

// 	return (
// 		<>
// 			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// 				<Typography variant="h2" fontWeight="bold">
// 					Battleship Predictor
// 				</Typography>
// 				<Box sx={{ display: "flex", alignItems: "center" }}>
// 					<Box
// 						sx={{
// 							display: "flex",
// 							flexDirection: "column",
// 							padding: "5px",
// 							border: "1px solid black",
// 							borderRadius: "5px",
// 						}}
// 					>
// 						<Typography variant="h5">Ships</Typography>
// 						<Box sx={{ display: "flex", flexDirection: "column" }}>
// 							{ships.map((ship, i) => {
// 								return (
// 									<FormControlLabel
// 										key={i}
// 										control={
// 											<Checkbox
// 												checked={ship.sunk}
// 												onClick={() => {
// 													toggleShip(i);
// 												}}
// 											/>
// 										}
// 										label={
// 											<Typography
// 												sx={{ textDecoration: ship.sunk ? "line-through" : "none" }}
// 											>{`${ship.length} Ship`}</Typography>
// 										}
// 									/>
// 								);
// 							})}
// 						</Box>
// 					</Box>
// 					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// 						<Box
// 							sx={{
// 								display: "grid",
// 								gridTemplateColumns: `repeat(${BOARD_SIZE + 1}, 1fr)`,
// 								gridGap: "1px",
// 								margin: "10px",
// 								width: "1000px",
// 								padding: "0px",
// 								backgroundColor: "#000",
// 								borderRadius: "10px",
// 								overflow: "hidden",
// 							}}
// 						>
// 							{(
// 								[
// 									{ text: "", type: "label" } as LabelTile,
// 									...[...Array<LabelTile>(BOARD_SIZE)].map((item, i) => {
// 										return { text: COLUMN_IDENTIFIERS[i], type: "label" } as LabelTile;
// 									}),
// 									,
// 									...board
// 										.map((row, i) => {
// 											return [
// 												{ text: ROW_IDENTIFIERS[i], type: "label" } as LabelTile,
// 												...row.map((item, i) => {
// 													return { data: item, type: "game" } as GameTile;
// 												}),
// 											];
// 										})
// 										.flat(1),
// 								] as Tile[]
// 							).map((item, i) => {
// 								return (
// 									<GridItem key={i} tile={item} updateTileState={updateTileState} maxProbability={maxProbability} />
// 								);
// 							})}
// 						</Box>
// 						<FormControlLabel
// 							control={
// 								<Checkbox
// 									checked={autoUpdateProbabilities}
// 									onChange={(event) => {
// 										setAutoUpdateProbabilities(event.target.checked);
// 									}}
// 								/>
// 							}
// 							label="Automatically refresh probabilities"
// 						/>
// 						<Button
// 							variant="outlined"
// 							endIcon={<RefreshIcon />}
// 							onClick={() => {
// 								calculateProbabilities(board);
// 							}}
// 						>
// 							Refresh
// 						</Button>
// 					</Box>
// 				</Box>
// 			</Box>
// 		</>
// 	);
// }
