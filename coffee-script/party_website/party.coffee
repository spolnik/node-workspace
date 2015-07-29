fs = require 'fs'
http = require 'http'
coffee = require 'coffee-script'

attendees = 0
friends = 0

split = (text) ->
  text.split /,/g

accumulate = (initial, numbers, acc) ->
  total = initial or 0
  for number in numbers
    total = acc total, number
  total

sum = (acc, current) -> acc + current

attendeesCounter = (data) ->
  attendees = data.split(/,/).length

friendsCounter = (data) ->
  numbers = (parseInt(string, 0) for string in split data)
  friends = accumulate(0, numbers, sum)

readFile = (file, strategy) ->
  fs.readFile file, 'utf-8', (error, response) ->
    throw error if error
    strategy response

countUsingFile = (file, strategy) ->
  readFile file, strategy
  fs.watch file, (-> readFile file, strategy)

init = ->
  countUsingFile 'partygoers.txt', attendeesCounter
  countUsingFile 'friends.txt', friendsCounter

  server = http.createServer (request, response) ->
    switch request.url
      when '/'
        response.writeHead 200, 'Content-Type': 'text/html'
        response.end view
      when '/count'
        response.writeHead 200, 'Content-Type': 'text/plain'
        response.end "#{attendees + friends}"

  server.listen 8080, '127.0.0.1'
  console.log 'Now running at http://127.0.0.1:8080'

  clientScript = coffee.compile '''
  get = (path, callback) ->
    req = new XMLHttpRequest()
    req.onload = (e) -> callback req.responseText
    req.open 'get', path
    req.send()

  showAttendees = ->
    out = document.querySelector '#how-many-attendees'
    get '/count', (response) ->
      out.innerHTML = "#{response} attendees!"

  showAttendees()
  setInterval showAtendees, 1000
  '''

  view = """
  <!doctype html>
  <title>How many people are coming?</title>
  <body>
  <div id='how-many-attendees'></div>
  <script>
  #{clientScript}
  </script>
  </body>
  </html>
  """

init()

###
  exports.attendeesCounter = attendeesCounter
  exports.friendsCounter = friendsCounter
  exports.readFile = readFile
  exports.countUsingFile = countUsingFile
###
