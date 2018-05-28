// init()入口函数，初始化绑定事件
// bindEvent绑定button和index点击事件
// myAnimate()简单的运动函数
// move()轮播图滑动运动过程
// changeActive改变索引小圆点active状态
// autoSlider()自动轮播函数

var slider = {
    index: 0,
    num: document.getElementsByClassName('sliderList')[0].getElementsByTagName('li').length - 1,
    sliderList: document.getElementsByClassName('sliderList')[0],
    moveWidth: document.getElementsByClassName('sliderList')[0].getElementsByTagName('li')[0].offsetWidth,
    prevBtn: document.getElementsByClassName('prevBtn')[0],
    nextBtn: document.getElementsByClassName('nextBtn')[0],
    indexList: document.getElementsByClassName('indexList')[0].getElementsByTagName('li'),
    flag: true,
    timer: null,

    init: function () {
        this.bindEvent();
        this.autoSlider();
    },

    bindEvent: function () {
        var _this = this;
        this.prevBtn.onclick = function () {
            _this.move('left');
            _this.changeActive(_this.index);
        }

        this.nextBtn.onclick = function () {
            _this.move('right');
            _this.changeActive(_this.index);
        }

        for (var i = 0; i < _this.indexList.length; i++) {
            (function (j) {
                _this.indexList[j].onclick = function () {
                    _this.move(j);
                    _this.changeActive(j);
                }
            }(i))
        }

        document.getElementsByClassName('wrapper')[0].onmouseenter = function () {
            clearTimeout(_this.timer);
            document.getElementsByClassName('btnList')[0].style.display = 'block';
        } 

        document.getElementsByClassName('wrapper')[0].onmouseleave = function () {
            _this.timer = setTimeout(_this.autoSlider, 2000)
            document.getElementsByClassName('btnList')[0].style.display = 'none';
        }
    },

    myAnimate: function (obj, posLeft, callback) {
        clearInterval(obj.timer);
        var iCur, iSpeed;
        obj.timer = setInterval(function () {
            iCur = obj.offsetLeft;
            iSpeed = (posLeft - iCur) / 4;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (Math.abs(posLeft - iCur) < 1) {
                obj.style.left = posLeft + 'px';
                clearInterval(obj.timer);
                typeof callback == 'function' ? callback() : '';
            } else {
                obj.style.left = iCur + iSpeed + 'px';
            }
        }, 30)
    },

    move: function (which) {
        if (this.flag) {
            this.flag = false;
            var a = true;
            var _this = this;
            if (which == 'right') {
                if (this.index == this.num - 1) {
                    a = false;
                    this.myAnimate(this.sliderList, - (this.num * this.moveWidth), function () {
                        //瞬移
                        _this.sliderList.style.left = '0px';
                        _this.flag = true;
                        _this.autoSlider();
                    });

                    this.index = 0;
                } else {
                    this.index++;
                }
            } else if (which == 'left') {
                if (this.index == 0) {
                    //瞬移
                    this.sliderList.style.left = - (this.num * this.moveWidth) + 'px';
                    this.index = this.num - 1;
                } else {
                    this.index--;
                }
            } else {
                this.index = which;
            }
            console.log(this.index);
            if (a) {
                this.myAnimate(this.sliderList, -this.index * this.moveWidth, function () {
                    _this.flag = true;
                    _this.autoSlider();
                })
            }
        }
    },

    changeActive: function (index) {
        document.getElementsByClassName('active')[0].classList.remove('active');
        this.indexList[index].classList.add('active');
    },

    autoSlider: function () {
        clearTimeout(this.timer);
        var _this = this;
        this.timer = setTimeout(function() {
            _this.move('right');
            _this.changeActive(_this.index);
        },2000)
    }
}

slider.init();
