import * as fs from "fs";
import * as path from "path";

export class Util {

    private static getHomeDirectory(): string {
        return process.platform === 'win32'
            ? process.env['USERPROFILE']
            : process.env['HOME'];
    };

    static makeSureDataFileExists(dataPath: string): void {
        fs.exists(dataPath, function (exists) {
            if (!exists) {
                fs.writeFile(dataPath, '[]');
            }
        });
    };

    static getDataPath(): string {
        var dataPath = path.join(this.getHomeDirectory(), './data.json');
        this.makeSureDataFileExists(dataPath);

        return dataPath;
    };
}

