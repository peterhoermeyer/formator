var DebugTool = function($sel) {
	var $dbt = $($sel);
	this.log = function(text) {
		$dbt.html(text);
	};
	
	// append debuinterface to page
	var tools = '<div id="mouse_debug" style="position: absolute; width: 150px; height: 150px; background: #333; color: red; bottom: 0; right: 0; font-size: 12px"></div>';
	tools += '<button style="position: absolute; bottom: 0; left: 0; " id="listPlayers">listPlayers</button>';
	//$("body").append(tools);
	
	
	
};