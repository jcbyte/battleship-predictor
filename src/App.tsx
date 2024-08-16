import { useEffect, useState } from "react";
import Board from "./components/Board";
import ShipList from "./components/ShipList";
import { calculateProbabilities } from "./scripts/calculator";
import { BOARD_SIZE, STARTING_SHIPS2 } from "./static";
import { CellData, Ship } from "./types";

// TODO ships section
// TODO auto update setting
// TODO reset

// TODO grid item controls
// TODO documentation including readme

export default function App() {
	const [board, setBoard] = useState<CellData[][]>(
		[...Array(BOARD_SIZE)].map((item, x) => {
			return [...Array(BOARD_SIZE)].map(() => {
				return { state: "unknown", probability: x / 9 } as CellData;
			});
		})
	);
	const [ships, setShips] = useState<Ship[]>(
		STARTING_SHIPS2.map((length) => {
			return { length: length, sunk: false };
		})
	);

	const [autoUpdateProbabilities, setAutoUpdateProbabilities] = useState<boolean>(true);

	useEffect(() => {
		setBoard(calculateProbabilities(board, ships));
	}, []);

	return (
		<>
			<div className="flex flex-col gap-4 items-center p-4">
				<div className="text-4xl font-semibold">Battleship Predictor</div>
				<Board board={board} />
				<ShipList ships={ships} setShips={setShips} />
			</div>
		</>
	);
}

// export default function Home() {
// 	const [maxProbability, setMaxProbability] = useState<number>(0);

// 	function updateTileState(x: number, y: number, state: CellData["state"]) {
// 		var newBoard = [...board];
// 		newBoard[x][y].state = state;

// 		if (autoUpdateProbabilities) calculateProbabilities(newBoard);
// 		else setBoard(newBoard);
// 	}

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
