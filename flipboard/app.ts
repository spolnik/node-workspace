import * as $ from "jquery";

$(document).ready(function() {
    $('.dropdown-toggle').click(function() {
        $('.dropdown-menu').toggle();
    });

    $('.arrow-next').click(
        onArrowNext
    );

    $('.arrow-prev').click(
        onArrowPrev
    );
});

function onArrowNext() {
    let currentSlide = $('.active-slide');
    let nextSlide = currentSlide.next();

    let currentDot = $('.active-dot');
    let nextDot = currentDot.next();

    if (nextSlide.length === 0) {
        nextSlide = $('.slide').first();
        nextDot = $('.dot').first();
    }

    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
}

function onArrowPrev() {
    let currentSlide = $('.active-slide');
    let prevSlide = currentSlide.prev();

    let currentDot = $('.active-dot');
    let prevDot = currentDot.prev();

    if (prevSlide.length === 0) {
        prevSlide = $('.slide').last();
        prevDot = $('.dot').last();
    }

    currentSlide.fadeOut(600).removeClass('active-slide');
    prevSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    prevDot.addClass('active-dot');
}
