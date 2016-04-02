var _ = require('lodash');
var $ = require('jquery');

var QuizAppDispatcher = require('../dispatcher/QuizAppDispatcher');
var QuizConstants = require('../constants/QuizConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = QuizConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _questions = {
    0: {
        id: 1,
        title: "Title",
        subtitle: "Subtitle",
        answers: [
            { description: "Answer 1", correct: true},
            { description: "Answer 2", correct: false}
        ]
    }
};

function _addQuestions(data) {
    _questions = {};

    _.take(
        _.shuffle(data), 10
    ).forEach(function (item, id) {
        _questions[id] = $.extend(item, {id: id + 1});
    });
}

function load(data) {
    _questions = data;
}

var QuestionsStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAll: function () {
        return _questions;
    }
});

QuestionsStore.dispatchToken = QuizAppDispatcher.register(function(action) {
    switch (action.type) {
        case ActionTypes.RECEIVE_QUESTIONS:
            _addQuestions(action.data);
            QuestionsStore.emitChange();
            break;
        default :
            //do nothing
    }
});


module.exports = QuestionsStore;
