$(document).ready(function () {
    'use strict';

    var search = function () {

        var countWord = function (word, input) {
            var position = 0;
            var wordCount = 0;

            var isFound = function (position) {
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

        var wordCount = 0;

        var $text = $('#text');

        $text.unhighlight();

        var input = $text.html().trim();

        var word = $('#searchTextBox').val();

        if (word) {
            wordCount = countWord(word, input);
        }

        $text.highlight(word);

        $('#result').html("There are " + wordCount + " occurrences of the word " + word + ".");
    };

    $('#searchTextBox').val('in');

    $('form')
        .on('input', search)
        .trigger('input');
});
