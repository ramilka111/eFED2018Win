window.onload = function() {
    init();
};
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
            changeDay(i);
            changeDay(activeDay);
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

// window.onload = function() {
//     init();
// };


const APP_ID = 'e52f9d6625f3bb7f6633e0857f9acce9';
const FORECAST_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=RU&APPID=${APP_ID}&q=`;
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${APP_ID}&q=`;
const defaultCity = 'izhevsk';
const page = {
    init: function(){
        this.getWeatherDetails(defaultCity, this.render);
        this.getForecastDetails(defaultCity, this.renderForecast);

        const searchField = document.getElementById('search');

        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render);
        });
    },
    getForecastDetails(city, callback){
        const url = `${FORECAST_DETAILS_ENDPOINT}${city}`;
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState === 4 && this.status === 200){
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    },
    getWeatherDetails(city, callback){
        const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState === 4 && this.status === 200){
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
    },
    renderForecast(data){
        const temp = Math.floor(data.list[1].main.temp);
        const cityImg = data.list[1].weather[0].icon;
        document.getElementById('temp').innerHTML = `${temp}&deg;C`;

    },
    render(data){
        const sunrise = new Date(data.sys.sunrise);
        const sunriseTimeHours = sunrise.toLocaleTimeString({hour: '2-digit', minute:'2-digit'});

        const sunset = new Date(data.sys.sunset);
        const sunsetTimeHours = sunset.toLocaleTimeString({hour: '2-digit', minute:'2-digit'});


        document.getElementById('sunrise').innerHTML = `Восход - ${sunriseTimeHours}`;
        document.getElementById('sunset').innerHTML = `Закат - ${sunsetTimeHours}`;

    },
};

page.init();