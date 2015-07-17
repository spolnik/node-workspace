var QuizResult = React.createClass({displayName: "QuizResult",
    render: function () {
        return (
            React.createElement("div", {className: "center"}, 
                React.createElement("h2", null, "Result:"), 
                React.createElement("h3", {className: "text-success"}, React.createElement("span", {id: "result"}, "0"), " of ", React.createElement("span", {id: "count"}, "x")), 
                React.createElement("h4", {className: "text-success"}, React.createElement("span", {id: "resultPercent"}, "0"), "%")
            )
        );
    }
});
