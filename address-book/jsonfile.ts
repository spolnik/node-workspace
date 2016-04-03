import * as fs from "fs";

interface Options {
    spaces?: string;
    replacer?: any;
    reviver?: any;
}

export class Jsonfile {

    constructor(public spaces: string = null) {}

    readFile<T>(file: string, callback: Function, options: Options = {}): void {

        fs.readFile(file, options, function (err, data) {
            if (err) return callback(err);

            let obj: T;
            try {
                obj = JSON.parse(<any>data, options ? options.reviver : null);
            } catch (err2) {
                err2.message = `${file}: ${err2.message}`;
                return callback(err2);
            }

            callback(null, obj);
        });
    }

    writeFile<T>(file: string, obj: T, callback: (err: NodeJS.ErrnoException) => void, options: Options = {}) {

        let spaces = typeof options === "object" && options !== null
            ? "spaces" in options
                ? options.spaces : this.spaces
                : this.spaces;

        let str = "";
        try {
            str = `${JSON.stringify(obj, options ? options.replacer : null, spaces)}\n`;
        } catch (err) {
            if (callback)
                return callback(err);
        }

        fs.writeFile(file, str, options, callback);
    }
}
