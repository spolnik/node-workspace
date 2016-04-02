import {Command} from './command';
import {ContactFactory, JsonfileContactRepository} from './contact';
import {Jsonfile} from "./jsonfile";
import * as async from "async";

let command = new Command(
    new JsonfileContactRepository(new Jsonfile()),
    new ContactFactory()
);

async.series([
    (callback) => command.executeCurrentOperation(callback)
],
function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('OK! The command ran successfully!');
    }
});
