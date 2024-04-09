"use strict";

// /**
//  *
//  * @param {list} list
//  * @returns sum of squares
//  */
// const computeSumOfSquares = (list) =>
//   list.map((item) => Math.pow(item, 2)).reduce((acc, curr) => (acc += curr), 0);

// /**
//  *
//  * @param {list} list
//  * @returns all odd numbers in the list
//  */
// const printOddNumbersOnly = (list) => list.filter((item) => item % 2 !== 0);

// /**
//  *
//  * @param {n} n
//  * @returns true if n is a perfect square
//  */
// const isPerfectSquare = (n) => {
//   const sqrt = Math.sqrt(n);
//   return Math.floor(sqrt) === sqrt;
// };

// /**
//  *
//  * @param {n} n
//  * @returns true if n is a fibonacci
//  */
// const isFibonacci = (n) =>
//   isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);

// const printFibo = (length, a, b) => {
//   if (length === 0 || !isFibonacci(a) || !isFibonacci(b) || a > b) return "";
//   if (length === 1) return `${a}`;

//   const output = [a, b];

//   for (let index = 2; index < length; index++) {
//     const nextNum = output[index - 2] + output[index - 1];

//     output.push(nextNum);
//   }

//   return output.join(", ");
// };

// const numberListTestData = [1, 2, 3];

// // 1. A
// console.log(computeSumOfSquares(numberListTestData));

// // 1. B
// console.log(printOddNumbersOnly(numberListTestData));

// // 1. C
// console.log(printFibo(6, 2, 3));

// // 2
// let user = {
//   name: "John",
//   years: 30,
// };

// const { name, years: age } = user;

// alert(name); // John
// alert(age); // 30
// alert(isAdmin); // false

// // 3
// let libraryBooks = [
//   { title: "The Road Ahead", author: "Bill Gates", libraryID: 1235 },
//   { title: "Walter Isaacson", author: "Steve Jobs", libraryID: 4268 },
//   { title: "The Road Ahead", author: "Bill Gates", libraryID: 4268 },
//   {
//     title: "Mockingjay: The Final Book of The Hunger Games",
//     author: "Suzanne Collins",
//     libraryID: 3257,
//   },
// ];

// /**
//  *
//  * @param {book} book
//  * @returns the added book
//  */
// const addBook = (book) => {
//   if (!book?.title || !book?.author || !book?.libraryID) {
//     console.error("Missing argument/s");
//     return;
//   }

//   libraryBooks.push(book);

//   return book;
// };

// console.log(
//   addBook({
//     title: "Harry Potter and The Sorcerer's Stone",
//     author: "JK Rowling",
//     libraryID: 1555,
//   })
// );

// /**
//  *
//  * @returns the list of book titles
//  */
// // const getTitles = () => libraryBooks.map((item) => item.title).sort();

// /**
//  *
//  * @returns the list of unique book titles
//  */
// const getTitles = () => [
//   ...new Set(libraryBooks.map(({ title }) => title).sort()),
// ];

// console.log(getTitles());

// /**
//  * @param {title} title
//  * @returns the filtered by book title and sorted by book author
//  */
// const findBooks = (title) => {
//   return libraryBooks
//     .filter(({ title: bookTitle }) => bookTitle === title)
//     .sort((a, b) => a.author - b.author);
// };

// console.log(findBooks("The Road Ahead"));

let x;
var a = 5;
var b = 10;
var c = function (a, b, c) {
  console.log(x);
  console.group(a);
  var f = function (a, b, c) {
    b = a;
    console.log(b);
    b = c;
    var x = 5;
  };

  f(a, b, c);
  console.log(b);
  var x = 10;
};

c(8, 9, 10);
console.log(b);
console.log(x);
