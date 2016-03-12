exports.start = function (route, handle) {
    'use strict';

    const http = require('http');
    const log = require('log4js').getLogger('server');
    const url = require('url');

    function onRequest (request, response) {
        const pathname = url.parse(request.url).pathname;
        log.info(request.url);
        route(handle, pathname, response);
    }

    http.createServer(onRequest).listen(8888);
    log.info("Listening on http://localhost:8888");
};
