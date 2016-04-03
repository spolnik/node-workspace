import {Contact, ContactRepository} from "./contact";

export class Command {

    constructor(
        private contactRepository: ContactRepository,
        private createContact: (name: string, phone: string) => Contact) {

    }

    add(done: Function) {
        if (this.getOperation() !== "add") {
            return;
        }

        let data = this.getOperationData();

        let name = this.parseName(data);
        let phone = this.parseNumber(data);

        let contact = this.createContact(name, phone);
        this.contactRepository.saveContact(
            contact
        ).then((data) => done(null, data)).catch((err) => done(err));
    }

    find(done: Function) {
        if (this.getOperation() !== "find") {
            return;
        }

        let name = this.getOperationData();

        this.contactRepository.findContacts(
            name
        ).then((data) => {
            data.forEach(function (contact: Contact) {
                console.log(contact.name, contact.phone);
            });

            done(null, data);
        }).catch((err) => done(err));
    }

    private getOperation() {
        return process.argv[2];
    }

    private getOperationData() {
        return process.argv[3];
    }

    private parseName (input: string): string {
        return input.split(",")[0].trim();
    }

    private parseNumber (input: string) {
        return input.split(",")[1].trim();
    }

    executeCurrentOperation(done: Function) {
        let operation = this.getOperation();

        let command: Function;
        switch (operation) {
            case "add":
                command = this.add;
                break;
            case "find":
                command = this.find;
                break;
            default:
                command = function (done: Function) {
                    done("Invalid command!");
                };
        }

        command.bind(this)(done);
    }
}
