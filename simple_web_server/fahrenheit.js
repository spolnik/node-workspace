var calculate = function () {

    var centigradeToFahrenheit = function (degrees) {
        return 9 / 5 * degrees + 32;
    };

    var fahrenheitToCentigrade = function (degrees) {
        return 5 / 9 * (degrees - 32);
    };

    var isFahrenheitToCentigradeConversion = function (type) {
        return '1' === type;
    };

    var toInt = function (value) {
        return parseInt(value, 10);
    };

    var degrees = document.getElementById('degrees').value;
    degrees = toInt(degrees);
    var typeOfConversion = document.getElementById('conversionType').value;

    var result = isFahrenheitToCentigradeConversion(typeOfConversion)
        ? fahrenheitToCentigrade(degrees)
        : centigradeToFahrenheit(degrees);

    result = toInt(result);

    var description = function (typeOfConversion) {
        return isFahrenheitToCentigradeConversion(typeOfConversion)
            ? "° Centigrade"
            : "° Fahrenheit";
    };

    document.getElementById('result').innerText =
        result.toString() + description(typeOfConversion);
};
