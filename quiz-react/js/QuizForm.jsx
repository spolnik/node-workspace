var QuizForm = React.createClass({
    render: function () {
        return (
            <div className="quizForm">
                <QuizError />
                <QuestionForm questionId="1" question={this.props.currentQuestion}/>
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
