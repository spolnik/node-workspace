import {Model, AppEvent, ModelSettings} from "../../framework/framework";
import {IMediator, IModel} from "../../framework/interfaces";

interface MarkitResponseElement {
    Currency: string;
    TimeStamp: string;
    Symbol: string;
    Type: string;
    DataSeries: { open: { values: number[] }, close: { values: number[] }, high: { values: number[] }, low: { values: number[] }};
}

interface MarkitResponse {
    Positions: number[];
    Dates: string[];
    Elements: MarkitResponseElement[];
}

@ModelSettings("http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp")
export class ChartModel extends Model implements IModel {

    constructor(mediator: IMediator) {
        super(mediator);
    }

    public initialize() {
        this.subscribeToEvents([
            new AppEvent("app.model.chart.change", null, (e, args) => {
                this.onChange(args);
            })
        ]);
    }

    public dispose() {
        this.unsubscribeToEvents();
    }

    private onChange(args): void {

        function formatModel(symbol, data: MarkitResponse) {
            // more info at http://dev.markitondemand.com/
            // and http://www.highcharts.com/demo/line-time-series
            let chartData = {
                title: symbol,
                series: []
            };

            let series = [
                {name: "open", data: data.Elements[0].DataSeries.open.values},
                {name: "close", data: data.Elements[0].DataSeries.close.values},
                {name: "high", data: data.Elements[0].DataSeries.high.values},
                {name: "low", data: data.Elements[0].DataSeries.low.values}
            ];

            for (let i = 0; i < series.length; i++) {
                let serie = {
                    name: series[i].name,
                    data: []
                };

                for (let j = 0; j < series[i].data.length; j++) {
                    let val = series[i].data[j];
                    let d = new Date(data.Dates[j]).getTime();
                    serie.data.push([d, val]);
                }

                chartData.series.push(serie);
            }
            return chartData;
        }

        // format args (more info at http://dev.markitondemand.com/)
        let p = {
            Normalized: false,
            NumberOfDays: 365,
            DataPeriod: "Day",
            Elements: [
                {Symbol: args, Type: "price", Params: ["ohlc"]}
            ]
        };
        let queryString = "parameters=" + encodeURIComponent(JSON.stringify(p));

        this.getAsync("jsonp", queryString)
            .then((data: MarkitResponse) => {

                // format data
                let chartData = formatModel(args, data);

                // pass control to the market view
                this.triggerEvent(new AppEvent("app.view.chart.render", chartData, null));
            })
            .catch((e) => {
                // pass control to the global error handler
                this.triggerEvent(new AppEvent("app.error", e, null));
            });
    }
}
