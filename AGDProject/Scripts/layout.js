$(document).ready(function () {
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });
});

NProgress.start();

// Increase randomly
var interval = setInterval(function () { NProgress.inc(); }, 5000);

// Trigger finish when page fully loaded
jQuery(window).load(function () {
    clearInterval(interval);
    NProgress.done();
});

// Trigger bar when exiting the page
jQuery(window).unload(function () {
    NProgress.start();
});