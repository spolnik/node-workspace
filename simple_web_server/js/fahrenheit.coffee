$(document).ready ->

  calculate = ->
    temperature = parseFloat $('#temperature').val()
    typeOfConversion = $('#conversionType').val()
    converter = new TemperatureConverter

    $('#result').text converter.convert(typeOfConversion, temperature)

  $('#temperature').val 10

  $('form')
    .on('input', calculate)
    .trigger 'input'

class TemperatureConverter

  convert: (typeOfConversion, temperature) ->

    removeLeadingMinusFromZero = (input) ->
      if input is "-0.00" then "0.00" else input

    switch typeOfConversion
      when '1'
        "#{@fahrenheitToCentigrade(temperature).toFixed 2} #{@centigradeSymbol()}"
      when '2'
        "#{removeLeadingMinusFromZero @centigradeToFahrenheit(temperature).toFixed 2} #{@fahrenheitSymbol()}"
      else
        throw 'Invalid type of conversion: ' + typeOfConversion


  fahrenheitToCentigrade: (temperature) ->
    5 / 9 * (temperature - 32)

  centigradeToFahrenheit: (temperature) ->
    9 / 5 * temperature + 32

  fahrenheitSymbol: ->
    "°F"

  centigradeSymbol: ->
    "°C"

window.TemperatureConverter = TemperatureConverter
