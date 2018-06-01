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