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

document.addEventListener('DOMContentLoaded', function() {
    let modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay      = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');

    modalButtons.forEach(function(item){
        item.addEventListener('click', function(e) {

            e.preventDefault();

            let modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modalWindow[data-modal="' + modalId + '"]');

            modalElem.classList.add('active');
            overlay.classList.add('active');
            document.body.classList.add('hidden');
        });
    });

    closeButtons.forEach(function(item){
        item.addEventListener('click', function(e) {
            let parentModal = this.closest('.modalWindow');

            parentModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('hidden');
        });
    });

    document.body.addEventListener('keyup', function (e) {
        let key = e.keyCode;

        if (key == 27) {

            document.querySelector('.modalWindow.active').classList.remove('active');
            document.querySelector('.modalOverlay').classList.remove('active');
        }
    }, false);

    overlay.addEventListener('click', function() {
        document.querySelector('.modalWindow.active').classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('hidden');
    });
});


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
        reinitSlider('.iphone-content-wrap', {
            infinite: false
        });

        $appContentSlider.find($('.slick-next')).addClass('animated');
    });
    $appContentSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        contentShowBlock(nextSlide, 'app-desc-js');
    });

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

    function animateAppScreens() {
        let $screens = $('.application-design-image');
        let $images = $('.design-image-wrap img');
        let unloaded_count = 0
        let loaded_count = 0;

        $.each($images, function(index, item) {
            let $image = $(item);
            if ( ! $image.prop('complete')) {
                unloaded_count++;
                $image.load(function() {
                    if (++loaded_count === unloaded_count) {
                        $screens.addClass('animate');
                    }
                });
            }
        });

        if (unloaded_count === 0) {
            $screens.addClass('animate');
        }
    }

    tabs();
    contents();
    animateAppScreens();

})(jQuery);