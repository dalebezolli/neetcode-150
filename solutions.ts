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

// 1. Two Sum
// https://leetcode.com/problems/two-sum/description/
//
// Q:
// Given an array of integers (nums) and an integer (target) return two indices that add up to the target.
//
// A:
// > Brute Force
// In theory the way we're going to make sure we have two numbers equaling to a total would be to just add them up and see... right?
// We can go on every number in the array and add it with aaaaaaaaaaaaaaaaall other numbers, every time checking if it's the same as the target.
//
// I'm assuming it's slef explanatory that if we're in the i'th index, we don't need to add the number with every previous number and itself... as:
// - adding the previous numbers would be redundant
// - adding itself would cause inaccuracies
//
// As we're checking every number with every other that means n*n = n^2 = O(n^2)
// We're not creating any extra data proportional to our input thus we have a static space complexity O(1)
//
// > Hashing
// Something interesting about numbers is the fact that if we subtract the target with a number, we will know what number we're missing.
// The only thing we'd need to make our algorithm faster would be to somehow know exactly where the numbers in the array are stored.
// The best way to achieve this would be to store our numbers in a hashmap, then in every index we'll find the missing number and verify if it exists.
//
// We need to create a map "O(n)" which then we'll use to loop through our array "O(n)" making our time complexity O(n)
// The space complexity though takes a toll because of the map making it O(n).

function twoSumBruteForce(nums: number[], target: number): number[] {
	for(let i = 0; i < nums.length - 1; i++) {
		for(let j = i + 1; j < nums.length; j++) {
			if(nums[i] + nums[j] === target) return [i, j];
		}
	}

	return [-1, -1];
};

function twoSumHashing(nums: number[], target: number): number[] {
	let mappedNums = new Map();

	for(let i = 0; i < nums.length; i++) {
		let expectedNum = target - nums[i];
		if(mappedNums.has(expectedNum)) {
			return [mappedNums.get(expectedNum), i];
		}

		mappedNums.set(nums[i], i);
	}

	return [-1, -1];
};

// 49. Group Anagrams
// https://leetcode.com/problems/group-anagrams/description/
//
// Q:
// Find all the similar anagrams in an array and group them.
//
// Constraints:
// each word contains only lowercase characters a-z.
//
// Breakdown:
// We first need to break down the problem to two parts:
// - what are anagrams?
// - how can we find similar anagrams?
//
// A word, mathematically, is an anagram of another when it has the exact same frequencies per character with the other.
// This means that to find if a word is an anagram of another we can just count the frequencies of each character and compare them with another.
//
// In it's core we'll have a function that converts a string into an array of character frequencies. It will work by mapping each character in an index from
// 0 to 25 with a -> 0, b -> 1, ...
// This is possible by subtracting the ascii code with 97.
//
// A:
// > Brute Force
// We can check the current word with all the first words in the array of anagrams. If it matches with a word, we add it in that array, 
// otherwise we add it to the end of the list.
//
// The conversion to a frequency array takes O(n), we then need to check each frequency with the rest of the frequencies.
// This means n*m iterrations where n is the length of the string and m the total count of strings. Thus O(n*m) time complexity.
//
// If we consider the result array in the space complexity we'd have O(m), otherwise we'd have O(1).
//
// > Hashing
// We can convert the frequency array into a key for a map. This will help us to find identical anagrams in O(1). This will improve in both the
// conversions to frequency arrays as we won't need to do it every time significantly improving the total time as well as the time complexity to O(m).
//
// The space complexity remains as O(m) regardless if we consider the resulting array in it as we now need a map.

