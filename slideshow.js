let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
showSlides(slideIndex = n);
}

// Automatic slide change every 4 seconds
let slideInterval = setInterval(function() {
    plusSlides(1); // Change to next slide
}, 5000); // Change slide every 4 seconds

// Stop automatic slide change when user clicks on slide
document.querySelectorAll('.slide-control').forEach(function(slide) {
    slide.addEventListener('click', function() {
        clearInterval(slideInterval); // Stop automatic slide change
    });
});

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
