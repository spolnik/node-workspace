'use strict';

countWord = (word, input) ->
  return 0 unless word

  position = 0
  wordCount = 0

  isFound = (position) ->
    position != -1

  while isFound position
    position = input.indexOf word, position
    if isFound position
      wordCount++
      position++

  wordCount

window.countWord = countWord

search = ->
  $text = $('#text')
  $text.unhighlight()

  input = $text.html().trim()

  word = $('#searchTextBox').val()

  wordCount = if word? then countWord(word, input) else 0

  $text.highlight word

  $('#result').text "There are #{wordCount} occurrences of the word #{word}."


$('#searchTextBox').val 'in'

$('form').on('input', search).trigger 'input'
