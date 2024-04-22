const promise = new Promise((resolve, reject) => {
  console.log(`Promise starts`);
  setTimeout(() => console.log("asd"), 1000);
  resolve(`Promise result`);
  reject("asdaaa");
  console.log(`Promise ends`);
});

console.log(`Code starts`);

promise
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => console.log("finally"));
console.log(`Code ends`);
