import * as React from "react";
import CardForm from "./CardForm";
import {CardCallbacks} from "./interfaces";
import {CardModel} from "./KanbanBoard";
import update = require("react-addons-update");

interface NewCardProps {
    cardCallbacks: CardCallbacks;
    history: History
}

export default class NewCard extends React.Component<NewCardProps, CardModel> {

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
        this.setState(update(this.state, {[field]: {$set: value}}));
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        this.props.cardCallbacks.addCard(this.state);
        this.props.history.pushState(null, "/");
    }

    handleClose() {
        this.props.history.pushState(null, "/");
    }

    render() {
        return (
            <CardForm draftCard={this.state}
                      buttonLabel="Create Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)} />
        );
    }
}