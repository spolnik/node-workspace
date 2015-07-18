var React = require('react');
var QuestionForm = require('./QuestionForm.react');
var TimeProgress = require('./TimeProgress.react');

var QuizForm = React.createClass({
    render: function () {
        return (
            <div className="quizForm">
                <QuizError />
                <div className="questionForm container well col-md-8 col-md-offset-2">
                    <h2><span id="title">{this.props.currentQuestion.id + ') ' + this.props.currentQuestion.title}</span></h2>
                    <h3><span id="subtitle">{this.props.currentQuestion.subtitle}</span></h3>

                    <QuestionForm question={this.props.currentQuestion}/>
                </div>
                <QuizProgress count="10" />
            </div>
        );
    }
});

var QuizError = React.createClass({
    render: function () {
        return (
            <div className="quizError alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" ariaHidden="true"></span>
                <span className="sr-only">Error: </span>
                &nbsp;You have to choose answer
            </div>
        );
    }
});

var QuizProgress = React.createClass({
    render: function () {
        return (
            <div className="answersCounter container col-md-8 col-md-offset-2">
                <span className="pull-left">Total <span id="howManyAlreadyDone">0</span>/<span id="numberOfQuestions">{this.props.count}</span> answers</span>
                <TimeProgress />
            </div>
        )
    }
});

module.exports = QuizForm;
