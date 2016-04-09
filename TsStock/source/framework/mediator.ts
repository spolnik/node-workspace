import {IMediator, IAppEvent} from "./interfaces";

export class Mediator implements IMediator {
    private $: JQuery;
    private isDebug;

    constructor(isDebug: boolean = false) {
        this.$ = $({});
        this.isDebug = isDebug;
    }

    public publish(e: IAppEvent): void {
        if (this.isDebug === true) {
            console.log(new Date().getTime(), "PUBLISH", e.topic, e.data);
        }
        this.$.trigger(e.topic, e.data);
    }

    public subscribe(e: IAppEvent): void {
        if (this.isDebug === true) {
            console.log(new Date().getTime(), "SUBSCRIBE", e.topic, e.handler);
        }
        this.$.on(e.topic, e.handler);
    }

    public unsubscribe(e: IAppEvent): void {
        if (this.isDebug === true) {
            console.log(new Date().getTime(), "UNSUBSCRIBE", e.topic, e.data);
        }
        this.$.off(e.topic);
    }
}
