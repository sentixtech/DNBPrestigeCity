$(document).ready(function() {
    $(".gallery").latae({
        loader: 'img/loader.gif',
        init: function() {
            console.log('bonjour');
        },
        loadPicture: function(event, img) {
            console.log($(img));
        },
        resize: function(event, gallery) {
            console.log(gallery);
        },
        displayTitle: true
    });
    $().fancybox({
        selector: '[data-fancybox="images"]',
        thumbs: false,
        hash: false,
    });
});


