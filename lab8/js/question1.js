"use strict";

let student = {
  firstName: "Das",
  lastName: "Wat",
  grades: [4.0, 4.0, 4.0],
  insertGrade: function (newGrade) {
    this.grades.push(newGrade);
  },
  computeAverageGrade: function () {
    return (
      this.grades.reduce((acc, current) => (acc += current), 0) /
      this.grades.length
    );
  },
};

student.insertGrade(5.0);

console.log(student.computeAverageGrade());
console.log(student);
