//2
function compare(value1, value2) {
    return new Promise((resolve, reject)=>{
        let result = 0;
        if (value1===value2){
            result;
        }
        else if (value2 > value1){
            result = -1;
        }
        else {
            result = 1;
        }
        setTimeout(() => {
            resolve(result);
        }, 1000)
    })

}

compare(2, 2).then(res => {
    console.log(res)
});
