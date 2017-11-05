DEPTH = 3;
var gameboard;
var game;
PLAYER = MIN;

myObject= function (imagePath, label) {
    this.label = ko.observable(label);
    this.imagePath = ko.observable("static/images/empty_pot.jpg");   
};

potSelected = function(player, pot) {

		if(player != PLAYER){
			alert("NOT YOUR TURN!");
		}
		else{

			console.log("!!   "+player+" "+pot);
			gameboard.show();
			stones = gameboard.getPot(player, pot);
			if(stones > 0){
				console.log("POT! #"+pot);
				gameboard = gameboard.move(player, pot);
			
				gameboard.show();
				renderMove(player, pot, stones);

				if(gameboard.freeTurn()){
					if(player == MAX){
						alert("The AI landed in an empty pot; it gets a free turn");

						setTimeout(aiPlay, 1000);
					}
					else{
						alert("freeTurn! Go again.");
					}
				}

				else{
					PLAYER = (PLAYER==MIN)?MAX:MIN; // switch active player
			
					if(PLAYER == MAX)
						setTimeout(aiPlay, 1000);
				}

			}
		}
}

aiPlay = function (){

	pchoice = minimax(gameboard, DEPTH, MAX)[1];
	
	console.log(Number.MAX_SAFE_INTEGER + "max");
	potSelected(MAX, pchoice);	
}

renderMove = function(player, pot, stones){

	side = player;
	currentpot = pot;
	if(player == MAX){

		$('#ai'+currentpot).children().attr('src', 'static/images/pots/0.jpg');

		if(gameboard.maxpots[currentpot] <= 30)
			$('#ai'+currentpot).children().attr('src','static/images/pots/' + gameboard.maxpots[currentpot] + '.jpg');
		else
			$('#ai'+currentpot).children().attr('src','static/images/numbers/' + gameboard.maxpots[currentpot] + '.jpg');

		$('#ain'+currentpot).children().attr('src','static/images/numbers/' + gameboard.maxpots[currentpot] + '.jpg');


		while(stones-- > 0){

			var duration = 1000;
			$({to:0}).animate({to:1}, duration, function() {
			  // do stuff after `duration` elapsed
			  console.log("delayedStuff");
			  $("#messageTimer").html("Happy New Year ! (working version)")
			})
			currentpot++;

			if(currentpot < 6){
				if(side == MAX){
					if(gameboard.maxpots[currentpot] <= 30)
						$('#ai'+currentpot).children().attr('src','static/images/pots/' + gameboard.maxpots[currentpot] + '.jpg');
					else
						$('#ai'+currentpot).children().attr('src','static/images/numbers/' + gameboard.maxpots[currentpot] + '.jpg');

				}
				else{
					if(gameboard.maxpots[currentpot] <= 30)
						$('#p'+currentpot).children().attr('src','static/images/pots/' + gameboard.minpots[currentpot] + '.jpg');
					else
						$('#p'+currentpot).children().attr('src','static/images/numbers/' + gameboard.minpots[currentpot] + '.jpg');

				}
			}
			else{  //we've reached an endpot
				if(side == MAX){
					$('#aiendpotn').children().attr('src', 'static/images/numbers/' + gameboard.maxkalah + '.jpg');
	
					if(gameboard.maxkalah <= 30)
						$('.aiendpot').children().attr('src', 'static/images/pots/' + gameboard.maxkalah + '.jpg');
					else
						$('.aiendpot').children().attr('src', 'static/images/numbers/' + 30 + '.jpg');
				}
				else{
					if(gameboard.minkalah <= 30)
						$('.playerendpot').children().attr('src', 'static/images/pots/' + gameboard.minkalah + '.jpg');
					else
						$('.playerendpot').children().attr('src', 'static/images/numbers/' + gameboard.minkalah + '.jpg');
				
					$('#playerendpotn').children().attr('src', 'static/images/numbers/' + gameboard.minkalah + '.jpg');
				}
				
				currentpot = 0;
				side = player==MAX?MIN:MAX;
			}
		}

	}
	else{

		$('#p'+currentpot).children().attr('src', 'static/images/pots/0.jpg');  //empty the selected pot

		while(stones-- > 0){

			var duration = 5000;
$({to:0}).animate({to:1}, duration, function() {
  // do stuff after `duration` elapsed
  console.log("delayedStuff MIN");
  $("#messageTimer").html("Happy New Year ! (working version)")
})

			currentpot++;

			if(currentpot < 6){
				if(side == MAX){
					if(gameboard.maxpots[currentpot] <= 30)
						$('#ai'+currentpot).children().attr('src','static/images/pots/' + gameboard.maxpots[currentpot] + '.jpg');
					else
						$('#ai'+currentpot).children().attr('src','static/images/numbers/' + gameboard.maxpots[currentpot] + '.jpg');

					$('#ain'+currentpot).children().attr('src','static/images/numbers/' + gameboard.maxpots[currentpot] + '.jpg');
				}
				else{
					if(gameboard.maxpots[currentpot] <= 30)
						$('#p'+currentpot).children().attr('src','static/images/pots/' + gameboard.minpots[currentpot] + '.jpg');
					else
						$('#p'+currentpot).children().attr('src','static/images/numbers/' + gameboard.minpots[currentpot] + '.jpg');

				}
			}
			else{  //we've reached an endpot
				if(side == MAX){
					$('#aiendpotn').children().attr('src', 'static/images/numbers/' + gameboard.maxkalah + '.jpg');
	
					if(gameboard.maxkalah <= 30)
						$('.aiendpot').children().attr('src', 'static/images/pots/' + gameboard.maxkalah + '.jpg');
					else
						$('.aiendpot').children().attr('src', 'static/images/numbers/' + 30 + '.jpg');
				}
				else{
					if(gameboard.minkalah <= 30)
						$('.playerendpot').children().attr('src', 'static/images/pots/' + gameboard.minkalah + '.jpg');
					else
						$('.playerendpot').children().attr('src', 'static/images/numbers/' + gameboard.minkalah + '.jpg');
				
					$('#playerendpotn').children().attr('src', 'static/images/numbers/' + gameboard.minkalah + '.jpg');
				}

				currentpot = 0;
				side = player==MAX?MIN:MAX;
			}
		}

		if(gameboard.LandedInEmptyParallelPot()){
			if(side == MAX){
				if(PLAYER == MAX){
					$('#p' + (5 - currentpot)).children().attr('src', 'static/images/pots/0.jpg');
					$('#pn' + (5 - currentpot)).children().attr('src', 'static/images/numbers/0.jpg');
				}
			}
			else{
				if(PLAYER == MIN){
					$('#ai' + (5 - currentpot)).children().attr('src', 'static/images/pots/0.jpg');
					$('#ain' + (5 - currentpot)).children().attr('src', 'static/images/numbers/0.jpg');
				}
			}
		}

	}
}

