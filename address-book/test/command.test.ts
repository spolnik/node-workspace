import {Contact, ContactFactory, NeDBContactRepository} from "../contact";
import {expect} from "chai";
import {fail} from "assert";
import {CommandFactory} from "../command";
import Datastore = require("nedb");

describe("Command", () => {
    let contact = "Albert Einstein,604-443-9999";
    let repository = new NeDBContactRepository(new Datastore());
    let commandFactory = new CommandFactory(repository, ContactFactory.createContact);

    describe("#add(contact)", () => {
        it("should run add command", (done) => {
            let addCommand = commandFactory.createCommand("add");
            addCommand.execute(contact).then((data) => done()).catch(fail);
        });

        it("should query for newly added item", (done) => {
            let findCommand = commandFactory.createCommand("find");
            findCommand.execute("Albert Einstein").then((data: Contact[]) => {
                let albert = data.filter(
                    (x) => x.name === "Albert Einstein" && x.phone === "604-443-9999"
                ).shift();

                expect(albert.name).to.equal("Albert Einstein");
                expect(albert.phone).to.equal("604-443-9999");

                done();
            }).catch(fail);
        });
    });
});
