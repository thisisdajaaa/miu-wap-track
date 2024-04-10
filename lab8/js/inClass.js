"use strict";

function Person(fname, lname) {
  this.fname = fname;
  this.lname = lname;
}

Person.prototype.display = function () {
  console.log(`${this.fname} ${this.lname}`);
};

Person.compare = function (p1, p2) {
  return p1.fname.localeCompare(p2.fname);
};

function Employee(fname, lname, salary) {
  Person.call(this, fname, lname);
  this.salary = salary;
}

Employee.prototype.display = function () {
  console.log(`${this.fname} ${this.lname} ${this.salary}`);
};

Employee.compare = function (e1, e2) {
  if (e1.salary < e2.salary) return 1;
  if (e2.salary < e1.salary) return -1;

  return 0;
};

Object.setPrototypeOf(Employee, Person);
Object.setPrototypeOf(Employee.prototype, Person.prototype);

const p1 = new Person("was", "that");
const p2 = new Person("shooting", "star");

console.log(p1);
p1.display();
p2.display();

console.log(Person.compare(p1, p2));

const e1 = new Employee("emp1", "emmzz1", 1000);
const e2 = new Employee("emp2", "emmzz2", 2000);

console.log(e1);
e1.display();
e2.display();

console.log(Employee.compare(e1, e2));

console.log(e1 instanceof Employee);
console.log(e1 instanceof Person);
