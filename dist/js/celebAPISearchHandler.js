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
            beforeSend: function() {
                console.log('Ajax Call Started');
            },
            jsonpCallback: jsonpCallBack,
            success: function(data) {
                console.log(data);
                return data;
            },
            error: function(error, errorMessage) {
                console.log(error.statusText + ' : ' + error.status + ' : ' + errorMessage);
            }
        }).done(function() {
            console.log("Ajax Call over successfully");
        });
    };

    App.ClelebApiStrore = ClelebApiStrore;
    window.App = App;
})(window);
