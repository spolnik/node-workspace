import {EventEmitter} from "./event_emitter";
import {IController, IMediator} from "./interfaces";

export class Controller extends EventEmitter implements IController {

    constructor(mediator: IMediator) {
        super(mediator);
    }

    public initialize(): void {
        throw new Error("Controller.prototype.initialize() is abstract you must implement it!");
    }

    public dispose(): void {
        throw new Error("Controller.prototype.dispose() is abstract you must implement it!");
    }
}
