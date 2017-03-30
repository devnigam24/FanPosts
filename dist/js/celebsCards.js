(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function CelebCards(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }


    CelebCards.prototype.addCard = function(celebData) {
        console.log(celebData);
        var cardElement = new Card(celebData[0]);
        this.$element.append(cardElement.$element);
    };

    function Card(celebData) {
        var $divOuter = $('<div></div>', {
            'data-celeb-order': 'card',
            'class': 'col s12 m6 card'
        });

        var $divCardImage = $('<div></div>', {
            'class': 'card-image waves-effect waves-block waves-light'
        });

        var $img = $('<img></img', {
            'class': 'activator',
            'src': celebData.i[0]
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
        var $pCardRevel = $('<p></p>');

        var $anchor = $('<a></a>', {
            'href': '#'
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
        $divCardContent.append($pCardContent.append($anchor.append('This is a link')));

        $divCardRevel.append($spanCardRevel);
        $divCardRevel.append($pCardRevel.append(celebData.s));

        $divOuter.append($divCardImage);
        $divOuter.append($divCardContent);
        $divOuter.append($divCardRevel);

        this.$element = $divOuter;
    }

    App.CelebCards = CelebCards;
    window.App = App;
})(window);
