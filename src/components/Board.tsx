import { CellData } from "../types";
import GridItem from "./GridItem";

export default function Board({ board }: { board: CellData[][] }) {
	return (
		<>
			<div className="flex flex-col">
				{board.map((boardRow) => {
					return (
						<div className="flex">
							{boardRow.map((tile) => {
								return <GridItem cell={tile} />;
							})}
						</div>
					);
				})}
			</div>
		</>
	);
}
