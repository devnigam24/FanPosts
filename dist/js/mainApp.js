(function(window) {
    'use strict';

    var App = window.App;
    var FormHandler = App.FormHandler;
    var ClelebApiStrore = App.ClelebApiStrore;
    var CelebCards = App.CelebCards;
    //var horizon = Horizon();
    var CELEB_SEARCH_FORM_SELECTOR = '[data-celeb-search="form"]';
    var CELEB_CARD_SELECTOR = '[data-coffee-order="checklist"]';
    window.CELEB_API_SEARCH_URL = 'https://sg.media-imdb.com/suggests/';


    var formHandler = new FormHandler(CELEB_SEARCH_FORM_SELECTOR);
    var celebCards = new CelebCards(CELEB_CARD_SELECTOR);
    formHandler.addSubmitHandler(function(data, callback) {
        var celebJson = new ClelebApiStrore(data);
        celebJson.getAll(data, callback).done(function(CelebJsonData) {
            celebCards.addCard(CelebJsonData.d);
        });

    });
    //horizon.connect();
    //const chat = horizon("messages");
})(window);
