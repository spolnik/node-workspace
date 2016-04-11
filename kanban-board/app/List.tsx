import * as React from "react";
import {DropTarget} from "react-dnd";
import {CardModel} from "./KanbanBoard";
import Card from "./Card";
import {TaskCallbacks, CardCallbacks} from "./interfaces";
import {CARD} from "./constants";

export interface ListProps {
    id: string;
    title: string;
    cards: CardModel[];
    taskCallbacks: TaskCallbacks;
    cardCallbacks: CardCallbacks;
    connectDropTarget: Function;
}

class List extends React.Component<ListProps, {}> {
    render() {
        const { connectDropTarget } = this.props;

        let cards = this.props.cards.map((card) => {
            return <Card key={card.id}
                         taskCallbacks={this.props.taskCallbacks}
                         cardCallbacks={this.props.cardCallbacks}
                         card={card} />
        });

        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        )
    }
}

const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

export default DropTarget(CARD, listTargetSpec, collect)(List);