import * as React from "react";
import {CardData} from "./KanbanBoard";
import {Card} from "./Card";

export interface ListProps {
    id: string;
    title: string;
    cards: CardData[];
}

export class List extends React.Component<ListProps, {}> {
    render() {
        let cards = this.props.cards.map((card) => {
            return (
                <Card id={card.id}
                         title={card.title}
                         description={card.description}
                         color={card.color}
                         tasks={card.tasks} />
            )
        });

        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}