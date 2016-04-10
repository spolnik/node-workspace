import * as React from "react";
import {CardModel} from "./KanbanBoard";
import {Card} from "./Card";
import {KanbanBoardCallbacks} from "./KanbanBoardContainer";

export interface ListProps {
    id: string;
    title: string;
    cards: CardModel[];
    taskCallbacks: KanbanBoardCallbacks;
}

export class List extends React.Component<ListProps, {}> {
    render() {
        let cards = this.props.cards.map((card) => {
            return <Card key={card.id}
                         taskCallbacks={this.props.taskCallbacks}
                         card={card}/>
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}