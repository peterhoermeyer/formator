// Bundle of variables used by every player object
var PlayerVars = function(fieldDimensions, aspRatio) {
    var fieldWidth = fieldDimensions.width;
    var fieldHeight = fieldDimensions.height;

    // public vars
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.names = ["Johan", "Franz", "Uwe", "Giacinto", "Dino", "Ferenc", "Michael", "Bobby", "Kevin", "Karl-Heinz", "Michel", "Ruud", "Paul", "Marco", "Roberto", "Fernando", "Lionel", "George", "Rene", "Frank", "Lothar", "Bernd", "Birgit", "Luis", "Christiano", "Fabio", "Alfredo", "Stanley", "Gianni", "Gerd"];

    // colors
    this.shirtCol = "#ff0000";
    this.trousersCol = "#000000";
    this.socksCol = "#ff0000";
    this.shoesCol = "#000000";
    this.defCol = "#000000";
    this.skinCol = "#f39ca2";

    // body parts
    // head
    this.headHeight = 20;
    this.headWidth = 20;
    this.headMiddleWidth = this.headWidth / 2;
    this.headSidesHeight = this.headHeight / 1.6;

    // body
    this.bodyWidth = 25;
    this.bodyHeight = 13;

    // arms
    this.armWidth = 5;
    this.armHeight = 15;

    // hands
    this.handsWidth = this.armWidth;
    this.handsHeight = this.handsWidth;

    // trousers
    this.trousersWidth = this.bodyWidth;
    this.trousersHeight = this.bodyHeight - 2;

    // feet(legs)
    this.feetWidth = 7;
    this.feetHeight = 8;
    this.feetMargin = 2;
    this.skinHeight = this.feetHeight / 3;
    this.socksHeight = this.feetHeight / 3;
    this.shoesHeight = this.feetHeight / 3;
    
    
    this.setColor = function(part, color) {
        if (part === 'jersey') {
            this.shirtCol = color;
        } else if (part === 'trousers') {
            this.trousersCol = color;
        } else if (part === 'socks') {
            this.socksCol = color;
        }
    };
};