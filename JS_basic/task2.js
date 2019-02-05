// 7. Every & some

function every(arr, func) {
    for (var i = 0; i< arr.length; i++) {
        if (!func(arr[i])) return false;
    }
    return true;
}

function some (arr, func){
    for (var i=0; i<arr.length; i++){
        if (func(arr[i])) return true;
    }
    return false;
}


console.log(every([1, 4, NaN, 6], Number.isNaN));
console.log(every([NaN, NaN], Number.isNaN));
console.log(some([1, 2, 6], Number.isNaN));
console.log(some([1, 4, NaN, 6], Number.isNaN));

// 8. Repeat

function multiplyOrThrow(a, b) {
    if (Math.random() < 0.5) {
        return a * b;
    } else {
        throw 'MultiplicatorUnitFailure';
    }
}
function repeat(a,b) {
    try {
        return multiplyOrThrow(a, b);
    }
    catch (err) {
        return repeat(a, b);
    }
}
console.log(repeat(2, 5));

// 9. Qoutes in text

function replaceQuotes(string) {
    return string.replace(/'/g ,'"');
}
console.log(replaceQuotes('I`m the \'hero\''));

// 10. Find numbers

function findNumbers(arr) {
    var result = [];
    for (var i=0;i<arr.length; i++){
        var el = arr[i];
        var isValid = /^(\+|-)\d|\d|[eE]|\./.test(el);
        if (isValid) {
            result.push(el);
        }
    }
    return result;
}

console.log(findNumbers(['1', '-1', '+15', '1.55', '.5', '5.', '1.3e2', '1E-4', '1e+12']));
console.log(findNumbers(['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.']));

// 11. Day and monnth

function getNames(date) {
    var dayOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    var month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    return month[date.getMonth()] + ', ' + dayOfWeek[date.getDay()];
}

console.log(getNames(new Date()));

// 12. Difference in years

function differenceInYears(date1, date2) {
    if (date2>date1) {
        var difference = (date2.getTime() - date1.getTime())/(1000 * 3600 * 24)/365;
    }
    else {
        difference = (date1.getTime() - date2.getTime())/(1000 * 3600 * 24)/365;
    }
    return difference.toFixed(1);
}

console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 5, 2)));
console.log(differenceInYears(new Date(2014, 0), new Date(2014, 6)));