function groupAnagramsBruteForce(strs: string[]): string[][] {
	let result: string[][] = [];

	for(const str of strs) {
		let currFreq = calculateFreqArray(str);

		let found = false;
		for(let anagramGroup of result) {
			let anagramGroupFreq = calculateFreqArray(anagramGroup[0]);
			if(isFreqEqual(currFreq, anagramGroupFreq)) {
				found = true;
				anagramGroup.push(str);
			}
		}

		if(!found) {
			result.push([str]);
		}
	}

	return result;

	function isFreqEqual(aFreq: number[], bFreq: number[]) {
		for(let i = 0; i < 26; i++) {
			if(aFreq[i] !== bFreq[i]) return false;
		}

		return true;
	}

	function calculateFreqArray(str: string): number[] {
		let freq = new Array(26).fill(0);

		for(let char of str) {
			freq[char.charCodeAt(0) - 97]++;
		}

		return freq;
	}
};

function groupAnagramsHashing(strs: string[]): string[][] {
	let mapAnagrams: Map<string, string[]> = new Map();

	for(const str of strs) {
		const strAnagram = calculateFreqArray(str);
		const strAnagramKey = strAnagram.join(';');

		let groupAnagrams = mapAnagrams.get(strAnagramKey);

		if(groupAnagrams) {
			groupAnagrams.push(str);
		} else {
			mapAnagrams.set(strAnagramKey, [str]);
		}
	}

	return Array.from(mapAnagrams.values());

	function calculateFreqArray(str: string): number[] {
		let freq = new Array(26).fill(0);

		for(let char of str) {
			freq[char.charCodeAt(0) - 97]++;
		}

		return freq;
	}
};

// 347. Top K Frequent Elements
// https://leetcode.com/problems/top-k-frequent-elements/description/
//
// Q:
// Given an array of integers, return the top k most frequent.
//
// A:
// > NlogNStableSort
//
// As the number of frequent elements is variable, we should ideally write a general algorithm which would find the appropriate solution.
// For this we could write a simple sorting algorithm that sorts based on the occurance count of each number. For this to be possible we need to count the occurances for each number,
// that can best be done using a map.
//
// Once we have the map we'll convert it into an array of tuples which will hold as the first value the number and the second will be it's frequency. With it we'll write a custom merge
// sort.
//
// The time complexity to count occurances is O(n) using a map, then to convert to an array it will take O(n) time and for us to merge sort we'll need O(nlogn) making our algorithm have a
// final time complexity of O(nlogn).
//
// The space complexity in every step is always proportional to the input making it O(n).
//
// > Histogram
//
// One idea that lowers the complexity would be to constantly rank the numbers based on their occurances, sort of like creating a histogram we'll rank all numbers.
// The best example of what that would look is the following:
//
// Example array: [1, 3, 2, 1, 1, 2]
// Historgram representation:
//
// x
// x x
// x x x
// -----
// 1 2 3
//
// We can practically think of each slice of the histogram as an array, and the entire histogram as an array of slices, which means that we can represent this using a 2d dynamic array.
// While we loop though our data we'll insert each occurance of a number in the appropriate level/slice. But we need to somehow know where to insert the data at (i.e. know how many occurances we have).
// This means we also need a map to keep track of our occurance count for each number.
//
// Once we finish, we just need to go backwards from the first element until we find the k most frequent.
//
// This algorithm will run once through all our data, and k through the data we created making it practically a O(n+k) algorithm.
// Althgouh if we consider the worst case we'll find that we want ALL the numbers of the array making it an O(2n) = O(n).
// We'll be creating one array to store our numbers O(n) and another to keep track of the frequency of occurances O(n). I'd consider it a worst case of O(2n) = O(n).

