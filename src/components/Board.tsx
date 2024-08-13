import { CellData } from "../types";

export default function Board({ board }: { board: CellData[][] }) {
	return (
		<>
			{board.map((boardRow) => {
				return boardRow.map((tile) => {
					return tile.probability;
				});
			})}
		</>
	);
}
