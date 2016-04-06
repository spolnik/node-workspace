import {App} from "../framework/framework";
import {MarketController} from "./controllers/market_controller";
import {SymbolController} from "./controllers/symbol_controller";
import {IAppSettings} from "../framework/interfaces";

let appSettings: IAppSettings = {
    isDebug: true,
    defaultController: "market",
    defaultAction: "nasdaq",
    controllers: [
        {controllerName: "market", controller: MarketController},
        {controllerName: "symbol", controller: SymbolController}
    ],
    onErrorHandler: (e: Object) => console.log(JSON.stringify(e))
};

let myApp = new App(appSettings);

// run app
myApp.initialize();
