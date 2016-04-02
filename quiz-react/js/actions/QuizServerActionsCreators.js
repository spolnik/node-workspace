var QuizAppDispatcher = require('../dispatcher/QuizAppDispatcher');
var QuizConstants = require('../constants/QuizConstants');

var ActionTypes = QuizConstants.ActionTypes;

module.exports = {
    receiveAll: function (data) {
        QuizAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_QUESTIONS,
            data: data
        });
    }
};
