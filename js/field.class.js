var Field = function(canvas) {
    var ctx = canvas.getContext("2d");
    var width = 0;
    var height = 0;

    this.draw = function() {
        ctx.fillStyle = FIELDFILLSTYLE;
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = FIELDLINESTROKESTYLE;
        var padding = Math.floor(width * 0.02);
        ctx.beginPath();
        var right = width - padding;
        var bottom = height - padding;
        ctx.moveTo(padding, padding);
        ctx.lineTo(right, padding);
        ctx.lineTo(right, bottom);
        ctx.lineTo(padding, bottom);
        ctx.lineTo(padding, padding);
        ctx.moveTo(padding, height / 2);
        ctx.lineTo(right, height / 2);				

        // penalty areas
        var penaltyBoxWidth = width / 2;
        var penaltyBoxHeight = penaltyBoxWidth / 3;
        var penaltyBoxLeft = width / 4;
        ctx.moveTo(penaltyBoxLeft, padding);
        ctx.lineTo(penaltyBoxLeft, padding + penaltyBoxHeight);
        ctx.lineTo(penaltyBoxLeft + penaltyBoxWidth, padding + penaltyBoxHeight);
        ctx.lineTo(penaltyBoxLeft + penaltyBoxWidth, padding);

        ctx.moveTo(penaltyBoxLeft, height - padding);
        ctx.lineTo(penaltyBoxLeft, height- padding- penaltyBoxHeight);
        ctx.lineTo(penaltyBoxLeft + penaltyBoxWidth, height - padding- penaltyBoxHeight);
        ctx.lineTo(penaltyBoxLeft + penaltyBoxWidth, height - padding);

        ctx.stroke();
        ctx.closePath();

    };
    this.getWidth = function() {
        return width;
    };
    this.getHeight = function() {
        return height;
    };
    this.setWidth = function(fieldWidth) {
        width = fieldWidth;
    };

    this.setHeight = function(fieldHeight) {
        height = fieldHeight;
    };	
};