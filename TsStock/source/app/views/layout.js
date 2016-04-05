/// <reference path="../../framework/interfaces"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var framework_1 = require("../../framework/framework");
var LayoutView = (function (_super) {
    __extends(LayoutView, _super);
    function LayoutView(metiator) {
        _super.call(this, metiator);
    }
    LayoutView.prototype.initialize = function () {
    };
    LayoutView.prototype.dispose = function () {
    };
    return LayoutView;
})(framework_1.View);
exports.LayoutView = LayoutView;