function topKFrequentNlogNStableSort(nums: number[], k: number): number[] {
	type numberfreq = [number, number];
	let frequencyMap = new Map();

	for(const num of nums) {
		frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1);
	}

	let numWithFrequencies: numberfreq[] = Array.from(frequencyMap);
	console.log('Before sort:', numWithFrequencies);
	freqMergeSort(numWithFrequencies, 0, numWithFrequencies.length - 1);
	console.log('After sort:', numWithFrequencies);

	let result: number[] = [];

	for(let i = 0; i < k; i++) {
		result.push(numWithFrequencies[numWithFrequencies.length - 1 - i][0]);
	}

	return result;

	function freqMergeSort(array: numberfreq[], left: number, right: number) {
		if(left >= right) return;

		const mid = left + Math.floor((right - left) / 2);
		freqMergeSort(array, left, mid);
		freqMergeSort(array, mid + 1, right);

		let leftArr: numberfreq[] = [];
		let rightArr: numberfreq[] = [];

		for(let i = left; i <= mid; i++) {
			leftArr[i - left] = array[i];
		}

		for(let i = mid + 1; i <= right; i++) {
			rightArr[i - (mid + 1)] = array[i];
		}

		console.log(`Left: ${left} Right: ${right} Mid: ${mid}`);
		console.log(`LeftArr: ${JSON.stringify(leftArr)} RightArr: ${JSON.stringify(rightArr)}`);

		let pos = left;
		let leftPos = 0;
		let rightPos = 0;
		while(leftPos < leftArr.length && rightPos < rightArr.length) {
			if(leftArr[leftPos][1] < rightArr[rightPos][1]) {
				array[pos++] = leftArr[leftPos++];
			} else {
				array[pos++] = rightArr[rightPos++];
			}
		}

		while(leftPos < leftArr.length) {
			array[pos++] = leftArr[leftPos++];
		}

		while(rightPos < rightArr.length) {
			array[pos++] = rightArr[rightPos++];
		}
	}
}

function topKFrequentHistogram(nums: number[], k: number): number[] {
	let frequencyNums = new Map<number, number>();
	let histogram: number[][] = [];

	for(const num of nums) {
		frequencyNums.set(num, (frequencyNums.get(num) ?? 0) + 1);
		if(histogram.length < frequencyNums.get(num)!) {
			histogram.push([]);
		}

		histogram[frequencyNums.get(num)! - 1].push(num);
	}

	let results = new Set<number>();
	let currHeight = histogram.length - 1;
	let currIndex = 0;
	while(currHeight >= 0 && results.size < k) {
		if(currIndex >= histogram[currHeight].length) {
			currHeight--;
			currIndex = 0;
			continue;
		}

		results.add(histogram[currHeight][currIndex]);
		currIndex++;
	}

	return Array.from(results);
}

// 271. Encode and Decode Strings
// https://leetcode.com/problems/encode-and-decode-strings
//
// Q:
// Given an input array of strings encode it and return the encoded string. Then given the encoded string we must be able to decode it back to the original structure.
//
// A:
// > Naive
// Encode function
// We can use a character as a delimter with it we can easily join all the strings without worrying too much.
// A good delimiter would be something that the user shoudn't have access to from the keyboard, potentially a non ascii character like a nbsp.
//
// The time complexity for this algorithm is O(m) where m is the number of strings in the array while the space complexity if we don't consider the output is O(1).
//
// Decode function
// We can then take the delimiter and use it to find each word, with it we can split all the strings again and return the array.
//
// The time complexity is O(n) where n is the number of characters in the encode string (which is proportional to the character count of all the input strings) and the space complexity O(1).
//
// > Length Encoded
// To remove the restriction of not being able to use a specific character in our strings, we can use the length of the strings as our key information piece.
// We can store the length of each string, and then the string itself which will allow us to get up to the correct string.
// We still need to use a delimiter as we won't know where the string itself starts.
// Eg:
// 1032Ab
//
// we can therfore convert the encoded string to
// 1;03;2Ab
//
// The time complexity for this algorithm is O(m) where m is the number of strings in the array while the space complexity if we don't consider the output is O(1).
//
// The time complexity of decoding is O(n) where n is the number of characters in the encode string (which is proportional to the character count of all the input strings) and the space complexity O(1).
//
// > Length Encoded Optimized
// We can further optimize the code above with a really interesting concept. String in JavaScript are immutable, meaning that every time we concatenate a string with another, we reallocate a new space in
// memory where both strings will be copied to rendering the previous space as trash. You can easily see that in the code of the previous solution, we have a potential concatenation in every step of the way.
// To improve the code, we'll keep track of a starting and ending index. When we need to work with the data, we'll extract it using any string slicing techique avaliable in the language.
//
// Another improvement we can do is identify the string that we'll decode once we see the delimeter. This will simplify the state of the decode function and make it more maintainable in the future.
//
// Notes:
// - Attempt to think of and write the solution by hand (especially when we have state in a logic) before you write a single line of code.
// - Think of potential edge cases and expand the resolution in a hypothetical scenario.

