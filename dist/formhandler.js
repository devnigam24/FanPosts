(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error("No selector provided");
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!'
                event.target.setCustomValidity(message);
            }

        });
    };

    FormHandler.prototype.addSubmitHandler = function(fn) {
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(element) {
                data[element.name] = element.value;
                console.log(element.name);
            });
            //console.log('window result '+ window.imageResult);
            data['celebImage'] = document.querySelector('input[type=file]').files[0];
            console.log('data ' + data['celebImage']+ 'emailAddress' + data['emailAddress']);
            fn(data).then(function() {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    };



    FormHandler.prototype.addImageHandler = function() {
        this.$formElement.on('change', '[name="file"]', function(event) {
            event.preventDefault();
            var preview = document.querySelector('img');
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                preview.src = reader.result;
                var test = JSON.stringify(reader.result);
                //console.log('test dtata '+test);
              //  window.imageResult = reader.result;
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    };

    function getBase64Image(imgElem) {
        // imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
        var canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(imgElem, 0, 0);
        var dataURL = canvas.toDataURL("image/jpeg");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
