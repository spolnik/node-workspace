import {Contact, ContactRepository} from "./contact";

export class Command {

    constructor(
        private contactRepository: ContactRepository,
        private createContact: (name: string, number: string) => Contact) {

    }

    add(done: Function) {
        if (this.getOperation() !== 'add') {
            return;
        }

        let data = this.getOperationData();

        let name = this.parseName(data);
        let number = this.parseNumber(data);

        let contact = this.createContact(name, number);
        this.contactRepository.saveContact(contact, done);
    }

    find(done: Function) {
        if (this.getOperation() !== 'find') {
            return;
        }

        let data = this.getOperationData();

        this.contactRepository.findContacts(data, function (err: string, data: Contact[]) {
            if (err) {
                return done(err);
            }

            data.forEach(function (contact: Contact) {
                console.log(contact.name, contact.number);
            });

            done(null, data);
        });
    }

    private getOperation() {
        return process.argv[2];
    }

    private getOperationData() {
        return process.argv[3];
    }

    private parseName (input: string): string {
        return input.split(',')[0].trim();
    }

    private parseNumber (input: string) {
        return input.split(',')[1].trim();
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
                    done('Invalid command!')
                };
        }

        command.bind(this)(done);
    }
}
