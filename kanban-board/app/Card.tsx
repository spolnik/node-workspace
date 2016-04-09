import * as React from "react";
import {CheckList} from "./CheckList";
import {TaskData} from "./KanbanBoard";

export interface CardProps {
    id: number;
    title: string;
    description: string;
    tasks: TaskData[];
}

export class Card extends React.Component<CardProps, {}> {
    render() {
        return (
            <div className="card">
                <div className="card__title">{this.props.title}</div>
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            </div>
        )
    }
}