class EncoderNaive {
	private delimiter = ' ';

	encode(strs: string[]): string {
		let output = '';

		for(let i = 0; i < strs.length; i++) {
			output += strs[i] + this.delimiter;
		}

		return output;
	}

	decode(str: string): string[] {
		let output: string[] = [];
		let currStr = '';

		for(let i = 0; i < str.length; i++) {
			if(str[i] === this.delimiter) {
				output.push(currStr);
				currStr = '';
				continue;
			}

			currStr += str[i];
		}

		return output;
	}
}

class EnocderLengthEncoded {
	private delimiter = ';';

	encode(strs: string[]): string {
		if(strs.length === 0) return '';
		let output = '';
		
		for(let i = 0; i < strs.length; i++) {
			output += strs[i].length + this.delimiter + strs[i];
		}

		return output;
	}

	decode(str: string): string[] {
		let output: string[] = [];

		let isCountReady = false;
		let currString = '';
		let strLength = '';
		let currLength = 0;

		let i = 0;
		while(i <= str.length) {
			if(!isCountReady && str[i] === this.delimiter) {
				currLength = parseInt(strLength);

				isCountReady = true;
				strLength = '';
				i++;
				continue;
			}

			if(!isCountReady) {
				strLength += str[i];
				i++;
				continue;
			}

			if(currLength > 0) currString += str[i];
			currLength--;

			if(currLength <= 0) {
				output.push(currString);

				isCountReady = false;
				currString = '';
			}

			if(currLength >= 0) {
				i++;
			}
		}

		return output;
	}
}

class EnocderLengthEncodedOptimized {
	private delimiter = ';';

	encode(strs: string[]): string {
		if(strs.length === 0) return '';
		let output = '';
		
		for(let i = 0; i < strs.length; i++) {
			output += strs[i].length + this.delimiter + strs[i];
		}

		return output;
	}

	decode(str: string): string[] {
		let output: string[] = [];

		let currLength = 0;
		let startPos = 0;
		let endPos = 0;

		let i = 0;
		while(i <= str.length) {
			if(str[i] === this.delimiter) {
				currLength = parseInt(str.slice(startPos, endPos + 1));

				startPos = endPos + 2;
				endPos = startPos + currLength;

				if(startPos === endPos) {
					output.push('');
				} else {
					output.push(str.slice(startPos, endPos));
				}

				startPos = endPos;
				endPos = startPos;
				i = startPos;
				continue;
			}

			endPos = i;
			i++;
		}

		return output;
	}
}

// 238. Product of Array Except Self
// https://leetcode.com/problems/product-of-array-except-self/description/
//
// Q:
// Return an array that is the product of all elements except the current index's element.
//
// Constraints:
// O(n) without using division
//
// A:
// > Naive
// We can just loop through the array for every position we're in, we can loop again through the array to calculate the product.
// The only thing we need to check for is if we're in the same position in both loops, if that's the case we just skip that number.
//
// As we're looping through each number for every position this gives us a time complexity of O(n^2) which should TLE
// and a space complexity of O(1) if we disregard the resulting array.
//
// > Product Arrays
// To figure out the product of all numbers in a given position, we just need to know the product of all previous numbers and all subsequent numbers.
// Then by multiplying these two numbers we can find the product of that position.
//
// Consider the following example:
//  1  2  3  4
// the resulting output would be the following:
// 24 12  8  6
//
// what happens if we calculate the product of the previous elements in the array? we get the following array:
//  1  1  2  6
//
// what happens if we calculate the product of the next elements in the array? we get the following array:
// 24 12  4  1
//
// This shows us that for every position we can know the product of all the previous elements, and the prodct of all subsequent elements which allows us to calculate the resulting array.
//
// We first calculate the prod of all leftward elements O(n), then we calculate rightward O(n) and finally we just multiply both arrays O(n) as all these operations are sequential we have a totaling
// time complexity of O(n) and a space complexity of O(n) as well.
//
// > Memory Optimized Product Arrays
// What if we hold our result for the left sum in the result array? This would result in us skipping the storage of left products.
// Can we somehow skip the calculation for a right array?
//
// If we calculate the rightward product in a variable, we can easily emulate the same logic.

