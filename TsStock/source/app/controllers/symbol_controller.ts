import { Controller, AppEvent } from "../../framework/framework";
import { QuoteModel } from "../models/quote_model";
import { ChartModel } from "../models/chart_model";
import { SymbolView } from "../views/symbol_view";
import { ChartView } from "../views/chart_view";
import {IController, IModel, IView, IMediator} from "../../framework/interfaces";

export class SymbolController extends Controller implements IController {
  private quoteModel: IModel;
  private chartModel: IModel;
  private symbolView: IView;
  private chartView: IView;

  constructor(mediator: IMediator) {
    super(mediator);
    this.quoteModel = new QuoteModel(mediator);
    this.chartModel = new ChartModel(mediator);
    this.symbolView = new SymbolView(mediator);
    this.chartView = new ChartView(mediator);
  }

  // initialize views/ models and strat listening to controller actions
  public initialize(): void {

    // subscribe to controller action events
    this.subscribeToEvents([
      new AppEvent("app.controller.symbol.quote", null, (e, symbol: string) => { this.quote(symbol); })
    ]);

    // initialize view and models events
    this.quoteModel.initialize();
    this.chartModel.initialize();
    this.symbolView.initialize();
    this.chartView.initialize();
  }

  // dispose views/models and stop listening to controller actions
  public dispose(): void {

    // dispose the controller events
    this.unsubscribeToEvents();

    // dispose views and model events
    this.symbolView.dispose();
    this.quoteModel.dispose();
    this.chartView.dispose();
    this.chartModel.dispose();
  }

  public quote(symbol: string) {
    this.triggerEvent(new AppEvent("app.model.quote.change", symbol, null));
  }
}
