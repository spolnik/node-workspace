import { EventEmitter } from "./event_emitter";
import { AppEvent } from "./app_event";
import {IController, IDispatcher, IMediator, IControllerDetails, IRoute} from "./interfaces";

class Dispatcher extends EventEmitter implements IDispatcher {
  private controllersHashMap: Object;
  private currentController: IController;
  private currentControllerName: string;

  constructor(mediator: IMediator, controllers: IControllerDetails[]) {
    super(mediator);
    this.controllersHashMap = this.getController(controllers);
    this.currentController = null;
    this.currentControllerName = null;
  }

  // listen to app.dispatch events
  public initialize() {
    this.subscribeToEvents([
      new AppEvent("app.dispatch", null, (e: any, data?: any) => {
        this.dispatch(data);
      })
    ]);
  }

  // Creates a hash map using the controller name as key and the constructor as value
  private getController(controllers: IControllerDetails[]): Object {
    let hashMap, hashMapEntry, name, controller, l;

    hashMap = {};
    l = controllers.length;

    if (l <= 0) {
      this.triggerEvent(new AppEvent(
        "app.error",
        "Cannot create an application without at least one contoller.",
        null));
    }

    for (let i = 0; i < l; i++) {
      controller = controllers[i];
      name = controller.controllerName;
      hashMapEntry = hashMap[name];
      if (hashMapEntry !== null && hashMapEntry !== undefined) {
        this.triggerEvent(new AppEvent(
          "app.error",
          "Two controller cannot use the same name.",
          null));
      }
      hashMap[name] = controller.controller;
    }
    return hashMap;
  }

  // Create and dispose controller instances
  private dispatch(route: IRoute) {
    let controller = this.controllersHashMap[route.controllerName];

    // try to find controller
    if (controller === null || controller === undefined) {
      this.triggerEvent(new AppEvent(
        "app.error",
        `Controller not found: ${route.controllerName}`,
        null));
    }
    else {
      // create a controller instance
      let controller: IController = new controller(this.mediator);

      // action is not available
      let a = controller[route.actionName];
      if (a === null || a === undefined) {
        this.triggerEvent(new AppEvent(
          "app.error",
          `Action not found in controller: ${route.controllerName} -  + ${route.actionName}`,
          null));
      }
      // action is available
      else {
        if (this.currentController == null) {
          // initialize controller
          this.currentControllerName = route.controllerName;
          this.currentController = controller;
          this.currentController.initialize();
        }
        else {
          // dispose previous controller if not needed
          if (this.currentControllerName !== route.controllerName) {
            this.currentController.dispose();
            this.currentControllerName = route.controllerName;
            this.currentController = controller;
            this.currentController.initialize();
          }
        }
        // pass flow from dispatcher to the controller
        this.triggerEvent(new AppEvent(
          `app.controller.${this.currentControllerName}.${route.actionName}`,
          route.args,
          null
        ));
      }
    }
  }
}

export { Dispatcher };
