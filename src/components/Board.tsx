import { COLUMN_IDENTIFIERS, ROW_IDENTIFIERS } from "../static";
import { CellData } from "../types";
import GridItem from "./GridItem";

export default function Board({ board }: { board: CellData[][] }) {
	return (
		<>
			<div className="bg-purple-400 rounded p-2 w-fit">
				<div className="flex flex-col">
					<div className="flex">
						<GridItem tile={{ type: "label", text: "" }} />
						{COLUMN_IDENTIFIERS.map((label) => {
							return <GridItem tile={{ type: "label", text: label }} />;
						})}
					</div>

					{board.map((boardRow, rowNum) => {
						return (
							<div className="flex">
								<GridItem tile={{ type: "label", text: ROW_IDENTIFIERS[rowNum] }} />
								{boardRow.map((cell: CellData) => {
									return <GridItem tile={{ type: "game", ...cell }} />;
								})}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
