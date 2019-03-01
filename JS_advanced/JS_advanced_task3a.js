// 3a
function random(sumWith) {
    return new Promise(function(resolve) {
        var timeout = Math.random()*3000;
        setTimeout(function(){
            resolve(Math.random()*3+ sumWith);
        }, timeout)
    })
}

random(0)
    .then(number1 => {
        console.log(number1);
        return random(number1);
    })
    .then(number2 => {
        console.log(number2);
        return random(number2);
    })
    .then(result => {
        console.log(result);
    });

