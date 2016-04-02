import * as $ from "jquery";

$(document).ready(function () {
    $('.btn').click(
        onButtonClick
    ).addClass('disabled');

    $('.status-box').keyup(
        onKeyUp
    );
});

function onButtonClick() {
    let $status = $('.status-box');

    const post = $status.val();
    $('<li>').text(post).prependTo('.posts');
    $status.val('');

    $('.counter').text('140');
    $('.btn').addClass('disabled');
}

function onKeyUp() {
    const postLength = $(this).val().length;
    const charactersLeft = 140 - postLength;
    $('.counter').text(charactersLeft);

    if (charactersLeft < 0 || charactersLeft === 140) {
        $('.btn').addClass('disabled');
    } else {
        $('.btn').removeClass('disabled');
    }
}

