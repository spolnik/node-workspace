import {EventEmitter} from "./event_emitter";
import {IView, IMediator} from "./interfaces";

export function ViewSettings(templateUrl: string, container: string) {
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
            instance.container = container;
            instance.templateUrl = templateUrl;
            return instance;
        }

        // the new constructor behaviour
        let f: any = function (...args) {
            return construct(original, args);
        };

        // copy prototype so instanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    };
}

export abstract class View extends EventEmitter implements IView {

    // the values of container and templateUrl must be set using the ViewSettings decorator
    protected container: string;
    private templateUrl: string;

    private templateDelegate: HandlebarsTemplateDelegate;

    constructor(mediator: IMediator) {
        super(mediator);
    }

    abstract initialize();
    abstract dispose();
    abstract bindDomEvents(model: any);

    abstract unbindDomEvents();

    // asynchroniusly loads a template
    private loadTemplateAsync() {
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            $.ajax(<JQueryAjaxSettings>{
                method: "GET",
                url: this.templateUrl,
                dataType: "text",
                success: (response) => {
                    resolve(response);
                },
                error: (...args: any[]) => {
                    reject(args);
                }
            });
        });
    }

    private compileTemplateAsync(source: string) {
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            try {
                let template = Handlebars.compile(source);
                resolve(template);
            }
            catch (e) {
                reject(e);
            }
        });
    }

    private getTemplateAsync() {
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            if (this.templateDelegate === undefined || this.templateDelegate === null) {
                this.loadTemplateAsync()
                    .then((source) => {
                        return this.compileTemplateAsync(source);
                    })
                    .then((templateDelegate) => {
                        this.templateDelegate = templateDelegate;
                        resolve(this.templateDelegate);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            }
            else {
                resolve(this.templateDelegate);
            }
        });
    }

    protected renderAsync(model) {
        return Q.Promise((resolve: (r) => {}, reject: (e) => {}) => {
            this.getTemplateAsync()
                .then((templateDelegate) => {
                    // generate html and append to the DOM
                    let html = this.templateDelegate(model);
                    $(this.container).html(html);

                    // pass model to resolve so it can be used by
                    // subviews and DOM event initializer
                    resolve(model);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }
}
