"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_dom_1 = require('react-dom');
var GroceryList_1 = require('./GroceryList');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return (React.createElement(GroceryList_1.GroceryList, null));
    };
    return App;
}(React.Component));
react_dom_1.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=App.js.map