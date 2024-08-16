import { VERSION } from "../static";

export default function Signature() {
	return (
		<div className="text-gray-500 fixed right-2 bottom-2 text-right text-sm">
			<p>Battleship Predictor {VERSION}</p>
			<p>By Joel Cutler</p>
		</div>
	);
}
