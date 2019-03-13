function Vehicle(speed) {
    this.speed = speed;
}

Vehicle.prototype.getSpeed = function () {
    return this.speed;
}

function Bike() {
    Vehicle.apply(this, arguments);
    this.wheelsCount = 2;
}

Bike.prototype = Object.create(Vehicle.prototype);
Bike.prototype.constructor = Bike;

var bike = new Bike(100);
console.log(bike.getSpeed())
console.log(bike instanceof Vehicle)


function Car() {
    Vehicle.apply(this, arguments);
    this.wheellsCount = 4;
    this.doorsCount = 4;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

var car = new Car(100);
console.log(car);

function MonsterTruck(speed, wheelSize) {
    Car.apply(this, arguments);
    this.wheelSize = wheelSize;
    this.doorsCount = 2;
}

MonsterTruck.prototype = Object.create(Car.prototype);
MonsterTruck.prototype.constructor = MonsterTruck;

var monsterTruck = new MonsterTruck(50, 10);
console.log(monsterTruck)