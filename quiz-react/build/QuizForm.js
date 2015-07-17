var QuizForm = React.createClass({displayName: "QuizForm",
    render: function () {
        return (
            React.createElement("div", {className: "quizForm"}, 
                React.createElement(QuestionForm, null), 
                React.createElement(QuizProgress, null)
            )
        );
    }
});

var QuestionForm = React.createClass({displayName: "QuestionForm",
    render: function () {
        return (
            React.createElement("div", {className: "questionForm container well col-md-8 col-md-offset-2"}, 
                React.createElement("h2", null, React.createElement("span", {id: "title"}, "Internal error.")), 
                React.createElement("h3", null, React.createElement("span", {id: "subtitle"}, "Some problem appear.")), 

                React.createElement("form", null, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(Answers, null)
                    ), 
                    React.createElement("button", {type: "submit", className: "btn btn-info btn-lg pull-left", id: "btnNext"}, "Next"), 
                    React.createElement("button", {type: "submit", className: "btn btn-info btn-lg pull-right disabled", id: "btnBack"}, "Back")
                )
            )
        );
    }
});

var QuizProgress = React.createClass({displayName: "QuizProgress",
    render: function () {
        return (
            React.createElement("div", {className: "answersCounter container col-md-8 col-md-offset-2"}, 
                React.createElement("span", {className: "pull-left"}, "Total ", React.createElement("span", {id: "howManyAlreadyDone"}, "0"), "/", React.createElement("span", {id: "numberOfQuestions"}, "y"), " answers"), 
                React.createElement("span", {className: "pull-right"}, "Time spent ", React.createElement("span", {id: "time"}, "0:00"))
            )
        )
    }
});

var Answers = React.createClass({displayName: "Answers",
    render: function () {
        var answers = [];

        for (var i = 0; i < 4; i++) {
            answers.push(React.createElement(Answer, {value: i}));
        }

        return (
            React.createElement("div", null, answers)
        );
    }
});

var Answer = React.createClass({displayName: "Answer",
    render: function () {
        return (
            React.createElement("div", {className: "answer radio"}, 
                React.createElement("label", null, 
                    React.createElement("input", {type: "radio", name: "answers", id: "answer{1+this.props.value}", value: "{this.props.value}"}), 
                    "Not defined."
                )
            )
        );
    }
});
