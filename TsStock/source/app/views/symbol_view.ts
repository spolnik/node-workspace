import { View, AppEvent, ViewSettings } from "../../framework/framework";
import {IMediator, IView} from "../../framework/interfaces";

@ViewSettings("./source/app/templates/symbol.hbs", "#outlet")
class SymbolView extends View implements IView {

  constructor(metiator: IMediator) {
    super(metiator);
  }

  initialize(): void {
    this.subscribeToEvents([
      new AppEvent("app.view.symbol.render", null, (e, model: any) => {
        this.renderAsync(model)
            .then((model) => {
              // set DOM events
              this.bindDomEvents(model);
              // pass control to chart View
              this.triggerEvent(new AppEvent("app.model.chart.change", model.quote.Symbol, null));
            })
            .catch((e) => {
              this.triggerEvent(new AppEvent("app.error", e, null));
            });
      }),
    ]);
  }

  public dispose(): void {
    this.unbindDomEvents();
    this.unsubscribeToEvents();
  }

  // initializes DOM events
  protected bindDomEvents(model: any) {
    let scope = $(this.container);
    // set DOM events here
  }

  // disposes DOM events
  protected unbindDomEvents() {
    let scope = this.container;
    // kill DOM events here
  }
}

export { SymbolView };
