import {EventEmitter} from "./event_emitter";
import * as $ from "jquery";
import {IMediator, IModel} from "./interfaces";

export function ModelSettings(serviceUrl: string) {
    return function (target: any) {
        // save a reference to the original constructor
        let original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            let c: any = function () {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            let instance = new c();
            instance._serviceUrl = serviceUrl;
            return instance;
        }

        // the new constructor behaviour
        let f: any = function (...args) {
            return construct(original, args);
        };

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    };
}

export class Model extends EventEmitter implements IModel {

    // the values of serviceUrl must be set using the ModelSettings decorator
    private serviceUrl: string;

    constructor(metiator: IMediator) {
        super(metiator);
    }

    // must be implemented by derived classes
    public initialize() {
        throw new Error("Model.prototype.initialize() is abstract and must implemented.");
    }

    // must be implemented by derived classes
    public dispose() {
        throw new Error("Model.prototype.dispose() is abstract and must implemented.");
    }

    protected requestAsync(method: string, dataType: string, data) {
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            $.ajax(<JQueryAjaxSettings>{
                method: method,
                url: this.serviceUrl,
                data: data || {},
                dataType: dataType,
                success: (response) => {
                    resolve(response);
                },
                error: (...args: any[]) => {
                    reject(args);
                }
            });
        });
    }

    protected getAsync(dataType: string, data: any) {
        return this.requestAsync("GET", dataType, data);
    }

    protected postAsync(dataType: string, data: any) {
        return this.requestAsync("POST", dataType, data);
    }

    protected putAsync(dataType: string, data: any) {
        return this.requestAsync("PUT", dataType, data);
    }

    protected deleteAsync(dataType: string, data: any) {
        return this.requestAsync("DELETE", dataType, data);
    }
}
