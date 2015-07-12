var calculate = function () {
    'use strict';

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
        document.getElementById('temperature').value, 10
    );

    var typeOfConversion = document.getElementById('conversionType').value;

    var converter = converters[typeOfConversion];

    document.getElementById('result').innerText =
        converter.convert(temperature);
};

function Converter(calculate, description) {
    'use strict';
    this.calculate = calculate;
    this.description = description;
}

Converter.prototype.convert = function (temperature) {
    'use strict';
    return this.calculate(temperature).toFixed(2) + this.description;
};

calculate();
