
var innerNav = document.getElementsByClassName('chart-btn');
var charts = document.getElementsByClassName('chart');

var counter = 0;
function switchChart() {
    for (let i=0; i<innerNav.length; i++){
        if (i===counter){
            innerNav[i].classList.add('checked');
            charts[i].classList.add('visible');
        } else {
            innerNav[i].classList.remove('checked');
            charts[i].classList.remove('visible');
        }
    }
}
for (let i=0; i<innerNav.length; i++) {
    innerNav[i].addEventListener('click', function () {
        counter= i;
        switchChart(i);
        switchChart(counter);
    });
}

const APP_ID = 'e52f9d6625f3bb7f6633e0857f9acce9';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${APP_ID}&q=`;
// const FORECAST_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=RU&APPID=${APP_ID}&q=`;
const AIRPOLLUTION_DETAILS_ENDPOINT = `https://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=${APP_ID}`;
const defaultCity = 'izhevsk';
const page = {
    init() {
        this.getWeatherDetails(defaultCity, this.render);
        this.getAirPollution(defaultCity, this.renderAirPollution);
        // this.getForecast(defaultCity, this.renderForecast);

        const searchField = document.getElementById('search');

        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render);
        });
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
    getAirPollution(city, callback){
        const url = `${AIRPOLLUTION_DETAILS_ENDPOINT}`;
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
    // getForecast(city, callback){
    //     const url = `${FORECAST_DETAILS_ENDPOINT}${city}`;
    //     const xhr = new XMLHttpRequest();
    //     xhr.onload = function() {
    //         if (this.readyState === 4 && this.status === 200){
    //             console.log(JSON.parse(xhr.responseText));
    //             callback(JSON.parse(xhr.responseText));
    //         }
    //     };
    //
    //     xhr.open('GET', url, true);
    //     xhr.send();
    // },
    render(data){
        const city = data.name;
        const country = data.sys.country;
        const currentTemp = Math.round(data.main.temp);
        const iconName = data.weather[0].icon;
        const humidity = data.main.humidity;
        const wndSpd = data.wind.speed;
        const weatherCond = data.weather[0].description;
        const date = new Date();

        console.log('current day: ', new Date(1547795276 * 1000).getDate());
        document.getElementById('location').innerHTML = `${city}, ${country}`;
        document.getElementById('current-temp').innerHTML = `${currentTemp}&deg;C`;
        document.getElementById('current-weather-img').src = `http://openweathermap.org/img/w/${iconName}.png`;
        document.getElementById('humidity').innerHTML = `Влажность: ${humidity}%`;
        document.getElementById('wnd-spd').innerHTML = `Ветер: ${wndSpd} км/ч`;
        document.getElementById('weather-cond').innerHTML = `${weatherCond}`;
        document.getElementById('day-week').innerHTML = date.toLocaleDateString('ru-Ru', {weekday: 'long'});
    },
    renderAirPollution(data){
        const pollution = data.data[4].value;

        document.getElementById('pollution').innerHTML = `Загрязнение воздуха: ${pollution}`;

    }
    // renderForecast(data){
    //     const newDt = [];
    //     for (var i=0; i<data.list.length; i++){
    //         newDt.push(data.list[i].dt);
    //     }
    //     let todayDt = [];
    //     const date = Date.now();
    //     for (i=0; i<newDt.length; i++) {
    //             let slice = newDt.slice(0, 9);
    //             todayDt.push(slice[i]);
    //     }
    //
    //     function arraySum(array){
    //         var sum = 0;
    //         for(let i = 0; i < array.length; i++){
    //             sum += array[i];
    //         }
    //         console.log(sum);
    //     }
    //     todayDt = todayDt.filter(el => !!el);
    //     arraySum(todayDt);
    //     console.log(date);
    //     console.log(newDt);
    //     console.log(todayDt);
    // }
};

page.init();

