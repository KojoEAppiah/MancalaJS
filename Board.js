MAX = 1;
MIN = 0;

Board = function () {


	Board = function() {
	    // Constructs a board with n stones per pot

		this.maxkalah = 0;
		this.minkalah = 0;

		this.maxpots = [0,0,0,0,0];
		this.minpots = [0,0,0,0,0];
		
		this.succ = [];
		
		this.freeturn = false;
		

	}

	Board = function(n) {
	    // Constructs a board with n stones per pot

		this.maxkalah = 0;
		this.minkalah = 0;

		this.maxpots = [0,0,0,0,0];
		this.minpots = [0,0,0,0,0];
		
		this.succ = [];
		
		this.freeturn = false;
		
		for(var x = 0; x < 6; x++){

			this.maxpots[x] = n;
			this.minpots[x] = n;

		}	
	}

    this.getSucc = function(player){
    		
    	if(player == MAX){
    			
    		for(var x = 0; x < 6; x++){
    				
    			if(this.maxpots[x] > 0){
    				this.succ[x] = this.move(player, x);
    			}
    		}
    	}
    		
    	else{	
    		for(var x = 0; x < 6; x++){
    			if(this.minpots[x] > 0){
    				this.succ[x] = this.move(player, x);
    			}
    		}
   		}
    			
   		return this.succ;	
    }

    this.copyBoard = function(cboard) {

    	newboard = new Board();
    	console.log(cboard.maxpots[1])
    	newboard.minkalah = cboard.minkalah;
    	newboard.maxkalah = cboard.maxkalah;

    	for(var x = 0; x < 6; x++){
    		newboard.minpots[x] = cboard.minpots[x];
    		newboard.maxpots[x] = cboard.maxpots[x];
    	}

    	return newboard;
    }

    this.move = function (player, pot) {
    //  Returns a new Board whose state is that of the Kalah board after Player player
    //      moves using the given pot.
    
    		newboard = this.copyBoard(this);
    		
    		if(newboard.moveBoard(player, pot) == true){
    			newboard.freeturn = true;
    		}
    	//	if(player == player.MAX){
    			
    		return newboard;
	}
	
	this.freeTurn = function(){
		
		return freeturn;
	}

	this.equals = function (o) {
    //  Board equality is required to properly maintain open and closed lists in minimax.
    //  Two boards should be equal if they have the same number of stones in all corresponding pots and Kalahs

   		if((o.maxkalah != this.maxkalah)  || (o.minkalah != this.minkalah)){
   			return false;
    	}
    			
    	for(var x = 0; x < 6; x++){
   			if((o.minpots[x] != this.minpots[x])  ||  (o.maxpots[x] != this.maxpots[x])){
    				return false;
    		}
    	}
    			
  		return true;
	}

	this.isWin = function() {
    //  Returns true if this board is a winning (i.e. final) configuration. (false otherwise)
    //  A final configuration is one where all pots on one side are empty.
    
   // 		boolean win = false;
   
   		return winCheck();
	}
	
	this.legal = function (player, pot) {
    //  Returns true if the move indicated by the given pot is legal (false otherwise)
    
    		if(pot > 5 || pot < 0){
    			return false;
    		}
    		
    		switch(player){
    			
    			case MAX:
    				if(maxpots[pot] < 1){
    					return false;
    				}
    				break;
    				
    			case MIN:
    				if(minpots[pot] < 1){
    					return false;
    				}
    				break;
    				
    			default:
    				return false;
    		}
    		
    		return true;
	}

	this.moveBoard = function (player, pot) {
    //  Performs the move indicated by the given pot on this Board for Player player. 
    //  Includes any capture or final actions if the resulting configuration is a final configuration.
    //  Returns true if the result is a free turn for the player (false otherwise)
    

    		var stones;
    		side = player;
    		
    		if(side == Player.MAX){
    			stones = maxpots[pot];
    			maxpots[pot] = 0;
    		}
    		else{
    			stones = minpots[pot];
    			minpots[pot] = 0;
    		}
    		
    		var i = pot+1;
    		while(stones > 0){
    			
    			if(i > 5){
    				if(side == MAX){
    					if(side == player){
    						maxkalah++;
    						stones--;
    						if(stones == 0){
    							return true;
    						}
    					}
    					side = MIN;
    				}
    				else{
    					if(side == player){
    						minkalah++;
    						stones--;
    						if(stones == 0){
    							return true;
    						}
    					}
    					side = MAX;
    				}
    				
    				i = 0;
    			}
    			
    			else{
    				if(side == MAX){
    					maxpots[i]++;
    				}
    				else{
    					minpots[i]++;
    				}
    				stones--;
    				i++;
    			}
    		}
    		
    		i--;
    		//did we land in an empty pot?
    		//check to see if there are any stones in the opposite pot. Capture them.
    		if(side == MAX){
    			if(side == player){
    				if(maxpots[i] == 1){     //since we've already added the stone, landing a preveiously empty pot will be at 1 
    					maxkalah += minpots[5-i];
    					minpots[5-i] = 0; 
    				}
    			}

    		}
    		else{
    			if(side == player){
    				if(minpots[i].get() == 1){
    					minkalah += maxpots[5-i];
    					maxpots[5-i] = 0; 
    				}
    			}
    		}
    				
    		if(winCheck()){
    		//collect all remaining stones and add them to the proper kalah
    			if(maxpots[0] > 0){
    				for(var x = 0; x < 6; x++){
    					maxkalah += maxpots[x];
    					maxpots[x] = 0;   
    				}
    			}
    			if(minpots[0] > 0){
    				for(var x = 0; x < 6; x++){
    					minkalah += minpots[x]
    					minpots[x] = 0;
    				}
    			}
    		}
    		
    		return false;
	}


	this.winCheck = function () {
    //  Help function for moveBoard, performing any required final actions if the current state is final
    
    		for(var x = 0; x < 6; x++){
    			if(maxpots[x].get() > 0){
    				break;
    			}
    			
    			if(x == 5){
    				return true;
    			}
    		}
    		
    		
    		for(var x = 0; x < 6; x++){
    			if(minpots[x].get() > 0){
    				break;
    			}
    			
    			if(x == 5){
    				return true;
    			}
    		}
    		
    		
    		return false;
	}
	
	this.getPot = function (player, pot){
		
		if(player == MAX){
			return maxpots[pot];
		}
		else{
			return minpots[pot];
		}
	}
	
	this.eval = function () {
    //  Returns the value of the static evaluation function on this Board
    
    		return maxkalah - minkalah;
	}
	
	this.show = function () {
    //  Prints the board's state to resemble an actual Kalah board.
    
    		console.log("\n");
    		console.log("   " +this.maxpots[5]+ "  " +this.maxpots[4]+ "  " +this.maxpots[3]+ "  " +this.maxpots[2]+ "  " +this.maxpots[1]+ "  " +this.maxpots[0]);
    		console.log(this.maxkalah + "                    " + this.minkalah);
    		console.log("   " +this.minpots[0]+ "  " +this.minpots[1]+ "  " +this.minpots[2]+ "  " +this.minpots[3]+ "  " +this.minpots[4]+ "  " +this.minpots[5]);
    		console.log("\n");
	}

	this.removed = function(){
		if(this.maxpots){
			this.maxpots[1].add(9);
		}
	}

}

	//for testing
main = function () {
            
    		test = new Board(4);

    		test.minkalah = 0;
    		test.maxkalah = 0;
    		test.minpots =  [];
    		test.maxpots = [];
    		for(var i = 0; i < 6; i++){
    			test.minpots[x] = 5;
    			test.maxpots[x] = 5;
    		}

    		test.show();
    //		test.removed();
    //		test.show();
    		
    		test = test.move(MAX, 1);
    		
    //		test.show();
    		sc = test.getSucc(MIN);
  /*  		
    		sc[4].show();
    		System.out.println();
    		sc[5].show();
*/
		for(var x = 0; x < 6; x++){
			if(sc[x] != null){
				console.log(sc[x].eval());
			}
		}
}

var go = main();