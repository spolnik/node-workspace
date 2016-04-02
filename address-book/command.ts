import {Contact, ContactFactory, ContactRepository} from "./contact";

export class Command {

    constructor(private contactRepository: ContactRepository, private contactFactory: ContactFactory) {}

    add(done) {
        if (this.getOperation() !== 'add') {
            return;
        }

        let data = this.getOperationData();

        let name = this.parseName(data);
        let number = this.parseNumber(data);

        let contact = this.contactFactory.createContact(name, number);
        this.contactRepository.saveContact(contact, done);
    }

    find(done) {
        if (this.getOperation() !== 'find') {
            return;
        }

        let data = this.getOperationData();

        this.contactRepository.findContacts(data, function (err, data) {
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

    private parseName (input): string {
        return input.split(',')[0].trim();
    }

    private parseNumber (input) {
        return input.split(',')[1].trim();
    }

    executeCurrentOperation(done) {
        let operation = this.getOperation();

        let command;
        switch (operation) {
            case "add":
                command = this.add;
                break;
            case "find":
                command = this.find;
                break;
            default:
                command = function (done) {
                    done('Invalid command!')
                };
        }

        command.bind(this)(done);
    }
}
