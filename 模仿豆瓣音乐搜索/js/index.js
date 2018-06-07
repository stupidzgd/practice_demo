
(function ($) {
    // var data = {"count":1,"start":0,"total":1,
    // "musics":[{"rating":{"max":10,"average":"7.1","numRaters":966,"min":0},
    // "author":[{"name":"暗杠"},{"name":"陈一发"}],"alt_title":"",
    // "image":"https://img3.doubanio.com\/view\/subject\/s\/public\/s29480411.jpg",
    // "tags":[{"count":150,"name":"陈一发儿"},{"count":126,"name":"民谣"},{"count":101,"name":"陈一发"},
    // {"count":76,"name":"华语"},{"count":70,"name":"暗杠"},{"count":64,"name":"2017"},{"count":55,"name":"中国"},
    // {"count":53,"name":"网络"}],"mobile_link":"https:\/\/m.douban.com\/music\/subject\/27074451\/",
    // "attrs":{"publisher":["网易云音乐"],"singer":["暗杠","陈一发"],"pubdate":["2017"],"title":["童话镇"],
    // "media":["数字(Digital)"],"version":["单曲"]},"title":"童话镇",
    // "alt":"https:\/\/music.douban.com\/subject\/27074451\/","id":"27074451"}]};

    var searchList = $('.search-list');
    var oInp = $('.search-inp');
    oInp.on('input', debounce(getDate, 800, false));
    $(document).on('mousedown', hideList);
    $('.search-wrapper form').on('submit', function (e) {
        e.preventDefault();
    })
    $('.search-btn').on('submit', function (e) {
        e.preventDefault();
    })
    $('.search-inp').on('keyup', bindEnter);
    var returnedData;
    var popTab = $('.popular');
    var newTab = $('.rise-fast');

    popTab.on('click', switchTab);
    newTab.on('click', switchTab);
    getPopPlayer();

    function getDate() {
        var value = this.value;
        console.log(value);
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            dataType: 'jsonp',
            data: 'q=' + value + '&count=7',
            success: function (data) {
                returnedData = data;
                addDom(data);
            }
        });
    }

    function addDom(data) {
        // data = JSON.parse(data);
        var title, imgUrl, desList, itemUrl, itemId;
        var str = '';
        console.log(data, data.count)
        if (data.count > 0) {
            for (var i = 0; i < data.count; i++) {
                var des = '表演者 : ';
                title = data.musics[i].title;
                imgUrl = data.musics[i].image;
                //豆瓣图片显示403，使用图片代理转换地址
                imgUrl = imgAgent(imgUrl);
                console.log(imgUrl)
                desList = data.musics[i].attrs.singer;
                // itemUrl = data.musics[i].mobile_link;
                musicId = data.musics[i].id;
                for (var j = 0; j < desList.length; j++) {
                    if (j != desList.length - 1) {
                        des += desList[j] + ',';
                    } else {
                        des += desList[j];
                    }
                }
                str += '<li>\
                        <a href="'+ './detailPage.html?id=' + musicId + '">\
                            <img src="' + imgUrl + '" alt="">\
                            <div class="msg-wrapper">\
                                <span class="title">'+ title + '</span>\
                                <span class="des">' + des + '</span>\
                            </div>\
                        </a>\
                    </li>'
            }

            // console.log(imgUrl, des);
            // console.log(str);
            searchList.html(str);
            searchList.css('display', 'block');
        }
    }

    // oInp.on('blur', function() {
    //     setTimeout(function() {
    //         searchList.css('display', 'none');
    //     }, 100);
    // })

    // if(target.parentNode!==oUl&&target!==oText){
    //     oUl.style.display='none';
    //   }

    //mousedown事件替代blur事件，判断mousedown区域，如果不在搜索框和搜索列表区域，就把搜索列表设置为none

    function hideList(e) {
        var target = e.target;
        if (!$(target).closest('ul').hasClass('search-list') && !$(target).hasClass('search-inp')) {
            searchList.css('display', 'none');
            $(document).off('mousedown', hideList)
        }
    }

    function bindEnter(e) {
        console.log(1111);
        if (e.keyCode == '13') {
            id = returnedData.musics[0].id;
            console.log(id);
            if (id) {
                window.location.href = './detailPage.html?id=' + id;
            }
        }

    }

    //本周流行音乐人区域
    var listNum = 8

    function getPopPlayer() {
        $.ajax({
            type: 'get',
            url: './popPlayer.json',
            success: function (data) {
                createPopPlayerDom(data);
            }
        });
    }
    

    function createPopPlayerDom(data) {
        var popArtists = $('.artists');
        var newArtists = $('.new-artists');
        var popStr = '';
        var newStr = '';
        data.forEach(function(ele, index) {
            if(index < 8) {
                popStr += '\
                <div class="artist-item">\
                    <div class="cover">\
                        <a href="#">\
                            <img src="' + data[index].url  + '" alt="">\
                        </a>\
                        <span class="icon-play"><i></i></span>\
                        <p class="hide-msg">音乐信息</p>\
                    </div>\
                    <div class="msg">\
                        <span class="player-name">' + data[index].name + '</span>\
                        <p class="music-type">' + data[index].description + '</p>\
                    </div>\
                </div>\ '

            } else {
                newStr += '\
                <div class="artist-item">\
                    <div class="cover">\
                        <a href="#">\
                            <img src="' + data[index].url  + '" alt="">\
                        </a>\
                        <span class="icon-play"><i></i></span>\
                        <p class="hide-msg">音乐信息</p>\
                    </div>\
                    <div class="msg">\
                        <span class="player-name">' + data[index].name + '</span>\
                        <p class="music-type">' + data[index].description + '</p>\
                    </div>\
                </div>\ '

            }
        })
        popArtists.html(popStr);
        newArtists.html(newStr);
    }

    function switchTab () {
        console.log($(this).prop('className'));
        console.log($(this).prop('className').indexOf('active'))
        if ($(this).prop('className').indexOf('active-tab') === -1) {
            $(this).addClass('active-tab');
        }
        if ($(this).prop('className').indexOf('popular') != -1) {
            newTab.removeClass('active-tab');
            $('.new-artists').css({'display': 'none'});
            $('.artists').css({'display': 'block'});
        } else {
            popTab.removeClass('active-tab');
            $('.artists').css({'display': 'none'});
            $('.new-artists').css({'display': 'block'});
        }

    }


}($))