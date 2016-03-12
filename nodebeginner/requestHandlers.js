const log = require('log4js').getLogger('handle');
const os = require('os');
const exec = require('child_process').exec;

exports.start = function(response) {
    log.info("Request handler 'start' was called");

    exec("ls -lah", function (error, stdout) {
        response.writeHead(200, {"Content-Type": 'text/plain'});
        response.write(stdout + os.EOL);
        response.end();
    });
};

exports.upload = function (response) {
    log.info("Request handler 'upload' was called");

    response.writeHead(200, {"Content-Type": 'text/plain'});
    response.write('Hello Upload' + os.EOL);
    response.end();
};

exports.find = function (response) {
    log.info("Request handler 'find' was called");

    exec("find ~/", {timeout: 10000, maxBuffer: 20000*1024}, function (error, stdout) {
        response.writeHead(200, {"Content-Type": 'text/plain'});
        response.write(stdout + os.EOL);
        response.end();
    });
};