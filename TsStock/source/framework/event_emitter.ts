import {IAppEvent, IEventEmitter, IMediator} from "./interfaces";
import {AppEvent} from "./app_event";

export class EventEmitter implements IEventEmitter {
    protected mediator: IMediator;
    protected events: IAppEvent[];

    constructor(mediator: IMediator) {
        this.mediator = mediator;
    }

    public triggerEvent(event: IAppEvent) {
        this.mediator.publish(event);
    }

    public triggerError(message: string) {
        this.triggerEvent(new AppEvent(
            "app.error",
            message,
            null));
    }

    public subscribeToEvents(events: IAppEvent[]) {
        this.events = events;

        for (let event of this.events) {
            this.mediator.subscribe(event);
        }
    }

    public unsubscribeToEvents() {
        for (let event of this.events) {
            this.mediator.unsubscribe(event);
        }
    }
}
