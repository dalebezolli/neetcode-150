// 217. Contains Duplicate
// https://leetcode.com/problems/contains-duplicate/
//
// Q:
// given an array of nums, return true if there is a duplicate.
//
// A:
// > Loop through array
// We can check every number with every other number in the array if we find a similar number we return true.
//
// As we're checking every number with every other that means we'll loop a total of n times for every number in the array n worst case.
// Meaning we'll do worst case n^2 iterrations which therefore means we'll have a time complexity of O(n^2).
// We won't be storing any data proportional to the array thus the space complexity is O(1).
//
// > Using a Hashmap/set
// If we can somehow know the existence of a number in the array, without looping through each number that would simplify the process.
// Because then we can just look at a number, check if it exists again in the array and return true if it does.
// This is possible by mapping a number to a position in the array, meaning a hashset.
//
// The worst case would have us run through the numbers of the array once making the time complexity of the solution O(n).
// As we'll be using a set to store the existing data we have an O(n) space complexity.

function containsDuplicateLoopThroughArray(nums: number[]): boolean {
	// We need to go through the array from the first to the one before the last
	// because the last one cannot be compared with anyhting else at the end.
	for(let i = 0; i < nums.length - 1; i++) {
		// We need to go from the first number after the i index to compare with.
		// Otherwise if we j = i we'd always find duplicates as we'd be looking at a index twice.
		for(let j = i + 1; j < nums.length; j++) {
			if(nums[i] === nums[j]) return  true;
		}
	}

	return false;
}

function containsDuplicateHashSet(nums: number[]): boolean {
	let existingNums = new Set();

	for(let num of nums) {
		// Inside, we just need to check if it exists
		if(existingNums.has(num)) return true;
		// otherwise we can just add it if it doesn't
		existingNums.add(num);
	}

	return false;
}
