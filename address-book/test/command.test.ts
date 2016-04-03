import {Contact, JsonfileContactRepository, ContactFactory} from "../contact";
import {Jsonfile} from "../jsonfile";
import {expect} from "chai";
import {fail} from "assert";
import {CommandFactory} from "../command";

describe("Command", () => {
    let contact = "Albert Einstein,604-443-9999";
    let repository = new JsonfileContactRepository(new Jsonfile());
    let commandFactory = new CommandFactory(repository, ContactFactory.createContact);

    describe("#add(contact)", () => {
        it("should run add command", (done) => {
            let addCommand = commandFactory.createCommand("add");
            addCommand.execute(contact).then(done).catch(fail);
        });

        it("should query for newly added item", (done) => {
            let findCommand = commandFactory.createCommand("find");
            findCommand.execute("Albert Einstein").then((data: Contact[]) => {
                let albert = data.filter((x) => x.name === "Albert Einstein" && x.phone === "604-443-9999").shift();
                expect(albert).to.eql({
                    name: "Albert Einstein",
                    phone: "604-443-9999"
                });
                done();
            }).catch(fail);
        });
    });
});
