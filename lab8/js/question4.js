function Animal(name, speed) {
  this.name = name;
  this.speed = speed;
}

Animal.prototype.run = function (speed) {
  this.speed = speed;
};

Animal.compareBySpeed = function (a1, a2) {
  if (a1.speed > a2.speed) return 1;
  if (a2.speed > a1.speed) return -1;
  return 0;
};

function Rabbit(name, speed) {
  Animal.call(this, name, speed);
}

Rabbit.prototype.hide = function () {
  console.log(`${this.name} hides`);
};

Object.setPrototypeOf(Rabbit, Animal);
Object.setPrototypeOf(Rabbit.prototype, Animal.prototype);

const animal1 = new Animal("Random Animal 1", 100);
const animal2 = new Animal("Random Animal 2", 400);

console.log(animal1);

animal1.run(200);
console.log(animal1);

const animals = [animal1, animal2];
console.log(animals.sort(Animal.compareBySpeed));

const rabbit1 = new Rabbit("Rabbit 1", 600);
const rabbit2 = new Rabbit("Rabbit 2", 700);

rabbit1.hide();
rabbit1.run(800);
console.log(rabbit1);

const rabbits = [rabbit1, rabbit2];
console.log(rabbits.sort(Animal.compareBySpeed));
