import {IRoute} from "./interfaces";

export class Route implements IRoute {
    public controllerName: string;
    public actionName: string;
    public args: Object[];

    constructor(controllerName: string, actionName: string, args: Object[]) {
        this.controllerName = controllerName;
        this.actionName = actionName;
        this.args = args;
    }

    public serialize(): string {
        let serializationArgs = this.args.map(a => a.toString()).join("/");
        return `${this.controllerName}/${this.actionName}/${serializationArgs}`;
    }
}
