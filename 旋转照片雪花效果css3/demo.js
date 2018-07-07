var pics = $('.main .pics li');
var len = pics.length;

pics.each(function(index) {
  $(this).css({'transform' :'rotateY(' + 360 / len * index + 'deg) translate3d(0, 0, 225px)'});
})

var str = '能够遇见你是我最大的幸运，有了你生活变得丰富多彩，有了你，世界变得如此迷人；你是我的世界，我的世界是你，对我来说，不是在最美好的时光遇见了你，而是遇见你后都是最美好的时光！';
var i = 0;
var strChange = '';

function type () {
  strChange += str[i];
  $('.text').text(strChange);
  i++; 
  var timer = setTimeout(type, 100);
  if (i === str.length) {
    clearTimeout(timer);
  }
}

$(document).ready(type);

function generateSnow() {
  var snow = $('<div class="snow"></div>').html('❉').css({'top': 0, 'color': '#fff', 'position': 'absolute'});
  var wWidth = $(window).width();
  var wHeight = $(window).height();
  var snowSize = 10 + Math.random() * 50;
  var beginLeft = Math.random() * wWidth;
  var endLeft = Math.random() * wWidth;
  var endTop = wHeight - 100;
  var beginOpacity = 0.7 + 0.3 * Math.random();
  var endOpacity = 0.3 + 0.3 * Math.random();
  var dropDuration = 5000 + Math.random() * 8000;
  snow.clone().css({'left': beginLeft, 'opacity': beginOpacity, 'font-size': snowSize}).appendTo($('body')).animate({
    'left': endLeft, 'top': endTop, 'opacity': endOpacity
  }, dropDuration, function() {
    $(this).remove();
  })
}

$(document).ready(setInterval(generateSnow, 100));