var $ = require('jquery');
var QuizServerActionsCreators = require('../actions/QuizServerActionsCreators');

module.exports = {
    getAllQuestions: function () {
        $.ajax({
            url: 'data.json',
            dataType: 'json',
            cache: true,
            success: function (data) {
                QuizServerActionsCreators.receiveAll(data);
            },
            error: function (xhr, status, err) {
                console.error('data.url', status, err.toString());
            }
        });
    }
};
