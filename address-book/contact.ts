import {Util} from "./util";
import {Jsonfile} from "./jsonfile";

export interface Contact {
    name: string,
    number: string
}

export class ContactFactory {
    createContact(name: string, number: string): Contact {
        return {
            name: name,
            number: number
        }
    }
}

export interface ContactRepository {
    saveContact(contact: Contact, done);
    findContacts (name: string, done);
}

export class JsonfileContactRepository implements ContactRepository {

    constructor(private jsonFile: Jsonfile) {}

    saveContact (contact, done) {
        var that = this;

        this.loadContacts(function (err, contacts: Contact[]) {
            if (err) { return done(err); }
            contacts.push(contact);
            that.saveContacts(contacts, done);
        });
    }

    findContacts (name: string, done) {

        this.loadContacts(function (err, contacts) {
            if (err) {
                return done(err);
            }

            var byName = function (contact) {
                return contact.name === name;
            };

            let result = contacts.filter(byName);
            done(null, result);
        });
    }

    private loadContacts (done) {
        let jsonPath = Util.getDataPath();
        this.jsonFile.readFile(jsonPath, done, null);
    }

    private saveContacts (contacts: Contact[], done) {
        let jsonPath = Util.getDataPath();

        this.jsonFile.writeFile(jsonPath, contacts, done, null);
    }
}
