import * as fs from "fs";
import * as path from "path";

export class Util {

    static getHomeDirectory() {
        return process.platform === 'win32'
            ? process.env['USERPROFILE']
            : process.env['HOME'];
    };

    static makeSureDataFileExists(dataPath) {
        fs.exists(dataPath, function (exists) {
            if (!exists) {
                fs.writeFile(dataPath, '[]');
            }
        });
    };

    static getDataPath() {
        var dataPath = path.join(this.getHomeDirectory(), './data.json');
        this.makeSureDataFileExists(dataPath);

        return dataPath;
    };
}

