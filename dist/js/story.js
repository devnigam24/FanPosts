(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function Story(db) {
        this.db = db;
    }

    Story.prototype.createStory = function(story) {
        return this.db.add(story);
    };

    Story.prototype.fetchAllStories = function(fn) {
        return this.db.getAll().then(function(allStories) {
            fn(allStories.reverse());
        });
    };

    Story.prototype.postAllStories = function(selector, allStories) {
        allStories.forEach(function(oneStory) {
            $(selector).append(storyCard(oneStory))
        });

    };

    function storyCard(data) {
        var $divOuter = $('<div></div>', {
            'class': 'card horizontal small'
        });

        var $divCardImage = $('<div></div>', {
            'class': 'card-image'
        });

        var $img = $('<img></img', {
            'class': 'activator',
            'src': data.PostedSnapURL,
            'alt': 'Image'
        });

        var $divCardStacked = $('<div></div>', {
            'class': 'card-stacked'
        });

        var $divCardContent = $('<div></div>', {
            'class': 'card-content'
        });

        var $cardCelebrity = $('<h5></h5>');

        var $cardDisc = $('<p></p>');

        var $breakTag = $('<br></br>');

        var $pCardFirstName = $('<p></p>');

        var $pCardLastName = $('<p></p>');

        var $pCardLocation = $('<p></p>');

        var $pCardDate = $('<p></p>');

        var $divCardAction = $('<div></div>', {
            'class': 'card-action'
        });

        var $anchor = $('<a></a>', {
            'class': 'orange-text text-lighten-3 left'
        });

        var $anchorIconUp = $('<a></a>');

        var $anchorIconDown = $('<a></a>');

        var $unlikeIcon = $('<i></i>', {
            'class': 'right material-icons',
            'data-unlike-up': 'click',
            'documentId' : data.id
        });

        var $likeIcon = $('<i></i>', {
            'class': 'right material-icons',
            'data-like-up': 'click',
            'documentId' : data.id
        });

        var $likeSpan = $('<span></span>', {
            'class': 'right'
        });

        var $unlikeSpan = $('<span></span>', {
            'class': 'right'
        });

        $likeIcon.append('thumb_up');
        $unlikeIcon.append('thumb_down');
        $anchor.append(data.firstName + ' ' + data.lastName);
        $anchorIconUp.append($likeIcon);
        $anchorIconDown.append($unlikeIcon);

        $divCardAction.append($anchor);
        $divCardAction.append($unlikeSpan.append(data.storyDislike));
        $divCardAction.append($anchorIconDown);
        $divCardAction.append($likeSpan.append(data.storyLike));
        $divCardAction.append($anchorIconUp);

        $cardCelebrity.append(data.celebrityName);
        $cardDisc.append(data.description);
        $pCardLocation.append(data.location);
        $pCardDate.append(data.postDate);

        $divCardContent.append($cardCelebrity);
        $divCardContent.append($cardDisc);
        $divCardContent.append($breakTag);
        $divCardContent.append($pCardFirstName);
        $divCardContent.append($pCardLastName);
        $divCardContent.append($pCardLocation);
        $divCardContent.append($pCardDate);

        $divCardStacked.append($divCardContent);
        $divCardStacked.append($divCardAction);

        $divCardImage.append($img);

        $divOuter.append($divCardImage);
        $divOuter.append($divCardStacked);

        return $divOuter;

    }

    App.Story = Story;
    window.App = App;
})(window);
