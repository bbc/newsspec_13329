/** @jsx React.DOM */
define([
    'lib/news_special/bootstrap',
    'bump-3',
    'underscore',
    'lib/vendors/react/react-0.14.2.min'
], function (news, $, _, React, ReactDOM) {

    var video = React.createClass({
        getInitialState: function () {
            var product = this.props.background ? 'background' : 'news';
            var autoplay = this.props.autoplay;

            var mp;
            var settings = {
                product: product,
                playlistObject: {
                    items: []
                },
                overrideHoldingImage: this.props.poster,
                responsive: true,
                muted: false
            };

            return {
                mp: mp,
                settings: settings
            };
        },

        componentDidMount: function () {
            var updatedSettings = _.extend(this.state.settings, {
                playlistObject: {
                    items: [{vpid: this.props.videoId}]
                }
            });
            var $mp = $('#' + this.props.selector).player(updatedSettings);

            var regex = new RegExp('^story-media-[\\d]$');
            if (regex.test(this.props.selector)) {
                var overlay = news.$('#' + this.props.selector + '-placeholder').html();
                news.$('#' + this.props.selector + '-faux-container').append(overlay);

                // when looping poster video overlay is clicked
                news.$('#' + this.props.selector + '-faux-container').on('click', this.playVideo.bind(this));

                var self = this;
                // when video goes into a playing state
                $mp.bind('playing', function () {
                    $('#' + self.props.selector + '-faux-container').addClass('undisplayed');
                    $('#' + self.props.selector + '-container').removeClass('hidden');
                    if (!$mp.currentTime()) {   // if video is played from start (current time is 0 or NaN)
                        var sectionNum = self.props.selector.substr(-1);
                        var sectionRegion;
                        switch (sectionNum) {
                        case '2':
                            sectionRegion = 'europe';
                            break;
                        case '3':
                            sectionRegion = 'asia';
                            break;
                        case '5':
                            sectionRegion = 'south-america';
                            break;
                        case '7':
                            sectionRegion = 'north-america';
                            break;
                        }
                        news.istats.log('video-played-' + sectionRegion, 'newsspec-interaction');
                    }
                });

                // when video reaches the end or is stopped
                $mp.bind('ended playlistStopped', this.videoEnded.bind(this));
            }

            this.setState({
                settings: updatedSettings,
                mp: $mp
            });
            $mp.load();
        },

        playVideo: function () {
            $('#' + this.props.selector + '-container').find('.story-media-video-overlay').hide();
            $('#' + this.props.selector + '-faux-container').addClass('undisplayed');
            $('#' + this.props.selector + '-container').removeClass('hidden');
            this.state.mp.play();
        },

        videoEnded: function () {
            $('#' + this.props.selector + '-container').find('.story-media-video-overlay').show();
            $('#' + this.props.selector + '-faux-container').removeClass('undisplayed');
            $('#' + this.props.selector + '-container').addClass('hidden');
            news.istats.log('video-ended', 'newsspec-nonuser');
        },

        render: function() {
            var id = this.props.selector;

            return (
                <div className='section_videowrapper'>
                    <div id={id} className='section_video'></div>
                </div>
            );
        }
    });

    return video;
});