renderBoard = function(){


	$('#aiendpotn').children().attr('src', 'static/images/numbers/' + gameboard.maxkalah + '.jpg');
	
	if(gameboard.maxkalah <= 30)
		$('.aiendpot').children().attr('src', 'static/images/pots/' + gameboard.maxkalah + '.jpg');
	else
		$('.aiendpot').children().attr('src', 'static/images/numbers/' + 30 + '.jpg');

	if(gameboard.minkalah <= 30)
		$('.playerendpot').children().attr('src', 'static/images/pots/' + gameboard.minkalah + '.jpg');
	else
		$('.playerendpot').children().attr('src', 'static/images/numbers/' + gameboard.minkalah + '.jpg');

	$('#playerendpotn').children().attr('src', 'static/images/numbers/' + gameboard.minkalah + '.jpg');

	for(var x = 0; x < 6; x++){  // set proper marble count in images.  If there are more than 30 marbles in a pot, use numbers instead.


		$('#ain'+x).children().attr('src','static/images/numbers/' + gameboard.maxpots[x] + '.jpg');

		if(gameboard.maxpots[x] <= 30)
			$('#ai'+x).children().attr('src','static/images/pots/' + gameboard.maxpots[x] + '.jpg');
		else
			$('#ai'+x).children().attr('src','static/images/numbers/' + gameboard.maxpots[x] + '.jpg');

		$('#ain'+x).children().attr('src','static/images/numbers/' + gameboard.maxpots[x] + '.jpg');
		
		if(gameboard.minpots[x] <= 30)
			$('#p'+x).children().attr('src','static/images/pots/' + gameboard.minpots[x] + '.jpg');
		else
			$('#p'+x).children().attr('src','static/images/numbers/' + gameboard.minpots[x] + '.jpg');

		$('#pn'+x).children().attr('src','static/images/numbers/' + gameboard.minpots[x] + '.jpg');

	}
}