function productExceptSelfNaive(nums: number[]): number[] {
	let result = new Array(nums.length).fill(1);

	for(let i = 0; i < nums.length; i++) {
		for(let j = 0; j < nums.length; j++) {
			if(i === j) continue;

			result[i] *= nums[j];
		}
	}

	return result;
};

function productExceptSelfProductArrays(nums: number[]): number[] {
	let result = new Array(nums.length);
	let leftProducts  = new Array(nums.length).fill(1);
	let rightProducts = new Array(nums.length).fill(1);

	for(let i = 1; i < nums.length; i++) {
		leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
	}

	for(let i = nums.length - 2; i >= 0; i--) {
		rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
	}

	for(let i = 0; i < nums.length; i++) {
		result[i] = leftProducts[i] * rightProducts[i];
	}

	return result;
}

function productExceptSelfOptimizedProductArrays(nums: number[]): number[] {
	let result = new Array(nums.length).fill(1);

	for(let i = 1; i < nums.length; i++) {
		result[i] = result[i - 1] * nums[i - 1];
	}

	//  1
	//  1  2  3  4
	//  1  1  2  6
	let rightProduct = 1;
	for(let i = nums.length - 1; i >= 0; i--) {
		result[i] *= rightProduct;
		rightProduct *= nums[i];
	}

	return result;
}

// 36. Valid Sudoku
// https://leetcode.com/problems/valid-sudoku/description/
//
// Q:
// Validate a sudoku board with the following rules:
// - A row must contain only one instance of 1-9
// - A column must contain only one instance of 1-9
// - A 3x3 box must contain only one instance of 1-9
//
// A:
// > Brute Force
// Let's have all the checks split for simplicity.
// Row validation will work in the following way:
//	Once we're in a non-empty cell we'll loop throuh each item in that row and verify that there's no other row that's the same.
//
// Column validation will work in a similar way, but we'll loop through cells.
//
// To create box validation we'll need to identify when we're in a block.
//
// Practically we need to map each index to a number.
// Let's begin by mapping a position to a box in the sudoku. This is the exact same like mapping a 2d array to a 1dimensional array's indices.
// We first need to know how many boxes are in a row of sudoku, which can be easily identified by dividing the number of cells in a row with the cells of a single box.
//
// In a 9x9 sudoku we'll have 9/3 = 3 boxes in a row.
//
// With this we can use the size of a box to calculate each index's box with the following formula:
// floor(x / 3) + floor(y / 3) * boxes in a row
//
// Now that we have this we just need to figure out a way to loop through the indices of a box. This is achieved again by mapping a boxes index and 1-9 to a position in the sudoku array.
// Which is almost like mapping a 1d array to a 2d array, which can be done with the formula:
// y: floor(i/3)
// x: i%3
//
// But we also need to offset them by the boxes x and y which are given to us in a similar fashion
// offsetY: floor(boxI/boxes in a row) * boxes in a row
// offsetX: boxI%boxes in a row * boxes in a row
//
// Which means that in total we have the following formulas:
// offsetY + y = floor(boxI/boxes in a row) * boxes in a row + floor(i/3)
// offsetX + x = boxI%boxes in a row * boxes in a row + i%3
//
// Now that we have these we'll work in a similar fashion but for each box.
//
// Every time we go to an index we need to look at all the groups indices. This means that we have an n^2 runtime for every group and with m groups we have a m*n^2 runtime which means O(n^2).
// (The group count "m" for a row and a column is 9 whereas for the boxes is 4 in a 9x9 sudoku thus it can be considered static and can further explain the O(n^2))
// The space complexity though is O(1) as we're not allocating anything proportional to our input.
//
// > Sets
// We can easily see that this solution is not that performant. While it has plenty of optimizations that we can do to it i'd consider the biggest one would come from the way the checks are being handled.
// We can use a set to keep track of all the existing groups data, giving us an O(1) check for duplicates. This means that our algorithm is still O(n^2) but if you remember we had calculated in the
// runtime a number m, which even though is considered insignificant in big-O notation, in this case it's very significant.
//
// Because of this change we can also more easily merge the 3 checks, making it so that we have only one big loop that traverses through the numbers. Which we'll then map to the appropriate groups.
// The mappings will work as follows:
// The correct row set will be retrieved using the Y coord and in the set we'll append the current element
// The correct col set will be retrieved using the X coord and in the set we'll append the current element.
// The correct box set will be retrieved using the 1d box mapping, meaning: floor(x / 3) + floor(y / 3) * boxes in a row

