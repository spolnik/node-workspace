'use strict';

var _ = {
    shuffle: function (data) {
        return data;
    }
};

describe("Quiz for", function () {

    var simpleDataCase = [
        {
            title: 'Question A',
            answers: [
                {description: 'A', correct: true},
                {description: 'B', correct: false}
            ]
        },
        {
            title: 'Question B',
            answers: [
                {description: 'A', correct: false},
                {description: 'B', correct: true}
            ]
        }
    ];

    describe("simple set of two questions", function () {

        beforeEach(function () {
            this.quiz = new Quiz(simpleDataCase, 2);
        });

        it ("gives human readable id of first question as 1", function () {
            var id = this.quiz.currentQuestionId();
            expect(id).toBe(1);
        });

        it ("gives total amount of questions as 2", function () {
            var count = this.quiz.count;
            expect(count).toBe(2);
        });

        it ("gives current question as " + JSON.stringify(simpleDataCase[0]), function() {
            var question = this.quiz.currentQuestion();
            expect(question).toEqual(simpleDataCase[0]);
        });

        it("gives next question as " + JSON.stringify(simpleDataCase[1]), function () {
            this.quiz.moveToNextQuestion();
            expect(this.quiz.currentQuestion()).toEqual(simpleDataCase[1]);
        });

        it("gives 1 point if the first answer is '1'", function () {
            this.quiz.checkAnswer(0);
            expect(this.quiz.allPoints()).toBe(1);
        });

        it("gives 0 points if answer is invalid", function () {
            this.quiz.checkAnswer(1);
            expect(this.quiz.allPoints()).toBe(0);
        });

        it("gives 0 points if there are only invalid answers", function () {
            this.quiz.checkAnswer(1);
            this.quiz.moveToNextQuestion();
            this.quiz.checkAnswer(0);
            expect(this.quiz.allPoints()).toBe(0);
        });

        it("gives 1 point if from two questions only one answer is correct", function () {
            this.quiz.checkAnswer(0);
            this.quiz.moveToNextQuestion();
            this.quiz.checkAnswer(0);
            expect(this.quiz.allPoints()).toBe(1);
        });

        it("gives 2 points if there are both correct answers", function () {
            this.quiz.checkAnswer(0);
            this.quiz.moveToNextQuestion();
            this.quiz.checkAnswer(1);
            expect(this.quiz.allPoints()).toBe(2);
        });
    });
});
