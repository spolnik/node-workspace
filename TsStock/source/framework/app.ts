import { Dispatcher } from "./dispatcher";
import { Mediator } from "./mediator";
import { AppEvent } from "./app_event";
import { Router } from "./router";
import {IDispatcher, IMediator, IRouter, IControllerDetails, IAppSettings} from "./interfaces";

export class App {
  private dispatcher: IDispatcher;
  private mediator: IMediator;
  private router: IRouter;
  private controllers: IControllerDetails[];
  private onErrorHandler: (o: Object) => void;

  constructor(appSettings: IAppSettings) {
    this.controllers = appSettings.controllers;
    this.mediator = new Mediator(appSettings.isDebug || false);
    this.router = new Router(this.mediator, appSettings.defaultController, appSettings.defaultAction);
    this.dispatcher = new Dispatcher(this.mediator, this.controllers);
    this.onErrorHandler = appSettings.onErrorHandler;
  }

  public initialize() {
    this.router.initialize();
    this.dispatcher.initialize();
    this.mediator.subscribe(new AppEvent("app.error", null, (e: any, data?: any) => {
      this.onErrorHandler(data);
    }));
    this.mediator.publish(new AppEvent("app.initialize", null, null));
  }
}
