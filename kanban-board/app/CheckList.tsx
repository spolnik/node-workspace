import * as React from "react";
import {TaskModel} from "./KanbanBoard";

export interface CheckListProps {
    cardId: number;
    tasks: TaskModel[];
}

export class CheckList extends React.Component<CheckListProps, {}> {
    render() {
        let tasks = this.props.tasks.map((task) => (
            <li key={task.id} className="checklist__task">
                <input type="checkbox" defaultChecked={task.done}/>
                {task.name}
                <a href="#" className="checklist__task--remove"/>
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type then hit Enter to add a task"/>
            </div>
        );
    }
}