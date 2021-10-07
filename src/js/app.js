var sliderCards;

var rangeSliderData = [
    {
        from: 100000,
        min: 50000,
        max: 10000000,
        el: $('#rangeSliderLvl_1'),
        input: $('#rangeInputLvl_1')
    }
];

$(document).ready(function () {

    fixHeaderLine();

    rangeSliderData.forEach(function(item, i) {
        item.el.ionRangeSlider({
            skin: "round",
            type: "single",
            extra_classes: 'irs--opn',
            min: item.min,
            max: item.max,
            from: item.from,
            step: 10000,
            hide_min_max: true,
            hide_from_to: true,
            onChange: function (data) {
                item.input.val(data.from);
            }
        });
    });

    /*$(".js-range-slider").ionRangeSlider({
        skin: "round",
        type: "single",
        extra_classes: 'irs--opn',
        min: $(this).closest('.js-calc-line').data('min'),
        max: $(this).closest('.js-calc-line').data('max'),
        from: $(this).closest('.js-calc-line').data('from'),
        step: 10000,
        hide_min_max: true,
        hide_from_to: true,
        onLoad: function(data) {
            console.log(data);
        },
        onChange: function (data) {
            $('#' + $(this).closest('.widget-line').data('input')).val('233');
        }
    });*/

    $('.mobile-nav').on('scroll', function (e) {
        var elem = $(e.currentTarget);
        if (elem.scrollTop() > 40) {
            $('.logo').fadeOut(100);
        } else {
            $('.logo').fadeIn(100);
        }
    });

    var swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        setWrapperSize: false,
        spaceBetween: 30,
        direction: 'horizontal',
        pagination: {
            el: ".swiper-pagination",
        },
        breakpoints: {
            992: {
                slidesPerView: 4,
                direction: 'vertical',
                spaceBetween: 0,
            }
        }
    });

    /*if($(window).width() <= 768){
        sliderCards = new Swiper(".slider-cards", {
            slidesPerView: 1,
            spaceBetween: 30,
            slideClass: 'slider-slide',
            breakpoints: {
                992: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                }
            }
        });
    }*/

});

window.onresize = function () {};

$(document).scroll(function () {
    fixHeaderLine();
});

function fixHeaderLine() {
    let scrollDistance = $(document).scrollTop();
    if (scrollDistance > 0) {
        $('.header-line').addClass('header-line-bg-filter');
    } else {
        $('.header-line').removeClass('header-line-bg-filter');
    }
}

$('#mobile-nav').click(function () {
    $(this).toggleClass('is-active');
    $('body').toggleClass('is-opened');
    if ($('body').hasClass('is-opened')) {
        if ($('.mobile-nav').scrollTop() > 40) {
            $('.logo').fadeOut(100);
        }
    } else {
        $('.logo').fadeIn(100);
    }
});

function pretify(num) {
    if (num >= 1000 && num < 1000000) {
        num = num / 1000;
        $('#rangeLabel').html('тыс &#8381;')
    }
    if (num >= 1000000) {
        num = num / 1000000;
        $('#rangeLabel').html('млн &#8381;')
    }
    return num;
}

var collapseToggle = function (el) {
    $(el).parent('.collapse').toggleClass('open');
}

$('.posts a').click(function (e){
    e.preventDefault();
    let index = $(this).data('tab');
    $('.main-post').removeClass('active');
    $('.posts a').removeClass('active');
    $(this).addClass('active');
    $('[data-post="'+index+'"]').addClass('active');
});