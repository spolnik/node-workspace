"use strict";
const React = require('react');
const react_dnd_1 = require("react-dnd");
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const List_1 = require('./List');
const react_router_1 = require("react-router");
class KanbanBoard extends React.Component {
    render() {
        let cardModal = this.props.children && React.cloneElement(this.props.children, {
            cards: this.props.cards,
            cardCallbacks: this.props.cardCallbacks
        });
        return (React.createElement("div", {className: "app"}, React.createElement(react_router_1.Link, {to: "/new", className: "float-button"}, "+"), React.createElement(List_1.default, {id: "todo", title: "To Do", taskCallbacks: this.props.taskCallbacks, cardCallbacks: this.props.cardCallbacks, cards: this.props.cards.filter((card) => card.status === "todo")}), React.createElement(List_1.default, {id: 'in-progress', title: "In Progress", taskCallbacks: this.props.taskCallbacks, cardCallbacks: this.props.cardCallbacks, cards: this.props.cards.filter((card) => card.status === "in-progress")}), React.createElement(List_1.default, {id: 'done', title: 'Done', taskCallbacks: this.props.taskCallbacks, cardCallbacks: this.props.cardCallbacks, cards: this.props.cards.filter((card) => card.status === "done")}), cardModal));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_dnd_1.DragDropContext(react_dnd_html5_backend_1.default)(KanbanBoard);
//# sourceMappingURL=KanbanBoard.js.map