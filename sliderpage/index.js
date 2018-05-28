// init()入口函数，初始化绑定事件
// bindEvent绑定button和index点击事件
// myAnimate()简单的运动函数
// move()轮播图滑动运动过程
// changeActive改变索引小圆点active状态
// autoSlider()自动轮播函数

var slider = {
    index: 0,
    num: document.getElementsByClassName('sliderList')[0].getElementsByTagName('li').length - 1,
    moveWidth: document.getElementsByClassName('sliderList')[0].getElementsByTagName('li')[0].offsetWidth,
    prevBtn: document.getElementsByClassName('prevBtn')[0],
    nextBtn: document.getElementsByClassName('nextBtn')[0],
    indexList: document.getElementsByClassName('indexList')[0].getElementsByTagName('li'),
    flag: true,

    init: function () {
        this.bindEvent();
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


    },

    myAnimate: function () {

    },

    move: function (which) {
        // var a = true;
        if (which == 'right') {
            if (this.index == this.num - 1) {
                this.myAnimate();
                //瞬移
                this.index = 0;
            } else {
                this.index++;
            }
        } else if (which == 'left') {
            if (this.index == 0) {
                //瞬移
                this.index = this.num - 1;
            } else {
                this.index--;
            }
        } else {
            this.index = which;
        }
        console.log(this.index);
    },

    changeActive: function (index) {
        document.getElementsByClassName('active')[0].classList.remove('active');
        this.indexList[index].classList.add('active');
    }
}

slider.init();
