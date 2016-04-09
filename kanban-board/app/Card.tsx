import * as React from "react";
import {CheckList} from "./CheckList";
import {TaskModel} from "./KanbanBoard";

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

    render() {
        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = <div className="card__details">
                {this.props.description}
                <CheckList cardId={this.props.id} tasks={this.props.tasks} />
            </div>;
        }

        return (
            <div className="card">
                <div className="card__title" onClick={
                    () => this.setState({ showDetails: !this.state.showDetails })
                }>{this.props.title}</div>
                {cardDetails}
            </div>
        )
    }
}