const APP_ID = 'e52f9d6625f3bb7f6633e0857f9acce9';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${APP_ID}&q=`;
// const AIRPOLLUTION_DETAILS_ENDPOINT = `https://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=${APP_ID}`;
const FORECAST_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=RU&APPID=${APP_ID}&q=`;
const DEFAULT_CITY = 'izhevsk';
const SPINNER = document.getElementById('spinner');
const OVERLAY = document.getElementById('overlay');
const page = {
    init() {
        this.getWeatherDetails(DEFAULT_CITY).then(res => {
            this.render(res);
        });
        this.getForecastDetails(DEFAULT_CITY).then(res =>  {
            this.renderForecast(res);
            return res;
        }).then(res => {
            console.log('eeeeee', res);
            return this.getAirPollution(res.city.coord).then(res => {
                this.renderAirPollution(res);
            })
        });

        const searchField = document.getElementById('search');

        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            // this.getWeatherDetails(city, this.render);
            this.getWeatherDetails(city).then(res => {
                this.render(res);
            });
            this.getForecastDetails(city).then( res => {
                this.renderForecast(res);
            });
        });
    },

    loadData(url) {
        console.log(url);
        return fetch(url)
          .then(function (res) {
              return res.json();
          })
          .then(res => {
              console.log(res);
              return res;
          })
    },

    getWeatherDetails(city){
        showSpinner();
        const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;

        return this.loadData(url)
            .then(res => {
                hideSpinner();
                return res
            })
    },

    getAirPollution(coord){
        const url = `https://api.openweathermap.org/pollution/v1/co/${Math.round(coord.lon)},${Math.round(coord.lat)}/current.json?appid=${APP_ID}`;
        return this.loadData(url);
    },

    getForecastDetails(city) {
        const url = `${FORECAST_DETAILS_ENDPOINT}${city}`;
        return this.loadData(url);
    },

/*eslint indent:0*/
/*eslint linebreak-style:0*/
    render(data){
        const city = data.name;
        const country = data.sys.country;
        const currentTempValue = Math.round(data.main.temp);
        const iconName = data.weather[0].icon;
        const humidityValue = data.main.humidity;
        const wndSpdValue = data.wind.speed;
        const weatherCondValue = data.weather[0].description;
        const date = new Date();

/*eslint no-console:0*/
        console.log('current day: ', new Date(1547795276 * 1000).getDate());
        document.getElementById('location').innerHTML = `${city}, ${country}`;
        document.getElementById('current-temp').innerHTML = `${currentTempValue}&deg;C`;
        document.getElementById('current-weather-img').src = `http://openweathermap.org/img/w/${iconName}.png`;
        document.getElementById('humidity').innerHTML = `Влажность: ${humidityValue}%`;
        document.getElementById('wnd-spd').innerHTML = `Ветер: ${wndSpdValue} км/ч`;
        document.getElementById('weather-cond').innerHTML = `${weatherCondValue}`;
        document.getElementById('day-week').innerHTML = date.toLocaleDateString('ru-Ru', {weekday: 'long'});
    },

    renderAirPollution(data){
        const pollution = data.data[4].value;

        const pollutionElem = document.getElementById('pollution');
        if (pollutionElem) {
            pollutionElem.innerHTML = `Загрязнение воздуха: ${pollution}`;
        }
    },

    renderForecast(data) {
        const weekDays = formatForecastData(data);
        const dayBlocks = document.querySelectorAll('.day');
        let currentDay = 0;
        for (let day in weekDays){
            const dayOfWeek = dayBlocks[currentDay].querySelector('.day-of-week');
            const icon = dayBlocks[currentDay].querySelector('img');
            const minMaxTemp = dayBlocks[currentDay].querySelector('.temp-range');
            icon.src = `http://openweathermap.org/img/w/${weekDays[day].icon}.png`;
            minMaxTemp.innerHTML = `${Math.round(weekDays[day].max)}&deg ${Math.round(weekDays[day].min)}&deg`;
            dayOfWeek.innerHTML = day;
            currentDay++;
            if (currentDay >= 5) {
                break;
            }
        }
    },
};

page.init();

function formatForecastData(data) {
    const weekDays = data.list.reduce(function (weekDays, el) {
        const date = new Date(el.dt * 1000);
        const day = date.toLocaleString('ru', {weekday: 'short'});

        if (!(day in weekDays)) {
            weekDays[day] = {
                min: el.main.temp_min,
                max: el.main.temp_max,
                icon: el.weather[0].icon,
            };
        } else {
            if (weekDays[day].min > el.main.temp_min){
                weekDays[day].min = el.main.temp_min;
            }
            if (weekDays[day].max < el.main.temp_max){
                weekDays[day].max = el.main.temp_max;
            }
        }

        return weekDays;
    }, {});

    return weekDays;
}

function showSpinner() {
    OVERLAY.style.display = 'block';
    SPINNER.style.display = 'block';
}
function hideSpinner() {
    setTimeout(function(){
        OVERLAY.style.display = 'none';
        SPINNER.style.display = 'none';}, 1500  );
}