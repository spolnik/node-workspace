"use strict";
const React = require("react");
const CardForm_1 = require("./CardForm");
const update = require("react-addons-update");
class NewCard extends React.Component {
    componentWillMount() {
        this.setState({
            id: Date.now(),
            title: "",
            description: "",
            status: "todo",
            color: "#c9c9c9",
            tasks: []
        });
    }
    handleChange(field, value) {
        this.setState(update(this.state, { [field]: { $set: value } }));
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.cardCallbacks.addCard(this.state);
        this.props.history.pushState(null, "/");
    }
    handleClose() {
        this.props.history.pushState(null, "/");
    }
    render() {
        return (React.createElement(CardForm_1.default, {draftCard: this.state, buttonLabel: "Create Card", handleChange: this.handleChange.bind(this), handleSubmit: this.handleSubmit.bind(this), handleClose: this.handleClose.bind(this)}));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewCard;
//# sourceMappingURL=NewCard.js.map