function isValidSudokuBruteForce(board: string[][]): boolean {
	const side = board.length;

	let areRowsValid = true;
	for(let y = 0; y < side; y++) {
		for(let x = 0; x < side; x++) {
			for(let xCheck = 0; xCheck < side; xCheck++) {
				if(x === xCheck) continue;
				if(board[y][x] === '.') continue;
			
				if(board[y][x] === board[y][xCheck]) areRowsValid = false;
			}
		}
	}

	if(!areRowsValid) return false;

	let areColsValid = true;
	for(let x = 0; x < side; x++) {
		for(let y = 0; y < side; y++) {
			for(let yCheck = 0; yCheck < side; yCheck++) {
				if(y === yCheck) continue;
				if(board[y][x] === '.') continue;

				if(board[y][x] === board[yCheck][x]) areColsValid = false;
			}
		}
	}

	if(!areColsValid) return false;

	let areBoxesValid = true;

	const boxesInRow = side / 3;
	const totalBoxes = boxesInRow*boxesInRow;
	for(let iBox = 0; iBox < totalBoxes; iBox++) {
		const offsetY = Math.floor(iBox/boxesInRow) * boxesInRow;
		const offsetX = iBox%boxesInRow * boxesInRow;

		for(let i = 0; i < side; i++) {
			for(let iCheck = 0; iCheck < side; iCheck++) {
				if(i === iCheck) continue;

				const posY = offsetY + Math.floor(i/3);
				const posX = offsetX + i%3;
				if(board[posY][posX] === '.') continue;

				const checkPosY = offsetY + Math.floor(iCheck/3);
				const checkPosX = offsetX + iCheck%3;

				if(board[posY][posX] === board[checkPosY][checkPosX]) areBoxesValid = false;
			}
		}
	}

	if(!areBoxesValid) return false;

	return true;
};

function isValidSudokuSets(board: string[][]): boolean {
	const BOX_SIZE = 3;

	const size = board.length;
	const boxesInRow = board.length / BOX_SIZE;
	const boxes = boxesInRow * boxesInRow;

	let rowChecks: Set<string>[] = new Array(size);
	let colChecks: Set<string>[] = new Array(size);
	let boxChecks: Set<string>[] = new Array(boxes);

	const boxIndex = (x: number, y: number) => Math.floor(x / BOX_SIZE) + Math.floor(y / BOX_SIZE) * boxesInRow;

	for(let i = 0; i < size; i++) {
		rowChecks[i] = new Set();
		colChecks[i] = new Set();
	}

	for(let i = 0; i < boxes; i++) {
		boxChecks[i] = new Set();
	}

	for(let y = 0; y < size; y++) {
		for(let x = 0; x < size; x++) {
			if(board[y][x] === '.') continue;
			if(rowChecks[y].has(board[y][x])) return false;
			if(colChecks[x].has(board[y][x])) return false;
			if(boxChecks[boxIndex(x, y)].has(board[y][x])) return false;

			rowChecks[y].add(board[y][x]);
			colChecks[x].add(board[y][x]);
			boxChecks[boxIndex(x,y)].add(board[y][x]);
		}
	}

	return true;
}

