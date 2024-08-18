import GridItem from "./GridItem";

// Component to display the inner of a label tile
export default function LabelTile({ label }: { label: string }) {
	return (
		<GridItem>
			<div className="bg-gray-700 flex items-center justify-center h-full text-xl">{label}</div>
		</GridItem>
	);
}
