import {Util} from "./util";
import {Jsonfile} from "./jsonfile";

export interface Contact {
    name: string,
    number: number
}

export class ContactFactory {
    createContact(name: string, number: number): Contact {
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

    private jsonfile = new Jsonfile();

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
        this.jsonfile.readFile(jsonPath, done, null);
    }

    private saveContacts (contacts: Contact[], done) {
        let jsonPath = Util.getDataPath();

        this.jsonfile.writeFile(jsonPath, contacts, done, null);
    }
}



