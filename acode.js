/**
 * @authors Anchen
 * @version v1.0
 * lunbo:sliderWrap 轮播最外层的父元素,sliderBox 轮播的焦点按钮（现在处于第几张图）,sliderBtn 两侧按钮公用class为arrow-btn,分别class值传prev和next
 * timecount倒计时：targetDay 目标时期 格式为 'xxxx,xx,xx xx:xx'，sprite 存放倒计时的容器 格式为 id='#xxx', class='.xxx'
 */
(function($) {
    $.acode = {
        //轮播
        lunbo: function(value) {
            var setting = {
                sliderWrap: null, 
                sliderBox: null, 
                sliderBtn: "" 
            }
            var config = $.extend(setting, value);

            var sliderWrap = config.sliderWrap,
                sliderBox = config.sliderBox,
                sliderBtn = config.sliderBtn;
            console.log(sliderBtn.eq(1))
            if (!sliderBox) throw new Error('sliderBox not exist');
            if (!sliderWrap) throw new Error('sliderWrap not exist');

            var clearSlideTime, sliderIndex = 0,
                isfocus = true;
            sliderBox.css({
                'opacity': 0
            }).hide().eq(sliderIndex).css({
                'opacity': 1
            }).show();
            sliderBtn.eq(sliderIndex).addClass('current').siblings('a').removeClass('current');
            sliderBox.each(function(index) {
                var that = $(this);
                that.css({
                    'background': that.attr('data-color')
                });
            });

            sliderBtn.each(function(index) {
                $(this).hover(function() {
                    if (sliderIndex != index) {
                        sliderBox.show().css({
                            'opacity': 0,
                            'z-index': 3
                        }).eq(index).stop().animate({
                            'opacity': 1
                        }, 700);
                        sliderBox.eq(sliderIndex).css({
                            'opacity': 1
                        }).stop().animate({
                            'opacity': 0
                        }, 700).css({
                            'z-index': 3
                        });
                        $(this).addClass('current').siblings('a').removeClass('current');
                        sliderIndex = index;
                    };
                    clearInterval(auto);
                })
            })

            function sliderBanner(index, direction) {

                if (direction == 'next') {
                    sliderBox.eq(index).stop().animate({
                        'opacity': 0
                    }, 700).css({
                        'z-index': 1
                    });
                    sliderIndex++;
                    if (sliderIndex > sliderBox.size() - 1) {
                        sliderIndex = 0;
                    }
                    sliderBtn.eq(sliderIndex).addClass('current').siblings('a').removeClass('current');
                    sliderBox.show().eq(sliderIndex).stop().animate({
                        'opacity': 1
                    }, 700).css({
                        'z-index': 3
                    });
                } else if (direction == 'prev') {
                    sliderBox.eq(index).stop().animate({
                        'opacity': 0
                    }, 700).css({
                        'z-index': 1
                    });
                    sliderIndex--;
                    if (sliderIndex < 0) {
                        sliderIndex = sliderBox.size() - 1;
                    }
                    sliderBtn.eq(sliderIndex).addClass('current').siblings('a').removeClass('current');
                    sliderBox.show().eq(sliderIndex).stop().animate({
                        'opacity': 1
                    }, 700).css({
                        'z-index': 3
                    });
                }

            }
            auto = setInterval(function() {
                sliderBanner(sliderIndex, 'next');
            }, 4000);

        },
        //倒计时
        timeCount: function(value) {
            var setting = {
                targetDay: null,
                sprite: null,
                end: function() {}
            };

            var config = $.extend(setting,value);

            if (!config.targetDay) throw new Error('target day not exist');

            if (!config.sprite) throw new Error('target sprite not exist');

            var $sprite = $(config.sprite);
            var now = new Date().getTime();
            var tar = new Date(config.targetDay).getTime();
            var diff = (tar - now) / 1000;
            var timeName = null;

            if (diff < 0) throw new Error('target day wrong');

            function countDown() {
                var day = Math.floor(diff / 3600 / 24);
                var hour = Math.floor(diff / 3600 % 24);
                var minute = Math.floor(diff / 60 % 60);
                var second = Math.floor(diff % 60);

                day = day < 10 ? "0" + day : day;
                hour = hour < 10 ? "0" + hour : hour;
                minute = minute < 10 ? "0" + minute : minute;
                second = second < 10 ? "0" + second : second;

                var html = day + '天' + hour + '时' + minute + '分' + second + '秒';
                $sprite.html(html);

                diff--;

                if (diff == 0) {
                    clearTimeout(timeName);
                    config.end();
                } else {
                    timeName = setTimeout(function() {
                        countDown();
                    }, 1000);
                }
            };

            countDown();
        }
    };
})(jQuery);