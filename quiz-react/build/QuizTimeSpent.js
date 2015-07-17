var QuizTimeSpent = React.createClass({displayName: "QuizTimeSpent",
    render: function () {
        return (
            React.createElement("div", {className: "center"}, 
                React.createElement("h2", null, "Time Spent: "), 
                React.createElement("h3", {className: "text-info"}, React.createElement("span", {id: "timeSpent"}, "0:00"))
            )
        );
    }
});
