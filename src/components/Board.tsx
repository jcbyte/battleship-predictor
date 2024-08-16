import { BOARD_SIZE } from "../static";
import { CellData } from "../types";
import GridItem from "./GridItem";

const COLUMN_IDENTIFIERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
const ROW_IDENTIFIERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

// Component to display each of the tiles from the passed board, including any column and row labels
export default function Board({ board }: { board: CellData[][] }) {
	return (
		<>
			<div className="rounded w-fit overflow-hidden">
				<div className="flex flex-col gap-[2px]">
					<div className="flex gap-[2px]">
						<GridItem key="col-0-row-0-blank" tile={{ type: "label", text: "" }} />
						{[...Array(BOARD_SIZE)].map((_, i) => {
							return <GridItem key={`col-${i}-label`} tile={{ type: "label", text: COLUMN_IDENTIFIERS[i] }} />;
						})}
					</div>

					{board.map((boardRow, rowNum) => {
						return (
							<div key={`row-${rowNum}-container`} className="flex gap-[2px]">
								<GridItem key={`row-${rowNum}-label`} tile={{ type: "label", text: ROW_IDENTIFIERS[rowNum] }} />
								{boardRow.map((cell: CellData, colNum) => {
									return <GridItem key={`row-${rowNum}-col-${colNum}`} tile={{ type: "game", ...cell }} />;
								})}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
