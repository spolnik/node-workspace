import * as React from 'react';
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import List from './List';
import {KanbanBoardTaskCallbacks, KanbanBoardCardCallbacks} from "./interfaces";

export interface TaskModel {
    id: number;
    done: boolean;
    name: string;
}

export interface CardModel {
    id: number;
    title: string;
    description: string;
    color: string;
    status: string;
    tasks: TaskModel[];
}

interface KanbanBoardProps {
    cards: CardModel[];
    taskCallbacks: KanbanBoardTaskCallbacks;
    cardCallbacks: KanbanBoardCardCallbacks;
}

class KanbanBoard extends React.Component<KanbanBoardProps, {}> {
    render() {
        return (
            <div className="app">
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
            </div>
        )
    }
}

export default DragDropContext<KanbanBoardProps>(HTML5Backend)(KanbanBoard);