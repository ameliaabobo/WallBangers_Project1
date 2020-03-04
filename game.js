var wallbangers=function(){
    var self=this;
    this.options={
        height:500,
        width:680,
        wallHeight:500,
        wallWidth:340, // idea here is to have the wall width be half the width of the environment
        obstacleSpeed:50,
        minX:50,
        minY:100
    }
    this.score=0; // This is the total number of points the player has accumulated so far
    this.ninja = new player(); // Add the coordinates for the ninja. The goal is to have him on the bottom of the right wall essentially
    this.initialize=function(){
        self.reset();
    };
    this.reset=function(){
        this.score = 0;
    }
}
var player = function(xPos, yPos, minX, maxX, minY, maxY, veloX, veloY){
    var self = this;
    this.xPos = xPos;
    this.yPos = yPos;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.veloX = veloX;
    this.veloY = veloY;
    this.initialize = function(){};
    this.setPosition = function(xPos, yPos){ // this is how we move the ninja
        if(xPos < self.minX){
            self.xPos = self.minX;
        }
        else if(xPos > self.maxX){
            self.xPos = self.maxX;
        }
        if(yPos < self.minY){
            self.yPos = self.minY;
        }
        if(yPos > self.maxY){
            self.yPos = self.maxY;
        }
    };
    this.incrementPosition = function(amount){
        self.setPosition(self.xPos + amount, self.yPos + amount);
    };
    this.initialize();
}