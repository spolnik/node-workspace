var QuizResult = React.createClass({displayName: "QuizResult",
    render: function () {
        return (
            React.createElement("div", {className: "center"}, 
                React.createElement("h2", null, "Result:"), 
                React.createElement("h3", {className: "text-success"}, React.createElement("span", {id: "result"}, this.props.result), " of ", React.createElement("span", {id: "count"}, this.props.count)), 
                React.createElement("h4", {className: "text-success"}, React.createElement("span", {id: "resultPercent"}, this.props.percentResult), "%")
            )
        );
    }
});
