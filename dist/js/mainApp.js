(function(window) {
    'use strict';

    var App = window.App;
    var FormHandler = App.FormHandler;
    var ClelebApiStrore = App.ClelebApiStrore;
    //var horizon = Horizon();
    var CELEB_SEARCH_FORM_SELECTOR = '[data-celeb-search="form"]';
    window.CELEB_API_SEARCH_URL = 'https://sg.media-imdb.com/suggests/';


    var formHandler = new FormHandler(CELEB_SEARCH_FORM_SELECTOR);
    formHandler.addSubmitHandler(function(data) {
        return new ClelebApiStrore(data).getAll(data);
    });
    //horizon.connect();
    //const chat = horizon("messages");
})(window);
