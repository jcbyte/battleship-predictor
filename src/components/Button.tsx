export default function Button(props: any) {
	return (
		<input
			type="button"
			className="appearance-none border p-1 border-gray-600 rounded cursor-pointer hover:ring-1 hover:ring-blue-600 active:bg-blue-600 transition-colors duration-100 disabled:bg-gray-800 disabled:text-gray-400 disabled:cursor-auto disabled:hover:ring-0"
			{...props}
		/>
	);
}
