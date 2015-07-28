fs = require 'fs'

split = (text) ->
  text.split /\W/g

count = (text) ->
  parts = split text
  words = (word for word in parts when word.trim().length > 0)
  words.length

countMany = (texts) ->
  sum = 0
  for text in texts
    sum = sum + count text
  sum

countWordsInFile = (fileName) ->
  stream = fs.createReadStream fileName
  stream.setEncoding 'ascii'
  wordCount = 0
  stream.on 'data', (data) ->
    lines = data.split /\n/gm
    wordCount = wordCount + countMany lines
  stream.on 'close', () ->
    console.log "#{wordCount} words"

file = process.argv[2]

if file
  countWordsInFile file
else
  console.log 'usage: coffee wc.coffee [file]'
