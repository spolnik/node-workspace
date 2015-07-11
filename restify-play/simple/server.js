var bunyan = require('bunyan');
var restify = require('restify');

var log = bunyan.createLogger({
    name: 'simpleAppLogger',
    streams: [
        {
            stream: process.stdout,
            level: 'debug'
        },
        {
            path: 'hello.log',
            level: 'trace'
        }
    ],
    serializers: bunyan.stdSerializers
});

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer({
    name: 'Simple App',
    log: log
});
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function () {
    log.info({addr: server.address()}, 'listening');
});
