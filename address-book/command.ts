import {Contact, ContactRepository} from "./contact";
import * as Q from "q";

export interface Command<T> {
    execute(data: string): Q.Promise<T>;
}

export class CommandFactory {
    constructor(
        private contactRepository: ContactRepository,
        private createContact: (name: string, phone: string) => Contact) {
    }

    createCommand(name: string): Command<{}> {
        switch (name) {
            case "add":
                return new AddCommand(this.contactRepository, this.createContact);
            case "find":
                return new FindCommand(this.contactRepository);
            default:
                return new DefaultCommand();
        }
    }
}

class AddCommand implements Command<{}> {
    constructor(
        private contactRepository: ContactRepository,
        private createContact: (name: string, phone: string) => Contact) {
    }

    execute(data: string): Q.Promise<{}> {
        return Q.Promise((resolve, reject) => {
            let name = AddCommand.parseName(data);
            let phone = AddCommand.parseNumber(data);

            let contact = this.createContact(name, phone);
            this.contactRepository.saveContact(
                contact
            ).then(resolve).catch(reject);
        });
    }

    private static parseName (input: string): string {
        return input.split(",")[0].trim();
    }

    private static parseNumber (input: string) {
        return input.split(",")[1].trim();
    }
}

class FindCommand implements Command<Contact[]> {
    constructor(
        private contactRepository: ContactRepository) {
    }

    execute(name: string): Q.Promise<Contact[]> {
        return Q.Promise<Contact[]>((resolve, reject) => {
            this.contactRepository.findContacts(
                name
            ).then((data) => {
                data.forEach(function (contact: Contact) {
                    console.log(contact.name, contact.phone);
                });

                resolve(data);
            }).catch(reject);
        });
    }
}

class DefaultCommand implements Command<{}> {

    execute(data: string): Q.Promise<{}> {
        return Q.Promise((resolve, reject) => {
            reject("Invalid command!");
        });
    }
}
