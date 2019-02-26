//4.
function counter() {
    let value = 0;
    return {
        next(){
            value++;
            return value;
        },
        prev(){
            value--;
            return value;
        },
    }
}

const counter1 = counter();
console.log(counter1.next());
console.log(counter1.next());
console.log(counter1.next());
console.log(counter1.prev());