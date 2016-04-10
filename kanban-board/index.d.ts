declare module "react-dnd-html5-backend" {
    export enum NativeTypes { FILE, URL, TEXT }
    export function getEmptyImage(): any; // Image
    export default class HTML5Backend implements __ReactDnd.Backend {}
}