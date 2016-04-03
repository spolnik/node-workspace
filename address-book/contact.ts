import {Util} from "./util";
import {Jsonfile} from "./jsonfile";

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
    saveContact(contact: Contact, done: Function): void;
    findContacts(name: string, done: Function): void;
}

export class JsonfileContactRepository implements ContactRepository {

    constructor(private jsonFile: Jsonfile) {}

    saveContact (contact: Contact, done: (err: NodeJS.ErrnoException) => void) {
        let that = this;

        this.loadContacts(function (err: NodeJS.ErrnoException, contacts: Contact[]) {
            if (err) {
                return done(err);
            }
            contacts.push(contact);
            that.saveContacts(contacts, done);
        });
    }

    findContacts (name: string, done: Function) {

        this.loadContacts(function (err: string, contacts: Contact[]) {
            if (err) {
                return done(err);
            }

            let byName = function (contact: Contact) {
                return contact.name === name;
            };

            let result = contacts.filter(byName);
            done(null, result);
        });
    }

    private loadContacts (done: Function) {
        let jsonPath = Util.getDataPath();
        this.jsonFile.readFile(jsonPath, done);
    }

    private saveContacts (contacts: Contact[], done: (err: NodeJS.ErrnoException) => void) {
        let jsonPath = Util.getDataPath();

        this.jsonFile.writeFile(jsonPath, contacts, done);
    }
}
