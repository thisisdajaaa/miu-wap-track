Array.prototype.mySort = function () {
  return this.sort((a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  });
};

const testData = ["Das", "Bas", "Asz"];

console.log(testData.mySort());
