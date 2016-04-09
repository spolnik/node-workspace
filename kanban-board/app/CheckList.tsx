import * as React from "react";
import {TaskData} from "./KanbanBoard";

export interface CheckListProps {
    cardId: number;
    tasks: TaskData[];
}

export class CheckList extends React.Component<CheckListProps, {}> {
    render() {
        let tasks = this.props.tasks.map((task) => (
            <li className="checklist__task">
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist__task--remove" />
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        );
    }
}