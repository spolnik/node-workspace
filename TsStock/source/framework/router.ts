import {EventEmitter} from "./event_emitter";
import {AppEvent} from "./app_event";
import {Route} from "./route";
import {IMediator, IRouter} from "./interfaces";
import * as $ from "jquery";

export class Router extends EventEmitter implements IRouter {
    private defaultController: string;
    private defaultAction: string;

    constructor(mediator: IMediator, defaultController: string, defaultAction: string) {
        super(mediator);
        this.defaultController = defaultController || "home";
        this.defaultAction = defaultAction || "index";
    }

    public initialize() {

        // Encapsulates writing the URL
        function setRoute(route: Route) {
            window.location.hash = route.serialize();
        }

        // observe URL changes by users
        $(window).on("hashchange", () => {
            let route = this.getRoute();
            this.onRouteChange(route);
        });

        // be able to trigger URL changes
        this.subscribeToEvents([

            // used to trigger routing on app start
            new AppEvent("app.initialize", null, (e: any, data?: any) => {
                this.onRouteChange(this.getRoute());
            }),

            // used to trigger URL changes from other components
            new AppEvent("app.route", null, (e: any, data?: any) => {
                setRoute(data);
            }),
        ]);
    }

    // Encapsulates reading the URL
    private getRoute() {
        let hash = window.location.hash;
        return this.parseRoute(hash);
    }

    // Encapsulates parsing an URL
    private parseRoute(hash: string) {
        if (hash[hash.length - 1] === "/") {
            hash = hash.substring(0, hash.length - 1);
        }

        let comp = hash.replace("#", "").split("/");
        let controller = comp[0] || this.defaultController;
        let action = comp[1] || this.defaultAction;

        let args = [];
        for (let i = 2; i < comp.length; i++) {
            args.push(comp[i]);
        }

        return new Route(controller, action, args);
    }

    // Pass control to the Dispatcher via the Mediator
    private onRouteChange(route: Route) {
        this.triggerEvent(new AppEvent("app.dispatch", route, null));
    }
}
