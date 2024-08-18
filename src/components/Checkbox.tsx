export default function Checkbox({
	label,
	cross = false,
	...passedProps
}: {
	label: React.ReactNode;
	cross?: boolean;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
	return (
		<label className="flex gap-1 items-center">
			<input type="checkbox" className={`my-checkbox${cross ? " checkbox-cross" : ""}`} {...passedProps} />
			{label}
		</label>
	);
}
