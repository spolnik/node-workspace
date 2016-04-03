import {Contact, JsonfileContactRepository, ContactFactory} from "../contact";
import {Jsonfile} from "../jsonfile";
import * as async from "async";
import {expect} from "chai";
import {fail} from "assert";

describe("Contact", () => {
    let contact = ContactFactory.createContact(
        "John Smith", "604-123-9999"
    );

    let repository = new JsonfileContactRepository(new Jsonfile());

    function saveContact(callback: Function) {
        repository.saveContact(contact, function (err) {
            if (err) {
                fail(err);
            } else {
                callback();
            }
        });
    }

    function findContact(callback: Function) {
        repository.findContacts("John Smith", function(err: string, data: Contact[]) {
            if (err) {
                fail(err);
            } else {
                let result = data.filter(
                    (x: Contact) => x.name === contact.name && x.phone === contact.phone
                ).shift();
                expect(result).to.eql(contact);
                callback();
            }
        });
    }

    describe("#saveContact", () => {
        it("should add contact to address book, and then being able to query for it", (done) => {
            async.series([
                saveContact,
                findContact
            ],
                done
            );
        });
    });
});






