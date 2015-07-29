connect = require 'connect'
ServeStatic = require 'serve-static'

connect().use(ServeStatic(__dirname)).listen 8080
