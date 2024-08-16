import { Ship } from "../types";

export default function ShipList({
	ships,
	setShips,
}: {
	ships: Ship[];
	setShips: React.Dispatch<React.SetStateAction<Ship[]>>;
}) {
	return (
		<div className="border-2 border-gray-700 rounded p-2">
			<span>Remaining Ships:</span>
			<div className="flex gap-12">
				{ships.map((ship, i) => {
					return (
						<div key={i}>
							<label>
								<input
									type="checkbox"
									checked={ship.sunk}
									style={{ textDecoration: ship.sunk ? "line-through" : "none" }}
									onChange={(e) => {
										setShips((prevShips) => {
											let newShips: Ship[] = [...prevShips];
											newShips[i].sunk = e.target.checked;
											return newShips;
										});
									}}
								/>
								<span>{ship.length} Ship</span>
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}
