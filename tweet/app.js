var main = function () {
    $('.btn').click(function () {
        var $status = $('.status-box');

        var post = $status.val();
        $('<li>').text(post).prependTo('.posts');
        $status.val('');

        $('.counter').text('140');
        $('.btn').addClass('disabled');
    }).addClass('disabled');

    $('.status-box').keyup(function () {
        var postLength = $(this).val().length;
        var charactersLeft = 140 - postLength;
        $('.counter').text(charactersLeft);

        if (charactersLeft < 0) {
            $('.btn').addClass('disabled');
        }
        else if (charactersLeft === 140) {
            $('.btn').addClass('disabled');
        }
        else {
            $('.btn').removeClass('disabled');
        }
    });
};

$(document).ready(main);
