torch = price: 123.2
umbrella = {}

priceOrDefault = (item) ->
  item.price || 0.0

combineCost = (first, second) ->
  priceOrDefault(first) + priceOrDefault(second)

console.log combineCost torch, umbrella
