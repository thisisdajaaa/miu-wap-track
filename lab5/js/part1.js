"use-strict";

const max = (x, y) => {
  if (x > y) {
    return x;
  }

  return y;
};

const largestOfThree = (...rest) => {
  if (rest.length != 3) {
    console.error("Invalid argument");
    return;
  }

  let largest = rest[0];

  rest.forEach((item) => {
    if (largest < item) {
      largest = item;
    }
  });

  return largest;
};

const isVowel = (character) => {
  if (character.length != 1 || typeof character !== "string") {
    console.error("Invalid argument");
    return;
  }

  const vowels = ["a", "e", "i", "o", "u"];

  return vowels.some((item) => item === String(character).toLowerCase());
};

const sums = (list) => list.reduce((acc, curr) => (acc += curr), 0);
const multiplies = (list) => list.reduce((acc, curr) => (acc *= curr), 1);

const reverse = (word) => String(word).split("").reverse().join("");

const findLongestWordLength = (words) =>
  words.reduce((acc, curr) => (acc.length < curr.length ? curr : acc), "");

const filteredLongWords = (words, i) => words.filter((item) => item.length > i);

const stringListTestData = ["which", "is", "the", "longest", "word", "here"];
const numListTestData = [1, 2, 3, 4];

console.log(max(6, 2));
console.log(largestOfThree(6, 2, 9));
console.log(isVowel(1));
console.log(sums(numListTestData));
console.log(multiplies(numListTestData));
console.log(reverse("jag testar"));
console.log(findLongestWordLength(stringListTestData));
console.log(filteredLongWords(stringListTestData, 4));