handleDoc = function () {
console.log('handle');

// click bindings for each pot
	
	//aipots
	$('.aipots').on('click', '#ai0', function(evt){
		potSelected(MAX, 0);
	});
	$('.aipots').on('click', '#ai1', function(evt){
		potSelected(MAX, 1);
	});
	$('.aipots').on('click', '#ai2', function(evt){
		potSelected(MAX, 2);
	});
	$('.aipots').on('click', '#ai3', function(evt){
		potSelected(MAX, 3);
	});
	$('.aipots').on('click', '#ai4', function(evt){
		potSelected(MAX, 4);
	});
	$('.aipots').on('click', '#ai5', function(evt){
		potSelected(MAX, 5);
	});

	//player pots
	$('.playerpots').on('click', '#p0', function(evt){
		potSelected(MIN, 0);
	});
	$('.playerpots').on('click', '#p1', function(evt){
		potSelected(MIN, 1);
	});
	$('.playerpots').on('click', '#p2', function(evt){
		potSelected(MIN, 2);
	});
	$('.playerpots').on('click', '#p3', function(evt){
		potSelected(MIN, 3);
	});
	$('.playerpots').on('click', '#p4', function(evt){
		potSelected(MIN, 4);
	});
	$('.playerpots').on('click', '#p5', function(evt){
		potSelected(MIN, 5);
	});

}

wait = function(){
	var blah = "waiting";
}

minimax = function (startboard, depth, player) {
	    //	Performs the minimax procedure by initializing alpha and beta and calling
	    //  minimax(startboard, depth, player, alpha, beta)

	    return minimax(startboard.Board(startboard), depth, player, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

    minimax = function (startboard, depth, player, alpha, beta) {
	    //  Performs the minimax procedure with cutoff values alpha and beta
	    
	    val = [0,0];
	    if(startboard.isWin()){
	    	    if(startboard.eval() > 0){  //MAX win
	    	    	    val[0] = Number.MAX_SAFE_INTEGER;
	    	    	    return val;
	    	    }
	    	    else{			//MIN win
	    	    	    val[0] = Number.MIN_SAFE_INTEGER;
	    	    	    return val;
	    	    }
	    }
	    
	    if(depth == 0){ // || succ is empty?
	    	
	    	    val[0] = startboard.eval();
	    	    return val;
	    }
	    
	    best = -1;
	    
	    if(player == MAX){
	    	    
	    	    succ = startboard.getSucc(player);
	    	    for(var x = 0; x < 6; x++){ 	    
	    	    	    if(succ[x] != null){
	    	    	    	    if(succ[x].freeTurn()){
	    	    	    	    	    
	    	    	    	    }
	    	    	    	    
	    	    	    	    val = minimax(succ[x], depth-1, MIN, alpha, beta);
	    	    	    	    
	    	    	    	    
	    	    	    	    if(alpha < val[0] || !Number.isSafeInteger(alpha)){

	    	    	    	    	    alpha = val[0];
	    	    	    	    	    best = x;
	    	    	    	    }
	    	    	    	    
	    	    	    	    if(alpha >= beta){
	    	    	    	    	    /* 	    	    	    
	    	    	    	    	    Integer temp[2] = new Integer[2];                                            
	    	    	    	    	    temp[0] = Integer.valueOf(alpha);
	    	    	    	    	    temp[1] = Integer.valueOf(beta);*/
	    	    	    	    	    val[0] = alpha;
	    	    	    	    	    val[1] = best;
	    	    	    	    	    return val;
	    	    	    	    }
	    	    	    }
	    	    }
	    	    
	    	    val[0] = alpha;
	    	    val[1] = best;
	    	    return val;
	    	    	    	    
	    	    	    
	    }
	    	    
	    
	    else{
	    	    succ = startboard.getSucc(player);
	    	    for(var x = 0; x < 6; x++){ 	    
	    	    	    if(succ[x] != null){
	    	    	    	    val = minimax(succ[x], depth-1, MAX, alpha, beta);
	    	    	    	    
	    	    	    	    
	    	    	    	    if(beta > val[0] || !Number.isSafeInteger(beta)){
	    	    	    	    	    
	    	    	    	    	    beta = val[0];
	    	    	    	    	    best = x;


	    	    	    	    }

	    	    	    	    if(beta <= alpha){

	    	    	    	    	    /* 	    	    	    
	    	    	    	    	    Integer temp[2] = new Integer[2];
	    	    	    	    	    temp[0] = Integer.valueOf(alpha);
	    	    	    	    	    temp[1] = Integer.valueOf(beta);*/
	    	    	    	    	    val[0] = beta;
	    	    	    	    	    val[1] = best;
	    	    	    	    	    return val;
	    	    	    	    }
	    	    	    }
	    	    }
	    	    
	    	    val[0] = beta;
	    	    val[1] = best;
	    	    return val; 
	    	    	    	    
	    }    
}


main = function () {

		var depth = DEPTH;
		handleDoc()
		console.log("Using Depth Bound " + depth);
		gameboard = new Board();
		gameboard.Board(5);
		gameon = true;

	}


var go = main;

$(document).ready(main);
