import * as React from "react";
import CardForm from "./CardForm";
import {CardCallbacks} from "./interfaces";
import {CardModel} from "./KanbanBoard";
import update = require("react-addons-update");

interface EditCardProps {
    cards: CardModel[];
    params: {card_id: number};
    cardCallbacks: CardCallbacks;
    history: History;
}

export default class EditCard extends React.Component<EditCardProps, CardModel> {

    componentWillMount() {
        let card = this.props.cards.find((card) => card.id == this.props.params.card_id);
        this.setState(card);
    }

    handleChange(field, value) {
        this.setState(update(this.state, {[field]: { $set: value}}));
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        this.props.cardCallbacks.updateCard(this.state);
        this.props.history.pushState(null, "/");
    }

    handleClose() {
        this.props.history.pushState(null, "/");
    }

    render() {
        return (
            <CardForm draftCard={this.state}
                      buttonLabel="Edit Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)} />
        );
    }
}