var Util = {};

Util.getHomeDirectory = function () {
    if (process.platform === 'win32') {
        return process.env['USERPROFILE']
    } else {
        return process.env['HOME']
    }
};

Util.makeSureDataFileExists = function (dataPath) {
    var fs = require('fs');

    fs.exists(dataPath, function (exists) {
        if (!exists) {
            fs.writeFile(dataPath, '[]');
        }
    });
};

Util.getDataPath = function () {
    var Path = require('path');

    var dataPath = Path.join(this.getHomeDirectory(), 'data.json');
    this.makeSureDataFileExists(dataPath);

    return dataPath;
};

module.exports = Util;
