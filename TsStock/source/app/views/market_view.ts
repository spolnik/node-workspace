import {View, AppEvent, ViewSettings, Route} from "../../framework/framework";
import * as $ from "jquery";
import {IView, IMediator} from "../../framework/interfaces";

@ViewSettings("./source/app/templates/market.hbs", "#outlet")
export class MarketView extends View implements IView {

    constructor(metiator: IMediator) {
        super(metiator);
    }

    // starts listening to render event
    initialize(): void {
        this.subscribeToEvents([
            new AppEvent("app.view.market.render", null, (e, args: any) => {
                this.renderAsync(args)
                    .then((model) => {
                        // set DOM events
                        this.bindDomEvents(model);
                    })
                    .catch((e) => {
                        // pass control to the global error handler
                        this.triggerEvent(new AppEvent("app.error", e, null));
                    });
            }),
        ]);
    }

    // disposes app events and DOM events
    dispose(): void {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    }

    // initializes DOM events
    bindDomEvents(model: any) {
        let scope = $(this.container);
        $(".getQuote").on("click", scope, (e) => {
            let symbol = $(e.currentTarget).data("symbol");
            this.getStockQuote(symbol);
        });
        $(scope).find("table").dataTable();
    }

    // disposes DOM events
    unbindDomEvents() {
        let scope = this.container;
        $(".getQuote").off("click", scope);
        let table: DataTables.DataTable = $(scope).find("table").dataTable();
        table.fnDestroy();
    }

    private getStockQuote(symbol: string) {
        // navigate to route using route event
        this.triggerEvent(new AppEvent(
            "app.route",
            new Route("symbol", "quote", [symbol]),
            null));
    }
}
