houseRoast = null

hasMilk = (style) ->
  switch style
    when "latte", "cappuccino"
        yes
    else
        no

makeCoffee = (requestedStyle) ->
  style = requestedStyle || 'Espresso'
  if houseRoast?
    "#{houseRoast} #{style}"
  else
    style

barista = (style) ->
  time = (new Date()).getHours()
  if hasMilk(style) and time > 12 then "No!"
  else
    coffee = makeCoffee style
    "Enjoy your #{coffee}!"

console.log barista 'latte'

houseRoast = 'Noir'
console.log barista 'black'
