import crypto from 'crypto';

export async function generateRandomNumbers(count: number) {
	const randomNumbers = [];

	for (let i = 0; i < count; i++) {
		const randomBytes = crypto.randomBytes(4);
		const randomNumber = randomBytes.readUInt32BE(0);
		randomNumbers.push(randomNumber);
	}

	const findRandom = randomNumbers.find(number => number.toString().includes(count.toString()));

	return findRandom;
}
