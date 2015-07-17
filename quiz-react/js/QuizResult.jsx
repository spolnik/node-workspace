var QuizResult = React.createClass({
    render: function () {
        return (
            <div className="center">
                <h2>Result:</h2>
                <h3 className="text-success"><span id="result">{this.props.result}</span> of <span id="count">{this.props.count}</span></h3>
                <h4 className="text-success"><span id="resultPercent">{this.props.percentResult}</span>%</h4>
            </div>
        );
    }
});
