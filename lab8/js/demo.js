function Employee(n, s) {
  this.name = n;
  this.salary = s;
}
Employee.prototype.getName = function () {
  return this.name;
};

Employee.prototype.getSalary = function () {
  return this.salary;
};

function Manager(n, s, b) {
  Employee.call(this, n, s);
  this.bonus = b;
}

Manager.getBonus = function () {
  return this.bonus;
};

Manager.prototype.calcSalary = function () {
  return this.bonus + this.salary;
};

Object.setPrototypeOf(Manager, Employee);
Object.setPrototypeOf(Manager.prototype, Employee.prototype);

let emp1 = new Employee("Wat1", 111);
let emp2 = new Employee("Wat2", 222);

console.log(emp1.getName());

let mgr1 = new Manager("Mgr1", 1000, 11);
let mgr2 = new Manager("Mgr2", 2000, 22);
let mgr3 = new Manager(emp1.getName(), emp1.getSalary(), 22);

console.log(mgr1.calcSalary());
console.log(mgr3);

Array.prototype.show = function () {
  console.log("z");
};

let arr = [1, 2, 3];
arr.show();
