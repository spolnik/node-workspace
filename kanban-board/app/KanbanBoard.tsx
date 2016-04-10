import * as React from 'react';
import {List} from './List';

export interface TaskModel {
    done: boolean;
    name: string;
}

export interface CardData {
    id: number;
    title: string;
    description: string;
    color: string;
    status: string;
    tasks: TaskModel[];
}

export interface KanbanBoardProps {
    cards: CardData[];
}

export class KanbanBoard extends React.Component<KanbanBoardProps, {}> {
    render() {
        return (
            <div className="app">
                <List id="todo" title="To Do" cards={
                    this.props.cards.filter((card) => card.status === "todo")
                } />

                <List id='in-progress' title="In Progress" cards={
                  this.props.cards.filter((card) => card.status === "in-progress")
                } />

                <List id='done' title='Done' cards={
                  this.props.cards.filter((card) => card.status === "done")
                } />
            </div>
        )
    }
}