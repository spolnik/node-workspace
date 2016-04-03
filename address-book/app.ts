import {CommandFactory} from "./command";
import {ContactFactory, JsonfileContactRepository} from "./contact";
import {Jsonfile} from "./jsonfile";

function getOperation() {
    return process.argv[2];
}

function getOperationData() {
    return process.argv[3];
}

let commandFactory = new CommandFactory(
    new JsonfileContactRepository(new Jsonfile()),
    ContactFactory.createContact
);

let command = commandFactory.createCommand(getOperation());

command.execute(
    getOperationData()
).then(
    () => console.log("done")
).catch(console.error);

