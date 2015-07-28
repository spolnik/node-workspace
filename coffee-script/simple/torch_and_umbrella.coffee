torch = { price: 123.2 }
umbrella = {}

priceOrDefault = (price) ->
  if price? then price
  else 0.0

combineCost = (first, second) ->
  priceOrDefault(first.price) + priceOrDefault(second.price)

console.log combineCost torch, umbrella
