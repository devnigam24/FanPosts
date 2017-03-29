(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(formSelector) {
        if (!formSelector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(formSelector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + formSelector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(callback) {
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var inputSearchValue = $(this).serializeArray()[0].value;
            var ajaxUrl = window.CELEB_API_SEARCH_URL + inputSearchValue.substr(0, 1) + '/' + inputSearchValue + '.json';
            callback(ajaxUrl);
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
