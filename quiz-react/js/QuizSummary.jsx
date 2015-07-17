var QuizSummary = React.createClass({
    render: function () {
        return (
            <div className="quizSummary container well col-md-8 col-md-offset-2">
                <QuizResult />
                <QuizTimeSpent />
                <input type="button" className="btn btn-info btn-lg pull-left disabled" value="Check your answers" />
                <input type="button" className="btn btn-info btn-lg pull-right" onClick="window.location.reload()" value="Try Again" />
            </div>
        );
    }
});
