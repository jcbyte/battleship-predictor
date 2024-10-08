import { BOARD_SIZE } from "../static";
import { CellState } from "../types";
import BoardTile from "./BoardTile";
import LabelTile from "./LabelTile";

const COLUMN_IDENTIFIERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
const ROW_IDENTIFIERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

// Component to display each of the tiles from the passed board, including any column and row labels
export default function Board({
	board,
	boardProbabilities,
	setBoard,
}: {
	board: CellState[][];
	boardProbabilities: number[][];
	setBoard: React.Dispatch<React.SetStateAction<CellState[][]>>;
}) {
	// Function to change the state of a tile given its row and col
	function setTileState(state: CellState, row: number, col: number): void {
		setBoard((prev) => {
			// This only creates a shallow copy, does this cause issues?
			let newBoard: CellState[][] = [...prev];
			newBoard[row][col] = state;
			return newBoard;
		});
	}

	return (
		<>
			<div className="rounded w-fit overflow-hidden">
				<div className="flex flex-col gap-[2px]">
					<div className="flex gap-[2px]">
						{/* Top left tile is blank */}
						<LabelTile key="col-0-row-0-blank" label="" />
						{/* Top row contains the column labels */}
						{[...Array(BOARD_SIZE)].map((_, i: number) => {
							return <LabelTile key={`col-${i}-label`} label={COLUMN_IDENTIFIERS[i]} />;
						})}
					</div>

					{[...Array(BOARD_SIZE)].map((_, rowNum: number) => {
						return (
							<div key={`row-${rowNum}-container`} className="flex gap-[2px]">
								{/* First tile on each row is the row label */}
								<LabelTile key={`row-${rowNum}-label`} label={ROW_IDENTIFIERS[rowNum]} />
								{/* Then display all of the actual board */}
								{[...Array(BOARD_SIZE)].map((_, colNum: number) => {
									return (
										<BoardTile
											key={`row-${rowNum}-col-${colNum}`}
											state={board[rowNum][colNum]}
											probability={boardProbabilities[rowNum][colNum]}
											setState={(state: CellState) => {
												setTileState(state, rowNum, colNum);
											}}
										/>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
