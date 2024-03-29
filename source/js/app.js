define([
    'lib/news_special/bootstrap',
    'lib/vendors/react/react-0.14.2.min',
    'components/compiled/video',
    'istatsLogger'
], function (news, React, Video, istatsLogger) {
    var $main = news.$('.main');
    $main.removeClass('ns_no-js');

    var locale = $main.attr('data-locale');
    if (locale === 'en-GB') {
        var videos = [
            {selector: 'story-media-2-faux', videoId: 'p03hdp5k', background: true, autoplay: true, poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/3_europe/europe_poster.jpg'},
            {selector: 'story-media-2', videoId: 'p03j1t2f', poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/3_europe/europe_poster.jpg'},
            {selector: 'story-media-3-faux', videoId: 'p03hdpwr', background: true, autoplay: true, poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/4_asia/asia_poster.jpg'},
            {selector: 'story-media-3', videoId: 'p03hdclq', poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/4_asia/asia_poster.jpg'},
            {selector: 'story-media-5-faux', videoId: 'p03hdpct', background: true, autoplay: true, poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/6_south_america/south_america_poster.jpg'},
            {selector: 'story-media-5', videoId: 'p03hdccz', poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/6_south_america/south_america_poster.jpg'},
            {selector: 'story-media-7-faux', videoId: 'p03hdpzw', background: true, autoplay: true, poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/7_north_america/north_america_poster.jpg'},
            {selector: 'story-media-7', videoId: 'p03hdcdj', poster: 'http://news.bbcimg.co.uk/news/special/2016/newsspec_13329/content/english/img/7_north_america/north_america_poster.jpg'}
        ];

        var renderVideo = function (indexNumber) {
            var item = videos[indexNumber];
            React.render(React.createElement(Video, item), document.getElementById(item['selector'] + '-container'));
        };

        for (var i = 0; i < videos.length; i++) {
            renderVideo(i);
        }
    }

    istatsLogger.init();

    $.emit('init_images');
    news.sendMessageToRemoveLoadingImage();
});
