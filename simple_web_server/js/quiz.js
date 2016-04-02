'use strict';

var main = function () {

    var NUMBER_OF_QUESTIONS = 10,
        snapshot = new Date();

    $('#numberOfQuestions').text(NUMBER_OF_QUESTIONS);

    var timerHandler = setInterval(function () {

        var withLeadingZero = function(seconds) {
            return seconds < 10 ? '0' + seconds : seconds;
        };

        var diff = Math.abs(new Date() - snapshot);
        var timeSpent = new Date(diff);
        $('#time').text(
            timeSpent.getMinutes() + ':' + withLeadingZero(timeSpent.getSeconds())
        );
    }, 1000);

    $.getJSON('js/data.json', function (data) {

        var applyQuestion = function (question, id) {
            $('#title').text(id + ') ' + question.title);
            $('#subtitle').text(question.subtitle);

            var setAnswerText = function (id, answer) {
                var $answer = $(id);

                if (answer) {
                    $answer.get(0).nextSibling.textContent = answer.description;
                    $answer.parent().show();
                } else {
                    $answer.parent().hide();
                }
            };

            setAnswerText('#answer1', question.answers[0]);
            setAnswerText('#answer2', question.answers[1]);
            setAnswerText('#answer3', question.answers[2]);
            setAnswerText('#answer4', question.answers[3]);
        };

        var quiz = new Quiz(data, NUMBER_OF_QUESTIONS);
        applyQuestion(quiz.currentQuestion(), quiz.currentQuestionId());

        var nextOrFinish = function (event) {
            event.preventDefault();

            var $error = $('#error');
            $error.hide('fast');

            var $input = $('input:checked');

            var answer = $input.val();
            if (answer === undefined) {
                $error.show('fast');
                return;
            }

            $input.prop('checked', false);

            quiz.checkAnswer(answer);

            var $well = $('.well');

            $well.fadeOut('fast').promise().done( function () {
                quiz.moveToNextQuestion();
                $('#howManyAlreadyDone').text(quiz.index);
                applyQuestion(quiz.currentQuestion(), quiz.currentQuestionId());
                $well.fadeIn('fast');

                if (quiz.count === quiz.currentQuestionId()) {
                    $('#btnNext').text('Finish');
                } else if (quiz.count < quiz.currentQuestionId()) {
                    clearInterval(timerHandler);

                    $('#result').text(quiz.allPoints());
                    $('#count').text(quiz.count);
                    $('#resultPercent').text(quiz.allPoints() / quiz.count * 100.00);
                    $('#timeSpent').text($('#time').text());

                    $('#quizForm').hide('slow');
                    $('#summary').show('slow');
                }
            });
        };

        $('button').click(nextOrFinish);
    });
};

$(document).ready(main);

function Quiz(data, count) {
    this.index = 0;
    this.points = 0;

    this.count = count;
    this.questions = _.shuffle(data.slice());
}

Quiz.prototype.checkAnswer = function (answerId) {

    if (this.currentQuestion().answers[answerId].correct) {
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
