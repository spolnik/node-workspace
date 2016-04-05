import { EventEmitter } from "./event_emitter";
import { AppEvent } from "./app_event";
import { Route } from "./route";
import {IMediator, IRouter} from "./interfaces";

export class Router extends EventEmitter implements IRouter {
  private defaultController: string;
  private defaultAction: string;

  constructor(metiator: IMediator, defaultController: string, defaultAction: string) {
    super(metiator);
    this.defaultController = defaultController || "home";
    this.defaultAction = defaultAction || "index";
  }

  public initialize() {

    // observe URL changes by users
    $(window).on("hashchange", () => {
      let r = this.getRoute();
      this.onRouteChange(r);
    });

    // be ablle to trigger URL changes
    this.subscribeToEvents([

      // used to trigger routing on app start
      new AppEvent("app.initialize", null, (e: any, data?: any) => {
        this.onRouteChange(this.getRoute());
      }),

      // used to trigger URL changes from other components
      new AppEvent("app.route", null, (e: any, data?: any) => { this.setRoute(data); }),
    ]);
  }

  // Encapsulates reading the URL
  private getRoute() {
    let h = window.location.hash;
    return this.parseRoute(h);
  }

  // Encapsulates writting the URL
  private setRoute(route: Route) {
    let s = route.serialize();
    window.location.hash = s;
  }

  // Encapsulates parsing an URL
  private parseRoute(hash: string) {
    let comp, controller, action, args, i;
    if (hash[hash.length - 1] === "/") {
        hash = hash.substring(0, hash.length - 1);
    }
    comp = hash.replace("#", "").split("/");
    controller = comp[0] || this.defaultController;
    action = comp[1] || this.defaultAction;

    args = [];
    for (i = 2; i < comp.length; i++) {
        args.push(comp[i]);
    }
    return new Route(controller, action, args);
  }

  // Pass control to the Dispatcher via the Mediator
  private onRouteChange(route: Route) {
    this.triggerEvent(new AppEvent("app.dispatch", route, null));
  }
}
