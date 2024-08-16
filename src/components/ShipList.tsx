import { Ship } from "../types";

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
				{ships.map((ship, i) => {
					return (
						<div key={i}>
							<label className="flex gap-1 items-center">
								<input
									type="checkbox"
									checked={ship.sunk}
									onChange={(e) => {
										setShips((prevShips) => {
											let newShips: Ship[] = [...prevShips];
											newShips[i].sunk = e.target.checked;
											return newShips;
										});
									}}
								/>
								<span style={{ textDecoration: ship.sunk ? "line-through" : "none" }}>{ship.length} Ship</span>
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}
