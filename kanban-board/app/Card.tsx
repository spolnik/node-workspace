import * as React from "react";
import * as marked from "marked";
import {CheckList} from "./CheckList";
import {CardModel} from "./KanbanBoard";

export interface CardState {
    showDetails: boolean;
}

export interface CardProps extends React.Props<{}> {
    card: CardModel;
}

export class Card extends React.Component<CardProps, CardState> {

    state: CardState;

    constructor(props: CardProps) {
        super(props);
        this.state = {
            showDetails: false
        };
    }

    toggleDetails() {
        this.setState({ showDetails: !this.state.showDetails });
    }

    render() {
        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = <div className="card__details">
                <span dangerouslySetInnerHTML={{__html:marked(this.props.card.description)}} />
                <CheckList cardId={this.props.card.id} tasks={this.props.card.tasks} />
            </div>;
        }

        let sideColor ={
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.card.color
        };

        const cardClassName = this.state.showDetails ? "card__title card__title--is-open" : "card__title";

        return (
            <div className="card">
                <div style={sideColor}></div>
                <div className={cardClassName} onClick={this.toggleDetails.bind(this)}>
                    {this.props.card.title}
                </div>
                {cardDetails}
            </div>
        )
    }
}