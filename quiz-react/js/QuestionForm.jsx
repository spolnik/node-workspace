var QuestionForm = React.createClass({
    render: function () {
        return (
            <div className="questionForm container well col-md-8 col-md-offset-2">
                <h2><span id="title">{this.props.questionId + ') ' + this.props.question.title}</span></h2>
                <h3><span id="subtitle">{this.props.question.subtitle}</span></h3>

                <form>
                    <div className="form-group">
                        <Answers answers={this.props.question.answers} />
                    </div>
                    <button type="submit" className="btn btn-info btn-lg pull-left" id="btnNext">Next</button>
                    <button type="submit" className="btn btn-info btn-lg pull-right disabled" id="btnBack">Back</button>
                </form>
            </div>
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
