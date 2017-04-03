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
        return $.post(this.serverUrl, val);
    };

    RemoteDataStore.prototype.getAll = function() {
        return $.get(this.serverUrl);
    };

    RemoteDataStore.prototype.get = function(key) {
        return $.get(this.serverUrl + '/' + key);
    };

    RemoteDataStore.prototype.remove = function(key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
