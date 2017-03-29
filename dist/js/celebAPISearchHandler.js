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

    ClelebApiStrore.prototype.getAll = function(url) {
        $.ajax({
            url: url,
            type: 'GET',
            // dataType: 'jsonp',
            contentType: "json",
            crossDomain: true,
            success: function(serverResponse) {
                console.log(JSON.stringify(serverResponse));
            },
            error: function(error,errorMessage) {
                console.log(error.statusText + ' : ' + error.status + ' : ' + errorMessage);
            }
        }).done(function() {
            console.log("ajax call over successfully");
        });
    };

    App.ClelebApiStrore = ClelebApiStrore;
    window.App = App;
})(window);
