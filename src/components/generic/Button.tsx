export default function Button({
	...passedProps
}: {} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
	return <input type="button" className="my-button" {...passedProps} />;
}
