var QuestionForm = React.createClass({displayName: "QuestionForm",
    render: function () {
        return (
            React.createElement("div", {className: "questionForm container well col-md-8 col-md-offset-2"}, 
                React.createElement("h2", null, React.createElement("span", {id: "title"}, this.props.questionId + ') ' + this.props.question.title)), 
                React.createElement("h3", null, React.createElement("span", {id: "subtitle"}, this.props.question.subtitle)), 

                React.createElement("form", null, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement(Answers, {answers: this.props.question.answers})
                    ), 
                    React.createElement("button", {type: "submit", className: "btn btn-info btn-lg pull-left", id: "btnNext"}, "Next"), 
                    React.createElement("button", {type: "submit", className: "btn btn-info btn-lg pull-right disabled", id: "btnBack"}, "Back")
                )
            )
        );
    }
});

var Answers = React.createClass({displayName: "Answers",
    render: function () {
        return (
            React.createElement("div", null, 
                this.props.answers.map(function(answer, id) {
                    return (
                        React.createElement("div", {className: "radio"}, 
                            React.createElement("label", null, 
                                React.createElement("input", {type: "radio", 
                                       name: "answers", 
                                       key: id, 
                                       id: "answer{1+id}", 
                                       value: "{id}"}), 
                                answer.description
                            )
                        )
                    );
                })
            )
        );
    }
});
