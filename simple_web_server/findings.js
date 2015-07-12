var search = function () {
    'use strict';

    var position = 0;
    var wordCount = 0;

    var isFound = function (position) {
        return position !== -1;
    };

    var input = document.getElementById('input').innerHTML.trim();
    var word = document.getElementById('word').value;

    while (isFound(position)) {
        position = input.indexOf(word, position);

        if (isFound(position)) {
            wordCount++;
            position++;
        }
    }

    document.getElementById('result').innerHTML =
        "There are " + wordCount + " occurrences of the word " + word;
};

search();
