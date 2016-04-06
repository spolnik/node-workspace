import {EventEmitter} from "./event_emitter";
import {IController, IMediator} from "./interfaces";

export abstract class Controller extends EventEmitter implements IController {

    constructor(mediator: IMediator) {
        super(mediator);
    }

    abstract initialize(): void;
    abstract dispose(): void;
}
