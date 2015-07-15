var connect = require('connect');
var ServeStatic = require('serve-static');

connect().use(ServeStatic(__dirname)).listen(8080);
