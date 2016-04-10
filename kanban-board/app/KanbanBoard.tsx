import * as React from 'react';
import {List} from './List';
import {KanbanBoardCallbacks} from "./KanbanBoardContainer";

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

export interface KanbanBoardProps {
    cards: CardModel[];
    taskCallbacks: KanbanBoardCallbacks
}

export class KanbanBoard extends React.Component<KanbanBoardProps, {}> {
    render() {
        return (
            <div className="app">
                <List id="todo" title="To Do" taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card) => card.status === "todo")
                } />

                <List id='in-progress' title="In Progress" taskCallbacks={this.props.taskCallbacks} cards={
                  this.props.cards.filter((card) => card.status === "in-progress")
                } />

                <List id='done' title='Done' taskCallbacks={this.props.taskCallbacks} cards={
                  this.props.cards.filter((card) => card.status === "done")
                } />
            </div>
        )
    }
}