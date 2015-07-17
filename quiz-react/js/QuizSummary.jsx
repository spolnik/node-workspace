var QuizSummary = React.createClass({
    render: function () {
        return (
            <div className="quizSummary container well col-md-8 col-md-offset-2">
                <QuizResult result="0" count="10" percentResult="0"/>
                <QuizTimeSpent timeSpent="0:01"/>
                <input type="button" className="btn btn-info btn-lg pull-left disabled" value="Check your answers" />
                <input type="button" className="btn btn-info btn-lg pull-right" onClick="window.location.reload()" value="Try Again" />
            </div>
        );
    }
});

var QuizTimeSpent = React.createClass({
    render: function () {
        return (
            <div className="center">
                <h2>Time Spent: </h2>
                <h3 className="text-info"><span id="timeSpent">{this.props.timeSpent}</span></h3>
            </div>
        );
    }
});
