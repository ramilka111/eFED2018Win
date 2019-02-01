const APP_ID = 'e52f9d6625f3bb7f6633e0857f9acce9';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${APP_ID}&q=`;
const AIRPOLLUTION_DETAILS_ENDPOINT = `https://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=${APP_ID}`;
const defaultCity = 'izhevsk';
const page = {
    init() {
        this.getWeatherDetails(defaultCity, this.render);
        this.getAirPollution(defaultCity, this.renderAirPollution);

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

    render(data){
        const city = data.name;
        const country = data.sys.country;
        const currentTempValue = Math.round(data.main.temp);
        const iconName = data.weather[0].icon;
        const humidityValue = data.main.humidity;
        const wndSpdValue = data.wind.speed;
        const weatherCondValue = data.weather[0].description;
        const date = new Date();

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

        document.getElementById('pollution').innerHTML = `Загрязнение воздуха: ${pollution}`;
    }
};

page.init();

