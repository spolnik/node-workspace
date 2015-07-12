var calculate = function () {

    var FAHR_TO_CENT = '1';
    var CENT_TO_FAHR = '2';

    var converters = {};

    converters[CENT_TO_FAHR] = {
        calculate: function (degrees) {
            return 9 / 5 * degrees + 32;
        },
        description: "°F"
    };

    converters[FAHR_TO_CENT] = {
        calculate: function (degrees) {
            return 5 / 9 * (degrees - 32);
        },
        description: "°C"
    };

    var convert = function (converter, temperature) {
        return converter.calculate(temperature).toFixed(2);
    };

    var temperature = parseInt(
        document.getElementById('temperature').value, 10
    );

    var typeOfConversion = document.getElementById('conversionType').value;
    var converter = converters[typeOfConversion];

    var result = convert(converter, temperature);

    document.getElementById('result').innerText =
        result.toString() + converter.description;
};

calculate();
