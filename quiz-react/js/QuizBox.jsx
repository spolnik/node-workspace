var QuizBox = React.createClass({
    render: function () {
        return (
            <div className="quizBox">
                <QuizForm />
                <QuizSummary />
            </div>
        );
    }
});

React.render(
    <QuizBox />,
    document.getElementById('content')
);
