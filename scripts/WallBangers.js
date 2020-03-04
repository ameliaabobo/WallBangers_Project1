var wallBangers=function(){
    var self=this;
    this.options={
        height:500,
        width:680,
        wallHeight:500,
        wallWidth:50, // idea here is to have the wall width be half the width of the environment
        obstacleSpeed:50,
        obstacleStartHeight:0,
        minX:50,
        minY:100
    }
    this.score=0; // This is the total number of points the player has accumulated so far
                    //player(xPos, yPos, minX, maxX, minY, maxY, veloX, veloY)
    this.ninja = new player(0+this.options.wallWidth, this.options.height, 0, this.options.width-this.options.wallWidth, 
                            this.options.height, this.options.height - 100, 0, 0); // Add the coordinates for the ninja. The goal is to have him on the bottom of the right wall essentially
    this.initialize=function(){
        self.reset();
    };
    this.reset=function(){
        this.score = 0;
    }
}

var player = function(xPos, yPos, minX, maxX, minY, maxY, veloX, veloY){
    var self = this;
    this.jump = false;
    this.LtoR = true;
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
    /*this.incrementPosition = function(amount){
        self.setPosition(self.xPos + amount, self.yPos + amount);
    };*/
    this.jump = function(){
        
        if(!jump){ //Check if already jumping
            switch (this.LtoR) {
                case true:
                    //this.veloX += 20; //Left to Right   
                    self.setPosition(xPos + 20, yPos);                
                    break;
                case false:
                    //this.veloX -= 20; //Right to Left
                    self.setPosition(xPos - 20, yPos);
                    break;
            }
            this.jump = true;
        }
        this.veloY += 15; //Gravity
        

    };
}