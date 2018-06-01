//定义一个购物车对象shopCart
//shopCart里面包含一个数据对象存放数据，商品单价, 商品名称, 商品列表(name, num, price)
//init方法入口函数
//bindEvent, 点击加入购物车触发事件,点击购物车里的+、-号以及X触发事件
//performData操作数据对象、addHtml操作购物车显示

//操作信息栏，改变收藏数、购物车数量数字
//飞入购物车动画



var shopCart = {
    dataObj: {
        name: '',
        price: 0,
        shop: '',
        img: '',
        data: [],
    },
    addCount: 0,
    likeCount: 0,

    init: function () {
        this.bindEvent();
    },

    bindEvent: function () {
        var _this = this;
        $('.add-cart').on('click', function () {
            // console.log($(this).closest('.item').index());
            _this.dataObj.name = $(this).closest('.item').find('.item-name').text();
            _this.dataObj.price = parseInt($(this).closest('.item').find('.item-price').text().slice(1));
            _this.dataObj.shop = $(this).closest('.item').find('.shop-name').text();
            _this.dataObj.img = $(this).closest('.item').find('img').attr('src');
            _this.performData();
            _this.addHtml();

            //动画效果
            _this.flyImg(this);
        })
        $('.add-like').on('click', function() {
            // console.log(this);
            _this.flyImg(this);
            // console.log(_this.likeCount);
        })
    },

    performData: function () {
        var data = this.dataObj.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == this.dataObj.name && data[i].shop == this.dataObj.shop) {
                data[i].num++;
                return;
            }
        }
        data.push({
            name: this.dataObj.name,
            price: this.dataObj.price,
            shop: this.dataObj.shop,
            img: this.dataObj.img,
            num: 1
        })
    },

    removeData: function (name, shop) {
        var data = this.dataObj.data;
        for (var i = 0; i < data.length; i++) {
            if (name == data[i].name && shop == data[i].shop) {
                data.splice(i, 1);
                // console.log(i, "删除的这一项");
                return true;
            }
        }
    },

    addHtml: function () {
        console.log('add', this.dataObj);
        var totalPrice = 0;
        var data = this.dataObj.data;
        var str = '';
        this.addCount = 0;
        // console.log('执行了addhtml');
        if (data.length > 0) {
            // console.log(data.length, '数据长度');
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                str += '<li class="item-wrapper">\
                            <div class="item1 clear">\
                                <span class="dianpu">' + data[i].shop + '</span>\
                                <span class="item-price">￥' + data[i].price.toFixed(2) + '</span>\
                            </div>\
                            <div class="item2">\
                                <img src="' + data[i].img + '" alt="">\
                                <span class="item-name">' + data[i].name + '</span>\
                                <div class="btn-wrap">\
                                    <span class="reduce">-</span>\
                                    <span class="count">' + data[i].num + '</span>\
                                    <span class="add">+</span>\
                                    <span class="item-price">￥' + (data[i].num * data[i].price).toFixed(2) + '</span>\
                                </div>\
                                <span class="del">&times;</span>\
                            </div>\
                        </li>'
                totalPrice += data[i].num * data[i].price;
                this.addCount += data[i].num;
            }
        } else {
            str = '<p class="empty">哎呦，来都来了，不买点什么吗？</p>';
        }
        $('.item-message').html(str);
        $('.sum-price').text('￥' + totalPrice.toFixed(2));
        $('.number').text('已选' + this.addCount + '件');
        this.bindSign();
    },

    bindSign: function () {
        var _this = this;
        $('.add').on('click', function () {
            var index = $(this).closest('.item-wrapper').index();
            _this.dataObj.data[index].num++;
            _this.addHtml();
        });

        $('.reduce').on('click', function () {
            var index = $(this).closest('.item-wrapper').index();
            var data = _this.dataObj.data;
            data[index].num--;
            if (data[index].num == 0) {
                data.splice(index, 1);
            }
            _this.addHtml();
        });

        $('.del').on('click', function () {
            var dom = $(this).closest('.item-wrapper');
            // console.log('del');
            var name = dom.find('.item-name').text();
            var shop = dom.find('.dianpu').text();
            var result = _this.removeData(name, shop);
            if (result) {
                _this.addHtml();
            }
        })
    },

    flyImg: function (dom) {
        var _this = this;
        var img = $(dom).parents('.item').find('img');
        var btn = $(dom).attr('class');
        var flyImg = img.clone().css({ opacity: 0.6 });
        flyImg.appendTo($(dom).parents('.item'));
        flyImg.css({
            'z-index': 999,
            'border': '3px solid #fff',
            'position': 'absolute',
            'height': img.height() + 'px',
            'width': img.width() + 'px',
            'top': img.position().top + 'px',
            'left': img.position().left + 'px',
        })
        flyImg.animate({
            'width': '50px',
            'height': '50px',
            'border-radius': '50%'
        }, function () {
            var t;
            if (btn == 'add-cart') {
                t = $('.second .item-num').offset().top + 'px';
            } else if (btn == 'add-like') {
                t = $('.third .like-num').offset().top + 'px';
                _this.likeCount++;
            }
            flyImg.animate({
                'top': t,
                'left': ($(window).width() - $('.sidebar').width()) + 'px',
                'height': '0px',
                'width': '0px'
            }, 1500, function() {
                flyImg.remove();
                $('.second .item-num').text(_this.addCount);
                $('.third .like-num').text(_this.likeCount);
            })
        })
    }

}

shopCart.init();