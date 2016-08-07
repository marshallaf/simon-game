

$(document).ready(function() {

	gameModule.initializeAudio();

	$('.button-strict').on('click', function() {
		$(this).toggleClass('stricton');
	});

	$('.svgbase').on('mousedown', function(e) {
		e.preventDefault();
		var buttonId = parseInt(this.id[7]);
		gameModule.buttonAction(buttonId);
	}).on('mouseup', function() {
		$(this).toggleClass('clicked');
	});

});



var gameModule = (function () {
 
	// array of audio for button presses
	var btnAudio = [];

	return {
	 	
	 	// add audio elements to document and array
	    initializeAudio: function() {
		    for (var i = 0; i < 4; i++) {
		    	var aud = document.createElement('audio');
		    	aud.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound'+(i+1)+'.mp3');
		    	btnAudio.push(aud);
		    }
	    },
	 
	    buttonAction: function(id) {
		    $('#button-'+id).toggleClass('clicked');
		    btnAudio[id].play();
	    }
	};
})();