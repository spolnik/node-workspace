var QuestionForm = React.createClass({displayName: "QuestionForm",
    handleSubmit: function(e) {
        e.preventDefault();

        //TODO: implement next / finish button action
        //TODO: implement error show/hide logic
    },
    render: function () {
        return (
            React.createElement("form", {onSubmit: this.handleSubmit}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement(Answers, {answers: this.props.question.answers})
                ), 
                React.createElement("button", {type: "submit", className: "btn btn-info btn-lg pull-left", id: "btnNext"}, "Next"), 
                React.createElement("button", {type: "button", className: "btn btn-info btn-lg pull-right disabled", id: "btnBack"}, "Back")
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
