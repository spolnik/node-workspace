import { App } from "../../source/framework/app";
import { View } from "../../source/framework/view";
import { Mediator } from "../../source/framework/mediator";
import { IAppSettings } from "../../source/framework/interfaces";

let expect = chai.expect;

describe("App class spec \n", () => {

  it("It should set its own properties correctly \n", () => {

   let appSettings: IAppSettings = {
     defaultController : "home",
     defaultAction : "index",
     layout : new View(new Mediator()),
     controllers : []
   };

    let app = new App(appSettings);
    expect(app.initialize).to.be.a("function");
  });
});
