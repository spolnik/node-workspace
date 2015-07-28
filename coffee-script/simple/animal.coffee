animal = 'crocodile'

animalName = (animal) ->
  switch animal
    when 'crocodile', 'crocodiles'
      'bask'
    when 'antelope', 'antelopes'
      'herd'
    when 'baboon', 'baboons'
      'rumpus'
    when 'cobra', 'cobras'
      'quiver'
    when 'badger', 'badgers'
      'cete'

collective = animalName animal

console.log "The collective of #{animal} is #{collective}"

animals = 'baboons badgers antelopes cobras crocodiles'

console.log "A #{animalName animal} of #{animal}" for animal in animals.split ' '
