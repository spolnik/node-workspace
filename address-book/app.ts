import {CommandFactory} from "./command";
import {ContactFactory, NeDBContactRepository} from "./contact";
import NeDBDataStore = require("nedb");

function getOperation() {
    return process.argv[2];
}

function getOperationData() {
    return process.argv[3];
}

let commandFactory = new CommandFactory(
    new NeDBContactRepository(new NeDBDataStore({filename: "addressBook.db", autoload: true})),
    ContactFactory.createContact
);

let command = commandFactory.createCommand(getOperation());

command.execute(
    getOperationData()
).then(
    () => console.log("done")
).catch(console.error);

