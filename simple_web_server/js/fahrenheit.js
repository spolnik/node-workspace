// Generated by CoffeeScript 1.9.3
(function() {
  var TemperatureConverter;

  $(document).ready(function() {
    var calculate;
    calculate = function() {
      var converter, temperature, typeOfConversion;
      temperature = parseFloat($('#temperature').val());
      typeOfConversion = $('#conversionType').val();
      converter = new TemperatureConverter;
      return $('#result').text(converter.convert(typeOfConversion, temperature));
    };
    $('#temperature').val(10);
    return $('form').on('input', calculate).trigger('input');
  });

  TemperatureConverter = (function() {
    function TemperatureConverter() {}

    TemperatureConverter.prototype.convert = function(typeOfConversion, temperature) {
      var removeLeadingMinusFromZero;
      removeLeadingMinusFromZero = function(input) {
        if (input === "-0.00") {
          return "0.00";
        } else {
          return input;
        }
      };
      switch (typeOfConversion) {
        case '1':
          return (this.fahrenheitToCentigrade(temperature).toFixed(2)) + " " + (this.centigradeSymbol());
        case '2':
          return (removeLeadingMinusFromZero(this.centigradeToFahrenheit(temperature).toFixed(2))) + " " + (this.fahrenheitSymbol());
        default:
          throw 'Invalid type of conversion: ' + typeOfConversion;
      }
    };

    TemperatureConverter.prototype.fahrenheitToCentigrade = function(temperature) {
      return 5 / 9 * (temperature - 32);
    };

    TemperatureConverter.prototype.centigradeToFahrenheit = function(temperature) {
      return 9 / 5 * temperature + 32;
    };

    TemperatureConverter.prototype.fahrenheitSymbol = function() {
      return "°F";
    };

    TemperatureConverter.prototype.centigradeSymbol = function() {
      return "°C";
    };

    return TemperatureConverter;

  })();

  window.TemperatureConverter = TemperatureConverter;

}).call(this);

//# sourceMappingURL=fahrenheit.js.map
