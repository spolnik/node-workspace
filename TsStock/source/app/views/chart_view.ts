import {View, AppEvent, ViewSettings} from "../../framework/framework";
import {IMediator, IView} from "../../framework/interfaces";

@ViewSettings(null, "#chart_container")
export class ChartView extends View implements IView {

    constructor(mediator: IMediator) {
        super(mediator);
    }

    initialize(): void {
        this.subscribeToEvents([
            new AppEvent("app.view.chart.render", null, (e, model: any) => {
                this.renderChart(model);
                this.bindDomEvents(model);
            }),
        ]);
    }

    dispose(): void {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    }

    // initializes DOM events
    bindDomEvents(model: any) {
        let scope = $(this.container);
        // set DOM events here
    }

    // disposes DOM events
    unbindDomEvents() {
        let scope = this.container;
        // kill DOM events here
    }

    private renderChart(model) {
        let $container = $(this.container);
        new Highcharts.Chart(<HighchartsOptions>{
            chart: {
                zoomType: "x",
                renderTo: $container[0]
            },
            title: {
                text: model.title
            },
            subtitle: {
                text: "Click and drag in the plot area to zoom in"
            },
            xAxis: {
                type: "datetime"
            },
            yAxis: {
                title: {
                    text: "Price"
                }
            },
            legend: {
                enabled: true
            },
            tooltip: {
                shared: true,
                crosshairs: true
            },
            plotOptions: {
                area: {
                    marker: {
                        radius: 0
                    },
                    lineWidth: 0.1,
                    threshold: null
                }
            },
            series: model.series
        });
    }
}
