import * as React from "react";
import {Stocks} from "../models/stocks";

export class MarketTable extends React.Component<Stocks, {}> {

    render() {
        let stocks = this.props.items.map((stockItem) => {
            return (
                <tr>
                    <td><span className="label label-default">{stockItem.Symbol}</span></td>
                    <td>{stockItem.Name}</td>
                    <td>{stockItem.LastSale}</td>
                    <td>{stockItem.MarketCap}</td>
                    <td>{stockItem.IPOyear}</td>
                    <td>{stockItem.Sector}</td>
                    <td>{stockItem.industry}</td>
                    <td>
                        <button className="btn btn-primary btn-sm getQuote" data-symbol={stockItem.Symbol} >
                            <span className="glyphicon glyphicon-stats" aria-hidden="true" > </span>
                            Quote
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="panel panel-default fadeInUp animated">
                <div className="panel-body">
                    <h2>{this.props.market}</h2>
                    <table className="table table-responsibe table-condensed">
                        <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Last Sale</th>
                            <th>Market Capital</th>
                            <th>IPO year</th>
                            <th>Sector</th>
                            <th>industry</th>
                            <th>Quote</th>
                        </tr>
                        </thead>
                        <tbody>
                            {stocks}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}