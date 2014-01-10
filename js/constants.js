var PLAYER_WIDTH = 36;
var PLAYER_HEIGHT = 52;
var ASP_RATIO = 1;
var NUM_FORMATIONCHANGEANIM_FRAMES = 10;
var FORMATIONCHANGEANIM_INTVAL = 60;

var TOUCH_DEVICE = ("ontouchstart" in document.documentElement) ? true : false;

// mouseEvents
if (!TOUCH_DEVICE) {
    
    var EVENT_MOUSE_DOWN = "mousedown";
    var EVENT_MOUSE_UP = "mouseup";
    var EVENT_MOUSE_MOVE = "mousemove";
        
} else {	
    
    var EVENT_MOUSE_DOWN = "touchstart";
    var EVENT_MOUSE_UP = "touchend";
    var EVENT_MOUSE_MOVE = "touchmove";
        
}

// mouse event handler codes
var HANDLE_PLAYER_SELECT = 0;
var HANDLE_PLAYER_MOUSEOUT = 1;
var HANDLE_ADD_PLAYER = 2;
var HANDLE_PLAYER_MOUSEMOVE = 3;
var HANDLE_PLAYER_MOUSEOVER = 4;
var HANDLE_PLAYER_HOVER_OUT = 5;
	
// field canvas
var FIELDFILLSTYLE = "#688816";
var FIELDLINESTROKESTYLE = "#ffffff";

// name canvas
var NAMESTROKESTYLE = "#ffffff";

// localStorage
var DEFAULT_SAVED = 0;
var USER_SAVED = 1;

// messages for modal notifications
var MESS_SAVED = "Formation saved";

// font-settings for nameCanvas
var FONT_SIZE = 15;
var FONT_FAMILY = "Verdana";