DEPTH = 8;
var gameboard;
PLAYER = MIN;

myObject= function (imagePath, label) {
    this.label = ko.observable(label);
    this.imagePath = ko.observable("static/images/empty_pot.jpg");   
};1

potSelected = function(player, pot) {

		if(player != PLAYER){
			alert("NOT YOUR TURN!");
		}
		else{

			console.log("!!   "+player+" "+pot);
			gameboard.show();
			if(gameboard.getPot(player, pot) > 0){
				console.log("POT! #"+pot);
				gameboard = gameboard.move(player, pot);
				gameboard.show();
			
				renderBoard();

				if(gameboard.freeTurn()){
					alert("freeTurn! Go again.")
				}

				else
					PLAYER = PLAYER==MIN?MAX:MIN; // switch active player
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
		console.log('static/images/pots/' + gameboard.minpots[x])

	$('#ain'+x).children().attr('src','static/images/numbers/' + gameboard.minpots[x] + '.jpg');

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

Mancala = function() {
	
	
        this.minimax = function (startboard, depth, player) {
	    //	Performs the minimax procedure by initializing alpha and beta and calling
	    //  minimax(startboard, depth, player, alpha, beta)

	    return minimax(startboard, depth, player, Integer.MIN_VALUE, Integer.MAX_VALUE);
	}

        this.minimax = function (startboard, depth, player, alpha, beta) {
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
	    	    	    	    
	    	    	    	    val = this.minimax(succ[x], depth-1, MIN, alpha, beta);
	    	    	    	    
	    	    	    	    
	    	    	    	    if(alpha < val[0]){
	    	    	    	    	    
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
	    	    	    	    
	    	    	    	    val = this.minimax(succ[x], depth-1, MIN, alpha, beta);
	    	    	    	    
	    	    	    	    
	    	    	    	    if(beta > val[0]){
	    	    	    	    	    
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


	this.getInput = function (low, high){
		
		input = 0;

/*		while(input < low || input > high){
			console.log("Please enter a number between " + low + " and " + high);
			input = readline();
	    }
		console.log(input);
*/
	    return input;
	}
	

	this.play = function (depth) {
	    // Main game play loop
//		gameboard = new Board();
//		gameboard.Board(6);
		gameon = true;
		player = null;
		
	    	console.log("\nWho goes first (0) me; (1) you ?");
	    	input = "";	
  	
	    	if(this.getInput(0,1) == 0){
	    		console.log("OK, I go first");
	    		player = MAX;
	    	}
	    	else{
	    		console.log("Ok, you go first");
	    		player = MIN;
	    	}
	    	
	    	console.log("Initial Board");
	    	gameboard.show();
	    	pchoice = -1;
	    	val = [0,0];
	    	
	    	var count = 0;
	    	while(gameon){
	    		
	    		if(count++ > 40)
	    			break;

	    		if(player == MAX){
	    			
	    			console.log("My turn... hmm...");
	    			val = this.minimax(gameboard, depth, player);
	    			pchoice = val[1];
	    			setTimeout(potSelected(player, pchoice), 1000);
	    			
/*	    			if(pchoice < 0 || pchoice > 5){   //... just in case.
	    				pchoice = 0;
	    				while(gameboard.getPot(player, pchoice) < 1){
	    					pchoice++;
	    				}
	    			}
	    			
	    			console.log("I choose " +pchoice);
	    			gameboard = gameboard.move(player, pchoice);
	    			gameboard.show();
	    			if(gameboard.freeTurn()){
	    				alert("Freeturn! I go again.");
	    			}
	    			else{
	    				player = MIN;
	    			}*/
	    		}
	    		
	    		else{

	    			console.log("Your turn... move (0-5)?");
	    			
	    			
	    			gameboard = gameboard.move(player, pchoice);
	    			gameboard.show();
	    			
	    			if(gameboard.freeTurn()){
	    				console.log("Freeturn! You go again.");
	    			}
	    			else{
	    				player = MAX;
	    			}
	    		}
	    		
	    		if(gameboard.isWin()){
	    		
	    			gameon = false;
	    			
	    			if(gameboard.eval() > 0){
	    				console.log("I Won!");
	    				console.log("...better luck next time.");
	    			}
	    			else{
	    				console.log("You won!");
	    				console.log("I may need to see if my creator can think up a better heuristic...");
	    			}
	    		}
	    	}

	    	}

}
main = function () {

		var depth = DEPTH;
		handleDoc()
		console.log("Using Depth Bound " + depth);
		gameboard = new Board();
		gameboard.Board(5);
		gameon = true;
		game = new Mancala();
		//game.play(depth);
	}


var go = main();

$(document).ready(main);
