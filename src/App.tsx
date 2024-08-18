import { useEffect, useState } from "react";
import Board from "./components/Board";
import Button from "./components/generic/Button";
import Checkbox from "./components/generic/Checkbox";
import ShipList from "./components/ShipList";
import Signature from "./components/Signature";
import { calculateProbabilities } from "./scripts/calculator";
import { BOARD_SIZE, STARTING_SHIPS2 } from "./static";
import { CellState, Ship } from "./types";

// Function to return a fresh blank board
function getNewBoard<T>(initial: T): T[][] {
	return [...Array(BOARD_SIZE)].map((item, x) => {
		return [...Array(BOARD_SIZE)].map(() => {
			return initial;
		});
	});
}

// Function to return a fresh list of ships
function getNewShips(): Ship[] {
	return STARTING_SHIPS2.map((length) => {
		return { length: length, sunk: false };
	});
}

export default function App() {
	// These states contain the state of the game
	const [board, setBoard] = useState<CellState[][]>(getNewBoard<CellState>("unknown"));
	const [boardProbabilities, setBoardProbabilities] = useState<number[][]>(getNewBoard(0));
	const [ships, setShips] = useState<Ship[]>(getNewShips());

	// These states contain app settings
	const [autoUpdateProbabilities, setAutoUpdateProbabilities] = useState<boolean>(true);

	// Calculate new probabilities and set this to the board
	function refreshBoard() {
		setBoardProbabilities(calculateProbabilities(board, ships));
	}

	// When the state of a tile or ship changes the board should be recalculated
	useEffect(() => {
		// If we should refresh the board automatically
		if (autoUpdateProbabilities) {
			refreshBoard();
		}
		// `autoUpdateProbabilities` is in this list so that when enabled it will refresh the board
	}, [board, ships, autoUpdateProbabilities]);

	// Function to reset the board and ships to their default values
	function reset() {
		setBoard(getNewBoard<CellState>("unknown"));
		setBoardProbabilities(getNewBoard(0));
		setShips(getNewShips());
	}

	return (
		<>
			<div className="flex flex-col gap-4 items-center p-4">
				<div className="text-4xl font-semibold">Battleship Predictor</div>

				<Board board={board} boardProbabilities={boardProbabilities} setBoard={setBoard} />

				<ShipList ships={ships} setShips={setShips} />

				<div className="flex gap-2">
					<Checkbox
						label="Automatically Refresh"
						checked={autoUpdateProbabilities}
						onChange={(e) => {
							setAutoUpdateProbabilities(e.target.checked);
						}}
					/>
					<Button value="Refresh" onClick={refreshBoard} disabled={autoUpdateProbabilities} />
				</div>

				<Button value="Reset" onClick={reset} />
			</div>

			<Signature />
		</>
	);
}
