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

$(document).ready(function () {
    $('.applications-slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        variableWidth: true
    });
});