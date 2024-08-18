import { Ship } from "../types";
import Checkbox from "./generic/Checkbox";

// Component to display and control which ships have been sunk
export default function ShipList({
	ships,
	setShips,
}: {
	ships: Ship[];
	setShips: React.Dispatch<React.SetStateAction<Ship[]>>;
}) {
	return (
		<div className="border-2 border-gray-700 p-2 rounded flex flex-col gap-2 items-center">
			<div className="font-semibold">Remaining Ships:</div>
			<div className="flex gap-4">
				{ships.map((ship: Ship, i: number) => {
					return (
						<div key={i}>
							<Checkbox
								label={<span style={{ textDecoration: ship.sunk ? "line-through" : "none" }}>{ship.length} Ship</span>}
								cross
								checked={ship.sunk}
								onChange={(e) => {
									setShips((prevShips) => {
										let newShips: Ship[] = [...prevShips];
										newShips[i].sunk = e.target.checked;
										return newShips;
									});
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
