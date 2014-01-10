var Formation = function(name, pos) {
    this.name;
    var positions = pos; // array holding 11 position objects

    /**
     * @param callback - callback function to be called after animating
     */
    this.setPlayersToPositions = function(players, callback) {
        for(var i = (players.length-1); i >= 0;  i--) {
            //console.log("setting---");
            var iClosestPlayer = -1;
            for(var j = 0; j < players.length; j++) {
                if(!players[j].isSetTarget) {
                    if(isNearer(players[j], players[iClosestPlayer], positions[i]))
                        iClosestPlayer = j;	
                }				
            }

            if(iClosestPlayer !== -1) {
                //console.log("closestPlayer != -1");
                var closestPlayer = players[iClosestPlayer];
                closestPlayer.setTargetX(positions[i].x);
                closestPlayer.setTargetY(positions[i].y);
                closestPlayer.isSetTarget = true;
            }			
        }
        animateFormationChange(players, callback);
    };
    var isNearer = function(p1, p2, position) {
        if(p2 == undefined)
            return true;
        var distP1 = Math.sqrt(Math.pow(Math.abs(position.x - p1.getX()), 2) + Math.pow(Math.abs(position.y - p1.getY()), 2) );
        var distP2 = Math.sqrt(Math.pow(Math.abs(position.x - p2.getX()), 2) + Math.pow(Math.abs(position.y - p2.getY()), 2) );
        if(distP1 <= distP2) 
            return true;
        return false;
    };

    // TODO: prevent changing formation while animations still in progress
    var animateFormationChange = function(players, callback) {

        // animation loop
        var intvalCount = 0;
        var animIntval = setInterval(function() {
            for(var i = 0; i < players.length; i++) {
                var player = players[i];

                player.moveToTarget();
            }
            //console.log("intval");
            intvalCount++;
            if(intvalCount >= NUM_FORMATIONCHANGEANIM_FRAMES) {
                clearInterval(animIntval);
                if(typeof(callback) == "function")
                        callback();
            }
        }, FORMATIONCHANGEANIM_INTVAL);


    };
};