var search = function () {

    var position = 0;
    var wordCount = 0;

    var isFound = function (position) {
        return position != -1
    };

    var input = document.getElementById('input').innerHTML.trim();
    var word = document.getElementById('word').value;

    while (isFound(position)) {
        position = input.indexOf(word, position);

        if (position != -1) {
            wordCount++;
            position++;
        }
    }

    document.getElementById('result').innerHTML =
        "There are " + wordCount + " occurrences of the word " + word;
};

search();
