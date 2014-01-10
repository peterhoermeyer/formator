/**
 * 
 * @param {type} football
 * @returns {undefined}
 * 
 * Proxy for all user interaction that has to do with settings
 */
var OptionsMenu = function(football) {
    
    var $toolbarMain = $('#toolbar-main');
    var $toolbarToggle = $('.toolbar-toggle');
    var $saveToBrowser = $('.saveToBrowser'); 
    
    var $editModePlayerName = $('#edit-mode-player-name');
    var $inputPlayerName = $('#player-name-input');
    var $butPlayerNameClose = $('button#player-name-close');
    
    var $closeActionMenu = $('.close-action-menu');
    var $actionMenuSettings = $('#action-menu-settings');
    var $actionMenuFormation = $('#action-menu-formation');
    var $actionMenuColors = $('#action-menu-colors');
    var $iconSettings = $('#icon-settings');
    var $iconFormation = $('#icon-formation');
    var $iconColors = $('#icon-colors');
    var playerColorPreviewCanvas = document.getElementById('player-color-preview');
    var playerPreviewCtx = playerColorPreviewCanvas.getContext('2d');
    var playerVars = new PlayerVars({width: playerColorPreviewCanvas.width, height: playerColorPreviewCanvas.height}, 1);
    var previewPlayer = new Player( {x: 0, y: 0}, playerPreviewCtx, playerPreviewCtx, 66, playerVars);
//    playerPreviewCtx.stroke();
    
    // prevent form submission
    $('[data-type="action"]').on('submit', function() {
        return false;
    });


    // EventListening & Handling
    // formation select
    $(".formation-type").on("click", function() {
        var str_formation = $(this).html();
        football.handleFormationChange(str_formation);        
        hideMenuElement( $actionMenuFormation ); // TODO: hide right menu
        football.autosave();
    });   
    
    

    // saving of formation and settings
    $saveToBrowser.on("click", function() {
            football.save( USER_SAVED );
    });

    $toolbarToggle.on('click', function() {          
        toggleMenuElement( $toolbarMain );
    });
    
    
    
    // --- action_menu
    $iconSettings.on('click', function() {
        showMenuElement( $actionMenuSettings );
    });

    $iconFormation.on('click', function() {
        showMenuElement( $actionMenuFormation );
    });
    
    $iconColors.on('click', function() {
        showMenuElement( $actionMenuColors );
    });
    
    $closeActionMenu.on('click', function() {
        hideMenuElement( $(this).parents('.action-menu') );
    });
    
    
    
    // --- player name input
    var showPlayerNameInput = function(playerName) {
        $inputPlayerName.attr("placeholder", playerName);
        showMenuElement( $editModePlayerName );
        $inputPlayerName.val("");
    };
    
//    $inputPlayerName.on("blur", function() {
//        setNewPlayerName(true); // true == hide input
//    });
    
    $inputPlayerName.on("keyup change", function() {
        setNewPlayerName();
    });
    
    $butPlayerNameClose.on("click", function() {
        if ($inputPlayerName.val() !== "") {
            setNewPlayerName();
            football.autosave();
        }       
        hideMenuElement( $editModePlayerName );
        return false; // avoid sending form
    });
    
    var setNewPlayerName = function() {
        if($inputPlayerName.val() !== "") {
            var thisPlayer = football.getPrevSelectedPlayer();
            thisPlayer.setName( $inputPlayerName.val() );
        }          
        football.drawNames();
    };
    
    
    // --- colors-menu
    // init color fields   
    $('ul.menu-item > li a').on('click', function() {
        $parentMenu = $(this).parent().parent('ul');
        var playerPart = $parentMenu.attr('data-player-part');
        //console.log(playerPart);
        $parentMenu.children('li').children().removeClass('active');
        $(this).addClass('active');
        var color = $(this).attr('href');
        football.getPlayerVars().setColor(playerPart, color);
        playerVars.setColor(playerPart, color);
        previewPlayer.redraw();
        football.redrawMainCanvas();
        football.autosave();
        return false;
    });
    

    // make functions public
    this.showPlayerNameInput = showPlayerNameInput;    
    
    // helper functions
    var showMenuElement = function($element) {
        $element.removeClass('hidden').addClass('visible');
        //setToolbarTimeout( $toolbar );       
    };
    
    var hideMenuElement = function($element) {
        $element.removeClass('visible').addClass('hidden');
    };
    
    var setMenuTimeout = function($element, timeout) {
        var timer = setTimeout(function() {
          hideMenuElement( $element );
          clearTimeout( timer );
        }, 
        timeout );         
    };
    
    var toggleMenuElement = function($element) {
        if ($element.hasClass('visible')) {
            hideMenuElement( $element );
        } else {
            showMenuElement( $element );
        }
    };
};