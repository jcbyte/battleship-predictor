export default function IconButton({
	icon,
	label,
	...passedProps
}: { icon: React.ReactNode; label?: string } & React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) {
	return (
		<div className="my-icon-button" title={label} {...passedProps}>
			{icon}
		</div>
	);
}
