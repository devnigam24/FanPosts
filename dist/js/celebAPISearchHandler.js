(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function ClelebApiStrore(url) {
        if (!url) {
            throw new Error('No remote URL supplied');
        }
        this.apiUrl = url;
    }

    ClelebApiStrore.prototype.getAll = function(url, jsonpCallBack) {
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            cache: true,
            jsonp: false,
            crossDomain: true,
            jsonpCallback: jsonpCallBack,
            success: function(data) {
                return data;
            }
        });
    };

    App.ClelebApiStrore = ClelebApiStrore;
    window.App = App;
})(window);
