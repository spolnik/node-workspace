var React = require('react');
var _ = require('lodash');
var $ = require('jquery');

var QuizForm = require('./QuizForm.react');
var QuizSummary = require('./QuizSummary.react');

var QuizBox = React.createClass({
    getInitialState: function () {
        return {
            data: [{
                id: 0,
                title: "Title",
                subtitle: "Subtitle",
                answers: [
                    { description: "Answer 1", correct: true},
                    { description: "Answer 2", correct: false}
                ]
            }],
            count: 10,
            currentId: 0,
            result: 0,
            savedAnswers: []
        };
    },
    currentQuestion: function () {
        return this.state.data[this.state.currentId];
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: true,
            success: function (data) {
                this.setState({
                    data: _.take(_.shuffle(data),this.state.count).map(
                        function (item, id) {
                            return $.extend(item, {id: id+1})
                        }
                    )
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="quizBox">
                <QuizForm currentQuestion={this.currentQuestion()} />
                <QuizSummary result={this.state.result}
                             count={this.state.count}
                             percentResult={this.state.result / this.state.count * 100}
                             timeSpent="0:01" />
            </div>
        );
    }
});

module.exports = QuizBox;
