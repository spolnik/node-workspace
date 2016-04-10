import * as React from "react";
import {TaskModel} from "./KanbanBoard";
import {KanbanBoardCallbacks} from "./KanbanBoardContainer";

export interface CheckListProps {
    cardId: number;
    tasks: TaskModel[];
    taskCallbacks: KanbanBoardCallbacks;
}

export class CheckList extends React.Component<CheckListProps, {}> {

    checkInputKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.taskCallbacks.addTask(this.props.cardId, event.target.value);
            event.target.value = '';
        }
    }

    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => (
            <li key={task.id} className="checklist__task">
                <input type="checkbox" checked={task.done} onChange={
                    this.props.taskCallbacks.toggleTask.bind(null, this.props.cardId, task.id, taskIndex)
                }/>
                {task.name}{' '}
                <a href="#" className="checklist__task--remove" onClick={
                    this.props.taskCallbacks.deleteTask.bind(null, this.props.cardId, task.id, taskIndex)
                }/>
            </li>
        ));

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                       className="checklist--add-task"
                       placeholder="Type then hit Enter to add a task"
                       onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        );
    }
}