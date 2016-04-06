export class Stocks {
    constructor(public items: StockItem[], public market: string) {}
}

export interface StockItem {
    Symbol: string;
    Name: string;
    LastSale: string;
    MarketCap: string;
    IPOyear: string;
    Sector: string;
    industry: string;
}