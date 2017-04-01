(function(window) {
    'use strict';
    var App = window.App || {};

    function Story(db) {
        this.db = db;
    }
    Story.prototype.createStory = function(story) {
        console.log('Adding story for ' + story.emailAddress);
        return this.db.add(story);
    };
    App.Story = Story;
    window.App = App;
})(window);
