(function() {

	// VARIABLES
	const timeline = document.querySelector(".timeline ol"),
	  elH = document.querySelectorAll(".timeline li > div"),
	  arrows = document.querySelectorAll(".timeline .arrows .arrow"),
	  arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
	  arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
	  firstItem = document.querySelector(".timeline li:first-child"),
	  lastItem = document.querySelector(".timeline li:last-child"),
	  xScrolling = 280,
	  disabledClass = "disabled";
  
	// START
	window.addEventListener("load", init);
  
	function init() {
	  setEqualHeights(elH);
	  animateTl(xScrolling, arrows, timeline);
	  setSwipeFn(timeline, arrowPrev, arrowNext);
	  setKeyboardFn(arrowPrev, arrowNext);
	}
  
	// SET EQUAL HEIGHTS
	function setEqualHeights(el) {
	  let counter = 0;
	  for (let i = 0; i < el.length; i++) {
		const singleHeight = el[i].offsetHeight;
  
		if (counter < singleHeight) {
		  counter = singleHeight;
		}
	  }
  
	  for (let i = 0; i < el.length; i++) {
		el[i].style.height = `${counter}px`;
	  }
	}
  
	// CHECK IF AN ELEMENT IS IN VIEWPORT
	// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	function isElementInViewport(el) {
	  const rect = el.getBoundingClientRect();
	  return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	  );
	}
  
	// SET STATE OF PREV/NEXT ARROWS
	function setBtnState(el, flag = true) {
	  if (flag) {
		el.classList.add(disabledClass);
	  } else {
		if (el.classList.contains(disabledClass)) {
		  el.classList.remove(disabledClass);
		}
		el.disabled = false;
	  }
	}
  
	// ANIMATE TIMELINE
	function animateTl(scrolling, el, tl) {
	  let counter = 0;
	  for (let i = 0; i < el.length; i++) {
		el[i].addEventListener("click", function() {
		  if (!arrowPrev.disabled) {
			arrowPrev.disabled = true;
		  }
		  if (!arrowNext.disabled) {
			arrowNext.disabled = true;
		  }
		  const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
		  if (counter === 0) {
			tl.style.transform = `translateX(-${scrolling}px)`;
		  } else {
			const tlStyle = getComputedStyle(tl);
			// add more browser prefixes if needed here
			const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
			const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
			tl.style.transform = `translateX(${values}px)`;
		  }
  
		  setTimeout(() => {
			isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
			isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
		  }, 1100);
  
		  counter++;
		});
	  }
	}
  
	// ADD SWIPE SUPPORT FOR TOUCH DEVICES
	function setSwipeFn(tl, prev, next) {
	  const hammer = new Hammer(tl);
	  hammer.on("swipeleft", () => next.click());
	  hammer.on("swiperight", () => prev.click());
	}
  
	// ADD BASIC KEYBOARD FUNCTIONALITY
	function setKeyboardFn(prev, next) {
	  document.addEventListener("keydown", (e) => {
		if ((e.which === 37) || (e.which === 39)) {
		  const timelineOfTop = timeline.offsetTop;
		  const y = window.pageYOffset;
		  if (timelineOfTop !== y) {
			window.scrollTo(0, timelineOfTop);
		  }
		  if (e.which === 37) {
			prev.click();
		  } else if (e.which === 39) {
			next.click();
		  }
		}
	  });
	}
  })();
(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});
})(jQuery);