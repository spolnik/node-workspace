var calculate = function () {

    var FAHR_TO_CENT = '1';
    var CENT_TO_FAHR = '2';

    var converters = {};
    converters[CENT_TO_FAHR] = new Converter(
        function (degrees) {
            return 9 / 5 * degrees + 32;
        },
        " °F"
    );
    converters[FAHR_TO_CENT] = new Converter(
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
    this.calculate = calculate;
    this.description = description;

    this.convert = function (temperature) {
        return this.calculate(temperature).toFixed(2) + this.description;
    };
}

calculate();
