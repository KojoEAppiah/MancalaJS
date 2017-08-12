renderBoard = function(Board board){
	$("#aiendpot").attr('src', 'static/images/pot'+Board.maxkalah);
	for(var i = 0; i < 6; i++){
		$("#ai"+i).attr('src', 'static/images/pot'+Board.maxpots[i]);
		$("#p"+i).attr('src', 'static/images/pot'+Board.minpots[i]);		
	}
	$("#aiendpot").attr('src', 'static/images/pot'+Board.maxkalah);

}