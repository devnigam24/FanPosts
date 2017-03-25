(function(window) {
    'use strict';

    var App = window.App;

    var horizon = Horizon();
    horizon.connect();
    const chat = horizon("messages");
})(window);
