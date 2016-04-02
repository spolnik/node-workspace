import * as $ from "jquery";

$(document).ready(function() {
    $('.icon-menu').click(
        pushTheBodyAndTheNavOverBy280pxOver
    );

    $('.icon-close').click(
        pushThemBack
    );
});

function pushTheBodyAndTheNavOverBy280pxOver() {
    $('.menu').animate({
        left: "0px"
    }, 200);

    $('body').animate({
        left: "285px"
    }, 200);
}

function pushThemBack() {
    $('.menu').animate({
        left: "-285px"
    }, 200);

    $('body').animate({
        left: "0px"
    }, 200);
}
