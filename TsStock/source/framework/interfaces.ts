export interface IControllerDetails {
    controllerName: string;
    controller: { new(mediator: IMediator): IController };
}

export interface IAppSettings {
    isDebug: boolean;
    defaultController: string;
    defaultAction: string;
    controllers: IControllerDetails[];
    onErrorHandler: (o: Object) => void;
}

export interface IAppEvent {
    topic: string;
    data: any;
    handler: (e: any, data: any) => void;
}

export interface IMediator {
    publish(e: IAppEvent): void;
    subscribe(e: IAppEvent): void;
    unsubscribe(e: IAppEvent): void;
}

export interface IRoute {
    controllerName: string;
    actionName: string;
    args: Object[];
    serialize(): string;
}

export interface IRouter extends IEventEmitter {
    initialize(): void;
}

export interface IDispatcher extends IEventEmitter {
    initialize(): void;
}

export interface IEventEmitter {
    triggerEvent(event: IAppEvent);
    subscribeToEvents(events: IAppEvent[]);
    unsubscribeToEvents(events: IAppEvent[]);
    triggerError(message: string);
}

export interface IController extends IEventEmitter {
    initialize(): void;
    dispose(): void;
}

export interface IModel extends IEventEmitter {
    initialize(): void;
    dispose(): void;
}

export interface IView extends IEventEmitter {
    initialize(): void;
    dispose(): void;
}
