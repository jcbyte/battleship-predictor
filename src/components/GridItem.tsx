// Wrapper for the inner tile components which gives the tiles their rigid structure
export default function GridItem({ children }: { children: React.ReactNode }) {
	return <div className="size-20 rounded overflow-hidden">{children}</div>;
}
