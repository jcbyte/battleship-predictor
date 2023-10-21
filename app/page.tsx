"use client";

import { Box } from "@mui/material";

import { PropsWithChildren } from "react";

export const GridItem = (props: PropsWithChildren) => {
	return (
		<Box
			sx={{
				"background-color": "rgb(100, 200, 200)",
				"aspect-ratio": "1",
			}}
		>
			{props.children}
		</Box>
	);
};

export default function Home() {
	return (
		<>
			<Box
				sx={{
					display: "grid",
					"grid-template-columns": "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
					"grid-gap": "5px",
					margin: "10px",
				}}
			>
				{[...Array(11 * 11)].map((item, i) => {
					return <GridItem>{i}</GridItem>;
				})}
			</Box>
		</>
	);
}
