
var rightArrow = document.getElementsByClassName('right-arrow');
var leftArrow = document.getElementsByClassName('left-arrow');
var dayBlock = document.getElementsByClassName('day-block');


var curDayName = document.getElementById('current-date');
var curTemp0 = document.getElementById('current-temp0');
var curTemp1 = document.getElementById('current-temp1');
var curTemp2 = document.getElementById('current-temp2');
var curTemp3 = document.getElementById('current-temp3');

var activeDay = 0;

function switchDay(diff) {
    const minValue = 0;
    const maxValue = dayBlock.length - 1;
    const newValue = activeDay + diff;

    if (newValue < minValue) {
        activeDay = maxValue;
    } else if (newValue > maxValue) {
        activeDay = minValue;
    } else {
        activeDay = newValue
    }

    changeDay();
}

function nextDay() {
    switchDay(+1)
}

function prevDay() {
    switchDay(-1)
}

rightArrow[0].addEventListener('click', nextDay);

leftArrow[0].addEventListener('click', prevDay);

function changeDay() {
    for (let i=0; i<dayBlock.length; i++){
        if (i===activeDay){
            dayBlock[i].classList.add('current-day');
            curDayName.innerHTML = model.days[i].name;
            curTemp0.innerHTML = model.days[i].temps[0];
            curTemp1.innerHTML = model.days[i].temps[1];
            curTemp2.innerHTML = model.days[i].temps[2];
            curTemp3.innerHTML = model.days[i].temps[3];
        } else {
            dayBlock[i].classList.remove('current-day');

        }
    }
}

function init() {
    changeDay();
    for (let i=0; i<dayBlock.length; i++) {
        dayBlock[i].addEventListener('click', function () {
            activeDay = i;
            changeDay();
        });
    }
}

var model = {
    currentDay: 0,
    days: [
        {
            name: 'Пт, 20 мая',
            temps: ['+10','+10','+15','+12']

        },
        {
            name: 'Сб, 21 мая',
            temps: ['+10','+18','+15','+12']

        },
        {
            name: 'Вс, 22 мая',
            temps: ['+18','+15','+15','+12']

        },
        {
            name: 'Пн, 23 мая',
            temps: ['+5','+7','+45','+2']

        },
        {
            name: 'Вт, 24 мая',
            temps: ['+10','+10','+15','+12']

        }

    ]
};

window.onload = function() {
    init();
};