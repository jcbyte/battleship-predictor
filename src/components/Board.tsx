import { COLUMN_IDENTIFIERS, ROW_IDENTIFIERS } from "../static";
import { CellData } from "../types";
import GridItem from "./GridItem";

export default function Board({ board }: { board: CellData[][] }) {
	return (
		<>
			<div className="rounded w-fit overflow-hidden">
				<div className="flex flex-col gap-[2px]">
					<div className="flex gap-[2px]">
						<GridItem tile={{ type: "label", text: "" }} />
						{COLUMN_IDENTIFIERS.map((label) => {
							return <GridItem tile={{ type: "label", text: label }} />;
						})}
					</div>

					{board.map((boardRow, rowNum) => {
						return (
							<div className="flex gap-[2px]">
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
