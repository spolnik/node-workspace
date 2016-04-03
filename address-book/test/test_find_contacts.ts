import {Contact, JsonfileContactRepository} from './../contact';
import {Jsonfile} from "./../jsonfile";
import * as async from "async";

let repository = new JsonfileContactRepository(new Jsonfile());

let contact: Contact = {
    name: "John Smith",
    number: "123-123-123"
};

function saveContact(callback: Function) {
    repository.saveContact(contact, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("saved");
            callback();
        }
    });
}

function findContact(callback: Function) {
    repository.findContacts('John Smith', function(err: string, data: Contact[]) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
            callback();
        }
    });
}

async.series([
    saveContact,
    findContact
],
function (err) {
    if (err) console.error(err);
});
