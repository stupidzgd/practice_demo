// {"rating":{"max":10,"average":"7.4","numRaters":5975,"min":0},"author":[{"name":"赵雷"}],
// "alt_title":"","image":"https://img3.doubanio.com\/view\/subject\/s\/public\/s29114672.jpg",
// "title":"成都","mobile_link":"https:\/\/m.douban.com\/music\/subject\/26899717\/",
// "summary":"赵雷 \/ 单曲 \/ 2016-10-24 \/ StreetVoice \/ 数字(Digital)",
// "attrs":{"publisher":["StreetVoice"],"singer":["赵雷"],
// "radio_url":"https:\/\/douban.fm\/?context=channel:0|subject_id:26899717",
// "pubdate":["2016-10-24"],"title":["成都"],"media":["数字(Digital)"],"tracks":["成都"],
// "version":["单曲"],"songs":[{"index":1,"name":"track","title":"成都 "}]},
// "alt":"https:\/\/music.douban.com\/subject\/26899717\/","id":"26899717",
// "tags":[{"count":1731,"name":"民谣"},{"count":1423,"name":"赵雷"},{"count":878,"name":"成都"},
// {"count":344,"name":"单曲"},{"count":334,"name":"2016"},{"count":328,"name":"内地"},
// {"count":304,"name":"男声"},{"count":303,"name":"中国"}]}


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
    var id = location.search.split('id=')[1];

    oInp.on('input', debounce(getDate, 800, false));
    
    function getDate() {
        var value = this.value;
        console.log(value);
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            dataType: 'jsonp',
            data: 'q=' + value + '&count=7',
            success: function (data) {
                addDom(data);
            }
        })
    }

    function addDom(data) {
        // data = JSON.parse(data);
        var title, imgUrl, desList, itemUrl, itemId;
        var str = '';
        console.log(data, data.count)
        if (data.count > 0) {
            for (var i = 0; i < 5; i++) {
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
                        <a href="'+ 'http://localhost/ajax/douban/detailPage.html?id=' + musicId + '">\
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
    $(document).on('mousedown', function (e) {
        var target = e.target;
        // console.log(e.target);
        if (!$(target).closest('ul').hasClass('search-list') && !$(target).hasClass('search-inp')) {
            searchList.css('display', 'none');
        }
    })

    function imgAgent(url) {
        var agentUrl = "http://images.weserv.nl/?url=";
        url = url.split('://')[1];
        return agentUrl + url;
    }


    $(document).ready(function() {
        getMusicInfo(id);
    })

    function getMusicInfo (id) {
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/' + id,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
            }
        }) 
    }

    function createMusicDom () {

    }

}($))