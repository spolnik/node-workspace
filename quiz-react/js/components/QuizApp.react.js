var React = require('react');
var _ = require('lodash');
var $ = require('jquery');

var QuizBox = require('./QuizBox.react');
var QuestionsStore = require('../store/QuestionsStore');

function getQuizState() {

    return {
        questions: QuestionsStore.getAll(),
        count: 10,
        currentId: 0,
        result: 0,
        savedAnswers: [],
        timeSpent: "0:00"
    }
}

var QuizApp = React.createClass({
    getInitialState: function () {
        return getQuizState();
    },
    componentDidMount: function () {
        QuestionsStore.addChangeListener(this._onChange);
    },
    componenWillUnmount: function () {
        QuestionsStore.removeChangeListener(this._onChange);
    },
    currentQuestion: function () {
        return this.state.questions[this.state.currentId];
    },
    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h2>JavaScript quiz</h2>
                </div>
                <QuizBox question={this.currentQuestion()}
                         result={this.state.result}
                         count={this.state.count}
                         timeSpent={this.state.timeSpent} />
            </div>
        )
    },
    _onChange: function () {
        this.setState(getQuizState());
    }
});

module.exports = QuizApp;
