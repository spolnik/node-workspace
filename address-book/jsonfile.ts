import * as fs from "fs";
import * as Q from "q";
import Promise = Q.Promise;
import {Contact} from "./contact";

export class Jsonfile {

    readFile<T>(file: string): Promise<Contact[]> {

        return Q.Promise<Contact[]>((resolve, reject) => {
            fs.readFile(file, {}, function (err, data) {
                if (err) {
                    return reject(err);
                }

                try {
                    let obj = JSON.parse(<any>data);
                    resolve(obj);
                } catch (err2) {
                    err2.message = `${file}: ${err2.message}`;
                    return reject(err2);
                }
            });
        });
    }

    writeFile<T>(file: string, obj: T): Promise<{}> {

        return Q.Promise((resolve, reject) => {
            try {
                let str = `${JSON.stringify(obj)}\n`;
                fs.writeFile(file, str, {}, resolve);
            } catch (err) {
                reject(err);
            }
        });
    }
}
