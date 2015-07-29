makeIncrementer = ->
  n = 0
  ->
    n = n + 1
    n

incrementer = makeIncrementer()
up = makeIncrementer()

console.log incrementer()
console.log incrementer()
console.log incrementer()

console.log up()
console.log up()
