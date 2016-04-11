declare module "react-dnd-html5-backend" {
    export default class HTML5Backend implements __ReactDnd.Backend {}
}

declare namespace __History {
    export function createBrowserHistory(options?: any): any
}

declare module "history/lib/createBrowserHistory" {

    export = __History.createBrowserHistory;

}