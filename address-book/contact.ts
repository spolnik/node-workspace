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

    save(contact: Contact): Promise<Contact> {
        return new Promise<Contact>((resolve, reject) => {
            this.db.insert(contact, (err, newDocs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newDocs);
                }
            });
        });
    }

    findAll(name: string): Promise<Contact[]> {
        return new Promise<Contact[]>((resolve, reject) => {
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

