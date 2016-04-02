import {Command} from './command';
import {ContactFactory, JsonfileContactRepository} from './contact';

let command = new Command(new JsonfileContactRepository(), new ContactFactory());

function handleError(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('OK! The command ran successfully!');
    }
}

command.executeCurrentOperation(handleError);
