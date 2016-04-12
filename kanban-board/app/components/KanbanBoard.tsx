import * as React from 'react';
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import List from './List';
import {TaskCallbacks, CardCallbacks, CardModel} from "./interfaces";
import ReactElement = __React.ReactElement;
import {Link} from "react-router";

export interface KanbanBoardProps {
    cards: CardModel[];
    taskCallbacks: TaskCallbacks;
    cardCallbacks: CardCallbacks;
}

class KanbanBoard extends React.Component<KanbanBoardProps, {}> {
    render() {
        let cardModal = this.props.children && React.cloneElement(this.props.children as any, {
            cards: this.props.cards,
            cardCallbacks: this.props.cardCallbacks
        });

        return (
            <div className="app">
                <Link to="/new" className="float-button">+</Link>

                <List id="todo" title="To Do" taskCallbacks={this.props.taskCallbacks}
                      cardCallbacks={this.props.cardCallbacks}
                      cards={this.props.cards.filter((card) => card.status === "todo")
                } />

                <List id='in-progress' title="In Progress" taskCallbacks={this.props.taskCallbacks}
                      cardCallbacks={this.props.cardCallbacks}
                      cards={this.props.cards.filter((card) => card.status === "in-progress")
                } />

                <List id='done' title='Done' taskCallbacks={this.props.taskCallbacks}
                      cardCallbacks={this.props.cardCallbacks}
                      cards={this.props.cards.filter((card) => card.status === "done")
                } />

                {cardModal}
                
            </div>
        )
    }
}

export default DragDropContext<KanbanBoardProps>(HTML5Backend)(KanbanBoard);