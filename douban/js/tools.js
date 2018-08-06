function debounce(handler, delay, immediate) {
    var timer = null;
    var result;

    function debounced() {
        var _this = this;
        var args = arguments;
        if (immediate) {
            if (!timer) {
                result = handler.apply(_this, args);
            }
            timer = setTimeout(function () {
                timer = null;
            }, delay)
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                result = handler.apply(_this, args);
            }, delay)
        }
        return result;
    }

    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }

    return debounced;
}

function imgAgent(url) {
    var agentUrl = "http://images.weserv.nl/?url=";
    url = url.split('://')[1];
    return agentUrl + url;
}

// {"count":3,"start":0,"total":3,"musics":[{"rating":{"max":10,"average":"7.7","numRaters":3533,"min":0},
// "author":[{"name":"阿肆"}],"alt_title":"",
// "image":"https://img1.doubanio.com\/view\/subject\/s\/public\/s26816858.jpg",
// "tags":[{"count":917,"name":"阿肆"},{"count":527,"name":"独立音乐"},{"count":515,"name":"民谣"},
// {"count":409,"name":"小清新"},{"count":259,"name":"女声"},{"count":245,"name":"内地"},
// {"count":179,"name":"摩登天空"},{"count":157,"name":"Indie"}],
// "mobile_link":"https:\/\/m.douban.com\/music\/subject\/24845662\/",
// "attrs":{"publisher":["摩登天空"],"singer":["阿肆"],"pubdate":["2013-07-04"],"title":["我在人民广场吃炸鸡"],
// "media":["数字(Digital)"],"tracks":["我在人民广场吃炸鸡"],"version":["单曲"]},"title":"我在人民广场吃炸鸡",
// "alt":"https:\/\/music.douban.com\/subject\/24845662\/","id":"24845662"},
// {"rating":{"max":10,"average":"8.4","numRaters":2657,"min":0},"author":[{"name":"阿肆"}],
// "alt_title":"","image":"https://img3.doubanio.com\/view\/subject\/s\/public\/s24576980.jpg",
// "tags":[{"count":359,"name":"放肆的肆"},{"count":354,"name":"民谣"},{"count":322,"name":"阿肆"},
// {"count":250,"name":"女声"},{"count":206,"name":"独立"},{"count":174,"name":"民谣|Folk"},
// {"count":152,"name":"内地"},{"count":100,"name":"中国"}],
// "mobile_link":"https:\/\/m.douban.com\/music\/subject\/20495329\/","attrs":{"publisher":["青春伙伴"],
// "singer":["阿肆"],"pubdate":["2008-03-15"],"title":["我在人民广场吃炸鸡"],"tracks":["01 - 我在人民广场吃炸鸡"],
// "version":["单曲"]},"title":"我在人民广场吃炸鸡",
// "alt":"https:\/\/music.douban.com\/subject\/20495329\/","id":"20495329"},
// {"rating":{"max":10,"average":"6.5","numRaters":14,"min":0},"author":[{"name":"刘力扬"},{"name":"满舒克"}],
// "alt_title":"","image":"https://img3.doubanio.com\/view\/subject\/s\/public\/s29533964.jpg",
// "tags":[{"count":3,"name":"满舒克"},{"count":3,"name":"刘力扬"},{"count":2,"name":"Rap"},
// {"count":1,"name":"华语歌"},{"count":1,"name":"内地"},{"count":1,"name":"C_Pop"}],
// "mobile_link":"https:\/\/m.douban.com\/music\/subject\/27130371\/","attrs":{"publisher":["摩登天空"],
// "singer":["刘力扬","满舒克"],"pubdate":["2017-08-31"],"title":["我在人民广场吃炸鸡"],"media":["数字(Digital)"],
// "tracks":["我在人民广场吃炸鸡"],"version":["单曲"]},"title":"我在人民广场吃炸鸡",
// "alt":"https:\/\/music.douban.com\/subject\/27130371\/","id":"27130371"}]}