
$(document).ready(function() {

	gameModule.initializeAudio();

	$('.button-strict').on('click', function() {
		$(this).toggleClass('stricton');
		gameModule.toggleStrict();
	});

	$('.svgbase').on('mousedown', function(e) {
		e.preventDefault();
		if (gameModule.acceptingUser()) {
			var buttonId = parseInt(this.id[7]);
			gameModule.buttonAction(buttonId);
			gameModule.checkUser(buttonId);
		}
	});

	$('#button-start').on('click', function() {
		gameModule.newGame();
	});

});



var gameModule = (function () {
 
	// array of audio for button presses
	var btnAudio = [];

	var strictOn = false;
	var acceptingUser = false;
	var moveList;
	var currMove;

	// picks next button and shows user
	function pickNext() {
		acceptingUser = false;
		var pick = Math.floor(Math.random() * (4));
		moveList.push(pick);
		var count = "";
		if (moveList.length > 9) count += moveList.length;
		else count += '0' + moveList.length;
		$('#counter').html(count);
		console.log(moveList);

		lightSequence(moveList);

		acceptingUser = true;
	}

	// plays a list of buttons
	function lightSequence(lightList) {
		var currSteps = 0;
		var steps = lightList.length;

		function step() {
			// the full list has completed
			if (currSteps == steps) {
				console.log("completed sequence");
			} else {
				gameModule.buttonAction(lightList[currSteps]);
				setTimeout(step, 450);
			}
			currSteps++;
		}

		setTimeout(step, 450);
	}

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
		    	btnAudio[id].pause();
		    	btnAudio[id].currentTime = 0;
		    	$('#button-'+id).toggleClass('clicked');
		    }, 400);
	    },

	    // turn strict mode on or off
	    toggleStrict: function() {
	    	strictOn = !strictOn;
	    },

	    // returns whether user is allowed to press buttons right now
	    acceptingUser: function() {
	    	return acceptingUser;
	    },

	    // sets up new game
	    newGame: function() {
	    	moveList = [];
	    	pickNext();
	    	currMove = 0;
	    },

	    // checks user input for correctness
	    checkUser: function(id) {
	    	if (id == moveList[currMove]) {
	    		console.log("yes, correct");
	    		if (currMove == moveList.length-1) {
	    			console.log("sequence complete! here's the next move");
	    			currMove = 0;
	    			setTimeout(function() {
	    				pickNext();
	    			}, 800);
	    		} else {
	    			console.log("next move please");
	    			currMove++;
	    		}
	    	} else {
	    		console.log("wrong, new game starting...");
	    		setTimeout(function() {
	    			gameModule.newGame();
	    		}, 1400);
	    	}
	    }

	};
})();