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

// 242. Valid Anagram
// https://leetcode.com/problems/valid-anagram/description/
//
// Q:
// given two strings identify if they're an anagram of eachother.
//
// Breakdown:
// An anagram of a word is another word that contains the exact number of letters but in a different ordering.
//
// Constraints:
// lowercase a-z characters (26 in total)
//
// A:
// > Count Array
// If we know the count of all the characters in both arrays we can compare them and if they match we'll be looking at anagrams.
// This means that we need to create an array that will contain the count of each lowercase character.
// To store them efficiently we'll map each lowercase character to an index in the array starting from a mapped to 0.
// This will be done using a mapping function that runs asciiCode(character) - 97.
//
// The two arrays need to run through n characters and check if they're the same. This means we'll run through n and m indices
// and then through 26 indices making our runtime O(n + m).
// The space complexity is a constant, meaning O(1).
//
// > HashMap
// If we didn't have the character constraint we'd have to update the mapping with something better, that would be a hashmap!
// This means that we'd swap the array to maps.
//
// Although this keep our runtime to O(n + m) it worsens the space complexity to O(n + m).

function isAnagramCountArray(s: string, t: string): boolean {
	let arrS = new Array(26).fill(0);
	let arrT = new Array(26).fill(0);

	for(let charS of s) {
		arrS[charS.charCodeAt(0) - 97]++;
	}

	for(let charT of t) {
		arrT[charT.charCodeAt(0) - 97]++;
	}

	for(let i = 0; i < 26; i++) {
		if(arrS[i] !== arrT[i]) return false;
	}

	return true;
};

function isAnagramHashMap(s: string, t: string): boolean {
	let mapS = new Map();
	let mapT = new Map();

	for(let charS of s) {
		mapS.set(charS, (mapS.get(charS) ?? 0) + 1);
	}

	for(let charT of t) {
		mapT.set(charT, (mapT.get(charT) ?? 0) + 1);
	}

	// Unfortunately in this case we cannot just look at one of the maps and check it against the other because:
	// - if there exist more characters in the other we won't know it
	// - if there exists the same count of characters even if
	//   they're different there could be a chance that the intersection has the same count thus giving us a false positive.
	for(let [charS, countCharS] of mapS) {
		if(mapT.get(charS) !== countCharS) return false;
	}

	for(let [charT, countCharT] of mapT) {
		if(mapS.get(charT) !== countCharT) return false;
	}

	return true;
};