var React = require('react');
var QuizResult = require('./QuizResult.react');

var QuizSummary = React.createClass({
    render: function () {
        return (
            <div className="quizSummary container well col-md-8 col-md-offset-2">
                <QuizResult result={this.props.result}
                            count={this.props.count}
                            percentResult={this.props.percentResult}/>
                <QuizTimeSpent timeSpent={this.props.timeSpent}/>
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

module.exports = QuizSummary;
