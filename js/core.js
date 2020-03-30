var Core = {};
var _cache = {};
Core.status = {
    bibleIsReady: false
};
Core.config = {
    class: 'content',
    heading: 'title',
    paragraph: 'some text'
};
Core.init = function() {
    var _confVar = Core.config.confVar;
    $(document).ready(function() {
        Core.makeMenu($(this));
    });
    $(window).on('resize', function() {

    });
    $(document).on('click', '#main', function() {
        Core.makeThis($(this));
    });
};
Core.bibleReady = function(){
    Core.status.bibleIsReady = true;
    console.log("Bible ready");
};
Core.makeMenu = function(obj) {

    key_english.forEach(function(obj) {
        var newContent = "";
        _cache.vers = {
            "class": Core.config.class,
            "heading": Core.config.heading,
            "paragraph": Core.config.paragraph
        };
        for (var i = 0; i < obj.c; i++) {
            _cache.menuChapterTemplate = {
                "number": i+1
            };
            newContent += FormatModel(menuChapterTemplate, _cache.menuChapterTemplate);
        }
        _cache.menuBookTemplate = {
            "name": obj.n,
            "value": obj.b,
            "chapters": newContent
        };
        newContent = FormatModel(menuBookTemplate, _cache.menuBookTemplate);
        console.log(obj.n + " has " + obj.c + " chapters");
        $('#menu').append(newContent);
    });
};

Core.makeThis = function(obj) {
    console.log(obj.attr('data'));
    $('#main').addClass('focus');
    $('#main').removeClass('focus');

    _cache.thisTemp = {
        "class": Core.config.class,
        "heading": Core.config.heading,
        "paragraph": Core.config.paragraph
    };

    var newContent = FormatModel(thisTemp, _cache.thisTemp)
    $('#main').append(newContent);
};
var FormatModel = function(str, model) {
    for (var k in model) {
        var re = new RegExp("{" + k + "}", "g");
        str = str.replace(re, model[k]);
    }
    return str;
}
$(document).ready(function() {
    console.log('Document ready');
    Core.init();
});
