import * as Q from "q";
import Promise = Q.Promise;
import NeDBDataStore = require("nedb");

export interface Contact {
    name: string;
    phone: string;
}

export class ContactFactory {
    static createContact(name: string, phone: string): Contact {
        return {
            name: name,
            phone: phone
        };
    }
}

export interface ContactRepository {
    save(contact: Contact): Promise<Contact>;
    findAll(name: string): Promise<Contact[]>;
}

export class NeDBContactRepository implements ContactRepository {

    constructor(private db: NeDBDataStore) {}

    save(contact: Contact): Q.Promise<Contact> {
        return Q.Promise<Contact>((resolve, reject) => {
            this.db.insert(contact, (err, newDocs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newDocs);
                }
            });
        });
    }

    findAll(name: string): Q.Promise<Contact[]> {
        return Q.Promise<Contact[]>((resolve, reject) => {
            this.db.find<Contact>({name: name}, (err: any, docs: Contact[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }
}

