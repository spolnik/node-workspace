var React = require('react');

var QuizApp = require('./components/QuizApp.react');
var QuizWebAPIUtils = require('./utils/QuizWebAPIUtils');

QuizWebAPIUtils.getAllQuestions();

React.render(
    <QuizApp />,
    document.getElementById('quizApp')
);
