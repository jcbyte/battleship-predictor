// ? What is type of Icon
// TODO hover label

export default function IconButton({
	Icon,
	...passedProps
}: { Icon: any } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
	return (
		<div className="my-icon-button" {...passedProps}>
			<Icon />
		</div>
	);
}
