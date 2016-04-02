import * as fs from "fs";

export class Jsonfile {

    constructor(public spaces: string = null) {}

    readFile (file, options, callback) {
        if (callback == null) {
            callback = options;
            options = {};
        }

        fs.readFile(file, options, function (err, data) {
            if (err) return callback(err);

            let obj;
            try {
                obj = JSON.parse(data, options ? options.reviver : null)
            } catch (err2) {
                err2.message = `${file}: ${err2.message}`;
                return callback(err2)
            }

            callback(null, obj)
        });
    }

    writeFile (file, obj, options, callback) {
        if (callback == null) {
            callback = options;
            options = {}
        }

        let spaces = typeof options === 'object' && options !== null
            ? 'spaces' in options
                ? options.spaces : this.spaces
                : this.spaces;

        let str = '';
        try {
            str = `${JSON.stringify(obj, options ? options.replacer : null, spaces)}\n`
        } catch (err) {
            if (callback)
                return callback(err, null)
        }

        fs.writeFile(file, str, options, callback)
    }
}
