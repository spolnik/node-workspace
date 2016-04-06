import {EventEmitter} from "./event_emitter";
import * as $ from "jquery";
import * as Q from "q";
import {IMediator, IModel} from "./interfaces";

export function ModelSettings(serviceUrl: string) {
    return function (target: any) {
        // save a reference to the original constructor
        let original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            let ctor: any = function () {
                return constructor.apply(this, args);
            };
            ctor.prototype = constructor.prototype;
            let instance = new ctor();
            instance.serviceUrl = serviceUrl;
            return instance;
        }

        let newConstructor: any = function (...args) {
            return construct(original, args);
        };

        newConstructor.prototype = original.prototype;
        return newConstructor;
    };
}

export abstract class Model extends EventEmitter implements IModel {

    // the values of serviceUrl must be set using the ModelSettings decorator
    private serviceUrl: string;

    constructor(mediator: IMediator) {
        super(mediator);
    }

    abstract initialize();
    abstract dispose()

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
