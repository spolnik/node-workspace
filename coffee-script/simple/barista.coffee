houseRoast = 'Yirgacheffe'

hasMilk = (style) ->
  switch style.toLowerCase()
    when "latte", "cappuccino", 'mocha'
        yes
    else
        no

makeCoffee = (requestedStyle) ->
  style = requestedStyle || 'Espresso'
  console.log houseRoast
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

order = document.querySelector '#order'
request = document.querySelector '#request'
response = document.querySelector '#response'

order.onsubmit = ->
  response.innerHTML = barista(request.value)
  false
