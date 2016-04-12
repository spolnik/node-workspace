"use strict";
const React = require("react");
const react_dnd_1 = require("react-dnd");
const Card_1 = require("./Card");
const constants_1 = require("./../constants");
class List extends React.Component {
    render() {
        const { connectDropTarget } = this.props;
        let cards = this.props.cards.map((card) => {
            return React.createElement(Card_1.default, {key: card.id, taskCallbacks: this.props.taskCallbacks, cardCallbacks: this.props.cardCallbacks, card: card});
        });
        return connectDropTarget(React.createElement("div", {className: "list"}, React.createElement("h1", null, this.props.title), cards));
    }
}
const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id);
    }
};
function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_dnd_1.DropTarget(constants_1.CARD, listTargetSpec, collect)(List);
//# sourceMappingURL=List.js.map