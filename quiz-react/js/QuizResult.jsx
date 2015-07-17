var QuizResult = React.createClass({
    render: function () {
        return (
            <div className="center">
                <h2>Result:</h2>
                <h3 className="text-success"><span id="result">0</span> of <span id="count">x</span></h3>
                <h4 className="text-success"><span id="resultPercent">0</span>%</h4>
            </div>
        );
    }
});
