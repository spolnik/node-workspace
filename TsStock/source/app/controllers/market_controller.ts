import {Controller, AppEvent} from "../../framework/framework";
import {MarketView} from "../views/market_view";
import {NasdaqModel} from "../models/nasdaq_model";
import {NyseModel} from "../models/nyse_model";
import {IController, IView, IModel, IMediator} from "../../framework/interfaces";

export class MarketController extends Controller implements IController {
    private marketView: IView;
    private nasdaqModel: IModel;
    private nyseModel: IModel;

    constructor(mediator: IMediator) {
        super(mediator);
        this.marketView = new MarketView(mediator);
        this.nasdaqModel = new NasdaqModel(mediator);
        this.nyseModel = new NyseModel(mediator);
    }

    // initialize views/ models and strat listening to controller actions
    public initialize(): void {

        // subscribe to controller action events
        this.subscribeToEvents([
            new AppEvent("app.controller.market.nasdaq", null, (e, args: string[]) => {
                this.nasdaq(args);
            }),
            new AppEvent("app.controller.market.nyse", null, (e, args: string[]) => {
                this.nyse(args);
            })
        ]);

        // initialize view and models events
        this.marketView.initialize();
        this.nasdaqModel.initialize();
        this.nyseModel.initialize();
    }

    // dispose views/models and stop listening to controller actions
    public dispose(): void {

        // dispose the controller events
        this.unsubscribeToEvents();

        // dispose views and model events
        this.marketView.dispose();
        this.nasdaqModel.dispose();
        this.nyseModel.dispose();
    }

    // display NASDAQ stocks
    public nasdaq(args: string[]) {
        this.mediator.publish(new AppEvent("app.model.nasdaq.change", null, null));
    }

    // display NYSE stocks
    public nyse(args: string[]) {
        this.mediator.publish(new AppEvent("app.model.nyse.change", null, null));
    }
}
