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
    }

    FormHandler.prototype.addInputHandler = function(fn) {
        this.$element.on('input', '[name="emailAddress"]',
            function(event) {
                var emailAddress = event.target.value;
                var message = '';
                if (fn(emailAddress)) {
                    event.target.setCustomValidity('');
                } else {
                    message = emailAddress +
                        ' is not an authorized email address!';
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
            }, function(error, result) {
                if (null != result || undefined != result) {
                    var uri_enc = encodeURIComponent(result[0].thumbnail_url);
                    var tempUri = uri_enc.replace('c_limit%2Ch_60%2Cw_90', 'q_90');
                    var uri_dec = decodeURIComponent(tempUri);
                    window.thumbnailUrl = uri_dec;
                    $('#imgPreview').attr('src', uri_dec);
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
                var ajaxUrl = window.CELEB_API_SEARCH_URL +
                    inputSearchValue.substr(0, 1).toLocaleLowerCase() +
                    '/' + inputSearchValue + '.json';
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
