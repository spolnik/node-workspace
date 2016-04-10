import * as React from "react";
import {CheckList} from "./CheckList";
import {TaskModel} from "./KanbanBoard";
import * as marked from "marked";

export interface CardState {
    showDetails: boolean;
}

export interface CardProps {
    id: number;
    title: string;
    description: string;
    tasks: TaskModel[];
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
                <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                <CheckList cardId={this.props.id} tasks={this.props.tasks} />
            </div>;
        }

        const cardClassName = this.state.showDetails ? "card__title card__title--is-open" : "card__title";

        return (
            <div className="card">
                <div className={cardClassName} onClick={this.toggleDetails.bind(this)}>
                    {this.props.title}
                </div>
                {cardDetails}
            </div>
        )
    }
}