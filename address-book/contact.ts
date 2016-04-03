import {Util} from "./util";
import {Jsonfile} from "./jsonfile";
import * as Q from "q";
import Promise = Q.Promise;

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
    saveContact(contact: Contact): Promise<{}>;
    findContacts(name: string): Promise<Contact[]>;
}

export class JsonfileContactRepository implements ContactRepository {

    constructor(private jsonFile: Jsonfile) {}

    saveContact(contact: Contact) {

        return Q.Promise((resolve, reject) => {
            this.loadContacts().then((contacts: Contact[]) => {
                contacts.push(contact);
                this.saveContacts(contacts).then(resolve).catch(reject);
            }).catch(reject);
        });
    }

    findContacts(name: string) {

        return Q.Promise<Contact[]>((resolve, reject) => {
            this.loadContacts().then((contacts: Contact[]) => {
                let byName = function (contact: Contact) {
                    return contact.name === name;
                };

                let result = contacts.filter(byName);
                resolve(result);
            }).catch(reject);
        });
    }

    private loadContacts() {
        return Q.Promise((resolve, reject) => {
            let jsonPath = Util.getDataPath();

            this.jsonFile.readFile(
                jsonPath
            ).then(resolve).catch(reject);
        });
    }

    private saveContacts (contacts: Contact[]) {

        return Q.Promise((resolve, reject) => {
            let jsonPath = Util.getDataPath();

            this.jsonFile.writeFile(
                jsonPath, contacts
            ).then(resolve).catch(reject);
        });
    }
}
