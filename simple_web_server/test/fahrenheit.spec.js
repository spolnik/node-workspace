'use strict';

describe('Temperature Converter for', function () {
    var runs = [
        { fahrenheit: '10.00', centigrade: '-12.22'},
        { fahrenheit: '50.00', centigrade: '10.00'},
        { fahrenheit: '100.00', centigrade: '37.78'},
        { fahrenheit: '0.00', centigrade: '-17.78'},
        { fahrenheit: '32.00', centigrade: '0.00'},
    ];

    var centigradeSymbol = TemperatureConverter.prototype.centigradeSymbol();
    var fahrenheitSymbol = TemperatureConverter.prototype.fahrenheitSymbol();

    beforeEach(function () {
        this.converter = new TemperatureConverter();
    });

    describe("Fahrenheit to Centigrade", function () {

        var typeOfConversion = TemperatureConverter.prototype.FAHRENHEIT_TO_CENT;

        runs.forEach(function (run) {
            it("converts " + run.fahrenheit + fahrenheitSymbol +
                " to " + run.centigrade + centigradeSymbol, function () {

                var result = this.converter.convert(typeOfConversion, run.fahrenheit);
                expect(result).toBe(run.centigrade + centigradeSymbol);
            });
        });
    });

    describe("Centigrade to Fahrenheit", function () {

        var typeOfConversion = TemperatureConverter.prototype.CENT_TO_FAHRENHEIT;

        runs.forEach(function (run) {
            it("converts " + run.centigrade + centigradeSymbol +
                " to " + run.fahrenheit + fahrenheitSymbol, function () {

                var result = this.converter.convert(typeOfConversion, run.centigrade);
                expect(result).toBe(run.fahrenheit + fahrenheitSymbol);
            });
        });
    });
});


