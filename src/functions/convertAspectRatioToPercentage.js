// New function to convert aspect ratio parts to a percentage
export default function convertAspectRatioToPercentage(numerator, denominator) {
	// Check if the input is valid - if not then return the percentage as 100% (1:1).
	if (
		typeof numerator !== 'number' ||
		isNaN(numerator) ||
		typeof denominator !== 'number' ||
		isNaN(denominator) ||
		denominator === 0
	) {
		return `${100}%`;
	}

	// Calculate the percentage based on the ratio parts
	const percentage = (numerator / denominator) * 100;

	return `${percentage}%`;
}
