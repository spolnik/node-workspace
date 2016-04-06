import {App} from "../../source/framework/app";
import {IAppSettings} from "../../source/framework/interfaces";

let expect = chai.expect;

describe("App class spec \n", () => {

    it("It should set its own properties correctly \n", () => {

        let appSettings: IAppSettings = {
            isDebug: false,
            defaultController: "home",
            defaultAction: "index",
            controllers: [],
            onErrorHandler: console.log
        };

        let app = new App(appSettings);
        expect(app.initialize).to.be.a("function");
    });
});
