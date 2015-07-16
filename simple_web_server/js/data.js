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
    {
        title: 'Where is the correct place to insert a JavaScript?',
        subtitle: '',
        answer1: 'The <body> section',
        answer2: 'Both the <head> section and the <body> section are correct',
        answer3: 'The <head> section',
        answer4: '',
        correctAnswer: '2'
    },
    {
        title: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        subtitle: '',
        answer1: '<script src="xxx.js">',
        answer2: '<script href="xxx.js">',
        answer3: '<script name="xxx.js">',
        answer4: '',
        correctAnswer: '1'
    },
    {
        title: 'The external JavaScript file must contain the <script> tag.',
        subtitle: '',
        answer1: 'False',
        answer2: 'True',
        answer3: '',
        answer4: '',
        correctAnswer: '1'
    },
    {
        title: 'How do you write "Hello World" in an alert box?',
        subtitle: '',
        answer1: 'msgBox("Hello World");',
        answer2: 'msg("Hello World");',
        answer3: 'alert("Hello World");',
        answer4: 'alertBox("Hello World");',
        correctAnswer: '3'
    },
    {
        title: 'How do you create a function in JavaScript?',
        subtitle: '',
        answer1: 'function:myFunction()',
        answer2: 'function myFunction()',
        answer3: 'function = myFunction()',
        answer4: '',
        correctAnswer: '2'
    },
    {
        title: 'How do you call a function named "myFunction"',
        subtitle: '',
        answer1: 'call function myFunction()',
        answer2: 'myFunction()',
        answer3: 'call myFunction()',
        answer4: '',
        correctAnswer: '2'
    },
    {
        title: 'How to write an IF statement in JavaScript?',
        subtitle: '',
        answer1: 'if i = 5',
        answer2: 'if (i === 5)',
        answer3: 'if i = 5 then',
        answer4: 'if i == 5 then',
        correctAnswer: '2'
    },
    {
        title: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        subtitle: '',
        answer1: 'if (i !== 5)',
        answer2: 'if (i <> 5)',
        answer3: 'if i != 5',
        answer4: 'if i <> 5',
        correctAnswer: '1'
    },
    {
        title: 'How does a WHILE loop start?',
        subtitle: '',
        answer1: 'while i = i to 10',
        answer2: 'while (i <= 10; i++)',
        answer3: 'while (i <= 10)',
        answer4: '',
        correctAnswer: '3'
    },
    {
        title: 'How does a FOR loop start?',
        subtitle: '',
        answer1: 'for (i <= 5; i++)',
        answer2: 'for (i = 0; i <= 5)',
        answer3: 'for (i = 0; i <= 5; i++)',
        answer4: 'for i = 1 to 5',
        correctAnswer: '3'
    },
    {
        title: 'How can you add a comment in a JavaScript?',
        subtitle: '',
        answer1: '\'This is a comment',
        answer2: '<!--This is a comment-->',
        answer3: '//This is a comment',
        answer4: '',
        correctAnswer: '3'
    },
    {
        title: 'How to insert a comment that has more than one line?',
        subtitle: '',
        answer1: '//This comment has\nmore than one line//',
        answer2: '/*This comment has\nmore than one line*/',
        answer3: '<!--This comment has\nmore than one line-->',
        answer4: '',
        correctAnswer: '2'
    },
    {
        title: 'What is the correct way to write a JavaScript array?',
        subtitle: '',
        answer1: 'var colors = (1:"red", 2:"green", 3:"blue")',
        answer2: 'var colors = "red", "green", "blue"',
        answer3: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        answer4: 'var colors = ["red", "green", "blue"]',
        correctAnswer: '4'
    },
    {
        title: 'How do you round the number 7.25, to the nearest integer?',
        subtitle: '',
        answer1: 'round(7.25)',
        answer2: 'rnd(7.25)',
        answer3: 'Math.rnd(7.25)',
        answer4: 'Math.round(7.25)',
        correctAnswer: '4'
    },
    {
        title: 'How do you find the number with the highest value of x and y?',
        subtitle: '',
        answer1: 'Math.max(x, y)',
        answer2: 'top(x, y)',
        answer3: 'ceil(x, y)',
        answer4: 'Math.ceil(x, y)',
        correctAnswer: '1'
    },
    {
        title: 'What is the correct JavaScript syntax for opening a new window called "w2"?',
        subtitle: '',
        answer1: 'w2 = window.open("http://www.w3schools.com");',
        answer2: 'w2 = window.new("http://www.w3schools.com");',
        answer3: '',
        answer4: '',
        correctAnswer: '1'
    },
    {
        title: 'JavaScript is the same as Java.',
        subtitle: '',
        answer1: 'True',
        answer2: 'False',
        answer3: '',
        answer4: '',
        correctAnswer: '2'
    },
    {
        title: 'How can you detect the client\'s browser name?',
        subtitle: '',
        answer1: 'navigator.appName',
        answer2: 'browser.name',
        answer3: 'client.navName',
        answer4: '',
        correctAnswer: '1'
    },
    {
        title: 'Which event occurs when the user clicks on an HTML element?',
        subtitle: '',
        answer1: 'onmouseclick',
        answer2: 'onmouseover',
        answer3: 'onclick',
        answer4: 'onchange',
        correctAnswer: '3'
    },
    {
        title: 'How do you declare a JavaScript variable?',
        subtitle: '',
        answer1: 'v carName;',
        answer2: 'variable carName;',
        answer3: 'var carName;',
        answer4: '',
        correctAnswer: '3'
    },
    {
        title: 'Which operator is used to assign a value to a variable?',
        subtitle: '',
        answer1: '=',
        answer2: '*',
        answer3: 'x',
        answer4: '-',
        correctAnswer: '1'
    },
    {
        title: 'What will the following code return: Boolean(10 > 9)',
        subtitle: '',
        answer1: 'NaN',
        answer2: 'false',
        answer3: 'true',
        answer4: '',
        correctAnswer: '3'
    },
    {
        title: 'Is JavaScript case-sensitive',
        subtitle: '',
        answer1: 'No',
        answer2: 'Yes',
        answer3: '',
        answer4: '',
        correctAnswer: '2'
    }
];
