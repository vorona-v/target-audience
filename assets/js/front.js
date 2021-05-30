const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

(function($) {
    const $appTabSlider = $('.applications-slider');
    const $appContentSlider = $('.iphone-content-wrap');

    reinitSlider($appTabSlider, {
        dots: false,
        arrows: false,
        variableWidth: true,
        focusOnSelect: true
    });
    reinitSlider($appContentSlider, {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false
    });

    $appTabSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        contentShowBlock(nextSlide, 'app-content-js');
        reinitSlider('.iphone-content-wrap');
    });
    $appContentSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){contentShowBlock(nextSlide, 'app-desc-js');});

    function reinitSlider(selector, options) {
        let $slider = $(selector);

        if ($slider.hasClass('slick-slider')) {
            $slider.slick('unslick');
        }

        $slider.not('.slick-initialized').slick(options);
    }

    function contentShowBlock(index, wrapName) {
        let $tabContents = $('.' + wrapName);

        $tabContents.hide();
        $tabContents.filter("[data-id=" + index + "]").css('display', 'block');
    }

    function tabs() {
        let wrapName = 'app-content-js';
        contentShowBlock(0, wrapName);
    }

    function contents() {
        let wrapName = 'app-desc-js';
        contentShowBlock(0, wrapName);
    }

    tabs();
    contents();

})(jQuery);