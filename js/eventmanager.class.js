/*
 * handles player events
 */
var EventManager = function() {
	/**
	 * @param event: event to handle
	 * @param opts: array bundle of additional params for this event
	 * @returns int Event-Handling-Code
	 */
	
	this.getEventHandler = function(event, opts) {
		var mouseOverPlayer = opts[0];
		var selectedPlayer = opts[1];
		var playerMouseOver = opts[2];
		if(event.type === EVENT_MOUSE_DOWN && mouseOverPlayer ) {
			return HANDLE_PLAYER_SELECT;
		}
		else if(event.type === EVENT_MOUSE_UP) {
			if(selectedPlayer != null) {
				return HANDLE_PLAYER_MOUSEOUT;
			} 
			else {
				return HANDLE_ADD_PLAYER;
			}				
		}
		else if(event.type === EVENT_MOUSE_MOVE) {			
			if(selectedPlayer != null) {
				return HANDLE_PLAYER_MOUSEMOVE;
			}
			else if(mouseOverPlayer ) {
				return HANDLE_PLAYER_MOUSEOVER;
			}
			else if(playerMouseOver != null) {
				return HANDLE_PLAYER_HOVER_OUT;
			}
		}
	};
	

};