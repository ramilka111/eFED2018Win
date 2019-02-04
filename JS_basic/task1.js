// 1. Char count
function countChar(str, char) {
    var length = str.length;
    var count = 0;
    str = str.toLowerCase();
    char = char.toLowerCase();
    for (n=0; n<length; n++) {
        var c = str.charAt(n);
        if (c==char)
            count++;
    }
    return count;
}
console.log(countChar('Abrakadabra', 'a'));

// 2. Deep compare
function deepCompare(obj1, obj2){
    for (prop in obj1){
        if (obj2.hasOwnProperty(prop)){
            if (obj1[prop] === obj2[prop]) continue; {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}
console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: 2 }));
console.log(deepCompare({ one: 1, two: '2' }, { two: '2' }));
console.log(deepCompare({ one: 1, two: '2' }, { two: '2', one: 1 }));
console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: '2' }));

// 3. Chess board
function help(value) {
    if (value%2===0){
        return '#';
    }
    return ' ';
}
function chessBoard(columns, rows) {
    var board = '';
    for (var row = 0; row<rows; row++) {
        for (var col = 0; col<columns; col++) {
            board = board + help (col + row);
        }
        board = board + '\n';
    }
    return board;
}
console.log(chessBoard(7, 5));

// 4. Array
function makeArray(start, end, step) {
    var a = [];
    step = step || 1;
    let cur = start;
    if (start<end){
        while (cur<=end){
            a.push(cur);
            cur = cur + step;
        }
        return a;
    }
    step = -step;
    while (cur>=end){
        a.push(cur);
        cur = cur + step;
    }
    return a;
}
console.log(makeArray(1, 15, 2));


// 5.1 Reverse Array

function reverseArray(arr) {
    var arr2 = [];
    for (var i = arr.length-1; i>=0; i--){
        arr2.push(arr[i]);
    }
    return arr2;
}
console.log(reverseArray([1, 2, 3, 4]));


// 5.2 ReverseInPlaceArray
function swap(arr, i1, i2) {
    var tmp = arr[i1];
    arr[i1]=arr[i2];
    arr[i2]=tmp;
}

function reverseInPlace(arr) {
    var i1=0;
    var i2=arr.length-1;
    
    while (i1<=i2){
        swap(arr, i1, i2);
        i1++;
        i2--;
    }
    return arr;
}
console.log(reverseInPlace([1, 2, 3, 4]));

// 6. Concat and spread

function mergeArrays(...arr) {
    var newArray = [];
    newArray = [...new Set([...newArray.concat(...arr)])];
    return newArray;

}
console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
console.log(mergeArrays([1, 2], [2, 4], [4, 6]));