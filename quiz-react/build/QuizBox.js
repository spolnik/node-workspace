var QuizBox = React.createClass({displayName: "QuizBox",
    getInitialState: function () {
        return {
            data: [{
                title: "Title",
                subtitle: "Subtitle",
                answers: [
                    { description: "Answer 1", correct: true},
                    { description: "Answer 2", correct: false}
                ]
            }],
            count: 10,
            currentQuestionId: 0
        };
    },
    currentQuestion: function () {
        return this.state.data[this.state.currentQuestionId];
    },
    componentWillMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: true,
            success: function (data) {
                this.setState({data: _.shuffle(data)});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            React.createElement("div", {className: "quizBox"}, 
                React.createElement(QuizForm, {currentQuestion: this.currentQuestion()}), 
                React.createElement(QuizSummary, {result: "0", count: "10", percentResult: "0", timeSpent: "0:01"})
            )
        );
    }
});

React.render(
    React.createElement(QuizBox, {url: "data.json"}),
    document.getElementById('content')
);
