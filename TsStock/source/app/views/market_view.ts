import {View, AppEvent, ViewSettings, Route} from "../../framework/framework";
import {IView, IMediator} from "../../framework/interfaces";

@ViewSettings("./source/app/templates/market.hbs", "#outlet")
export class MarketView extends View implements IView {

    constructor(mediator: IMediator) {
        super(mediator);
    }

    initialize(): void {
        this.subscribeToEvents([
            new AppEvent("app.view.market.render", null, (e, args: any) => {
                this.renderAsync(args)
                    .then((model) => {
                        this.bindDomEvents(model);
                    })
                    .catch((e) => {
                        this.triggerEvent(new AppEvent("app.error", e, null));
                    });
            }),
        ]);
    }

    dispose(): void {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    }

    bindDomEvents(model: any) {
        let scope = $(this.container);

        $(".getQuote").on("click", scope, (e) => {
            let symbol = $(e.currentTarget).data("symbol");
            this.getStockQuote(symbol);
        });

        $(scope).find("table").DataTable();
    }

    // disposes DOM events
    unbindDomEvents() {
        let scope = this.container;
        $(".getQuote").off("click", scope);
        let table = $(scope).find("table").DataTable();
        table.destroy();
    }

    private getStockQuote(symbol: string) {
        // navigate to route using route event
        this.triggerEvent(new AppEvent(
            "app.route",
            new Route("symbol", "quote", [symbol]),
            null));
    }
}
