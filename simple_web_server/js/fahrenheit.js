'use strict';

$(document).ready(function() {

    var calculate = function() {

        var temperature = parseFloat($('#temperature').val()),
            typeOfConversion = $('#conversionType').val(),
            converter = new TemperatureConverter();

        $('#result').text(converter.convert(typeOfConversion, temperature));
    };

    $('#temperature')
        .val(10);

    $('form')
        .on('input', calculate)
        .trigger('input');
});

function TemperatureConverter(typeOfConversion) {}

TemperatureConverter.prototype.convert = function(typeOfConversion, temperature) {

    if (typeOfConversion === this.FAHRENHEIT_TO_CENT) {
        return this.fahrenheitToCentigrade(temperature).toFixed(2) + this.centigradeSymbol();
    }

    if (typeOfConversion === this.CENT_TO_FAHRENHEIT) {
        var result = this.centigradeToFahrenheit(temperature).toFixed(2);
        result = result === "-0.00" ? "0.00" : result;
        return result + this.fahrenheitSymbol();
    }

    throw 'Invalid type of conversion: ' + typeOfConversion;
};

TemperatureConverter.prototype.fahrenheitToCentigrade = function(temperature) {
    return 5 / 9 * (temperature - 32);
};

TemperatureConverter.prototype.centigradeToFahrenheit = function(temperature) {
    return 9 / 5 * temperature + 32;
};

TemperatureConverter.prototype.fahrenheitSymbol = function() {
    return " °F";
};

TemperatureConverter.prototype.centigradeSymbol = function() {
    return " °C";
};

TemperatureConverter.prototype.FAHRENHEIT_TO_CENT = '1';
TemperatureConverter.prototype.CENT_TO_FAHRENHEIT = '2';
