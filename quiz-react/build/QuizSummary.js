var QuizSummary = React.createClass({displayName: "QuizSummary",
    render: function () {
        return (
            React.createElement("div", {className: "quizSummary container well col-md-8 col-md-offset-2"}, 
                React.createElement(QuizResult, null), 
                React.createElement(QuizTimeSpent, null), 
                React.createElement("input", {type: "button", className: "btn btn-info btn-lg pull-left disabled", value: "Check your answers"}), 
                React.createElement("input", {type: "button", className: "btn btn-info btn-lg pull-right", onClick: "window.location.reload()", value: "Try Again"})
            )
        );
    }
});
