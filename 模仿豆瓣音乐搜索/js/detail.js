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
    var mainTitle = $('.main-content h1');
    var imgWrap = $('.img-wrap');
    var musicMsg = $('.music-msg');
    var musicScoreDom = $('.rating-score');
    var commentCountDom = $('.comment-num');
    var ratingStarDom = $('.rating-star');
    var starList = $(".review-btn ul li");
    var levelDom = $('.level');
    
    oInp.on('input', debounce(getDate, 800, false));
    //mousedown事件替代blur事件，判断mousedown区域，如果不在搜索框和搜索列表区域，就把搜索列表设置为none    
    $(document).on('mousedown', hideList);
    $('.search-wrapper form').on('submit', function(e) {
        e.preventDefault();
    })
    $('.search-btn').on('submit', function(e) {
        e.preventDefault();
    })
    $('.search-inp').on('keyup', bindEnter);
    var returnedData;
    
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
        })
    }

    function addDom(data) {
        // data = JSON.parse(data);
        var title, imgUrl, desList, itemUrl, itemId;
        var str = '';
        console.log(data, data.count)
        if (data.count > 0) {
            for (var i = 0; i < data.count; i++) {
                var des = '表演者 : ';
                // title = data.musics[i].attrs.title || data.musics[i].title;
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
                //  var data = JSON.parse(data);
                createMusicDom(data);
                createScoreDom(data);
            }
        }) 
    }

    function createMusicDom (data) {
        try {
            var title = data.title;
            var performer = data.attrs.singer[0];
            var musicStyle = data.tags[0].name;
            var musicVerson = data.attrs.version[0];
            var musicMedia = data.attrs.media[0];
            var musicDate = data.attrs.pubdate[0];
            var pubisher = data.attrs.publisher[0];
        } catch (error) {
            
        }

        var imgUrl = data.image;
        imgUrl = parseUrl(imgUrl);
        console.log(imgUrl);
        imgUrl = imgAgent(imgUrl);
        var imgStr = '\
                <img src="' + imgUrl +'" alt="">\
                <button class="similar">\
                    <i></i>听相似的歌曲\
                </button>\
                '
        
        var musicMsgStr = '\
            <p>\
                <span class="title">表演者: </span>\
                <a class="author">' + performer + '</a>\
            </p>\
            <p>\
                <span class="title">流派: </span>\
                <span class="message">' + musicStyle + '</span>\
            </p>\
            <p>\
                <span class="title">专辑类型: </span>\
                <span class="message">' + musicVerson + '</span>\
            </p>\
            <p>\
                <span class="title">介质: </span>\
                <span class="message">' + musicMedia + '(Digital)</span>\
            </p>\
            <p>\
                <span class="title">发型时间: </span>\
                <span class="message">' + musicDate +'</span>\
            </p>\
            <p>\
                <span class="title">出版者: </span>\
                <span class="message">' + pubisher + '</span>\
            </p>\
        '
        mainTitle.html(title);
        imgWrap.html(imgStr);
        musicMsg.html(musicMsgStr);
    }
    
    function createScoreDom(data) {
        var musicScore = data.rating.average;
        var commentCount = data.rating.numRaters;
        
        musicScoreDom.html(musicScore);
        commentCountDom.html(commentCount + '人评价');
        //ratingStarDom.css({});
        performStarPic(musicScore);
        
        bindScoreEvent();

    }

    function parseUrl(str) {
        var urlArr = str.split('\\');
        var url = ''
        urlArr.forEach(function(ele, index) {
            url += ele;
        })
        return url;
    }

    function performStarPic(score) {
        if(score >= 9.5) {
            ratingStarDom.css({'background-position': '0px 0px'}); 
        } else if (score >= 8.5 && score < 9.5) {
            ratingStarDom.css({'background-position': '0px -15px'}); 
        } else if (score >= 7.5 && score < 8.5) {
            ratingStarDom.css({'background-position': '0px -30px'});  
        } else if (score >= 6.5 && score < 7.5) {
            ratingStarDom.css({'background-position': '0px -45px'}); 
        } else if (score >= 5.5 && score < 6.5) {
            ratingStarDom.css({'background-position': '0px -60px'}); 
        } else if (score >= 4.5 && score < 5.5) {
            ratingStarDom.css({'background-position': '0px -75px'}); 
        } else if (score >= 3.5 && score < 4.5) {
            ratingStarDom.css({'background-position': '0px -90px'}); 
        } else if (score >= 2.5 && score < 3.5) {
            ratingStarDom.css({'background-position': '0px -105px'}); 
        } else if (score >= 1.5 && score < 2.5) {
            ratingStarDom.css({'background-position': '0px -120px'}); 
        } else if (score >= 0.5 && score < 1.5) {
            ratingStarDom.css({'background-position': '0px -135px'}); 
        } else {
            ratingStarDom.css({'background-position': '0px -150px'}); 
        }
    }

    function bindScoreEvent() {
        $('.review-btn ul').on('mouseenter', 'li', function() {
            var num = $(this).index();
            var review = getReview (num);
            for(var i = 0; i <= num; i++) {
                starList.eq(i).find('img').attr('src', './images/star_onmouseover.png');
            }
            for(var j = num + 1; j < starList.length; j++) {
                starList.eq(j).find('img').attr('src', './images/star_hollow_hover.png');
            }
            levelDom.html(review);
        })

        

        $('.review-btn ul').on('mouseleave', function() {
            console.log('leave');
            for(var i = 0; i <= 4;i++) {
                starList.eq(i).find('img').attr('src', './images/star_hollow_hover.png');
            }
            levelDom.html('');
        })

        // $('.starList').on('click', function() {
        //     var num = $(this).index();
        //     for(var i = 0; i <= num; i++) {
        //         starList.eq(i).attr('src', './images/star_onmouseover.png');
        //     }
        // })

    }
    function getReview (num) {
        if(num == 5) {
            return '力荐';
        } else if (num == 4) {
            return '推荐';
        } else if (num == 3) {
            return '还行';
        } else if (num == 2) {
            return '较差';
        } else {
            return '很差';
        }
    }

    // 下面是搜索栏用的两个事件
    function hideList(e) {
        var target = e.target;
        // console.log(e.target);
        if (!$(target).closest('ul').hasClass('search-list') && !$(target).hasClass('search-inp')) {
            searchList.css('display', 'none');
            $(document).off('mousedown', hideList)
        }
    }

    function bindEnter(e) {
        if(e.keyCode == '13') {
            id = returnedData.musics[0].id
            if(id) {
                window.location.href = './detailPage.html?id=' + id;
            }     
        }
        
    }

}($))