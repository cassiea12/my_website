// LOADING SCREEN
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


// ANIMATION ELEMENTS FADE IN UP
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

// ON SCROLL CHANGE NAVBAR STYLE - NOTE TO SELF- REFACTOR SO CSS IS NOT IN JS FILE
$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#home');
    var offset = startchange.offset();
    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $(".navbar-light").css('background-color', 'rgba(255, 255, 255, 1)');
                $(".navbar-light").css('border-bottom', 'solid 1px #446467');
                $(".navbar-light .navbar-nav a").css('color', '#446467');
            } else {
                $('.navbar-light').css('background-color', 'rgba(255, 255, 255, .3)');
                $(".navbar-light").css('border-bottom', 'none');
                $(".navbar-light .navbar-nav a").css('color', '#446467');
            }
        });
    }

// ADDS CLASS "CURRENTLINK" to nav
    $('.navbar-light .navbar-nav .nav-item').click(function (e) {
        e.preventDefault();
        $('.navbar-light .navbar-nav .nav-item').removeClass('currentLink').addClass('not-currentLink');
        $(this).removeClass('not-CurrentLink').addClass('currentLink');
    });
});

// SCROLLABLE NAVIGATION

// Cache selectors
var lastId,
    topMenu = $(".navbar-nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("currentLink")
            .end().filter("[href='#"+id+"']").parent().addClass("currentLink");
    }
});


// ABOUT ME TABS
$(document).ready(function(){

    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('currentTab').addClass('not-current');
        $('.tab-content').removeClass('currentTab');

        $(this).addClass('currentTab').removeClass('not-current');
        $("#"+tab_id).addClass('currentTab').removeClass('not-current');
    });

});


