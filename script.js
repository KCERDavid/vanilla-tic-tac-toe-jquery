$('.btn-action').mouseenter(function(){
    $('.menu-options').removeClass('hidden');
    $('.btn-action').addClass('border');
}
);
$('.btn-action').mouseleave(function(){
    $('.menu-options').addClass('hidden');
    $('.btn-action').removeClass('border');
}
);