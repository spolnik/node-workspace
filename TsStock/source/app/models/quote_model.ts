import { Model, AppEvent, ModelSettings } from "../../framework/framework";
import {IModel, IMediator} from "../../framework/interfaces";

@ModelSettings("http://dev.markitondemand.com/Api/v2/Quote/jsonp")
export class QuoteModel extends Model implements IModel {

  constructor(metiator: IMediator) {
    super(metiator);
  }

  // listen to model events
  public initialize() {
    this.subscribeToEvents([
      new AppEvent("app.model.quote.change", null, (e, args) => { this.onChange(args); })
    ]);
  }

  // dispose model events
  public dispose() {
    this.unsubscribeToEvents();
  }

  private onChange(args): void {
    // format args
    let s = { symbol : args };
    this.getAsync("jsonp", s)
        .then((data) => {

          // format data
          let quote = this.formatModel(data);

          // pass controll to the market view
          this.triggerEvent(new AppEvent("app.view.symbol.render", quote, null));
        })
        .catch((e) => {
          // pass control to the global error handler
          this.triggerEvent(new AppEvent("app.error", e, null));
        });
  }

  private formatModel (data) {
    data.Change = data.Change.toFixed(2);
    data.ChangePercent = data.ChangePercent.toFixed(2);
    data.Timestamp = new Date(data.Timestamp).toLocaleDateString();
    data.MarketCap = (data.MarketCap / 1000000).toFixed(2) + "M.";
    data.ChangePercentYTD = data.ChangePercentYTD.toFixed(2);
    return { quote : data };
  }
}
