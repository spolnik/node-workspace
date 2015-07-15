'use strict';

describe("Finding words in a text", function () {

    var runs = [
        { word: 'a', text: 'a b c d a', result: 2},
        { word: 'z', text: 'a b c d a', result: 0},
        { word: 'A', text: 'a b c d a', result: 0},
        { word: '', text: 'a b c d a', result: 0},
        { word: 'ab', text: 'a b c dab ab', result: 2},
        { word: '1', text: '101010101', result: 5},
        { word: '1', text: '', result: 0},
    ];

    runs.forEach(function (run) {
        it("finds " + run.result + " occurrences of '" + run.word + "' in '" + run.text + "'", function() {
            var result = countWord(run.word, run.text);
            expect(result).toBe(run.result);
        });
    });
});

