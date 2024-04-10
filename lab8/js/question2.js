"use strict";

function Student(firstName, lastName, grades) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.grades = grades;
}

Student.prototype.insertGrade = function (newGrade) {
  this.grades.push(newGrade);
};

Student.prototype.computeAverageGrade = function () {
  return (
    this.grades.reduce((acc, current) => (acc += current), 0) /
    this.grades.length
  );
};

const s1 = new Student("Das", "Wat", [4.0, 4.0, 4.0]);

s1.insertGrade(5.0);

console.log(s1.computeAverageGrade());
console.log(s1);
