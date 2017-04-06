(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var Materialize = window.Materialize;

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
            $(selector).append(storyCard(oneStory));
        });
        addSubmitLikeUnlikeHandler();
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

        var $cardCelebrity = $('<h5></h5>', {
            'class': 'colorBlueviolet'
        });

        var $cardDisc = $('<p></p>');

        var $breakTag = $('<br></br>');

        var $pCardFirstName = $('<p></p>');

        var $pCardLastName = $('<p></p>');

        var $pCardLocation = $('<p></p>', {
            'class': 'colorDodgerblue'
        });

        var $pCardDate = $('<p></p>', {
            'class': 'colorCoral'
        });

        var $divCardAction = $('<div></div>', {
            'class': 'card-action'
        });

        var $anchor = $('<a></a>', {
            'class': 'text-lighten-3 left'
        });

        var $anchorIconUp = $('<a></a>');

        var $anchorIconDown = $('<a></a>');

        var $unlikeIcon = $('<i></i>', {
            'class': 'right material-icons',
            'data-unlike-up': 'click',
            'documentId': data.id
        });

        var $likeIcon = $('<i></i>', {
            'class': 'right material-icons',
            'data-like-up': 'click',
            'documentId': data.id
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

    function addSubmitLikeUnlikeHandler() {
        document.querySelectorAll('[data-like-up="click"]').forEach(function(oneIcon) {
            $(oneIcon).on('click', function(event) {
                event.preventDefault();
                Materialize.toast('Liked', 2000);
                window.remoteDS.get(oneIcon.getAttribute('documentid')).then(function(serverRes) {
                    if (serverRes) {
                        serverRes.storyLike = (Number(serverRes.storyLike) + 1).toString();
                        window.remoteDS.remove(oneIcon.getAttribute('documentid')).then(function() {
                            window.remoteDS.add(serverRes).then(function() {
                                location.reload();
                            });
                        });
                    }
                });
            });
        });
        document.querySelectorAll('[data-unlike-up="click"]').forEach(function(oneIcon) {
            $(oneIcon).on('click', function(event) {
                event.preventDefault();
                Materialize.toast('Un Liked', 2000);
                window.remoteDS.get(oneIcon.getAttribute('documentid')).then(function(serverRes) {
                    if (serverRes) {
                        serverRes.storyDislike = (Number(serverRes.storyDislike) + 1).toString();
                        window.remoteDS.remove(oneIcon.getAttribute('documentid')).then(function() {
                            window.remoteDS.add(serverRes).then(function() {
                                location.reload();
                            });
                        });
                    }
                });
            });
        });
    }


    App.Story = Story;
    window.App = App;
})(window);
