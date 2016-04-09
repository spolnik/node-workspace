import {Model, AppEvent, ModelSettings} from "../../framework/framework";
import {IModel, IMediator} from "../../framework/interfaces";
import {Stocks} from "./stocks";

@ModelSettings("./data/nasdaq.json")
export class NasdaqModel extends Model implements IModel {

    constructor(mediator: IMediator) {
        super(mediator);
    }

    public initialize() {
        this.subscribeToEvents([
            new AppEvent("app.model.nasdaq.change", null, (e, args) => {
                this.onChange(args);
            })
        ]);
    }

    public dispose() {
        this.unsubscribeToEvents();
    }

    private onChange(args): void {
        this.getAsync("json", args)
            .then((data) => {

                let stocks = new Stocks(data, "NASDAQ");
                this.triggerEvent(new AppEvent("app.view.market.render", stocks, null));
            })
            .catch((e) => {
                this.triggerEvent(new AppEvent("app.error", e, null));
            });
    }
}
