const log = require('log4js').getLogger('router');
const os = require('os');

exports.route = function (handle, pathname, response, request) {
    'use strict';

    log.info("About to route a request for " +  pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        log.warn("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found" + os.EOL);
        response.end();
    }
};