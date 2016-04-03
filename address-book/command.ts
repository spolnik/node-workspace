import {Contact, ContactRepository} from "./contact";

export interface Command<T> {
    execute(data: string): Promise<T>;
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

class AddCommand implements Command<Contact> {
    constructor(
        private contactRepository: ContactRepository,
        private createContact: (name: string, phone: string) => Contact) {
    }

    execute(data: string): Promise<Contact> {
        return new Promise<Contact>((resolve, reject) => {
            let name = AddCommand.parseName(data);
            let phone = AddCommand.parseNumber(data);

            let contact = this.createContact(name, phone);
            this.contactRepository.save(
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

    execute(name: string): Promise<Contact[]> {
        return new Promise<Contact[]>((resolve, reject) => {
            this.contactRepository.findAll(name).then(resolve).catch(reject);
        });
    }
}

class DefaultCommand implements Command<string> {

    execute(data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            reject("Invalid command!");
        });
    }
}
