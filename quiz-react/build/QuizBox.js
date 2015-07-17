var QuizBox = React.createClass({displayName: "QuizBox",
    render: function () {
        return (
            React.createElement("div", {className: "quizBox"}, 
                React.createElement(QuizForm, null), 
                React.createElement(QuizSummary, null)
            )
        );
    }
});

React.render(
    React.createElement(QuizBox, null),
    document.getElementById('content')
);
