'use strict';

var main = function () {

    var count = 1;

    var question = data[0];
    $('#title').text(count + ') ' + question.title);
    $('#subtitle').text(question.subtitle);

    var setAnswerText = function (id, text) {
        $(id).get(0).nextSibling.textContent = text;
    };

    setAnswerText('#answer1', question.answer1);
    setAnswerText('#answer2', question.answer2);
    setAnswerText('#answer3', question.answer3);
    setAnswerText('#answer4', question.answer4);
};

$(document).ready(main);

var data = [
    {
        title: 'What is the correct JavaScript syntax to change the content of the HTML element below?',
        subtitle: '<p id="demo">This is a demonstration.</p>',
        answer1: 'document.getElementById("demo").innerHTML = "Hello World!";',
        answer2: 'document.getElement("p").innerHTML = "Hello World!";',
        answer3: '#demo.innerHTML = "Hello World!";',
        answer4: 'document.getElementByName("p").innerHTML = "Hello World!";',
        correctAnswer: '1'
    },
];
