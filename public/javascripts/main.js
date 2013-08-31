
/* ----------------------------------------------------------------------------------------- 
____________________________________________________________________

Author - Mustafa Quilon / http://mustafaquilon.com
____________________________________________________________________

----------------------------------------------------------------------------------------- */

// when the DOM is ready...(initialization)

// ------ You can make all your customizations here. ---------- \\

jQuery(function(){
	
// ------ This function is used to open links in external window/tab without relying on the deprecated target attribute. So, whenever you want to open links in a new window. just add class="external"
	jQuery("a.external").click(function() {
		return !window.open(jQuery(this).attr("href"));
	});
	
// ------ The settings for scrolling using the localScroll/scrollTo plugin 
	
	/*
	* Robert Penner's Easing Equation http://www.robertpenner.com/easing/
	* You can use any easing function(for the slide effect) from http://gsgd.co.uk/sandbox/jquery/easing/ (Hint: view source)
	*/
	jQuery.easing.easeOutExpo = function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	};
	
	// ------ This function selects the current nav and adds a class of "selected"
    function selectNav() {
        jQuery(this)
            .parents('#navMain:first')
                .find('a')
                    .removeClass('selected')
                .end()
            .end()
            .addClass('selected');
    }

    jQuery('#navMain').find('a').click(selectNav);
    // go find the navigation link that has this target and select the nav
    function trigger(data) {
        var el = jQuery('#navMain').find('a[href$="' + data.id + '"]').get(0);
        selectNav.call(el);
    }
    if (window.location.hash) {
        trigger({ id : window.location.hash.substr(1) });
    } else {
        jQuery('#navMain a:first').click();
    }
	
	// ------ The final configuration 
	jQuery.localScroll.defaults.axis = 'y';
	jQuery.localScroll({
		queue:true,
		duration:1000,
		hash: false,
		easing: 'easeOutExpo',
		onAfter: trigger
	});
	
	// ------ Configuration for the Top link. 
	jQuery('.top').click(function(){
	jQuery.scrollTo( 'body', 'normal' );
	});

	
// ------ The settings for tooltip using the qtip plugin
	jQuery.fn.qtip.styles.custom = { // Last part is the name of the style
	width: 'auto',
	background: '#eee',
	color: '#555',
	textAlign: 'center',
	border: {
		width: 1,
		radius: 0,
		color: '#ccc'
	},
	tip: true
	}

	//settings for the avatar tootlip
	jQuery('a.top[title]').qtip({
	style: 'custom',
	prerender: true,
	position: {
	  corner: {
		 target: 'leftMiddle',
		 tooltip: 'rightMiddle'
	  }
	}
	});
	//settings for general tooltips
	jQuery('abbr[title], .tooltip').qtip({
	style: 'custom',
	prerender: true,
	position: {
	  corner: {
		 target: 'topMiddle',
		 tooltip: 'bottomMiddle'
	  }
	}
	});
	
//Gallery Set-Up (for more customiztion options visit http://www.no-margin-for-errors.com/projects/prettyPhoto-jquery-lightbox-clone/)
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
				animationSpeed: 'normal', /* fast/slow/normal */
				padding: 40, /* padding for each side of the picture */
				opacity: 0.5, /* Value betwee 0 and 1 */
				showTitle: false, /* true/false */
				allowresize: true, /* true/false */
				theme: 'dark_square' /* light_rounded / dark_rounded / light_square / dark_square */
			});

// ------ Contact Form Validation
	jQuery("form.contact").submit(function(){
		var str = jQuery("form.contact").serialize();

						   jQuery.ajax({
						   type: "POST",
						   url: "contact.php",
						   data: str,
						   success: function(msg){
		jQuery("#note").ajaxComplete(function(event, request, settings){
		jQuery("#note").show();
		if(msg == 'OK') // Message Sent? Show the 'Thank You' message and hide the form
		{
		result = '<span class="notification_ok">Your message has been sent. Thank you!</span>';
		jQuery(".contact").hide();
		}
		else
		{
			result = msg;	
			
		}

		jQuery(this).html(result);

		});

		}
		});
		return false;
	});
	jQuery('a').click(function () {
		var thisel = $(this);
		try
		{
			_gaq.push(['_trackEvent', thisel.parents().andSelf().filter('[id!=""]:first').get(0).id, 'clicked', (thisel.text() || thisel.children('img:first').attr('alt'))]);
		}
		catch (err) {}
	});

});
