exports.start = function () {
    'use strict';

    const http = require('http');
    const log = require('log4js').getLogger('server');
    const os = require('os');

    function onRequest (req, res) {
        log.info(req.url);
        res.writeHead(200, {"Content-Type": 'text/plain'});
        res.write('Hello World' + os.EOL);
        res.end();
    }

    http.createServer(onRequest).listen(8888);
    log.info("Listening on http://localhost:8888");
};
