var React = require('react');

var QuestionForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        //TODO: implement next / finish button action
        //TODO: implement error show/hide logic
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <Answers answers={this.props.question.answers} />
                </div>
                <button type="submit" className="btn btn-info btn-lg pull-left" id="btnNext">Next</button>
                <button type="button" className="btn btn-info btn-lg pull-right disabled" id="btnBack">Back</button>
            </form>
        );
    }
});

var Answers = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.answers.map(function(answer, id) {
                    return (
                        <div className="radio">
                            <label>
                                <input type="radio"
                                       name="answers"
                                       key={id}
                                       id="answer{1+id}"
                                       value="{id}" />
                                {answer.description}
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = QuestionForm;
