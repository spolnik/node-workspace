'use strict';

var main = function () {

    var quiz = new Quiz(data, 10);

    var question = quiz.currentQuestion();
    $('#title').text(quiz.currentQuestionId() + ') ' + question.title);
    $('#subtitle').text(question.subtitle);

    var setAnswerText = function (id, text) {
        var $answer = $(id);

        if (text) {
            $answer.get(0).nextSibling.textContent = text;
            $answer.parent().show();
        } else {
            $answer.parent().hide();
        }
    };

    setAnswerText('#answer1', question.answer1);
    setAnswerText('#answer2', question.answer2);
    setAnswerText('#answer3', question.answer3);
    setAnswerText('#answer4', question.answer4);
};

$(document).ready(main);

function Quiz(data, count) {
    this.index = 0;
    this.points = 0;

    this.count = count;
    this.questions = _.shuffle(data.slice());
}

Quiz.prototype.evalAnswer = function (answer) {
    if (answer === this.currentQuestion().correctAnswer) {
        this.points++;
    }
};

Quiz.prototype.moveToNextQuestion = function () {
    this.index++;
};

Quiz.prototype.currentQuestion = function () {
    return this.questions[this.index];
};

Quiz.prototype.allPoints = function () {
    return this.points;
};

Quiz.prototype.currentQuestionId = function () {
    return this.index + 1;
};
