import { CellData } from "../types";
import GridItem from "./GridItem";

export default function Board({ board }: { board: CellData[][] }) {
	return (
		<>
			<div className="bg-purple-400 rounded p-2 w-fit">
				<div className="flex flex-col">
					{board.map((boardRow) => {
						return (
							<div className="flex">
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
