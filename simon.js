
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
	var winNumber = 20;

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
	}

	// plays a list of buttons
	function lightSequence(lightList) {
		acceptingUser = false;
		var currSteps = 0;
		var steps = lightList.length;

		function step() {
			if (currSteps == steps) {
				// the full list has completed
				acceptingUser = true;
			} else {
				// there's still more buttons to play
				buttonAction(lightList[currSteps], true);
				setTimeout(step, 450);
			}
			currSteps++;
		}

		setTimeout(step, 450);
	}

	// light up button and play audio
    function buttonAction(id, sound) {
	    $('#button-'+id).toggleClass('clicked');

	    if (sound) btnAudio[id].play();
	    else btnAudio[4].play();

	    setTimeout(function() {
	    	btnAudio[id].pause();
	    	btnAudio[id].currentTime = 0;
	    	btnAudio[4].pause();
	    	btnAudio[4].currentTime = 0;
	    	$('#button-'+id).toggleClass('clicked');
	    }, 400);
    }

	// win animation
	function winAnimation() {
		acceptingUser = false;
		var currSteps = 0;
		var steps = 20;
		var speed = 150;

		btnAudio[5].play();

		function step() {
			if (currSteps == steps) {
				gameModule.newGame();
			} else {
				var id = currSteps % 4;
				$('#button-'+id).addClass('clicked');
				setTimeout(function() {
					$('#button-'+id).removeClass('clicked');
					step();
				}, speed);
			}
			currSteps++;
		}

		setTimeout(step, speed);
	}

	return {
	 	// add audio elements to document and array
	    initializeAudio: function() {
		    for (var i = 0; i < 4; i++) {
		    	var aud = document.createElement('audio');
		    	aud.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound'+(i+1)+'.mp3');
		    	btnAudio.push(aud);
		    }
		    var error = document.createElement('audio');
		    error.setAttribute('src', 'http://soundbible.com/mp3/Fuzzy Beep-SoundBible.com-1580329899.mp3');
		    btnAudio.push(error);
		    var win = document.createElement('audio');
		    win.setAttribute('src', 'http://soundbible.com/mp3/Ta Da-SoundBible.com-1884170640.mp3');
		    btnAudio.push(win);
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
	    		buttonAction(id, true);
	    		console.log("yes, correct");
	    		if (currMove == moveList.length-1) {
	    			if (moveList.length == winNumber) {
	    				console.log("Great job! You win!");
	    				winAnimation();
	    			} else {
		    			console.log("sequence complete! here's the next move");
		    			currMove = 0;
		    			setTimeout(function() {
		    				pickNext();
		    			}, 800);
		    		}
	    		} else {
	    			console.log("next move please");
	    			currMove++;
	    		}
	    	} else {
	    		buttonAction(id, false);
	    		if (strictOn) {
		    		console.log("wrong, new game starting...");
		    		setTimeout(function() {
		    			gameModule.newGame();
		    		}, 1400);
		    	} else {
		    		console.log("wrong, watch closely");
		    		currMove = 0;
		    		setTimeout(function() {
		    			lightSequence(moveList);
		    		}, 300);
		    	}
	    	}
	    }

	};
})();