
//5.

function sumWith(number) {
    return this.currentValue += number;
}

var number = 2;
const obj = {
    currentValue: 3
};
const sumWithBinded = sumWith.bind(obj);

console.log(sumWithBinded(number));


