//3.b
function random() {
    return new Promise(function(resolve) {
        var timeout = Math.random()*3000;
        setTimeout(function(){
            resolve(Math.random()*3);
        }, timeout)
    })
}

Promise.all([random(), random(), random(), random(), random(), random(), random()]).then((res) => {
    console.log(res);
})

