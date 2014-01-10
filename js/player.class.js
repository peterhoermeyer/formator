var Player = function(pos, mainCtx, animCtx, id, playerVars) {
    var aspRatio = ASP_RATIO;
    var vars = playerVars; // Bundle with player variables
    var targetX = 0;
    var targetY = 0;
    var stepToTargetX = 0;
    var stepToTargetY = 0;
    this.isSetTarget = false;
    this.isGK = false;
    this.id = id; // 0 - 10
    this.intersects = false;
    var name = playerVars.names[Math.floor(Math.random() * playerVars.names.length)];

    var width = vars.width;
    var height = vars.height;

    var x = pos.x; // absolute position in px starting in upper left corner of fieldCanvas
    var y = pos.y;
    var headCol = "#000000";	
    var mouseOver = false;
    var mouseDown = false;
    var mouseMove = false;
    var $this = null;

    var animFrameCtr = 0; // counts from 0-3

    // EventHandlers called by main App
    this.onMouseOver = function() {
        mouseOver = true;
        clear(mainCtx);
        drawPlayer(mainCtx);
    };
    /**
     * called just after player has been dragged
     */
    this.onMouseOut = function() {
        mouseOver = false;
        mouseDown = false;        
        clear(animCtx, true);
        aspRatio = ASP_RATIO;
        drawPlayer(mainCtx);
    };
    this.onMouseDown = function(mouseX, mouseY) {		
        mouseDown = true;             
        clear(mainCtx);
        drawPlayer(animCtx);
    };
    /**
     * called while player is being dragged
     */
    this.onMouseMove = function(mouseX, mouseY) {
        aspRatio = ASP_RATIO * 1.5;
        clear(animCtx);
        x = mouseX - width / 2;
        y = mouseY - height / 2;
        drawPlayer(animCtx);
    };

    this.intersection = function(obj) {
        if(this.id !== obj.id) {
            var thisMX = x + width / 2;
            var thisMY = y + height / 2;
            var objMX = obj.getX() + obj.getWidth() / 2;
            var objMY = obj.getY() + obj.getHeight() / 2;
            var distX = Math.abs(thisMX - objMX);
            var distY = Math.abs(thisMY - objMY);
            // intersection?
            if ((distX <= width ) && (distY <= height) ) { // assuming identical dimensions of objects
                // clear intersecting player
                animCtx.clearRect(x, y, width, height);
                           
                this.intersects = true;
                
                if (distY > distX) {
                    // move to top or bottom
                    if(thisMY < objMY) {
                        y = obj.getY() - obj.getHeight() - 1; 
                    }
                    else {
                        y = obj.getY() + obj.getHeight() + 1;
                    }
                }
                else if (distY < distX) {
                    // move to right or left
                    if(thisMX > objMX) {
                        x = obj.getX() + obj.getWidth() + 1;
                    }
                    else {
                        x = obj.getX() - width - 1;
                    }
                }
                else if (distY === distX) {
                    x -= 1;
                    this.intersection(obj);
                }
            }
        }
    }; 

    var drawPlayer = function(ctx) {
        ctx = (ctx == undefined) ? mainCtx : ctx;
        //ctx.strokeRect(x, y, vars.width, vars.height);

        // head
        var headX = x + (vars.width * aspRatio - vars.headWidth * aspRatio) / 2;
        var headMiddleX = headX + vars.headWidth * aspRatio / 4;
        var headSidesY = y + (vars.headHeight * aspRatio - vars.headSidesHeight * aspRatio) / 2;
        ctx.fillStyle = (!mouseOver) ? headCol : "#ffffff";
        ctx.fillRect(headMiddleX, y, vars.headMiddleWidth * aspRatio, vars.headHeight * aspRatio);
        ctx.fillRect(headX, headSidesY, vars.headWidth * aspRatio, vars.headSidesHeight * aspRatio);		
        // body
        var bodyX = headX - ((vars.bodyWidth * aspRatio - vars.headWidth * aspRatio) / 2);
        var bodyY = y + vars.headHeight * aspRatio;
        ctx.fillStyle = (!mouseOver) ? vars.shirtCol : "#ffffff";
        ctx.fillRect(bodyX, bodyY, vars.bodyWidth * aspRatio, vars.bodyHeight * aspRatio);		
        // arms
        var armY = y + vars.headHeight * aspRatio;
        // left arm
        var leftArmX = bodyX - vars.armWidth * aspRatio;
        ctx.fillRect(leftArmX, armY, vars.armWidth * aspRatio, vars.armHeight * aspRatio);
        // right arm
        var rightArmX = bodyX + vars.bodyWidth * aspRatio;
        ctx.fillRect(rightArmX, armY, vars.armWidth * aspRatio, vars.armHeight * aspRatio);	
        // hands
        ctx.fillStyle = (!mouseOver) ? vars.skinCol : "#ffffff";
        var handsY = armY + vars.armHeight * aspRatio;
        ctx.fillRect(leftArmX, handsY, vars.handsWidth * aspRatio, vars.handsHeight * aspRatio);
        ctx.fillRect(rightArmX, handsY, vars.handsWidth * aspRatio, vars.handsHeight * aspRatio);			
        // trousers
        var trousersX = bodyX;
        var trousersY = bodyY + vars.bodyHeight * aspRatio;
        ctx.fillStyle = (!mouseOver) ? vars.trousersCol : "#ffffff";
        ctx.fillRect(trousersX, trousersY, vars.trousersWidth * aspRatio, vars.trousersHeight * aspRatio);				
        // feet(legs)
        var feetY = y + vars.headHeight * aspRatio + vars.bodyHeight * aspRatio + vars.trousersHeight * aspRatio;
        var socksY = feetY + vars.skinHeight * aspRatio;
        var shoesY = socksY + vars.socksHeight * aspRatio;
        var leftFootX = bodyX + vars.feetMargin;
        var rightFootX = bodyX + vars.bodyWidth * aspRatio - vars.feetMargin - vars.feetWidth * aspRatio;
        // skins left + right
        // left skin		
        ctx.fillStyle = (!mouseOver) ? vars.skinCol : "#ffffff";		
        ctx.fillRect(leftFootX, feetY, vars.feetWidth * aspRatio, vars.skinHeight * aspRatio);
        ctx.fillRect(rightFootX, feetY, vars.feetWidth * aspRatio, vars.skinHeight * aspRatio);
        // socks left + right		
        ctx.fillStyle = (!mouseOver) ? vars.socksCol : "#ffffff";
        ctx.fillRect(leftFootX, socksY, vars.feetWidth * aspRatio, vars.socksHeight * aspRatio);
        ctx.fillRect(rightFootX, socksY, vars.feetWidth * aspRatio, vars.socksHeight * aspRatio);
        // shoes left + right		
        ctx.fillStyle = (!mouseOver) ? vars.shoesCol : "#ffffff";
        ctx.fillRect(leftFootX, shoesY, vars.feetWidth * aspRatio, vars.shoesHeight * aspRatio);
        ctx.fillRect(rightFootX, shoesY, vars.feetWidth * aspRatio, vars.shoesHeight * aspRatio);		
        ctx.fillStyle = vars.defCol;
    };
    drawPlayer();

    var clear = function(ctx, fullScreen) {
        if(ctx == undefined)
            ctx = animCtx;
        if(!fullScreen)
            ctx.clearRect(x - 1, y - 1, vars.width * aspRatio + 2, vars.height * aspRatio + 2);
        else
            ctx.clearRect(0, 0, animCanvas.width, animCanvas.height);
    };

    this.clear = function() {
        clear(mainCtx);
    };

    this.redraw = function(playerVars) {
        if(playerVars != undefined)
            vars = playerVars;
        drawPlayer();
    };

    this.moveToTarget = function() {
        clear(mainCtx);
        x = x + stepToTargetX;
        y = y + stepToTargetY;
        animFrameCtr = (animFrameCtr + 1) % 4; // counts from 0 to 3 = 4 frames
        drawPlayer();
        this.isSetTarget = false;
    };

    // getter & setter
    this.setWidth = function(w) {
        width = w;
    };
    this.setHeight = function(h) {
        height = h;
    };
    this.setX = function(newX) {
        x = newX;
    };
    this.setY = function(newY) {
        y = newY;
    };
    this.setName = function(n) {
        name = n;
    };
    this.getWidth = function() {
        return vars.width * aspRatio;
    };
    this.getHeight = function() {
        return vars.height * aspRatio;
    };
    this.getX = function() {
        return x;
    };
    this.getY = function() {
        return y;
    };
    this.getName = function() {
        return name;
    };
    this.setTargetX = function(tX) {
        targetX = tX - (width / 2);
        stepToTargetX = (targetX - x) / NUM_FORMATIONCHANGEANIM_FRAMES;
    };
    this.setTargetY = function(tY) {
        targetY =  tY - (height / 2);
        stepToTargetY = (targetY - y) / NUM_FORMATIONCHANGEANIM_FRAMES;
    };
    this.getTargetX = function() {
        return targetX;
    };
    this.getTargetY = function() {
        return targetY;
    };

};
