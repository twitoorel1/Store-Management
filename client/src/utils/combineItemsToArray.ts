export default function combineItemsToArray<T>(existingArray: T[], ...items: T[]): T[] {
	const newArray = [...existingArray, ...items];
	return newArray;

	// return [...existingArray, ...items];
}