// 128. Longest Consecutive Sequence
// https://leetcode.com/problems/longest-consecutive-sequence/description/
//
// Q:
// Given an unsorted array of nums, return the length of the longest consecutive sequence as if they were sorted.
//
// Constraints:
// nums.length: [0, 10^5]
// nums[i]: [0, 10^9]
// Must run in O(n)
//
// A:
// > Brute Force
// What if we could sort the array? If so what would the logic be to find the longest consecutive sequence?
// After sorting, which would take O(nlogn) we could just loop through the array and keep track of the length of the current sequence.
//
// Unfortunately we cannot efficiently use Radix Sort here as it would worsen the performance of the algoritm, but if we feel like it it's technically possible.
//
// If a sequence breaks we won't reuse it as it will never connect with another, which means there's no reason to go back to previous indices.
//
// The time complexity is O(n) for this logic but with the sorting we conclude with an O(nlogn) time complexity for the algorithm.
// The space complexity is O(1)
//
// > Sets
// An interesting idea that we can follow has to do with the way a sequence is structured. All sequences must have a start and an end, which could very well be the same number
// but that's irrelevant. What's interesting from this is that we can, based on a number know what should be the exact previous and next number. This means that if we
// bump into a number eg 4 we know that the next one should always be 5. We just need a way to know if the next and previous number exist in our data.
// To do so we can use a set to store our numbers. Then we can just look if the next numbers exist, and keep following that trail until we hit a wall.
//
// There's no practical reason to look at both directions as the preformance won't improve. Worst case we could see us looping through our data in a similar fashion as bubble sort,
// which would result in a worst case time complexity O(n^2).
// The space complexity increases now to O(n) because of the set.
//
// > Maps
// What if we could keep track of where we've been though? This means we are going to use a map which we'll look at both directions in.
// If we find our sequence stops in both directions and while we're following the sequence update the map correctly to keep track of what we've seen. We'll ALWAYS go through each number
// at most once, making it an O(n) time complexity.

function longestConsecutiveBruteForce(nums: number[]): number {
	if(nums.length === 0) return 0;

	let maxLength = 1;
	nums.sort((a, b) => a - b);

	let currentLength = 1;
	let prevIncreasingIndex = 0;
	for(let i = 1; i <= nums.length; i++) {
		if(i !== nums.length && nums[i] - nums[prevIncreasingIndex] === 0) continue;

		if(i === nums.length || nums[i] - nums[prevIncreasingIndex] !== 1) {
			maxLength = Math.max(maxLength, currentLength);
			currentLength = 1;
			prevIncreasingIndex = i;
			continue;
		}

		currentLength++;
		prevIncreasingIndex = i;
	}

	return maxLength;
};

function longestConsecutiveSet(nums: number[]): number {
	let setNums = new Set<number>();

	for(const num of nums) {
		setNums.add(num);
	}

	let maxConsecutive = 0;
	for(const num of nums) {
		let currConsecutive = 1;
		let trailNum = num;
		while(setNums.has(trailNum - 1)) {
			trailNum--;
			currConsecutive++;
		}

		maxConsecutive = Math.max(maxConsecutive, currConsecutive);
	}

	return maxConsecutive;
}

function longestConsecutiveMap(nums: number[]): number {
	let visitedNums = new Map<number, boolean>();

	for(const num of nums) {
		visitedNums.set(num, false);
	}

	let maxConsecutive = 0;
	for(const num of nums) {
		if(visitedNums.get(num) === true) continue;
		visitedNums.set(num, true);
		
		let currConsecutive = 1;
		let trailNum = num;
		while(visitedNums.has(trailNum - 1)) {
			visitedNums.set(trailNum - 1, true);
			trailNum--;
			currConsecutive++;
		}

		trailNum = num;
		while(visitedNums.has(trailNum + 1)) {
			visitedNums.set(trailNum + 1, true);
			trailNum++;
			currConsecutive++;
		}

		maxConsecutive = Math.max(maxConsecutive, currConsecutive);
	}

	return maxConsecutive;
}
