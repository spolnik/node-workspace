$(document).ready(function() {
    'use strict';

    var calculate = function () {

        var FAHRENHEIT_TO_CENT = '1';
        var CENT_TO_FAHRENHEIT = '2';

        var converters = {};
        converters[CENT_TO_FAHRENHEIT] = new Converter(
            function (degrees) {
                return 9 / 5 * degrees + 32;
            },
            " °F"
        );
        converters[FAHRENHEIT_TO_CENT] = new Converter(
            function (degrees) {
                return 5 / 9 * (degrees - 32);
            },
            " °C"
        );

        var temperature = parseInt(
            $('#temperature').val(), 10
        );

        var typeOfConversion = $('#conversionType').val();

        var converter = converters[typeOfConversion];

        $('#result').html(converter.convert(temperature));
    };

    $('#temperature')
        .on('change paste keyup', calculate)
        .val(10)
        .trigger('change')
        .focus();

    $('#conversionType').on('change keyup', calculate);
});



function Converter(calculate, description) {
    'use strict';
    this.calculate = calculate;
    this.description = description;
}

Converter.prototype.convert = function (temperature) {
    'use strict';
    return this.calculate(temperature).toFixed(2) + this.description;
};
