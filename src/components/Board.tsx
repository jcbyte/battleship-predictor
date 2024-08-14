import { COLUMN_IDENTIFIERS, ROW_IDENTIFIERS } from "../static";
import { CellData } from "../types";
import GridItem from "./GridItem";

export default function Board({ board }: { board: CellData[][] }) {
	return (
		<>
			<div className="rounded w-fit overflow-hidden">
				<div className="flex flex-col gap-[2px]">
					<div className="flex gap-[2px]">
						<GridItem key="col-0-row-0-blank" tile={{ type: "label", text: "" }} />
						{COLUMN_IDENTIFIERS.map((label, i) => {
							return <GridItem key={`col-${i}-label`} tile={{ type: "label", text: label }} />;
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
