//going to the Top button
function goTop(x) {
    $('html, body').animate({
        scrollTop: "0px"
    }, x);
}

//smooth scroll
$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

//fixedDiv
$(window).scroll(function() {
    if ($(window).width() <= 1024) {
        if ($(window).scrollTop() > $(".header").outerHeight()) {
            fixedDiv.style.opacity = "1";
        } else {
            fixedDiv.style.opacity = "0";
        }
    } else if ($(window).width() >= 1024) {
        if ($(window).scrollTop() > $(".header").outerHeight()) {
            fixedDiv.style.display = "block";
            setTimeout(function() {
                fixedDiv.style.opacity = "1";
            }, 300);
        } else {
            fixedDiv.style.opacity = "0";
            setTimeout(function() {
                fixedDiv.style.display = "none";
            }, 300);
        }
    }
});

//button links
let toggle = false,
    cover = document.querySelector(".phone__cover"),
    fixedDiv = document.querySelector(".fixedDiv"),
    links = document.querySelector(".links"),
    linksA = document.querySelectorAll(".links__a"),
    linksX = document.querySelector(".links__X"),
    linksLi = document.querySelectorAll(".links__li"),
    linksInp = document.querySelector(".search__input"),
    appear = function() {
        if ($(window).width() < 1024) {
            setTimeout(function() {
                cover.style.height = "calc(100vh)";
                linksInp.style.backgroundColor = "#CFD8FD";
            }, 230);
            setTimeout(function() {
                if ($(window).width() > 500) {
                    links.style.height = "calc(100vh - 100px)";
                };
                if ($(window).width() < 500) {
                    links.style.height = "calc(100vh - 21vw - 125px)";
                };
            }, 250);
            setTimeout(function() {
                linksX.style.display = "block";
                for (let i = linksLi.length - 1; i >= 0; i--) {
                    linksLi[i].style.display = "block";
                }
            }, 300);
            setTimeout(function() {
                if ($(window).width() > 500) {
                    for (let i = linksLi.length - 3; i >= 0; i--) {
                        linksA[i].style.borderBottom = "solid #eee 1px";
                    }
                } else if ($(window).width() < 500) {
                    for (let i = linksLi.length - 2; i >= 0; i--) {
                        linksA[i].style.borderBottom = "solid #eee 1px";
                    }
                };
            }, 350);
        }

        toggle = true;
    },
    hide = function() {
        if ($(window).width() < 1024) {
            setTimeout(function() {
                links.style.height = "0px";
            }, 100);
            setTimeout(function() {
                cover.style.height = "0px";
            }, 230);
            setTimeout(function() {
                linksX.style.display = "none";
                for (let i = linksLi.length - 1; i >= 0; i--) {
                    linksLi[i].style.display = "none";
                    linksA[i].style.borderBottom = "none";
                }
            }, 300);
            setTimeout(function() {
                linksInp.style.backgroundColor = "lighten(#CFD8FD, 4%)";
            }, 350);

            toggle = false;
        }
    },
    show = function() {
        if ($(window).width() < 1024) {
            if (toggle === false) {
                appear();
            } else if (toggle === true) {
                hide();
            }
        }
    };
$(window).scroll(function() {
    if ($(window).width() < 1024 && $(window).scrollTop() >30) {
        hide();
    }
});
$(window).on("orientationchange", function() {
    if ($(window).width() < 768) {
        hide();
    }
});

//animation delay
$(window).on('load', function() {
    if ($(window).width() < 1024) {
        for (let i = 0; i < linksLi.length; i++) {
            linksLi[i].style.animationDelay = i * 0.1 + "s";
        }
        linksX.style.animationDelay = "1.1s";
    }
})

//go
let go = function() {
    if ($(window).width() <= 500) {
        goTop(800);
        setTimeout(function() {
            appear();
        }, 880);
    }
}

//lazy loading images
document.addEventListener("DOMContentLoaded", function() {
    let lazyloadImages = document.querySelectorAll("[data-src]");
    const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 500px 0px"
    };
    if ("IntersectionObserver" in window) {
        let imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("data-src");
                    imageObserver.unobserve(image);
                }
            });
        }, imgOptions);
        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    }
})