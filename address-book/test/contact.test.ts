import {Contact, ContactFactory, NeDBContactRepository} from "../contact";
import * as async from "async";
import {expect} from "chai";
import {fail} from "assert";
import NeDBDataStore = require("nedb");

describe("Contact", () => {
    let contact = ContactFactory.createContact(
        "John Smith", "604-123-9999"
    );

    let repository = new NeDBContactRepository(new NeDBDataStore());

    function saveContact(callback: Function) {
        repository.save(
            contact
        ).then((data) => callback()).catch(fail);
    }

    function findContact(callback: Function) {
        repository.findAll(
            "John Smith"
        ).then((data: Contact[]) => {
            let result = data.filter(
                (x: Contact) => x.name === contact.name && x.phone === contact.phone
            ).shift();

            expect(result.name).to.equal(contact.name);
            expect(result.phone).to.equal(contact.phone);

            callback();
        }).catch(fail);
    }

    describe("#save", () => {
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
