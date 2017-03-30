(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }
    RemoteDataStore.prototype.add = function(val) {
        return $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
        });
    };
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
