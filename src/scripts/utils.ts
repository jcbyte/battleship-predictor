function hexToRgb(hex: string): { r: number; g: number; b: number } {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as RegExpExecArray;
	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	};
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
	function componentToHex(c: number): string {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function colourLerp(a: string, b: string, t: number): string {
	var aRgb = hexToRgb(a);
	var bRgb = hexToRgb(b);
	var newRgb = {
		r: Math.round(aRgb.r + (bRgb.r - aRgb.r) * t),
		g: Math.round(aRgb.g + (bRgb.g - aRgb.g) * t),
		b: Math.round(aRgb.b + (bRgb.b - aRgb.b) * t),
	};

	return rgbToHex(newRgb);
}
