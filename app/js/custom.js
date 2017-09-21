
// ON SCROLL CHANGE NAVBAR STYLE
$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#home');
    var offset = startchange.offset();
    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $(".navbar-light").css('background-color', 'rgba(255,255,255,.8)');
                $(".navbar-light .navbar-nav a").css('color', '#636363');
            } else {
                $('.navbar-light').css('background-color', 'transparent');
                $(".navbar-light .navbar-nav a").css('color', 'white');

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