http = require 'http'
fs = require 'fs'

sourceFile = 'attendees'
fileContents = 'File not ready yet.'

readSourceFile = ->
  fs.readFile sourceFile, 'utf-8', (error, data) ->
    if error
      console.log error
    else
      fileContents = data

fs.watchFile sourceFile, readSourceFile

countWords = (text) ->
  text.split(/,/gi).length

readSourceFile sourceFile

server = http.createServer (request, response) ->
  response.end "#{countWords(fileContents)}"

server.listen 8080, '127.0.0.1'
