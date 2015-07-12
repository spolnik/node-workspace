var calculate = function () {

    var centigradeToFahrenheit = function (degrees) {
        return 9 / 5 * degrees + 32;
    };

    var fahrenheitToCentigrade = function (degrees) {
        return 5 / 9 * (degrees - 32);
    };

    var toInt = function (value) {
        return parseInt(value, 10);
    };

    var convert = function (converter, temperature) {
        return toInt(
            converter(temperature)
        );
    };

    var description = function (isFahrenheitToCentigradeConversion) {
        return isFahrenheitToCentigradeConversion
            ? "° Centigrade"
            : "° Fahrenheit";
    };

    var temperature = document.getElementById('temperature').value;
    temperature = toInt(temperature);

    var typeOfConversion = document.getElementById('conversionType').value,
        isFahrenheitToCentigradeConversion = '1' === typeOfConversion;

    var converter = isFahrenheitToCentigradeConversion
        ? fahrenheitToCentigrade
        : centigradeToFahrenheit;

    var result = convert(converter, temperature);

    document.getElementById('result').innerText =
        result.toString() + description(isFahrenheitToCentigradeConversion);
};

calculate();
