
$(document).ready(function() {

	gameModule.initializeAudio();

	$('.button-strict').on('click', function() {
		$(this).toggleClass('stricton');
		gameModule.toggleStrict();
	});

	$('.svgbase').on('mousedown', function(e) {
		e.preventDefault();
		var buttonId = parseInt(this.id[7]);
		gameModule.buttonAction(buttonId);
	});

});



var gameModule = (function () {
 
	// array of audio for button presses
	var btnAudio = [];

	var strictOn = false;
	var acceptingUser = false;

	return {
	 	
	 	// add audio elements to document and array
	    initializeAudio: function() {
		    for (var i = 0; i < 4; i++) {
		    	var aud = document.createElement('audio');
		    	aud.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound'+(i+1)+'.mp3');
		    	btnAudio.push(aud);
		    }
	    },
	    
	    // light up button and play audio
	    buttonAction: function(id) {
		    $('#button-'+id).toggleClass('clicked');
		    btnAudio[id].play();
		    setTimeout(function() {
		    	$('#button-'+id).toggleClass('clicked');}, 300);
	    },

	    // turn strict mode on or off
	    toggleStrict: function() {
	    	strictOn = !strictOn;
	    }
	};
})();