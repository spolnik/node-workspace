"use strict";
const React = require("react");
class CheckList extends React.Component {
    checkInputKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.taskCallbacks.addTask(this.props.cardId, event.target.value);
            event.target.value = '';
        }
    }
    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => (React.createElement("li", {key: task.id, className: "checklist__task"}, React.createElement("input", {type: "checkbox", checked: task.done, onChange: this.props.taskCallbacks.toggleTask.bind(null, this.props.cardId, task.id, taskIndex)}), task.name, ' ', React.createElement("a", {href: "#", className: "checklist__task--remove", onClick: this.props.taskCallbacks.deleteTask.bind(null, this.props.cardId, task.id, taskIndex)}))));
        return (React.createElement("div", {className: "checklist"}, React.createElement("ul", null, tasks), React.createElement("input", {type: "text", className: "checklist--add-task", placeholder: "Type then hit Enter to add a task", onKeyPress: this.checkInputKeyPress.bind(this)})));
    }
}
exports.CheckList = CheckList;
//# sourceMappingURL=CheckList.js.map