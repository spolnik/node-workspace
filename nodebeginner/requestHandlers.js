const log = require('log4js').getLogger('handle');
const os = require('os');
const fs = require('fs');

exports.start = function (response) {
    'use strict';
    log.info("Request handler 'start' was called");

    const body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' + 'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Submit image" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": 'text/html'});
    response.write(body);
    response.end();

};

exports.upload = function (response, request) {
    'use strict';
    const formidable = require('formidable');

    log.info("Request handler 'upload' was called");

    const form = new formidable.IncomingForm();
    log.debug("About to parse...");
    form.parse(request, function (error, fields, files) {
        log.debug('Parsing done...');

        /* Possible error on Windows systems: tried to rename to an already existing file */
        fs.rename(files.upload.path, "tmp/test/png", function (error) {
            if (error) {
                fs.unlink("tmp/test.png");
                fs.rename(files.upload.path, "tmp/test.png");
            }
        });

        response.writeHead(200, {"Content-Type": 'text/html'});
        response.write("Received image: <br />");
        response.write("<img src='/show' />");
        response.end();
    });
};

exports.show = function(response) {
    'use strict';
    log.info("Request handler 'show' was called.");

    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("tmp/test.png").pipe(response);
};
