var Football = function(selWrapper, selCanvas, selAnimCanvas, selFieldCanvas, selNameCanvas) {
    var $wrapper = $("#selWrapper");
    // dimensions of main container
    var $canvasContainer = $("div#canvasContainer");
    var containerHeight = 0; 
    var containerWidth = 0;

    var canvas = document.getElementById(selCanvas); // main canvas
    var $canvas = $("#" + selCanvas);
    var mainCtx = canvas.getContext("2d");
    var animCanvas = document.getElementById(selAnimCanvas); // anim canvas
    var animCtx = animCanvas.getContext("2d");
    var $animCanvas = $("#" + selAnimCanvas);
    var fieldCanvas = document.getElementById(selFieldCanvas);
    var $fieldCanvas = $("#" + selFieldCanvas);
    var nameCanvas = document.getElementById(selNameCanvas);
    var $nameCanvas = $("#" + selNameCanvas);
    var nameCtx = nameCanvas.getContext("2d");

    var nameTop = 12; // top margin(px) of players' name tags
    var mouseX = 0, mouseY = 0, prevMouseX = 0, prevMouseY = 0;
    var formations = new Formations();

    // OptionsMenu
    var optionsMenu = new OptionsMenu(this);

    var autosave = true;
//    var customFormation = null;
//    var customPositions = [];
    

    var players = new Array();
    var playerVars = null;
    var selectedPlayer = null;
    var prevSelectedPlayer = null;
    this.getPrevSelectedPlayer = function() {
        return prevSelectedPlayer;
    }
    var playerMouseOver = null; // reference to player being pointed at
    

    var field = new Field(fieldCanvas);

    var eventManager = new EventManager();

    this.init = function() {
        setupDimensions();	
        field.draw();
        addEventListeners();
        initFormationAndSettings(USER_SAVED); // TODO: needed?	
    };	

    var setupDimensions = function() {
        // get browser window dimensions an set canvases accordingly
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight; // innerHeight on desktop browsers
        
        $canvasContainer.css({
            width: windowWidth + "px",
            height: windowHeight + "px"
        });

        var fieldHeight = windowHeight;
        var fieldWidth = parseInt(fieldHeight / 1.1);
        
        if (fieldWidth > windowWidth) {
            fieldWidth = windowWidth;
        }

        ASP_RATIO = fieldWidth / 500;
        // set field objects' new dimensions
        field.setWidth(fieldWidth);
        field.setHeight(fieldHeight);		
        // init formations with new field dimensions
        formations.initFormations(fieldHeight, fieldWidth);
        // init playerVars Bundle
         playerVars = new PlayerVars({"width": fieldWidth, "height": fieldHeight}, ASP_RATIO);
        
        $(".bigCanvas").css({"width": fieldWidth + "px", "height": fieldHeight + "px"});

        canvas.width = $canvas.width(); canvas.height = $canvas.height();
        animCanvas.width = canvas.width; animCanvas.height = canvas.height;
        fieldCanvas.width = canvas.width; fieldCanvas.height = canvas.height;
        nameCanvas.width = canvas.width; nameCanvas.height = canvas.height;

    };

    // EventListeners
    var addEventListeners = function() {
        $canvas.bind(EVENT_MOUSE_DOWN + " " + EVENT_MOUSE_UP + " " + EVENT_MOUSE_MOVE, function(ev) { 
            if(ev != EVENT_MOUSE_UP)
                updateMousePosition(ev);
            execEventHandlers(ev);	
        });
    };	

    // switching mouse handlers
    var execEventHandlers = function(ev) {
        //$mouse_debug.html("x: " + mouseX + " y: " + mouseY + "prevEv.type: " + prevEv.type + "<br/>ev.type: " + ev.type + "<br/>overPlayer: " + mouseOverPlayer() ); // remove		
        prevEv = ev;
        var isOverPlayer = mouseOverPlayer();
        var handlerCode = eventManager.getEventHandler(ev, new Array(isOverPlayer, selectedPlayer, playerMouseOver) );
        switch(handlerCode) {
            case HANDLE_PLAYER_SELECT: handlePlayerSelect(); break;
            case HANDLE_PLAYER_MOUSEOUT: handlePlayerMouseOut(); break;
            case HANDLE_ADD_PLAYER: handleAddPlayer(); break;
            case HANDLE_PLAYER_MOUSEMOVE: handlePlayerMouseMove(); break;
            case HANDLE_PLAYER_MOUSEOVER: handlePlayerMouseOver(); break;
            case HANDLE_PLAYER_HOVER_OUT: handlePlayerHoverOut(); break;
        }
    };


    // mouse handlers
    var handlePlayerSelect = function() {
        selectedPlayer = prevSelectedPlayer = playerMouseOver;
        selectedPlayer.onMouseDown();
        //console.log("selectedPlayer.name: " + selectedPlayer.name);		
        //if(prevSelectedPlayer != null && selectedPlayer.id != prevSelectedPlayer.id)
        var thisPlayer = selectedPlayer;    
        var timer = setTimeout(function() {              
            if (isDragging === false) {
                optionsMenu.showPlayerNameInput( thisPlayer.getName() );
            }   
            clearTimeout( timer );
        }, 500);          
    };

    var handlePlayerMouseOut = function() {     
        selectedPlayer.intersects = false;
        for(var i = 0; i < players.length; i++)
            selectedPlayer.intersection(players[i]);
        
        selectedPlayer.onMouseOut();   
        
        if (selectedPlayer.intersects) {
            redrawMainCanvas();
        }
        
        prevSelectedPlayer = selectedPlayer;
        selectedPlayer = null;
        isDragging = false;
        drawNames();	
        autosave();
    };

    var handleAddPlayer = function() {
        addNewPlayer(mouseX - PLAYER_WIDTH / 2, mouseY - PLAYER_HEIGHT / 2);
    };

    // player is being dragged
    var handlePlayerMouseMove = function() {
        selectedPlayer.onMouseMove(mouseX, mouseY);
        isDragging = true;
        clearNames();
    };

    var handlePlayerMouseOver = function() {
        playerMouseOver.onMouseOver();
    };

    var handlePlayerHoverOut = function() {
        playerMouseOver.onMouseOut();
        playerMouseOver = null;
    };

    /*
     * saves String of settings to localStorage
     */
    var handleSaveToBrowser = function(savingType) {
        //console.log("save to browser");
        var str_toSave = "?type=ls"; // ls = localStorage
        str_toSave += getSaveableString();		
        localStorage.setItem(savingType, str_toSave);
        //console.log(localStorage.getItem("footballFormation") );
        if(savingType === USER_SAVED)
            showMessage(MESS_SAVED);
        return false;
    };
    this.save = handleSaveToBrowser;
    
    var autosave = function() {
        if (autosave) {
            handleSaveToBrowser( USER_SAVED );
        }
    };
    this.autosave = autosave;

    this.handleShareButton = function() {	
        var URL = document.URL;
        var strToShare = URL;
        //console.log("URL = " + URL);
        if(URL.indexOf("?") !== -1)
                strToShare = URL.substr(0, URL.indexOf("?"));		
        strToShare += "?type=get";

        strToShare += getSaveableString();		
        //console.log("strToShare = " + strToShare);

        optionsMenu.showShareableString( strToShare );
        return false;
    };

    var getSaveableString = function() {
        var fW = field.getWidth(); var fH = field.getHeight();
        var str = "";
        for(var i = 0; i < players.length; i++) {
                str += "&p" + i + "=" + players[i].getName() + "&x=" + Math.round((players[i].getX() / fW) * 100) / 100 + "&y=" + Math.round((players[i].getY() / fH) * 100) / 100;
        }
        str += "&jC=" + playerVars.shirtCol + "&tC=" + playerVars.trousersCol + "&sC=" + playerVars.socksCol;
        return str;
    };

    var initFormationAndSettings = function(savingType) {
       
        var GETString = window.location.search.substring(1);
        if(GETString != "")
            getSettingsAndFormationByString(GETString);
        else if(localStorage[savingType] != undefined)
            getSettingsAndFormationByString(localStorage[savingType]);
        redrawMainCanvas();
        drawNames();
    };

    var getSettingsAndFormationByString = function(paramString) {
        var fW = field.getWidth(); var fH = field.getHeight();
        var vars = paramString.split("&");
        //console.log("vars.length = " + vars.length);
        var value = null;
        var name = null;
        var x = null; var y = null;
        for(var i = 0; i < vars.length; i++) {		
            //console.log(vars[i]);
            value = vars[i].substr(vars[i].indexOf("=") + 1);
            //console.log(value);
            if (vars[i].indexOf("p") ===  0) {
                name = value;
            }
            else if (vars[i].indexOf("x") === 0) {
                x = value;
            }
            else if (vars[i].indexOf("y") === 0) {
                y = value;               
                // last param -> add New Player
                //console.log("y = " + value);
                addNewPlayer(x * fW, y * fH, name);
//                customPositions.push( {x: x, y: y} );
            } else if (vars[i].indexOf('jC') === 0) {
                playerVars.setColor('jersey', value);
            } else if (vars[i].indexOf('tC') === 0) {
                playerVars.setColor('trousers', value);
            } else if (vars[i].indexOf('sC') === 0) {
                playerVars.setColor('socks', value);
            }	
            
            
        }
//        customFormation = new Formation('custom', customPositions);
//        formations.setCustomFormation( customFormation );
    };
    var handleFormationChange = function(e) {
        var formation = formations.getFormation(e);
        //console.log("e: " + e + " -> formation: " + formation);
        if(formation != undefined) {
            clearNames();
            formation.setPlayersToPositions(players, function() {
                drawNames();
                autosave();
            });	
        }
    };
    this.handleFormationChange = handleFormationChange;

    var addNewPlayer = function(posX, posY, name) {
        //console.log("addNewPlayer(" + posX + ", " + posY + ", " + name);
        if(players.length < 11) {
            var player = new Player({x: posX, y: posY}, mainCtx, animCtx, players.length, playerVars);
            if(name != undefined)
                player.setName(name);
            players.push(player);
            drawNames();
        }
    };

    var deleteAllPlayers = function() {
        players = new Array();
    };

    var updateMousePosition = function(ev) {
        // if using touch_device
        if(ev.originalEvent.touches != undefined && ev.originalEvent.touches.length > 0) {
            ev.preventDefault();
            var event = ev.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        }
        else // normal broser mouse_event
            var event = ev;

        if(event != undefined) {
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            mouseX = parseInt(event.pageX - $canvas.offset().left );
            mouseY = parseInt(event.pageY - $canvas.offset().top );
        }
        if(isNaN(mouseX) ) {
            mouseX = prevMouseX;
            mouseY = prevMouseY;
        }
    };	

    function mouseOverPlayer() {
        var player = null;
        for(var i = 0; i < players.length; i++) {
            player = players[i];
            if(mouseX >= player.getX() && mouseX <= player.getX() + player.getWidth()) {
                if(mouseY >= player.getY() && mouseY <= player.getY() + player.getHeight()) {
                    playerMouseOver = player;
                    return true;
                }
            }				
        }
        return false;
    }

    function clearNames() {
        nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
    }

    function drawNames() {
        clearNames();
        nameCtx.strokeStyle = NAMESTROKESTYLE;
        nameCtx.textAlign = "center";
        var fontSize = ASP_RATIO * FONT_SIZE;
        nameCtx.font = fontSize + "px " + FONT_FAMILY;
        for(var i = 0; i < players.length; i++) {
            var p = players[i];
            nameCtx.strokeText(p.getName(), p.getX() + p.getWidth() / 2, p.getY() + p.getHeight() + nameTop, p.getWidth()*2 );
        }
    }
    this.drawNames = drawNames;

    var redrawMainCanvas = function() {
        mainCtx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < players.length; i++)
            players[i].redraw();
    };
    this.redrawMainCanvas = redrawMainCanvas;
    
    var showMessage = function(text) {

    };

    var deletePlayer = function(player) {		

        //players.splice(player.id, 1);	
        var oldPlayers = players;
        var oldPlayer;
        players =  new Array();
        for(var i = 0; i < oldPlayers.length; i++) {
            oldPlayer = oldPlayers[i];
            oldPlayer.clear();
            if(oldPlayer.id !== player.id) {
                addNewPlayer(oldPlayer.getX(), oldPlayer.getY(), oldPlayer.getName());
            }
        }
        //console.log("delete player with id: " + player.id + " players.length: " + players.length);
        //console.log("players[0].getName: " + players[0].getName());
        drawNames();
        redrawMainCanvas();
    };
    
    this.getPlayerVars = function() {
        return playerVars;
    };

};