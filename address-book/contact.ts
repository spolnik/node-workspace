import {Util} from "./util";
import {Jsonfile} from "./jsonfile";
import * as Q from "q";

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
        // let that = this;

        this.loadContacts().then((contacts: Contact[]) => {
            contacts.push(contact);
            this.saveContacts(contacts, done);
        }).catch((err) => {
            done(err);
        });

        // this.loadContacts(function (err: NodeJS.ErrnoException, contacts: Contact[]) {
        //     if (err) {
        //         return done(err);
        //     }
        //     contacts.push(contact);
        //     that.saveContacts(contacts, done);
        // });
    }

    findContacts (name: string, done: Function) {

        this.loadContacts().then((contacts: Contact[]) => {
            let byName = function (contact: Contact) {
                return contact.name === name;
            };

            let result = contacts.filter(byName);
            done(null, result);
        }).catch((err) => {
            done(err);
        });
    }

    private loadContacts() {
        return Q.Promise((resolve, reject) => {
            let jsonPath = Util.getDataPath();
            this.jsonFile.readFile(jsonPath).then(resolve).catch(reject);
        });
    }

    private saveContacts (contacts: Contact[], done: (err: NodeJS.ErrnoException) => void) {
        let jsonPath = Util.getDataPath();

        this.jsonFile.writeFile(jsonPath, contacts).then(function () {
            done(null);
        }).catch(function (err) {
            done(err);
        });
    }
}
