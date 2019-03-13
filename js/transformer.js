function Transformer() {
}

Transformer.prototype.transform = function (data) {
}

function WeatherDetailsTransformer() {
    Transformer.apply(this, arguments);
}

WeatherDetailsTransformer.prototype = Object.create(Transformer.prototype);
WeatherDetailsTransformer.prototype.constructor = WeatherDetailsTransformer;

WeatherDetailsTransformer.prototype.transform = function (data) {
    return data;
}