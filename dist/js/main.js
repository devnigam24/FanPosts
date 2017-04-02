(function(window) {
    'use strict';

    var App = window.App;
    var FormHandler = App.FormHandler;
    var ClelebApiStrore = App.ClelebApiStrore;
    var CelebCards = App.CelebCards;
    var Validation = App.Validation;
    var RemoteDataStore = App.RemoteDataStore;
    var Story = App.Story;

    var CELEB_CARD_SELECTOR = '[data-coffee-order="checklist"]';
    var CELEB_SEARCH_FORM_SELECTOR = '[data-celeb-search="form"]';
    var STORY_FORM_SELECTOR = '[data-story="form"]';
    var SERVER_URL = 'http://localhost:3009/stories';
    window.CELEB_API_SEARCH_URL = 'https://sg.media-imdb.com/suggests/';

    //var horizon = Horizon();
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myStory = new Story(remoteDS);
    var celebritySearchFormHandler = new FormHandler(CELEB_SEARCH_FORM_SELECTOR);
    var storyFormHandler = new FormHandler(STORY_FORM_SELECTOR);
    var celebCards = new CelebCards(CELEB_CARD_SELECTOR);

    window.myStory = myStory;

    celebritySearchFormHandler.addSubmitHandler(function(data, callback) {
        var celebJson = new ClelebApiStrore(data);
        return celebJson.getAll(data, callback).done(function(CelebJsonData) {
            celebCards.addCard(CelebJsonData.d);
        });
    });

    storyFormHandler.addSubmitHandler(function(data) {
        return myStory.createStory(data);
    });


    storyFormHandler.addInputHandler(Validation.isValidEmail);
    storyFormHandler.addClickHandler();
	//horizon.connect();
    //const chat = horizon("messages");
})(window);
