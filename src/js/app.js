$(document).ready(function() {
    $('#browser_width').html(document.documentElement.clientWidth);

    $(".js-range-slider").ionRangeSlider({
        skin: "round",
        type: "single",
        extra_classes: 'irs--opn',
        min: $(this).data('min'),
        max: $(this).data('max'),
        from: $(this).data('from'),
        step: 1000,
        hide_min_max: true,
        hide_from_to: true,
        onChange: function(el){
            $(this).closest('.widget-line').find('.rangeInput').val(pretify(el.from));
        }
    });
});

window.onresize = function(){
    $('#browser_width').html(document.documentElement.clientWidth);
};

$(document).scroll(function() {
    checkHeaderFixed();
});

function checkHeaderFixed(){
    let footerOffsetTop = $('footer').offset().top;
    let scrollDistance = $(document).scrollTop();
    let headerHeight = $('.header-line').outerHeight(true);
    if ( scrollDistance + headerHeight  >= footerOffsetTop) {
        //$('.header-line').top = ;
    }

}

$('#mobile-nav').click(function () {
    $(this).toggleClass('is-active')
});

function pretify(num) {
    if(num >= 1000 && num < 1000000 ) {
        num = num / 1000;
        $('#rangeLabel').html('тыс &#8381;')
    }
    if(num >= 1000000 ) {
        num = num / 1000000;
        $('#rangeLabel').html('млн &#8381;')
    }
    return num;
}

var collapseToggle = function (el) {
    $(el).parent('.collapse').toggleClass('open');
}