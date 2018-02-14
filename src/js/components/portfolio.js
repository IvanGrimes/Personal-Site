function portfolioPanel() {
  var getPortfolioItem = document.getElementsByClassName('portfolio__item'),
      getPortfolioPanel = document.getElementsByClassName('portfolio__panel'),
	  getPortfolioPanelClose = document.getElementsByClassName('portfolio__panel_close'),
      container = $("html,body"),
      i,
	  g;

	  $(window).on('resize load', function(){
		  for (i = 0; i < getPortfolioItem.length; i++) {
			  let item = getPortfolioItem[i];
		      let panel = getPortfolioPanel[i];

			  var windowWidth = $(window).width();

			  if(windowWidth <= 768) {
				  $(getPortfolioItem[i]).css('order', i);
				  $(getPortfolioPanel[i]).css('order', i);
			  } else if(windowWidth >= 769) {
				  if (i <= 4) {
					   $(getPortfolioItem[i]).css('order', '0');
					   $(getPortfolioPanel[i]).css('order', '1');
				  } else if (i <= 7){
					   $(getPortfolioItem[i]).css('order', '1');
					   $(getPortfolioPanel[i]).css('order', '2');
				  } else {
					   $(getPortfolioItem[i]).css('order', '3');
					   $(getPortfolioPanel[i]).css('order', '4');
				  }
			  }
		  }
	  });


	$(window).on('load', function(){
		for (i = 0; i < getPortfolioItem.length; i++) {
		  let item = getPortfolioItem[i];
	      let panel = getPortfolioPanel[i];
		  let g = i;
		  var styleEl = document.createElement('style'),
	      styleSheet;
		  document.head.appendChild(styleEl);
		  styleSheet = styleEl.sheet;

	      $(getPortfolioItem[i]).click(function(){
	        if( $(this).hasClass('portfolio__item_active')) {
				//document.stylesheet[0].addRule('.portfolio__item_active::after','opacity: 0');
				styleSheet.insertRule('.portfolio__item_active::after { opacity: 0 }', 0);
	            $(this).removeClass('portfolio__item_active');
				$(panel).slideUp(600, function(){
					$(container).animate({
						scrollTop: $(item).offset().top
					},300);
			  	});
			} else {
	            $('.portfolio__item').removeClass('portfolio__item_active');
	            $('.portfolio__panel').slideUp(600);

	            $(this).addClass('portfolio__item_active');
				//document.stylesheet[0].addRule('.portfolio__item_active::after','opacity: 1');
				styleSheet.insertRule('.portfolio__item_active::after { opacity: 1 }', 0);
					$(panel).slideDown(600, function(){
						$(container).animate({
							scrollTop: $(panel).offset().top
						},300);
					});
				$(panel).css('display', 'flex');
			}
			return false;
		});

		  $(getPortfolioPanelClose[i]).click(function(){
			  $(panel).slideUp(600);
			  $('.portfolio__item').removeClass('portfolio__item_active');
			  (function(){
				scrollTo = $(item);
				$(container).animate({
				  scrollTop: scrollTo.offset().top, scrollLeft: 0
				},600);
			  })();
		  });
	    }
	});
}

module.exports = portfolioPanel();
