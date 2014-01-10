var Formations = function() {	
    var formations = new Array();


    this.initFormations = function(fieldHeight, fieldWidth) {

        // positions in px like in player objects

        // main positions eg. LF = left forward		
        var LW = {x: fieldWidth * 0.2, y: fieldHeight * 0.2};
        var CF = {x: fieldWidth * 0.5, y: fieldHeight * 0.2};
        var RW = {x: fieldWidth * 0.8, y: fieldHeight * 0.2};
        var SS = {x: fieldWidth * 0.5, y: fieldHeight * 0.35}; // second striker
        var LF = {x: fieldWidth * 0.4, y: fieldHeight * 0.2};
        var RF = {x: fieldWidth * 0.6, y: fieldHeight * 0.2};
        var LM = {x: fieldWidth * 0.2, y: fieldHeight * 0.48};
        var LCM = {x: fieldWidth * 0.4, y: fieldHeight * 0.48}; // left center midfielder
        var LOM = {x: fieldWidth * 0.4, y: fieldHeight * 0.4};
        var LDM = {x: fieldWidth * 0.4, y: fieldHeight * 0.6};
        var CM = {x: fieldWidth * 0.5, y: fieldHeight * 0.48};
        var COM = {x: fieldWidth * 0.5, y: fieldHeight * 0.4};
        var CDM = {x: fieldWidth * 0.5, y: fieldHeight * 0.65};
        var RCM = {x: fieldWidth * 0.6, y: fieldHeight * 0.48};
        var ROM = {x: fieldWidth * 0.6, y: fieldHeight * 0.4};
        var RDM = {x: fieldWidth * 0.6, y: fieldHeight * 0.6};
        var RM = {x: fieldWidth * 0.8, y: fieldHeight * 0.48};
        var LB = {x: fieldWidth * 0.2, y: fieldHeight * 0.75}; // left back
        var LCB = {x: fieldWidth * 0.4, y: fieldHeight * 0.75};
        var RCB = {x: fieldWidth * 0.6, y: fieldHeight * 0.75};
        var RB = {x: fieldWidth * 0.8, y: fieldHeight * 0.75};		
        var LIB = {x: fieldWidth * 0.5, y: fieldHeight * 0.8};
        var GK = {x: fieldWidth * 0.5, y: fieldHeight * 0.92};

        // 3-5-2
        var positions352 = new Array();
        positions352.push(LF);
        positions352.push(RF);
        positions352.push(LM);
        positions352.push(LCM);
        positions352.push(RCM);
        positions352.push(RM);
        positions352.push(CDM);
        positions352.push(LB);
        positions352.push(LIB);
        positions352.push(RB);
        positions352.push(GK);
        formations["3-5-2"] = new Formation("3-5-2", positions352);

        // WM
        var positionsWM = new Array();
        positionsWM.push(LW);
        positionsWM.push(CF);
        positionsWM.push(RW);
        positionsWM.push(LOM);
        positionsWM.push(ROM);
        positionsWM.push(LDM);
        positionsWM.push(RDM);
        positionsWM.push(LB);
        positionsWM.push(LIB);
        positionsWM.push(RB);
        positionsWM.push(GK);
        formations["WM"] =  new Formation("WM", positionsWM);

        // 4-4-2
        var positions442 = new Array();
        positions442.push(LF);
        positions442.push(RF);
        positions442.push(LM);
        positions442.push(LCM);
        positions442.push(RCM);
        positions442.push(RM);
        positions442.push(LB);
        positions442.push(LCB);
        positions442.push(RCB);
        positions442.push(RB);
        positions442.push(GK);
        formations["4-4-2"] = new Formation("4-4-2", positions442);

        // 4-4-2 Diamond
        var positions442d = new Array();
        positions442d.push(LF);
        positions442d.push(RF);
        positions442d.push(COM);
        positions442d.push(LM);
        positions442d.push(RM);
        positions442d.push(CDM);
        positions442d.push(LB);
        positions442d.push(LCB);
        positions442d.push(RCB);
        positions442d.push(RB);
        positions442d.push(GK);
        formations["4-4-2-Diamond"] = new Formation("4-4-2-Diamond", positions442d);

        // 4-3-3
        var positions433 = new Array();
        positions433.push(LW);
        positions433.push(CF);
        positions433.push(RW);
        positions433.push(LM);
        positions433.push(CM);
        positions433.push(RM);
        positions433.push(LB);
        positions433.push(LCB);
        positions433.push(RCB);
        positions433.push(RB);
        positions433.push(GK);
        formations["4-3-3"] = new Formation("4-3-3", positions433);

        // 3-4-3
        var positions343 = new Array();
        positions343.push(LW);
        positions343.push(CF);
        positions343.push(RW);
        positions343.push(LM);
        positions343.push(LCM);
        positions343.push(RCM);
        positions343.push(RM);
        positions343.push(LB);
        positions343.push(RB);
        positions343.push(LIB);
        positions343.push(GK);
        formations["3-4-3"] = new Formation("3-4-3", positions343);

        // 4-2-3-1
        var positions4231 = new Array();
        positions4231.push(CF);
        positions4231.push(LM);
        positions4231.push(COM);
        positions4231.push(RM);
        positions4231.push(LDM);
        positions4231.push(RDM);
        positions4231.push(LB);
        positions4231.push(LCB);
        positions4231.push(RCB);
        positions4231.push(RB);
        positions4231.push(GK);
        formations["4-2-3-1"] = new Formation("4-2-3-1", positions4231);
        
        formations["custom"] = null;
    };
	
	
    this.getFormation = function(strFormation) {
        //console.log(strFormation + "  " + formations[strFormation]);
        if(formations[strFormation] != undefined || null) 
            return formations[strFormation];			
    }; 
    
//    this.setCustomFormation = function(formation) {
//      formations["custom"] = formation;  
//    };
};