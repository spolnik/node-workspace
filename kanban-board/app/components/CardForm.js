"use strict";
const React = require("react");
class CardForm extends React.Component {
    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }
    handleClose(e) {
        e.preventDefault();
        this.props.handleClose();
    }
    render() {
        return (React.createElement("div", null, React.createElement("div", {className: "card big"}, React.createElement("form", {onSubmit: this.props.handleSubmit.bind(this)}, React.createElement("input", {type: "text", value: this.props.draftCard.title, onChange: this.handleChange.bind(this, 'title'), placeholder: "Title", required: true, autoFocus: true}), React.createElement("textarea", {value: this.props.draftCard.description, onChange: this.handleChange.bind(this, 'description'), placeholder: "Description", required: true}), React.createElement("label", {htmlFor: "status"}, "Status"), React.createElement("select", {id: "status", value: this.props.draftCard.status, onChange: this.handleChange.bind(this, 'status')}, React.createElement("option", {value: "todo"}, "To Do"), React.createElement("option", {value: "in-progress"}, "In Progress"), React.createElement("option", {value: "done"}, "Done")), React.createElement("br", null), React.createElement("label", {htmlFor: "color"}, "Color"), React.createElement("input", {type: "color", id: "color", value: this.props.draftCard.color, onChange: this.handleChange.bind(this, 'color')}), React.createElement("div", {className: "actions"}, React.createElement("button", {type: "submit"}, this.props.buttonLabel)))), React.createElement("div", {className: "overlay", onClick: this.handleClose.bind(this)})));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CardForm;
//# sourceMappingURL=CardForm.js.map