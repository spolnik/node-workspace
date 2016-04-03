import * as fs from "fs";

export class Jsonfile {

    readFile<T>(file: string, callback: Function): void {

        fs.readFile(file, {}, function (err, data) {
            if (err) {
                return callback(err);
            }

            try {
                let obj = JSON.parse(<any>data);
                callback(null, obj);
            } catch (err2) {
                err2.message = `${file}: ${err2.message}`;
                return callback(err2);
            }
        });
    }

    writeFile<T>(file: string, obj: T, callback: (err: NodeJS.ErrnoException) => void) {

        try {
            let str = `${JSON.stringify(obj)}\n`;
            fs.writeFile(file, str, {}, callback);
        } catch (err) {
            if (callback) {
                return callback(err);
            }
        }
    }
}
