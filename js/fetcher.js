const APP_ID = 'e52f9d6625f3bb7f6633e0857f9acce9';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${APP_ID}&q=`;

function Fetcher(url, transformer) {
    this.url = url;
    this.transformer = transformer;
}

Fetcher.prototype.load = function () {
    console.log(url);
    return fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(res => {
            console.log(res);
            return this.transformer.transform(res);
        });
}

function WeatherDetailsFetcher(city) {
    Fetcher.apply(this, [`${WEATHER_DETAILS_ENDPOINT}${city}`]);
}

WeatherDetailsFetcher.prototype = Object.create(Fetcher.prototype);
WeatherDetailsFetcher.prototype.constructor = WeatherDetailsFetcher;
