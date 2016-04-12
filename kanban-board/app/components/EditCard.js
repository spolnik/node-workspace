"use strict";
const React = require("react");
const CardForm_1 = require("./CardForm");
const update = require("react-addons-update");
class EditCard extends React.Component {
    componentWillMount() {
        let card = this.props.cards.find((card) => card.id == this.props.params.card_id);
        this.setState(card);
    }
    handleChange(field, value) {
        this.setState(update(this.state, { [field]: { $set: value } }));
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.cardCallbacks.updateCard(this.state);
        this.props.history.pushState(null, "/");
    }
    handleClose() {
        this.props.history.pushState(null, "/");
    }
    render() {
        return (React.createElement(CardForm_1.default, {draftCard: this.state, buttonLabel: "Edit Card", handleChange: this.handleChange.bind(this), handleSubmit: this.handleSubmit.bind(this), handleClose: this.handleClose.bind(this)}));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditCard;
//# sourceMappingURL=EditCard.js.map