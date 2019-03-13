function Renderer() {
}

Renderer.prototype.renderHeader = function () {
    console.log('header ready');
}

Renderer.prototype.renderContent = function() {
    console.log('content ready');
}

Renderer.prototype.renderFooter = function () {
    console.log('footer ready');
}

Renderer.prototype.render = function (data) {
    this.renderHeader(data);
    this.renderContent(data);
    this.renderFooter(data);
}


function RendererCurrent() {
    Renderer.apply(this, arguments);
}

RendererCurrent.prototype = Object.create(Renderer.prototype);
RendererCurrent.prototype.constructor = RendererCurrent;

RendererCurrent.prototype.renderContent = function (data) {
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
};
