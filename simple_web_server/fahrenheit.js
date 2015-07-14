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

    var filterNonNumeric = function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
                // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

    $('#temperature')
        .val(10)
        .focus()
        .keydown(filterNonNumeric);

    $('#temperatureForm')
        .on('input', calculate)
        .trigger('input');
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
