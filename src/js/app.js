var sliderCards;

var rangeSliderData = [
    {
        from: 0,
        min: 0,
        max: 100000000,
        step: 2000000,
        percent: 0.0175,
        el: $('#rangeSliderLvl_1'),
        input: $('#rangeInputLvl_1')
    }, {
        from: 0,
        min: 0,
        max: 200000000,
        step: 2000000,
        percent: 0.00875,
        el: $('#rangeSliderLvl_2'),
        input: $('#rangeInputLvl_2')
    }, {
        from: 0,
        min: 0,
        max: 300000000,
        step: 2000000,
        percent: 0.004375,
        el: $('#rangeSliderLvl_3'),
        input: $('#rangeInputLvl_3')
    }, {
        from: 0,
        min: 0,
        max: 500000000,
        step: 2000000,
        percent: 0.0021875,
        el: $('#rangeSliderLvl_4'),
        input: $('#rangeInputLvl_4')
    }, {
        from: 0,
        min: 0,
        max: 800000000,
        step: 2000000,
        percent: 0.00109375,
        el: $('#rangeSliderLvl_5'),
        input: $('#rangeInputLvl_5')
    }
];

var gpro = [0, 0, 0, 0, 0];

var total_year = 0;
var total_month = 0;

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
            step: item.step,
            hide_min_max: true,
            hide_from_to: true,
            onChange: function (data) {
                let percent = item.percent;
                gpro[i] = Math.floor(data.from * percent);
                item.input.val(data.from / 1000000);
                calculate();
            },
            onFinish: function(data) {
                let percent = item.percent;
                gpro[i] = Math.floor(data.from * percent);
                item.input.val(data.from / 1000000);
                calculate();
            }
        });
    });

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

    if($(window).width <= 768){
        var program_slider = new Swiper(".swiper-program", {
            slidesPerView: 1,
            spaceBetween: 30,
            direction: 'horizontal',
            pagination: {
                el: ".swiper-pagination2",
            }
        });
    }


});

window.onresize = function () {};

$(document).scroll(function () {
    fixHeaderLine();
});

function calculate() {
    total_year = gpro.reduce(add, 0);
    total_month = Math.floor(total_year / 12)
    var opts = { minimumFractionDigits: 0 };
    $('#total_year').html(total_year.toLocaleString("ru-RU", opts) + ' ₽');
    $('#total_month').html(total_month.toLocaleString("ru-RU", opts) + ' ₽');
}

function add(accumulator, a) {
    return accumulator + a;
}

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