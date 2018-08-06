// init()入口函数，初始化绑定事件
// bindEvent绑定button和index点击事件
// myAnimate()简单的运动函数
// move()轮播图滑动运动过程
// changeActive改变索引小圆点active状态
// autoSlider()自动轮播函数

var slider = {
    sliderPage: $('.sliderList'),
    index: 0,
    moveWidth: $('.sliderList li').width(),
    flag: true,
    num: $('.sliderList li').length - 1,
    timer: null,

    init: function () {
        this.bindEvent();
        this.autoSlider();
    },

    bindEvent: function () {
        var _this = this;
        $('.prevBtn').on('click', function () {
            _this.move('left');
            _this.changeActive(_this.index);
        })

        $('.nextBtn').on('click', function () {
            _this.move('right');
            _this.changeActive(_this.index);
        })

        $('.indexList').on('click', 'li', function () {
            _this.move($(this).index());
            _this.changeActive(_this.index);
        })

        $('.slider-wrapper').on('mouseenter', function() {
            clearTimeout(_this.timer);
            $('.btnList').css('display', 'block');
        })

        $('.slider-wrapper').on('mouseleave', function() {
            $('.btnList').css('display', 'none');
            _this.autoSlider();
        })
    },

    move: function (which) {
        if (this.flag) {
            this.flag = false;
            var a = true;
            var _this = this;     
            if(which === 'right') {
                if (this.index === this.num - 1) {
                    a = false;
                    this.index = 0;
                    this.sliderPage.animate({left: -(this.num * this.moveWidth)}, 500, function () {
                        //瞬移
                        _this.sliderPage.css('left', '0px');
                        _this.flag = true;
                        _this.autoSlider();
                    })
                } else {
                    this.index++;
                }
            } else if (which === 'left') {
                if (this.index === 0) {
                    //先瞬移
                    this.sliderPage.css('left', -(this.num * this.moveWidth) + 'px');
                    this.index = this.num - 1;
                } else {
                    this.index--;
                }
            } else {
                this.index = which;
            }
        }

        if (a) {
            this.sliderPage.animate({left: -(this.index * this.moveWidth)}, 500, function() {
                _this.flag = true;
                _this.autoSlider();
            })
        }
    },

    changeActive: function (index) {
        $('.active').removeClass('active');
        $('.indexList li').eq(this.index).addClass('active');
    },

    autoSlider: function () {
        clearTimeout(this.timer);
        var _this = this;
        this.timer = setTimeout(function() {
            _this.move('right');
            _this.changeActive(_this.index);
        }, 2500)
    }
}

slider.init();