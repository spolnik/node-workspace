import {CommandFactory} from "./command";
import {ContactFactory, NeDBContactRepository, ContactRepository} from "./contact";
import NeDBDataStore = require("nedb");

class AddressBookApp {
    private operation: string;
    private operationData: string;
    private contactRepository: ContactRepository;

    constructor() {
        this.readCommandLineParameters();

        this.contactRepository = new NeDBContactRepository(
            new NeDBDataStore({filename: "addressBook.db", autoload: true})
        );
    }

    run() {
        let commandFactory = new CommandFactory(
            this.contactRepository,
            ContactFactory.createContact
        );

        let command = commandFactory.createCommand(
            this.operation
        );

        command.execute(
            this.operationData
        ).then(console.log).catch(console.error);
    }

    private readCommandLineParameters() {
        this.operation = process.argv[2];
        this.operationData = process.argv[3];
    }
}

new AddressBookApp().run();
