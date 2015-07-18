var QuizSummary = React.createClass({displayName: "QuizSummary",
    render: function () {
        return (
            React.createElement("div", {className: "quizSummary container well col-md-8 col-md-offset-2"}, 
                React.createElement(QuizResult, {result: this.props.result, 
                            count: this.props.count, 
                            percentResult: this.props.percentResult}), 
                React.createElement(QuizTimeSpent, {timeSpent: this.props.timeSpent}), 
                React.createElement("input", {type: "button", className: "btn btn-info btn-lg pull-left disabled", value: "Check your answers"}), 
                React.createElement("input", {type: "button", className: "btn btn-info btn-lg pull-right", onClick: "window.location.reload()", value: "Try Again"})
            )
        );
    }
});

var QuizTimeSpent = React.createClass({displayName: "QuizTimeSpent",
    render: function () {
        return (
            React.createElement("div", {className: "center"}, 
                React.createElement("h2", null, "Time Spent: "), 
                React.createElement("h3", {className: "text-info"}, React.createElement("span", {id: "timeSpent"}, this.props.timeSpent))
            )
        );
    }
});
