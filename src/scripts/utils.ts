interface rgbCol {
	r: number;
	g: number;
	b: number;
}

// Linearly interpolate between two numbers
function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

// Convert hex colour to rgb colour
function hexToRgb(hex: string): rgbCol {
	// Use a regex to extract the rgb values
	let result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as RegExpExecArray;
	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	};
}

// Convert rgb colour to hex colour
function rgbToHex({ r, g, b }: rgbCol): string {
	function componentToHex(c: number): string {
		let hex: string = c.toString(16);
		return hex.padStart(2, "0");
	}

	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

// Linearly interpolate between two hex colours
export function colourLerpHex(a: string, b: string, t: number): string {
	let aRgb: rgbCol = hexToRgb(a);
	let bRgb: rgbCol = hexToRgb(b);
	let newRgb: rgbCol = {
		r: Math.round(lerp(aRgb.r, bRgb.r, t)),
		g: Math.round(lerp(aRgb.g, bRgb.g, t)),
		b: Math.round(lerp(aRgb.b, bRgb.b, t)),
	};

	return rgbToHex(newRgb);
}
