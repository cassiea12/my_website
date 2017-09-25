//LOADING SCREEN
function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('home', true);
    show('about', true);
    show('services', true);
    show('portfolio', true);
    show('contact', true);
    show('loading', false);
});

// ANIMATION ELEMENTS

var $animation_elements = $('.animation-element');
var $window = $(window);
$window.on('scroll', check_if_in_view);
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
        } else {
            $element.removeClass('in-view');
        }
    });
}



// ON SCROLL CHANGE NAVBAR STYLE
$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#home');
    var offset = startchange.offset();
    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $(".navbar-light").css('background-color', 'rgba(255,255,255,1)');
                $(".navbar-light .navbar-nav a").css('color', '#636363');
                $(".navbar-collapse").css('background-color', 'transparent');
                $(".navbar-collapse .navbar-nav a").css('color', '#636363');
            } else {
                $('.navbar-light').css('background-color', 'transparent');
                $(".navbar-light .navbar-nav a").css('color', 'white');
                $('.navbar-collappse').css('background-color', 'rgba(255,255,255,1)');
                $(".navbar-collapse .navbar-nav a").css('color', 'grey');

            }
        });
    }

// ADDS CLASS "CURRENT"
    $('.nav-item a').click(function (e) {
        e.preventDefault();
        $('a').removeClass('current');
        $(this).addClass('current');
    });
});

// SCROLLABLE NAVIGATION
var $navItem = $('#myNavbar a');
//When a user clicks a nav item...
$navItem.on('click', function (event) {
    // if there is a hash tag
    if (this.hash !== "") {
        // stop the normal link from firing
        event.preventDefault();
        // store the hash tag in a local variable
        var hash = this.hash;
        // scroll the document from the current location to the location of the hashtag.
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            window.location.hash = hash;  // Update the hash tag in the location bar
        });
    }
});

$(document).ready(function(){

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current').addClass('not-current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current').removeClass('not-current');
        $("#"+tab_id).addClass('current').removeClass('not-current');
    })

})