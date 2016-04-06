import {EventEmitter} from "./event_emitter";
import {AppEvent} from "./app_event";
import {IController, IDispatcher, IMediator, IControllerDetails, IRoute} from "./interfaces";

export class Dispatcher extends EventEmitter implements IDispatcher {
    private controllersHashMap: { [name: string]: IControllerDetails };
    private currentController: IController;
    private currentControllerName: string;

    constructor(mediator: IMediator, controllers: IControllerDetails[]) {
        super(mediator);
        this.controllersHashMap = this.getController(controllers);
        this.currentController = null;
        this.currentControllerName = null;
    }

    public initialize() {
        this.subscribeToEvents([
            new AppEvent("app.dispatch", null, (e: any, data?: any) => {
                this.dispatch(data);
            })
        ]);
    }

    // Creates a hash map using the controller name as key and the constructor as value
    private getController(controllerDetailsArray: IControllerDetails[]): { [name: string]: IControllerDetails } {
        let hashMap: { [name: string]: IControllerDetails } = {};

        if (controllerDetailsArray.length <= 0) {
            this.triggerEvent(new AppEvent(
                "app.error",
                "Cannot create an application without at least one contoller.",
                null));
        }

        for (let controllerDetails of controllerDetailsArray) {
            let controllerName = controllerDetails.controllerName;
            let hashMapEntry = hashMap[controllerName];

            if (hashMapEntry !== null && hashMapEntry !== undefined) {
                this.triggerEvent(new AppEvent(
                    "app.error",
                    "Two controller cannot use the same name.",
                    null));
            }

            hashMap[controllerName] = controllerDetails;
        }
        return hashMap;
    }

    // Create and dispose controller instances
    private dispatch(route: IRoute) {
        let controllerDetails: IControllerDetails = this.controllersHashMap[route.controllerName];

        if (controllerDetails) {
            let controller: IController = new controllerDetails.controller(this.mediator);

            if (controller[route.actionName]) {
                this.dispatchAction(route, controller);
            } else {
                this.triggerError(`Action not found in controller: ${route.controllerName} -  + ${route.actionName}`);
            }
        } else {
            this.triggerError(`Controller not found: ${route.controllerName}`);
        }
    }

    private dispatchAction(route: IRoute, controller: IController) {
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
