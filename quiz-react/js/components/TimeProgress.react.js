var React = require('react');

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};

var TimeProgress = React.createClass({
    mixins: [SetIntervalMixin],
    getInitialState: function () {
        return {seconds: 0};
    },
    componentDidMount: function () {
        this.setInterval(this.tick, 1000);
    },
    tick: function () {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function () {

        var withLeadingZero = function(seconds) {
            return seconds < 10 ? '0' + seconds : seconds;
        };

        var timeSpent = new Date(this.state.seconds * 1000);
        var result = timeSpent.getMinutes() + ':' + withLeadingZero(timeSpent.getSeconds())

        return (
            <span className="pull-right">Time spent <span id="time">{result}</span></span>
        );
    }
});

module.exports = TimeProgress;
