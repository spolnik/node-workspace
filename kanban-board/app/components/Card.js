"use strict";
const React = require("react");
const marked = require("marked");
const ReactCSSTransitionGroup = require("react-addons-css-transition-group");
const react_dnd_1 = require("react-dnd");
const CheckList_1 = require("./CheckList");
const constants_1 = require("./../constants");
const react_router_1 = require("react-router");
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
    }
    toggleDetails() {
        this.setState({ showDetails: !this.state.showDetails });
    }
    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = React.createElement("div", {className: "card__details"}, React.createElement("span", {dangerouslySetInnerHTML: { __html: marked(this.props.card.description) }}), React.createElement(CheckList_1.CheckList, {cardId: this.props.card.id, tasks: this.props.card.tasks, taskCallbacks: this.props.taskCallbacks}));
        }
        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.card.color
        };
        const cardClassName = this.state.showDetails ? "card__title card__title--is-open" : "card__title";
        return connectDropTarget(connectDragSource(React.createElement("div", {className: "card"}, React.createElement("div", {style: sideColor}), React.createElement("div", {className: "card__edit"}, React.createElement(react_router_1.Link, {to: "/edit/" + this.props.card.id}, "✎")), React.createElement("div", {className: cardClassName, onClick: this.toggleDetails.bind(this)}, this.props.card.title), React.createElement(ReactCSSTransitionGroup, {transitionName: "toggle", transitionEnterTimeout: 250, transitionLeaveTimeout: 250}, cardDetails))));
    }
}
const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.card.id,
            status: props.card.status
        };
    },
    endDrag(props) {
        props.cardCallbacks.persistCardDrag(props.card.id, props.card.status);
    }
};
const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updatePosition(draggedId, props.id);
    }
};
let collectDrag = (connect) => {
    return {
        connectDragSource: connect.dragSource()
    };
};
let collectDrop = (connect) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};
const dragHighOrderCard = react_dnd_1.DragSource(constants_1.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = react_dnd_1.DropTarget(constants_1.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dragDropHighOrderCard;
//# sourceMappingURL=Card.js.map