
share();
function share() {
    WeixinJS = typeof WeixinJS != 'undefined' || {};
    WeixinJS.hideOptionMenu = function() {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            if(typeof WeixinJSBridge != 'undefined') WeixinJSBridge.call('hideOptionMenu');
        });
    };
    WeixinJS.hideToolbar = function() {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            if(typeof WeixinJSBridge != 'undefined') WeixinJSBridge.call('hideToolbar');
        });
    };

    (function() {
        var onBridgeReady = function() {
            var callback = function(res) {
                $('.popup .pane1').fadeOut();
                $('.popup .pane2').fadeIn();
            };

            WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                (global.dataForWeixin.callback)();
                WeixinJSBridge.invoke('sendAppMessage', {
                    "appid": global.dataForWeixin.appId,
                    "img_url": global.dataForWeixin.TLImg,
                    "img_width": '120',
                    "img_height": '120',
                    "link": global.dataForWeixin.url,
                    "desc": global.dataForWeixin.title,
                    "title": global.dataForWeixin.title2
                }, callback);
            });
            WeixinJSBridge.on('menu:share:timeline', function(argv) {
                (global.dataForWeixin.callback)();
                WeixinJSBridge.invoke('shareTimeline', {
                    "img_url": global.dataForWeixin.TLImg,
                    "img_width": '120',
                    "img_height": '120',
                    "link": global.dataForWeixin.url,
                    "desc": global.dataForWeixin.title,
                    "title": global.dataForWeixin.title
                }, callback);
            });
            WeixinJSBridge.on('menu:share:weibo', function(argv) {
                (global.dataForWeixin.callback)();
                WeixinJSBridge.invoke('shareWeibo', {
                    "content": global.dataForWeixin.sinaText,
                    "url": global.dataForWeixin.url
                }, callback);
            });
            WeixinJSBridge.on('menu:share:facebook', function(argv) {
                (global.dataForWeixin.callback)();
                WeixinJSBridge.invoke('shareFB', {
                    "img_url": global.dataForWeixin.TLImg,
                    "img_width": '120',
                    "img_height": '120',
                    "link": global.dataForWeixin.url,
                    "desc": global.dataForWeixin.title,
                    "title": global.dataForWeixin.title2
                }, callback);
            });
        };
        if(document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if(document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        } else {

        }
    })();
}
