(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var cloudinary = window.cloudinary;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        } else {
            this.$element = $(selector);
        }

        if (this.$element.length === 0) {
            //throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addInputHandler = function(fn) {
        this.$element.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };
    FormHandler.prototype.addClickHandler = function() {
        this.$element.on('click', '[name="celebImage"]', function() {
            cloudinary.openUploadWidget({
                cloud_name: 'cpsc473',
                upload_preset: 'nmqrcew6',
                theme: 'minimal'
            },
            function(error, result) {
                if (null != result || undefined != result) {
                    window.thumbnailUrl = result[0].thumbnail_url;
                    $('#imgPreview').attr('src', result[0].thumbnail_url);
                }
            });
        });
    };

    FormHandler.prototype.addSubmitHandler = function(fn) {
        this.$element.on('submit', function(event) {
            event.preventDefault();

            if (this.name === 'celebSearch') {
                var inputSearchValue = $(this).serializeArray()[0].value;
                inputSearchValue = inputSearchValue.replace(' ', '_');
                var ajaxUrl = window.CELEB_API_SEARCH_URL + inputSearchValue.substr(0, 1).toLocaleLowerCase() + '/' + inputSearchValue + '.json';
                console.log(ajaxUrl);
                fn(ajaxUrl, 'imdb$' + inputSearchValue).then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
            }

            if (this.name === 'storyForm') {
                var data = {};
                $(this).serializeArray().forEach(function(element) {
                    data[element.name] = element.value;
                });
                data.PostedSnapURL = window.thumbnailUrl;
                window.thumbnailUrl = null;
                fn(data).then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
