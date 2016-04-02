describe 'Temperature Converter for', ->
  runs = [
    {fahrenheit: '10.00', centigrade: '-12.22'},
    {fahrenheit: '50.00', centigrade: '10.00'},
    {fahrenheit: '100.00', centigrade: '37.78'},
    {fahrenheit: '0.00', centigrade: '-17.78'},
    {fahrenheit: '32.00', centigrade: '0.00'},
  ]

  converter = new TemperatureConverter
  fahrenheitSymbol = converter.fahrenheitSymbol()
  centigradeSymbol = converter.centigradeSymbol()

  describe "Fahrenheit to Centigrade", ->
    typeOfConversion = '1';

    runs.forEach (run) ->
      it "converts #{run.fahrenheit} #{fahrenheitSymbol} to #{run.centigrade} #{centigradeSymbol}", ->
        result = converter.convert typeOfConversion, run.fahrenheit
        expect(result).toBe "#{run.centigrade} #{centigradeSymbol}"

  describe "Centigrade to Fahrenheit", ->
    typeOfConversion = '2'

    runs.forEach (run) ->
      it "converts #{run.centigrade} #{centigradeSymbol} to #{run.fahrenheit} #{fahrenheitSymbol}", ->
        result = converter.convert(typeOfConversion, run.centigrade)
        expect(result).toBe "#{run.fahrenheit} #{fahrenheitSymbol}"

