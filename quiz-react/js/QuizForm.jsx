var QuizForm = React.createClass({
    render: function () {
        return (
            <div className="quizForm">
                <QuestionForm />
                <QuizProgress />
            </div>
        );
    }
});

var QuestionForm = React.createClass({
    render: function () {
        return (
            <div className="questionForm container well col-md-8 col-md-offset-2">
                <h2><span id="title">Internal error.</span></h2>
                <h3><span id="subtitle">Some problem appear.</span></h3>

                <form>
                    <div className="form-group">
                        <Answers />
                    </div>
                    <button type="submit" className="btn btn-info btn-lg pull-left" id="btnNext">Next</button>
                    <button type="submit" className="btn btn-info btn-lg pull-right disabled" id="btnBack">Back</button>
                </form>
            </div>
        );
    }
});

var QuizProgress = React.createClass({
    render: function () {
        return (
            <div className="answersCounter container col-md-8 col-md-offset-2">
                <span className="pull-left">Total <span id="howManyAlreadyDone">0</span>/<span id="numberOfQuestions">y</span> answers</span>
                <TimeProgress />
            </div>
        )
    }
});

var Answers = React.createClass({
    render: function () {
        var answers = [];

        for (var i = 0; i < 4; i++) {
            answers.push(<Answer value={i} />);
        }

        return (
            <div>{answers}</div>
        );
    }
});

var Answer = React.createClass({
    render: function () {
        return (
            <div className="answer radio">
                <label>
                    <input type="radio" name="answers" id="answer{1+this.props.value}" value="{this.props.value}" />
                    Not defined.
                </label>
            </div>
        );
    }
});
