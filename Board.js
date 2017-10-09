MAX = 1;
MIN = 0;

Board = function () {

        var self = this;
            this.maxkalah = 0;
            this.minkalah = 0;

            this.maxpots = [0,0,0,0,0,0]
            this.minpots = [0,0,0,0,0,0]
        
            this.succ = [];
        
            this.freeturn = false;

    this.Board = function(n) {

        if(n.constructor !== Board){
		console.log("notboard");
            for(var x = 0; x < 6; x++){

                this.maxpots[x] = n;
                this.minpots[x] = n;
            }
        }

        else {
            console.log("Board");
            this.maxkalah = n.maxkalah;
            this.minkalah = n.minkalah;

            this.succ = n.succ;
        
            this.freeturn = false;
        
            for(var x = 0; x < 6; x++){

                this.maxpots[x] = n.maxpots[x];
                this.minpots[x] = n.minpots[x];
            }
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


    this.move = function (player, pot) {
    //  Returns a new Board whose state is that of the Kalah board after Player player
    //      moves using the given pot.
    
    		var newboard = new Board();
    		newboard.Board(this);
    		        console.log("new "+ newboard.maxpots[2]);
    		if(newboard.moveBoard(player, pot) == true){
    			newboard.freeturn = true;
    		}
    	//	if(player == player.MAX){
			
    		return newboard;
	}
	
	this.freeTurn = function(){
		
		return this.freeturn;
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
   
   		return this.winCheck();
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
    		
    		if(side == MAX){
    			stones = this.maxpots[pot];
    			this.maxpots[pot] = 0;
    		}
    		else{
    			stones = this.minpots[pot];
    			this.minpots[pot] = 0;
    		}
    		
    		var i = pot+1;
    		while(stones > 0){
    			
    			if(i > 5){
    				if(side == MAX){
    					if(side == player){
    						this.maxkalah++;
    						stones--;
    						if(stones == 0){
    							return true;
    						}
    					}
    					side = MIN;
    				}
    				else{
    					if(side == player){
    						this.minkalah++;
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
    					this.maxpots[i]++;
    				}
    				else{
    					this.minpots[i]++;
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
    				if(this.maxpots[i] == 1){     //since we've already added the stone, landing a preveiously empty pot will be at 1 
    					this.maxkalah += this.minpots[5-i];
    					this.minpots[5-i] = 0;
    				}
    			}

    		}
    		else{
    			if(side == player){
    				if(this.minpots[i] == 1){
    					this.minkalah += this.maxpots[5-i];
    					this.maxpots[5-i] = 0;
    				}
    			}
    		}
    				
    		if(this.winCheck()){
    		//collect all remaining stones and add them to the proper kalah
    			if(this.maxpots[0] > 0){
    				for(var x = 0; x < 6; x++){
    					this.maxkalah += this.maxpots[x];
    					this.maxpots[x] = 0;
    				}
    			}
    			if(this.minpots[0] > 0){
    				for(var x = 0; x < 6; x++){
    					this.minkalah += this.minpots[x];
    					this.minpots[x] = 0;
    				}
    			}
    		}
    		
    		return false;
	}


	this.winCheck = function () {
    //  Help function for moveBoard, performing any required final actions if the current state is final
    
    		for(var x = 0; x < 6; x++){
    			if(this.maxpots[x] > 0){
    				break;
    			}
    			
    			if(x == 5){
    				return true;
    			}
    		}
    		
    		
    		for(var x = 0; x < 6; x++){
    			if(this.minpots[x] > 0){
    				break;
    			}
    			
    			if(x == 5){
    				return true;
    			}
    		}
    		
    		
    		return false;
	}
	
	this.getPot = function (player, pot){
		

		if(player == MAX)
			return this.maxpots[pot];
		
		else
			return this.minpots[pot];
		
	}
	
	this.eval = function () {
    //  Returns the value of the static evaluation function on this Board
    
    		return this.maxkalah - this.minkalah;
	}
	
	this.show = function () {
    //  Prints the board's state to resemble an actual Kalah board.
    
    		console.log("\n");
    		console.log("   " +this.maxpots[5]+ "  " +this.maxpots[4]+ "  " +this.maxpots[3]+ "  " +this.maxpots[2]+ "  " +this.maxpots[1]+ "  " +this.maxpots[0]);
    		console.log(this.maxkalah + "                    " + this.minkalah);
    		console.log("   " +this.minpots[0]+ "  " +this.minpots[1]+ "  " +this.minpots[2]+ "  " +this.minpots[3]+ "  " +this.minpots[4]+ "  " +this.minpots[5]);
    		console.log("\n");
	}
/*
	this.removed = function(){
		if(this.maxpots){
			this.maxpots[1].add(20);
		}
	}
*/
}


/*
	//for testing
main = function () {
            
    		test = new Board(5);
    		test = test.Board(5);

    		test.show();
    //		test.removed();
    //		test.show();
    		
    		test = test.move(MAX, 1);
    		
    		test.maxpots[3] = 0;
    		test.show();
    		sc = test.getSucc(MIN);
    		

		for(var x = 0; x < 6; x++){
			if(sc[x] != null){
				sc[x].show();
				console.log(sc[x].eval());
			}
		}
}

//var go = main();*/