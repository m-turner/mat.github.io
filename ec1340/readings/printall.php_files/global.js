 /**
* Modified by Paul Przyborski @ NASA EO
* 1/3/2010 - Revision #237: added code to append "index.php" to the link if
* 				the link ended in a trailing slash
*
* 1/4/2011 - Revision #249: added code to check for cat_id url parameter and insert it
*				into the link if it exists
*
* 1/7/2011 - Revision #327: ported my changes into the new code delivered by CC
**/
 $(document).ready(function() {
            
        // daily image slider, thumbs
        bindSlider('.daily-image .img-slider', '.slider-wrap-in a', 200, 2, false);

        // daily image grid slider
        bindSlider('.daily-image-grid', '.slider-box', 300, 1, false);

        // home natural hazards slider
        bindSlider('.home-hazards', '.slider-box', 300, 1, true);

        // home global maps slider
        bindSlider('.home-maps', '.slider-box', 300, 1, true);

        // home features slider
        bindSlider('.home-feature', '.slider-wrap-in div', 300, 1, true);
        
        // images detail slider, thumbs
        bindSlider('.side-img-attributes .img-slider', '.slider-wrap-in a', 200, 2, false);
        
        // images detail slider, thumbs
        bindSlider('.side-img-attributes .img-slider-top', '.slider-wrap-in a', 200, 2, false);

        // button show, daily image grid slider
        $('.btn-grid-view').bind({
            'click': function(e) {
                e.preventDefault();
                $('.daily-image').stop(true).animate({opacity: 0}, 200, function() {
                    $('.daily-image').css('display','none');
                    $('.daily-image-grid').css('display','block');
                    $('.daily-image-grid').stop(true).animate({opacity: 1}, 200);
                    $('.arr-textlink-dailyimage').css('display','block');
                    $('.arr-textlink-dailyimage').stop(true).animate({opacity: 1}, 200);
                });
            }
        });

        // button hide, daily image grid slider
        $('.btn-grid-view-hide').bind({
            'click': function(e) {
                e.preventDefault();
                $('.arr-textlink-dailyimage').stop(true).animate({opacity: 0}, 200);
                $('.arr-textlink-dailyimage').css('display','none');
                $('.daily-image-grid').stop(true).animate({opacity: 0}, 200, function() {
                    $('.daily-image-grid').css('display','none');
                    $('.daily-image').css('display','block');
                    $('.daily-image').stop(true).animate({opacity: 1}, 200);
                });
            }
        });

        // side subscribe today links
        $('.subscribe-feeds a').each(
            function(index) {
                $(this).bind({
                    'mouseenter': function() {
                        $(this).parent('.subscribe-feeds').css('backgroundPosition','0 -' + ((index+1) * 37) + 'px');
                    },
                    'mouseleave': function() {
                        $(this).parent('.subscribe-feeds').css('backgroundPosition','0 0');
                    }
                })
            }
        );
        
        // map markers
        $('.location_map .location').each(
            function(index) {
                $(this).bind({
                    'mouseenter': function() {
                        $(this).addClass('location-on');
                    },
                    'mouseleave': function() {
                        $(this).removeClass('location-on');
                    }
                })
            }
        );
        
        // map comparison list
        $('.btn-gm-compare').bind({
            'click': function(e) {
                e.preventDefault();
                if ($('.side-gm-compare').css('display') == 'block') {
                    $('.side-gm-compare').fadeOut('fast', function () {
                        $('.btn-gm-compare').text('Show All Maps');
                    });
                } else {
                    $('.side-gm-compare').fadeIn('fast', function () {
                        $('.btn-gm-compare').text('Hide');
                    });
                }
            }
        });        
    });
    
	// function for the image stack - get next
	$(function() 
	{    
		$('.stackedNavNext').live("click",function() 
		{
			/*
			var ID = $(this).attr("id");
			if(ID)
			{
										
				ID = ID.replace('-stackedNavNext','');
				
				$.ajax({
					type: "POST",
					url: "/lib/more_stackedNavNext.php",
					// data is added just like a regular URL string, using '&'
					data: "identifier="+ ID, 
					cache: false,
					success: function(html){
						$("#stackNext").prepend(html);
					}
				});
			} else {
			}
			*/
			return false;
		});
	});
	// function for the image stack - get previous
	$(function() 
	{    
		$('.stackedNavPrev').live("click",function() 
		{
			var ID = $(this).attr("id");
			if(ID)
			{
				
				ID = ID.replace('-stackedNavPrev','');
							
				$.ajax({
					type: "POST",
					url: "/lib/more_stackedNavPrev.php",
					// data is added just like a regular URL string, using '&'
					data: "identifier="+ ID, 
					cache: false,
					success: function(html){
						$("#stackPrev").append(html);
					}
				});
			} else {
			}
	
			return false;
		});
	});
	
	// function for the top image stack - get next
	$(function() 
	{    
		$('.stackedNavNext-top').live("click",function() 
		{
			/*
			var ID = $(this).attr("id");
			if(ID)
			{
				
				ID = ID.replace('-stackedNavNext-top','');
				
				$.ajax({
					type: "POST",
					url: "/lib/more_stackedNavNext.php?target=top",
					// data is added just like a regular URL string, using '&'
					data: "identifier="+ ID, 
					cache: false,
					success: function(html){
						$("#stackNext-top").prepend(html);
					}
				});				
			} else {
			}
			*/	
			return false;
		});
	});
	// function for the top image stack - get previous
	$(function() 
	{    
		$('.stackedNavPrev-top').live("click",function() 
		{
			var ID = $(this).attr("id");
			if(ID)
			{
				
				ID = ID.replace('-stackedNavPrev-top','');
							
				$.ajax({
					type: "POST",
					url: "/lib/more_stackedNavPrev.php?target=top",
					// data is added just like a regular URL string, using '&'
					data: "identifier="+ ID, 
					cache: false,
					success: function(html){
						$("#stackPrev-top").append(html);
					}
				});
			} else {
			}
	
			return false;
		});
	});
    
    // Generic slider function
    function bindSlider(sliderBox, sliderEle, speed, shown, navdots) {

        /*

        Relies on a structure that looks like this:

        <slide-l></slide-l>
            <slider-wrap>
                <slider-wrap-in>
                    Sliding element goes here ...
                </slider-wrap-in>
            </slider-wrap>
        <slide-r></slide-r>

        "slider-wrap": set to the height & width of the viewing window
        "slider-wrap-in": is automatically set to the correct width based on the number of sliding elements

        */
        
        // attach information as data
        $(sliderBox).data('boxdata', { dsliderEle: sliderEle, dshown: shown, dnavdots: navdots });

        // init
        var sliderMoving = false;
        $(sliderBox + ' .slide-l').addClass('slide-grey');
        if ($(sliderBox + ' ' + sliderEle).length < (shown + 1)) {
            // no elements to slide
            $(sliderBox + ' .slide-r').addClass('slide-grey');
        }
        
        // set the width of the inner container
        //sliderInnerWidth = (parseFloat($(sliderBox + ' .slider-wrap').css('width'))) * (($(sliderBox + ' ' + sliderEle).length) + 2);
        //$(sliderBox + ' .slider-wrap-in').css('width',sliderInnerWidth);

        // nav dots
        if (navdots) {
            // add nav dot links
            for (var i=0; i < (($(sliderBox + ' ' + sliderEle).length) / shown); i++) {
                if (i == 0) {
                    $(sliderBox + ' .nav-dots').append('<a href="#" class="nav-dot-0 dot-sel"></a>');
                } else {
                    $(sliderBox + ' .nav-dots').append('<a href="#" class="nav-dot-' + i + '"></a>');
                }
            }
            // bind nav dot links
            $(sliderBox + ' .nav-dots a').each( 
                function(index) {
                    $(this).bind({
                        'click': function(e) {
                            e.preventDefault();
                            if ((!$(this).hasClass('dot-sel')) && (!sliderMoving)) {
                                sliderMoving = true;
                                sliderDistance = parseFloat($(sliderBox + ' .slider-wrap').css('width'));
                                sliderTotal = Math.round(($(sliderBox + ' ' + sliderEle).length) / shown);
                                sliderNewPos = 0 - (sliderDistance * index);
                                resetNavDots(sliderBox);
                                $(this).addClass('dot-sel');
                                $(sliderBox + ' .slider-wrap-in').stop(true).animate({'marginLeft': sliderNewPos + 'px'}, speed, function() {
                                    $(sliderBox + ' .slide-l').removeClass('slide-grey');
                                    $(sliderBox + ' .slide-r').removeClass('slide-grey');
                                    if (sliderNewPos == 0) {
                                        $(sliderBox + ' .slide-l').addClass('slide-grey');
                                    }
                                    if (sliderNewPos == (0 - (sliderDistance * (sliderTotal - 1)))) {
                                        $(sliderBox + ' .slide-r').addClass('slide-grey');
                                    }
                                    sliderMoving = false;
                                });
                            }
                        }
                    })
                }
            );
        }

        // right arrow
        $(sliderBox + ' .slide-r').bind({
            click: function(e) {
                e.preventDefault();
                sliderCurPos = parseFloat($(sliderBox + ' .slider-wrap-in').css('marginLeft'));
                sliderDistance = parseFloat($(sliderBox + ' .slider-wrap').css('width'));
                if ((!$(this).hasClass('slide-grey')) && (!sliderMoving)) {
                    sliderMoving = true;
                    sliderTotal = Math.round(($(sliderBox + ' ' + sliderEle).length) / shown);
                    sliderNewPos = sliderCurPos - sliderDistance;
                    if (navdots) {
                        resetNavDots(sliderBox);
                        newDot = 0 - (sliderNewPos / sliderDistance);
                        $(sliderBox + ' .nav-dot-' + newDot).addClass('dot-sel');
                    }
                    $(sliderBox + ' .slider-wrap-in').stop(true).animate({'marginLeft': sliderNewPos + 'px'}, speed, function() {
                        $(sliderBox + ' .slide-l').removeClass('slide-grey');
                        if (sliderNewPos == (0 - (sliderDistance * (sliderTotal - 1)))) {
                            $(sliderBox + ' .slide-r').addClass('slide-grey');
                        }
                        sliderMoving = false;
                    });
                }
            }
        });

        // left arrow
        $(sliderBox + ' .slide-l').bind({
            click: function(e) {
                e.preventDefault();
                sliderCurPos = parseFloat($(sliderBox + ' .slider-wrap-in').css('marginLeft'));
                sliderDistance = parseFloat($(sliderBox + ' .slider-wrap').css('width'));
                if ((!$(this).hasClass('slide-grey')) && (!sliderMoving)) {
                    sliderMoving = true;
                    sliderNewPos = sliderCurPos + sliderDistance;
                    if (sliderNewPos < 1) {
                        if (navdots) {
                            resetNavDots(sliderBox);
                            newDot = 0 - (sliderNewPos / sliderDistance);
                            $(sliderBox + ' .nav-dot-' + newDot).addClass('dot-sel');
                        }
                        $(sliderBox + ' .slider-wrap-in').stop(true).animate({'marginLeft': sliderNewPos + 'px'}, speed, function() {
                            $(sliderBox + ' .slide-r').removeClass('slide-grey');
                            if (sliderNewPos == 0) {
                                $(sliderBox + ' .slide-l').addClass('slide-grey');
                            }
                            sliderMoving = false;
                        });
                    }
                }
            }
        });
    }
    
    function resetNavDots(sliderBox) {
        $(sliderBox + ' .nav-dots a').each( 
            function() {
                if ($(this).hasClass('dot-sel')) {
                    $(this).removeClass('dot-sel')
                }
            }
        );
    }
        
    // Manual sliding function
    function manualSlide(sliderBox,slideTo) {
        
        /* 
        
        used like this:
        manualSlide('.home-hazards',2);
        
        */
                                
        // get values from data
        slideDataArr = $(sliderBox).data('boxdata');
        sliderEle = slideDataArr['dsliderEle'];
        shown = slideDataArr['dshown'];
        navdots = slideDataArr['dnavdots'];
        // update nav dots 
        if (navdots) {
            resetNavDots(sliderBox);
            selDot = ($(sliderBox + ' .nav-dots a').get((slideTo-1)));
            $(selDot).addClass('dot-sel');
        }
        // move slide
        sliderDistance = parseFloat($(sliderBox + ' .slider-wrap').css('width'));
        sliderTotal = Math.round(($(sliderBox + ' ' + sliderEle).length) / shown);
        sliderNewPos = 0 - (sliderDistance * (slideTo-1));
        $(sliderBox + ' .slider-wrap-in').css('marginLeft',sliderNewPos+'px');
        // update slide arrows
        $(sliderBox + ' .slide-l').removeClass('slide-grey');
        $(sliderBox + ' .slide-r').removeClass('slide-grey');
        if (sliderNewPos == 0) {
            $(sliderBox + ' .slide-l').addClass('slide-grey');
        }
        if (sliderNewPos == (0 - (sliderDistance * (sliderTotal - 1)))) {
            $(sliderBox + ' .slide-r').addClass('slide-grey');
        }
    }
    
    // Loads sidebar calendar
    function refreshCal(file,m,y) {
        
        // load json data
        $.getJSON(file, function(data) {
            
            // build popularity array
            $.each(data, function(i, entry) {
                dayPops[(new Date(entry.dte)).asString()] = entry.pop;
            });
            
            // get any category parameter
            curCat = 'cat_id';
            curCat = curCat.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");            
  			var regexS = "[\\?&]"+curCat+"=([^&#]*)";
  			var regex = new RegExp( regexS );
  			var results = regex.exec( window.location.href );
  			
  			if (results) {
  				curCat = 'cat_id='+results[1]+'&';
  			} else {
  				curCat = '';
			}
            
            // build header
            prevY = (parseInt(selY) - 1);
            prevYFull = $(document.createElement('span')).text(prevY);
            if (parseInt(prevY) < parseInt(firstY)) {
                prevYArr = $(document.createElement('span')).text('Go Back').addClass('arr-l').addClass('arr-inactive');
            } else {
            	var lastChar = pageUrl.substring(pageUrl.length-1);
            	if (lastChar == '/') {
            		pageUrl = pageUrl + 'index.php';
            	}
                prevYArr = $(document.createElement('a')).attr('href',pageUrl + '?'+curCat+'m=0&y=' + prevY).text('Go Back').addClass('arr-l').addClass('cal-arr');
            }
            selYFull = $(document.createElement('span')).text(selY).addClass('y-sel');
            nextY = (parseInt(selY) + 1);
            nextYFull = $(document.createElement('span')).text(nextY);
            if (parseInt(nextY) > parseInt(realY)) {
                nextYArr = $(document.createElement('span')).text('Go Forward').addClass('arr-r').addClass('arr-inactive');
            } else {
                nextYArr = $(document.createElement('a')).attr('href',pageUrl + '?'+curCat+'m=0&y=' + nextY).text('Go Forward').addClass('arr-r').addClass('cal-arr');
            }
            
            // render header
            $('.side-cal-wrap .cal-year').empty();
            $('.side-cal-wrap .cal-year').append(prevYArr);
            $('.side-cal-wrap .cal-year').append($(document.createElement('div')).addClass('cal-year-mid'));
            $('.cal-year-mid').append(prevYFull);
            $('.cal-year-mid').append(selYFull);
            $('.cal-year-mid').append(nextYFull);
            $('.side-cal-wrap .cal-year').append(nextYArr);
            
            // render calendar
            $('.cal-box').empty();
            $('.cal-box').renderCalendar({month:m, year:y});
            
        });
	}