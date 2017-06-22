DEPTH = 8;

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
		
		input = -10;

		while(input < low || input > high){
		
			input = prompt("Please enter a number");
	    }
console.log(input);

	    return input;
	}
		
	this.play = function (depth) {
	    // Main game play loop
		gameboard = new Board(4);
		gameboard = gameboard.Board(4);
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
	    	
	    	while(gameon){
	    		
	    		if(player == MAX){
	    			
	    			console.log("My turn... hmm...");
	    			val = this.minimax(gameboard, depth, player);
	    			pchoice = val[1];
	    			
	    			if(pchoice < 0 || pchoice > 5){   //... just in case.
	    				pchoice = 0;
	    				while(gameboard.getPot(player, pchoice) < 1){
	    					pchoice++;
	    				}
	    			}
	    			
	    			console.log("I choose " +pchoice);
	    			gameboard = gameboard.move(player, pchoice);
	    			gameboard.show();
	    			if(gameboard.freeTurn()){
	    				console.log("Freeturn! I go again.");
	    			}
	    			else{
	    				player = MIN;
	    			}
	    		}
	    		
	    		else{
	    			console.log("Your turn... move (0-5)?");
	    			
	    			pchoice = this.getInput(0,5);
	    			while(gameboard.getPot(player, pchoice) < 1){
	    					console.log("Invalid choice: That pot is empty.  Please choose another one.");
	    					pchoice = this.getInput(0,5);
	    			}
	    			
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

		console.log("Using Depth Bound " + depth);

		game = new Mancala();
		game.play(depth);
	}


var go = main();
