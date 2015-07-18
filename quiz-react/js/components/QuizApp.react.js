var React = require('react');
var QuizBox = require('./QuizBox.react');

var QuizApp = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h2>JavaScript quiz</h2>
                </div>
                <QuizBox url="data.json" />
            </div>
        )
    }
});

module.exports = QuizApp;
