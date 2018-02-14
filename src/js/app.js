var jquery = require('jquery'),
	coreslider = require('coreslider');
import portfolioPanel from './components/portfolio.js';


$(window).on('load', function(){
	// Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
	      &&
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	  });

	/* ====================================================
	 * jQuery Is In Viewport.
	 * https://github.com/frontid/jQueryIsInViewport
	 * Marcelo Iván Tosco (capynet)
	 * Inspired on https://stackoverflow.com/a/40658647/1413049
	 * ==================================================== */
	!function ($) {
	  'use strict'

	  var Class = function (el, cb) {
	    this.$el = $(el);
	    this.cb = cb;
	    this.watch();
	    return this;
	  };

	  Class.prototype = {

	    /**
	     * Checks if the element is in.
	     *
	     * @returns {boolean}
	     */
	    isIn: function isIn() {
	      var _self = this;
	      var $win = $(window);
	      var elementTop = _self.$el.offset().top;
	      var elementBottom = elementTop + _self.$el.outerHeight();
	      var viewportTop = $win.scrollTop();
	      var viewportBottom = viewportTop + $win.height();
	      return elementBottom > viewportTop && elementTop < viewportBottom;
	    },

	    /**
	     * Launch a callback indicating when the element is in and when is out.
	     */
	    watch: function () {
	      var _self = this;
	      var _isIn = false;

	      $(window).on('resize scroll', function () {

	        if (_self.isIn() && _isIn === false) {
	          _self.cb.call(_self.$el, 'entered');
	          _isIn = true;
	        }

	        if (_isIn === true && !_self.isIn()) {
	          _self.cb.call(_self.$el, 'leaved');
	          _isIn = false;
	        }

	      })
	    }


	  };

	  // jQuery plugin.
	  //-----------------------------------------------------------
	  $.fn.isInViewport = function (cb) {
	    return this.each(function () {
	      var $element = $(this);
	      var data = $element.data('isInViewport');
	      if (!data) {
	        $element.data('isInViewport', (new Class(this, cb)));
	      }
	    })
	  }

	}(window.jQuery);


	var skillProgress 			= ['90', '90', '50', '70'],
		getProgressBar 			= document.getElementsByClassName('skills__list_progress'),
		getProgressPercentage 	= document.getElementsByClassName('skills__list_percentage'),
		getBarTitle		= document.getElementsByClassName('skills__list_title'),
		i,
		g;

	$(document).on('load scroll resize', function(){
		for(i = 0; i < getProgressBar.length; i++) {
			let progressbar = getProgressBar[i],
				progressperc = getProgressPercentage[i],
				skillp = skillProgress[i];

				$(progressbar).isInViewport(function (status) {
					if( status === "entered" ) {
						$(progressbar).addClass('skills__list_animate');
						$(progressbar).css('width', skillp + '%');
						$(progressperc).attr('data-value', skillp);
						$(progressperc).each(function() {
							var $this = $(this);
							$(this).prop({ Counter: 0 }).animate({ Counter: $(this).data('value') },
							{
								duration: 2500,
								easing: 'swing',
								step: function () {
							    	$this.text(Math.ceil(this.Counter) + '%');
							    }
							});
						});
						$(progressperc).addClass('skills__list_animate');
						$(progressperc).css('width', '100%');
						$(progressperc).css('opacity', '1');
				} else {
					$(progressbar).removeClass('skills__list_animate');
					$(progressbar).css('width', '0');
					$(progressperc).each(function() {
						var $this = $(this);
						$(this).prop({ Counter: 0 })
					});
					$(progressperc).removeClass('skills__list_animate');
					$(progressperc).css('width', '0');
					$(progressperc).css('opacity', '0');
				}
			});
		}


		$('.portfolio__tags_item').click(function(){
			$('.portfolio__tags_item').removeClass('portfolio__tags_active');
			$(this).addClass('portfolio__tags_active');
		});
	});

	$('.feedback__form_input,.feedback__form_message').on('focus', function() {
		$(this).siblings().css('color','#fff');
		$(this).addClass('feedback__form_field_active');
		$(this).focusout(function(){
			$(this).removeClass('feedback__form_field_active');
			$(this).siblings().css('color', '#c7b299');
		});
	});

	$('.feedback__form_input,.feedback__form_message').hover(
		function() {
			$(this).siblings().css('color','#fff');
		},
		function() {
			if ($(this).hasClass('feedback__form_field_active')) {
				$(this).siblings().css('color','#fff');
			} else {
				$(this).siblings().css('color','#c7b299');
			}
		}
	);

	$('.footer__back').on('click', function (e) {
	    e.preventDefault();
	    $('html,body').animate({
	        scrollTop: 0
	    }, 1000);
	});

	var click = 1;
	function showHide() {
		if (click == 1) {
			$('.header__nav-mobile').slideDown(400);
			click = 2;
		} else {
			$('.header__nav-mobile').slideUp(400);
			click = 1;
		}
	}

	function hideNav() {
		$('.header__nav-mobile').slideUp(400);
		click = 1;
	}

	$('.header__button-menu').on('click', showHide);
	$('.header__nav-mobile_li').on('click', hideNav);

	/*$(function() {

		// Get the form.
		var form = $('#feedback__form');

		// Get the messages div.
		var formMessages = $('#feedback__messages');

		// Set up an event listener for the contact form.
		$(form).submit(function(e) {
			// Stop the browser from submitting the form.
			e.preventDefault();

			// Serialize the form data.
			var formData = $(form).serialize();

			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			})
			.done(function(response) {
				// Make sure that the formMessages div has the 'success' class.
				$(formMessages).removeClass('feedback__notification_error');
				$(formMessages).addClass('feedback__notification_success');
				$('.feedback__notification').css('display', 'flex');
				$('.feedback__form').css('margin-top', '40px');
				// Set the message text.
				$(formMessages).text(response);

				// Clear the form.
				$('#feedback__form_name').val('');
				$('#feedback__form_phone').val('');
				$('#feedback__form_email').val('');
				$('#feedback__form_message').val('');
			})
			.fail(function(data) {
				// Make sure that the formMessages div has the 'error' class.
				$(formMessages).removeClass('feedback__notification_success');
				$(formMessages).addClass('feedback__notification_error');
				$('.feedback__notification').css('display', 'flex');
				$('.feedback__form').css('margin-top', '40px');

				// Set the message text.
				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('Oops! An error occured and your message could not be sent.');
				}
			});

		});
	});*/


	/**Telegram**/
	$(document).ready(function () {
		var form = $('#feedback__form');
		var formMessages = $('#feedback__messages');
	    $(form).submit(function () {
			var formData = form.serialize();
	        $.ajax({
	            type: "POST",
	            url: $(form).attr('action'),
	            data: formData,
	            success: function (data) {
					$(formMessages).removeClass('feedback__notification_error');
					$(formMessages).addClass('feedback__notification_success');
					$('.feedback__notification').css('display', 'flex');
					$('.feedback__form').css('margin-top', '40px');

					$(formMessages).text(data);

		            $('input').not(':input[type=submit], :input[type=hidden]').val('');
					$('textarea').val('');
	            },
	            error: function (jqXHR, text, error) {
					// Make sure that the formMessages div has the 'error' class.
					$(formMessages).removeClass('feedback__notification_success');
					$(formMessages).addClass('feedback__notification_error');
					$('.feedback__notification').css('display', 'flex');
					$('.feedback__form').css('margin-top', '40px');

					$(formMessages).text(error);
	            }
	        });
	        return false;
	    });
	});

	$(document).ready(function() {
		var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

		if (isChrome) {
			$('input').css('padding-bottom', '1px');

			$('input').on('focus', function() {
				$(this).css('padding-bottom', '0');
				$(this).focusout(function(){
					$(this).css('padding-bottom', '1px');
				});
			});
		}
		if (isSafari) {
			$('input').css('padding-bottom', '0');
		}
	});
});
