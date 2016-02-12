/* Theme Name: Lugada - Landing page Template
   Author: Coderthemes
   Author e-mail: coderthemes@gmail.com
   Version: 1.0.0
   Created:Jun 2015
   File Description:Main JS file of the template
*/

/* ==============================================
Smooth Scroll To Anchor
=============================================== */
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.navbar-nav a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 78
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
/* ==============================================
Preloader
=============================================== */

$(window).load(function() {
    $('.status').fadeOut();
    $('.preloader').delay(350).fadeOut('slow');
});

/* ==============================================
WOW plugin triggers animate.css on scroll
=============================================== */
jQuery(document).ready(function () {
    wow = new WOW(
        {
            animateClass: 'animated',
            offset: 100,
            mobile: true
        }
    );
    wow.init();
});

/* ==============================================
Magnific Popup
=============================================== */
$(document).ready(function() {
    $('#video-demo').attr('width', $(window).width() * 0.8);
    $('#video-demo').attr('height', $(window).height() * 0.8);

    $('.popup-video').magnificPopup({
      type: 'inline',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      midClick: true,
      showCloseBtn: true
    });
});

$(document).ready(function() {
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        }
    });
});
//sticky header on scroll
$(window).load(function() {
    $(".sticky").sticky({topSpacing: 0});
});


/* ==============================================
Contact App
=============================================== */

//var $ = jQuery.noConflict(); //Relinquish jQuery's control of the $ variable. 

/* Global constants */

/*global jQuery */
jQuery(function ($) {
    'use strict';

    /**
     * Request Demo Form Application
     */
    var ContactFormApp = {
        $contactForm: $("#ajax-form"),
        $contactFormBtn: $("#send"),
        $contactFormName: $("#name2"),
        $contactFormEmail: $("#email2"),
        $contractFormCompany: $('#company1'),
        $contractFormCompanySize: $('#company-size1'),
        $contactFormMessage: $("#message2"),
        $confirmMessage: $("#ajaxsuccess"),
        $errorMessages: $(".error"),
        $errorName: $("#err-name"),
        $errorEmail: $('#err-email'),
        $errorEmailInvalid: $("#err-emailvld"),
        $errorCompany: $('#err-company'),
        $errorCompanySize: $('#err-company-size'),
        $errorMessage: $("#err-message"),
        $errorForm: $("#err-form"),
        $errorTimeout: $("#err-timedout"),
        $errorState: $("#err-state"),

        requestDemoUrl: 'https://app.sessionstack.com/api/demo',

        //Validate Contact Us Data
        validate: function () {
            var error = false; // we will set this true if the form isn't valid

            var name = $.trim(this.$contactFormName.val()); // get the value of the input field
            if(name === "") {
                this.showError(this.$errorName); 
                error = true; // change the error state to true
            }

            var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
            var email = $.trim(this.$contactFormEmail.val().toLowerCase()); // get the value of the input field

            if (email === "") { // check if the field is empty
                this.showError(this.$errorEmail);
                error = true;
            }
            else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
                this.showError(this.$errorEmailInvalid);
                error = true;
            }

            var message = $.trim(this.$contactFormMessage.val()); // get the value of the input field
            
            if(message === "") {
                this.showError(this.$errorMessage);             
                error = true; // change the error state to true
            }

            if(error == true) {
                this.showError(this.$errorForm);
            }

            return error;
        },
        //contact form submit handler
        contactFormSubmit: function (obj) {
            this.$errorMessages.fadeOut('slow'); // reset the error messages (hides them)

            if(this.validate() == false) {
                var data_string = $('#ajax-form').serialize(); // Collect data from form

                var $this = this;
                $.ajax({
                    type: "POST",
                    url: $this.requestDemoUrl,
                    data: data_string,
                    timeout: 6000,
                    error: function(request,error) {
                        sessionstack('log', 'request demo', 'error', 'request');
                        if (error == "timeout") {
                            $this.$errorTimeout.slideDown('slow');
                        }
                        else {
                            $this.$errorState.slideDown('slow');
                            $this.$errorState.html('An error occurred. If the error persists, contact us at info@sessionstack.com');
                        }
                    },
                    success: function() {
                        sessionstack('log', 'request demo', 'success');

                        $this.$confirmMessage.show(500);
                        $this.$confirmMessage.delay(4000);
                        $this.$confirmMessage.animate({
                            height: 'toggle'  
                            }, 500, function() {
                        });    
                        
                        $this.$contactFormName.val('');
                        $this.$contactFormEmail.val('');
                        $this.$contactFormMessage.val('');
                        $this.$contractFormCompany.val('');
                        $this.$contractFormCompanySize.val('');
                    }
                });
            }
            else {
                sessionstack('log', 'request demo', 'error', 'invalid');
            }

            return false;
        },
        bindEvents: function () {
            //binding submit event
            this.$contactFormBtn.on('click', this.contactFormSubmit.bind(this));
        },
        init: function () {
            //initializing the contact form
            this.bindEvents();
            return this;
        },
        showError: function(element) {
            element.show(500);
            element.delay(4000);
            element.animate({
                height: 'toggle'  
            }, 500, function() {
                // Animation complete.
            }); 
        }
    };

    /**
        Main application module
    */
    var App = {
        $options: {},
        

        bindEvents: function () {
            //binding events
            $(document).on('ready', this.docReady.bind(this));
        },
        
        //document ready event
        docReady: function () {
            //contat form
            ContactFormApp.init();

        },
        init: function (_options) {
            $.extend(this.$options, _options);
            this.bindEvents();
        }
    };

    //Initializing the app
    App.init({});

});
