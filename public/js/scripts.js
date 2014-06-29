$(function () {

    var navItems = $('.nav li');
    navItems.find('a').click(function () {
        navItems.removeClass('active');
        $(this).parent().addClass('active');
    });

});