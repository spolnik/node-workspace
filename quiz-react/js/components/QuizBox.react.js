var React = require('react');

var QuizForm = require('./QuizForm.react');
var QuizSummary = require('./QuizSummary.react');

var QuizBox = React.createClass({
    render: function () {
        return (
            <div className="quizBox">
                <QuizForm question={this.props.question} />
                <QuizSummary result={this.props.result}
                             count={this.props.count}
                             percentResult={this.props.result / this.props.count * 100}
                             timeSpent={this.props.timeSpent} />
            </div>
        );
    }
});

module.exports = QuizBox;
