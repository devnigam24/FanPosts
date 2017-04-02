(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function CelebCards(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        } else {
            this.$element = $(selector);
        }
        if (this.$element.length === 0) {
            //throw new Error('Could not find element with selector: ' + selector);
        }
    }


    CelebCards.prototype.addCard = function(celebData) {
        this.$element.empty();
        for (var i = 0; i < celebData.length; i++) {
            var cardElement = new Card(celebData[i]);
            this.$element.append(cardElement.$element);
        }
    };

    function Card(celebData) {
        if (celebData.i !== undefined) {
            var imgPath = celebData.i[0];
        } else {
            imgPath = 'images/avatar_man.jpg';
        }

        var moreInfoDir = 'http://www.imdb.com/name/' + celebData.id + '/bio';

        var $divOuter = $('<div></div>', {
            'data-celeb-order': 'card',
            'class': 'col s4 m6 card'
        });

        var $divCardImage = $('<div></div>', {
            'class': 'card-image waves-effect waves-block waves-light'
        });

        var $img = $('<img></img', {
            'class': 'activator',
            'src': imgPath
        });

        var $divCardContent = $('<div></div>', {
            'class': 'card-content'
        });

        var $spanCardTitle = $('<span></span>', {
            'class': 'card-title activator grey-text text-darken-4'
        });

        var $icon = $('<i></i>', {
            'class': 'material-icons right'
        });

        var $pCardContent = $('<p></p>');
        var $pCardRevel1 = $('<p></p>');
        var $pCardRevel2 = $('<p></p>');
        var $pCardRevel3 = $('<p></p>');

        var $anchor = $('<a></a>', {
            'href': moreInfoDir,
            'target': '_blank'
        });

        var $divCardRevel = $('<div></div>', {
            'class': 'card-reveal'
        });

        var $spanCardRevel = $('<span></span>', {
            'class': 'card-title grey-text text-darken-4'
        });

        var $iconClose = $('<i></i>', {
            'class': 'material-icons right'
        });

        $spanCardTitle.append(celebData.l);
        $spanCardTitle.append($icon.append('more_vert'));

        $spanCardRevel.append(celebData.l);
        $spanCardRevel.append($iconClose.append('close'));

        $divCardImage.append($img);

        $divCardContent.append($spanCardTitle);
        $divCardContent.append($pCardContent.append($anchor.append('Read Bio')));

        $divCardRevel.append($spanCardRevel);
        $divCardRevel.append($pCardRevel1.append(celebData.q));
        $divCardRevel.append($pCardRevel2.append(celebData.s));
        $divCardRevel.append($pCardRevel3.append(celebData.y));

        $divOuter.append($divCardImage);
        $divOuter.append($divCardContent);
        $divOuter.append($divCardRevel);

        this.$element = $divOuter;
    }

    App.CelebCards = CelebCards;
    window.App = App;
})(window);
