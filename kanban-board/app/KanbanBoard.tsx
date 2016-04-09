import * as React from 'react';
import {List} from './List';

export interface TaskData {
    done: boolean;
    name: string;
}

export interface CardData {
    id: number;
    title: string;
    description: string;
    status: string;
    tasks: TaskData[];
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