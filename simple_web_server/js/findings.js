'use strict';

var countWord = function(word, input) {

    if (!word) {
        return 0;
    }

    var position = 0;
    var wordCount = 0;

    var isFound = function(position) {
        return position !== -1;
    };

    while (isFound(position)) {
        position = input.indexOf(word, position);

        if (isFound(position)) {
            wordCount++;
            position++;
        }
    }

    return wordCount;
};

$(document).ready(function() {

    var search = function() {

        var $text = $('#text');
        $text.unhighlight();

        var input = $text.html().trim();

        var word = $('#searchTextBox').val();

        var wordCount = word ? countWord(word, input) : 0;

        $text.highlight(word);

        $('#result').text(
            "There are " + wordCount + " occurrences of the word " + word + "."
        );
    };

    $('#searchTextBox').val('in');

    $('form')
        .on('input', search)
        .trigger('input');
});
