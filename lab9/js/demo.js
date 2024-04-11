"use strict";

class Employee {
  #fullName;
  #salary;
  #hireDate;
  static #counter = 0;

  constructor(name, salary, dob) {
    this.#fullName = name;
    this.#salary = salary;
    this.#hireDate = dob;

    Employee.#incCounter();
    this.#display();
  }

  getName() {
    return this.#fullName;
  }

  getSalary() {
    return this.#salary;
  }

  getHireDate() {
    return this.#hireDate;
  }

  get howManyYears() {
    return new Date().getFullYear() - this.getHireDate().getFullYear();
  }

  #display() {
    console.log(this.#fullName, this.#salary);
  }

  static getCounter() {
    return this.#counter;
  }

  static #incCounter() {
    this.#counter++;
  }
}

class Manager extends Employee {
  #bonus;

  constructor(name, salary, dob, bonus) {
    super(name, salary, dob);
    this.#bonus = bonus;
  }

  getBonus() {
    return this.#bonus;
  }

  getSalary() {
    return super.getSalary() + this.#bonus;
  }
}

let emp1 = new Employee("das", 120000, new Date(1997, 12, 30));

console.log(emp1);
console.log(emp1.howManyYears);
console.log(emp1.getName());
console.log(Employee.getCounter());

let manager = new Manager("manager", 400000, new Date(1997, 12, 30), 50000);

console.log(manager);
console.log(manager.howManyYears);
console.log(manager.getSalary());

const map = new Map();
map.set(1, "a");
map.set(2, "b");
map.set(3, "c");

console.log("map", map);

for (const [k, v] of map.entries()) {
  console.log(v);
}

const set = new Set();
set.add(1, "a");
set.add(2, "b");
set.add(3, "c");

for (const [k, v] of set.entries()) {
  console.log(v);
}
