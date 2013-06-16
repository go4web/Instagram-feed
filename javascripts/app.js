var allHashtags = $('.hashtag');
var	insta_container = $("#instagram");
var insta_button = $('button');
var insta_clientId = "e290dfb1d760466b84cffc2e61c921c5";
var insta_textButtonError ="Der er ikke flere billeder med #";
var insta_next_url;

$(document).ready(function(){	

	$('.hashtag').on("click", function(e){
		e.preventDefault();

		var $this = $(this);

		allHashtags.removeClass("active");
		$this.toggleClass('active');
		insta_button.text('Hent flere');
		insta_button.fadeOut();
		insta_container.fadeOut(function(){
				insta_container.empty();
				getInstagramFeed($this.data('hashtag'), 20);
			}
		);

	});

});


function getInstagramFeed (hashtag, show) {

	insta_container.instagram({
	  hash: hashtag
	, clientId : insta_clientId
	, show : show
	, image_size : 'low_resolution'
	, onComplete : function (photos, data) {
	  		
			insta_container.fadeIn();
			insta_button.fadeIn();
	  		insta_next_url = data.pagination.next_url;

			$("a[rel^='prettyPhoto']").prettyPhoto({
				animationSpeed: 0,
				slideshow: false, 
				overlay_gallery: false,
				social_tools: false,
				deeplinking: false, 
				changepicturecallback: function(){
					/*	FB.Canvas.getPageInfo(
						function(info) {
							$(".pp_pic_holder").hide().css('top', Math.max(parseInt(info.scrollTop) - parseInt(info.offsetTop), 0) + 80).show();
						}
					);*/
				}
			});

			if (insta_next_url == null) {
				insta_button.text(insta_textButtonError + hashtag);
			}
			
		}
	})

	$(insta_button).on('click', function(){
	
		var text = insta_button.text();
		
		if (insta_next_url != null) {
		
			if (text != 'Henter…'){
				insta_button.text('Henter…')
				insta_container.instagram({
					  next_url : insta_next_url
					, show : show
					, image_size : 'low_resolution'
					, onComplete : function(photos, data) {
						insta_next_url = data.pagination.next_url
						insta_button.text(text)
						$("a[rel^='prettyPhoto']").prettyPhoto({
							slideshow: false, 
							social_tools: false
							}
						);
					}
			  	})
			} 
		}

		
			      
	}) 

}

   
    
/*

window.fbAsyncInit = function() {
	FB.init({
		appId: '455142574547058',
		status: true,
		cookie: true,
		xfbml: true
	});
 
	//this resizes the the i-frame
	//on an interval of 100ms
	// FB.Canvas.setAutoResize(100);
	//	FB.Canvas.setSize({ width: 810, height: 650 });

};
(function() {
	var e = document.createElement('script');
	e.async = true;
	e.src = document.location.protocol +
	 '//connect.facebook.net/en_US/all.js';
	document.getElementById('fb-root').appendChild(e);  
}());


window.onload = function() {
	FB.Canvas.setAutoGrow(100); //Run the timer every 100 milliseconds, you can increase this if you want to save CPU cycles
}

*/

